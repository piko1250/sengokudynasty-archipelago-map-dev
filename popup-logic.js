let popupCurrentPoint = null;
let popupLangCurrent = (navigator.language || navigator.userLanguage || '').startsWith('ja') ? 'ja' : 'en';
let popupZIndexBase = 4000;

document.addEventListener('app-lang-changed', (e) => {
    popupLangCurrent = e.detail.lang;
    if (popupCurrentPoint) {
        popupRender(popupCurrentPoint);
    }
});

document.addEventListener('filter-selection-changed', (e) => {
    if (popupCurrentPoint && !e.detail.selectedSet.has(popupCurrentPoint.category)) {
        popupClose();
    }
});

document.addEventListener('popup-open', (e) => {
    const newPoint = e.detail.point;

    if (popupCurrentPoint === newPoint) {
        popupClose();
        return;
    }

    popupCurrentPoint = newPoint;
    popupZIndexBase++;
    popupRender(popupCurrentPoint);
});

document.addEventListener('click', (e) => {
    const popupLayer = document.getElementById('map-popup-layer');
    const footerContainer = document.getElementById('app-footer-container');
    const filterContainer = document.getElementById('filter-menu-container');

    if (!popupCurrentPoint || !popupLayer || popupLayer.children.length === 0) return;

    if (typeof mapViewIsMoved === 'function' && mapViewIsMoved()) {
        return;
    }

    const isClickInsidePopup = e.target.closest('.popup-card');
    const isClickInsideFooter = footerContainer && footerContainer.contains(e.target);
    const isClickInsideFilter = filterContainer && filterContainer.contains(e.target);

    if (!isClickInsidePopup && !isClickInsideFooter && !isClickInsideFilter) {
        popupClose();
    }
});

function popupRender(point) {
    const layer = document.getElementById('map-popup-layer');
    if (!layer) return;

    layer.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup-card';
    popup.style.left = `${point.x}px`;
    popup.style.top = `${point.y}px`;
    popup.style.zIndex = popupZIndexBase;

    const headerEl = document.createElement('div');
    headerEl.className = 'popup-header';

    const nameEl = document.createElement('div');
    nameEl.className = 'popup-title';
    nameEl.textContent = point.name[popupLangCurrent];

    const catData = categoryMaster[point.category];
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'popup-category-badge';
    categoryBadge.textContent = catData[popupLangCurrent];
    categoryBadge.style.backgroundColor = catData.color;

    headerEl.appendChild(nameEl);
    headerEl.appendChild(categoryBadge);

    const bodyEl = document.createElement('div');
    bodyEl.className = 'popup-body';
    bodyEl.textContent = point.desc[popupLangCurrent];

    popup.appendChild(headerEl);
    popup.appendChild(bodyEl);

    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    layer.appendChild(popup);
}

function popupClose() {
    const layer = document.getElementById('map-popup-layer');
    if (layer) {
        layer.innerHTML = '';
    }
    popupCurrentPoint = null;
}