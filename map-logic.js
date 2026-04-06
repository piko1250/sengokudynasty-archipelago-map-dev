let mapLangCurrent = (navigator.language || navigator.userLanguage || '').startsWith('ja') ? 'ja' : 'en';
let mapScaleCurrent = 1;
let mapTransX = 0;
let mapTransY = 0;

let mapDragIsDragging = false;
let mapDragIsMoved = false;
let mapDragStartX = 0;
let mapDragStartY = 0;
let mapDragStartScreenX = 0;
let mapDragStartScreenY = 0;
const mapDragMoveThreshold = 6; // 6px以上の移動でドラッグ判定（スマホの震えを許容）

let mapTouchLastDist = 0;

let mapFilterActiveSet = new Set(Object.keys(categoryMaster));

document.addEventListener('filter-selection-changed', (e) => {
    mapFilterActiveSet = e.detail.selectedSet;
    mapMarkerRender();
});

function appLangSwitch(lang) {
    mapLangCurrent = lang;
    appLangUpdateBtn();
    mapMarkerRender();

    document.dispatchEvent(new CustomEvent('app-lang-changed', {
        detail: { lang: mapLangCurrent }
    }));
}

function appLangUpdateBtn() {
    const buttons = document.querySelectorAll('.app-lang-switch button');
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${mapLangCurrent}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function mapViewCenter() {
    const img = document.getElementById('map-view-image');
    if (!img || img.naturalWidth === 0) return;

    const windowW = document.documentElement.clientWidth;
    const windowH = document.documentElement.clientHeight;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scaleW = windowW / imgW;
    const scaleH = windowH / imgH;

    let defaultScale = Math.max(scaleW, scaleH);
    mapScaleCurrent = Math.min(defaultScale, 3.0);

    mapTransX = (windowW - imgW * mapScaleCurrent) / 2;
    mapTransY = (windowH - imgH * mapScaleCurrent) / 2;

    mapViewUpdateTransform();
}

function mapViewReset() {
    mapViewCenter();
}

function mapMarkerRender() {
    const markerLayer = document.getElementById('map-marker-layer');
    if (!markerLayer) return;

    markerLayer.innerHTML = '';

    locations.forEach((point) => {
        if (!mapFilterActiveSet.has(point.category)) {
            return;
        }

        const markerWrapper = document.createElement('div');
        markerWrapper.className = 'map-marker-item';
        markerWrapper.style.left = `${point.x}px`;
        markerWrapper.style.top = `${point.y}px`;

        const catColor = categoryMaster[point.category] ? categoryMaster[point.category].color : '#FFC631';
        markerWrapper.style.setProperty('--active-color', catColor);

        // 既に選択中かチェック
        if (typeof popupCurrentPoint !== 'undefined' && popupCurrentPoint === point) {
            markerWrapper.classList.add('active-marker');
        }

        const markerImg = document.createElement('img');
        const iconName = point.type ? `icon_${point.type}.png` : 'icon_unknown.png';
        markerImg.src = `./images/${iconName}`;
        markerImg.draggable = false;

        const tooltip = document.createElement('span');
        tooltip.className = 'map-marker-tooltip';
        tooltip.textContent = point.name[mapLangCurrent];

        markerWrapper.appendChild(markerImg);
        markerWrapper.appendChild(tooltip);

        point.domElement = markerWrapper;

        markerWrapper.addEventListener('click', (e) => {
            if (mapDragIsMoved) return;
            e.stopPropagation();

            document.dispatchEvent(new CustomEvent('popup-open', {
                detail: { point: point }
            }));
        });

        markerLayer.appendChild(markerWrapper);
    });
}

function mapViewZoomStep(direction) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const factor = direction > 0 ? 1.25 : 0.8;
    mapViewZoomByFactor(factor, centerX, centerY);
}

function mapViewZoomByFactor(factor, clientX, clientY) {
    const oldScale = mapScaleCurrent;
    let nextScale = mapScaleCurrent * factor;
    nextScale = Math.min(Math.max(nextScale, 0.15), 4.0);
    const actualFactor = nextScale / oldScale;

    mapTransX = clientX - (clientX - mapTransX) * actualFactor;
    mapTransY = clientY - (clientY - mapTransY) * actualFactor;
    mapScaleCurrent = nextScale;

    mapViewUpdateTransform();
}

function mapViewZoom(delta, clientX, clientY) {
    const zoomFactor = delta > 0 ? 1.1 : 1 / 1.1;
    mapViewZoomByFactor(zoomFactor, clientX, clientY);
}

function mapViewUpdateTransform() {
    const container = document.getElementById('map-view-container');
    container.style.transform = `translate3d(${mapTransX}px, ${mapTransY}px, 0) scale(${mapScaleCurrent})`;
    const label = document.getElementById('app-zoom-label');
    if (label) {
        label.textContent = `${Math.round(mapScaleCurrent * 100)}%`;
    }
}

function mapAppInit() {
    const img = document.getElementById('map-view-image');
    if (img.complete) {
        mapViewCenter();
    } else {
        img.onload = mapViewCenter;
    }

    // マウス操作
    window.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        mapDragIsDragging = true;
        mapDragIsMoved = false;
        mapDragStartX = e.clientX - mapTransX;
        mapDragStartY = e.clientY - mapTransY;
        mapDragStartScreenX = e.clientX;
        mapDragStartScreenY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!mapDragIsDragging) return;

        const dist = Math.hypot(e.clientX - mapDragStartScreenX, e.clientY - mapDragStartScreenY);
        if (dist > mapDragMoveThreshold) {
            mapDragIsMoved = true;
        }

        mapTransX = e.clientX - mapDragStartX;
        mapTransY = e.clientY - mapDragStartY;
        mapViewUpdateTransform();
    });

    window.addEventListener('mouseup', () => {
        mapDragIsDragging = false;
    });

    window.addEventListener('wheel', (e) => {
        mapViewZoom(-e.deltaY, e.clientX, e.clientY);
    }, { passive: false });

    // タッチ操作
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            mapDragIsDragging = true;
            mapDragIsMoved = false;
            mapDragStartX = e.touches[0].clientX - mapTransX;
            mapDragStartY = e.touches[0].clientY - mapTransY;
            mapDragStartScreenX = e.touches[0].clientX;
            mapDragStartScreenY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            mapDragIsDragging = false;
            mapTouchLastDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && mapDragIsDragging) {
            const dist = Math.hypot(e.touches[0].clientX - mapDragStartScreenX, e.touches[0].clientY - mapDragStartScreenY);
            if (dist > mapDragMoveThreshold) {
                mapDragIsMoved = true;
            }
            mapTransX = e.touches[0].clientX - mapDragStartX;
            mapTransY = e.touches[0].clientY - mapDragStartY;
            mapViewUpdateTransform();
        } else if (e.touches.length === 2) {
            e.preventDefault();
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            if (mapTouchLastDist > 0) {
                const factor = dist / mapTouchLastDist;
                mapViewZoomByFactor(factor, centerX, centerY);
            }
            mapTouchLastDist = dist;
        }
    }, { passive: false });

    window.addEventListener('touchend', () => {
        mapDragIsDragging = false;
        mapTouchLastDist = 0;
    });

    appLangUpdateBtn();
    mapMarkerRender();
}

window.addEventListener('DOMContentLoaded', mapAppInit);