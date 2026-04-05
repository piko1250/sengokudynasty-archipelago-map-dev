let filterSelectedSet = new Set(Object.keys(categoryMaster));
let filterLangCurrent = (navigator.language || navigator.userLanguage || '').startsWith('ja') ? 'ja' : 'en';

document.addEventListener('app-lang-changed', (e) => {
    filterLangCurrent = e.detail.lang;
    const container = document.getElementById('filter-menu-container');
    if (container && container.style.display !== 'none') {
        filterListRender();
    }
});

function filterNotifyChange() {
    document.dispatchEvent(new CustomEvent('filter-selection-changed', {
        detail: { selectedSet: filterSelectedSet }
    }));
}

function filterMenuToggle() {
    const container = document.getElementById('filter-menu-container');
    const toggleBtn = document.getElementById('app-btn-filter');
    if (!container) return;

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'flex';
        if (toggleBtn) toggleBtn.classList.add('active-filter');
        filterListRender();
    } else {
        container.style.display = 'none';
        if (toggleBtn) toggleBtn.classList.remove('active-filter');
    }
}

document.addEventListener('click', (e) => {
    const container = document.getElementById('filter-menu-container');
    const toggleBtn = document.getElementById('app-btn-filter');

    if (container && container.style.display === 'flex') {
        if (!container.contains(e.target) && !toggleBtn.contains(e.target)) {
            filterMenuToggle();
        }
    }
});

function filterBulkApply(isAll) {
    if (isAll) {
        filterSelectedSet = new Set(Object.keys(categoryMaster));
    } else {
        filterSelectedSet.clear();
    }
    filterListRender();
    filterNotifyChange();
}

function filterListRender() {
    const list = document.getElementById('filter-menu-content');
    if (!list) return;

    list.innerHTML = '';

    const allCategories = Object.keys(categoryMaster);
    const isAllSelected = filterSelectedSet.size === allCategories.length;

    const selectAllLabel = document.createElement('label');
    selectAllLabel.className = 'filter-item-label filter-item-all';

    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.checked = isAllSelected;

    selectAllCheckbox.addEventListener('change', (e) => {
        filterBulkApply(e.target.checked);
    });

    const selectAllText = filterLangCurrent === 'ja' ? '全選択' : 'Select All';

    selectAllLabel.appendChild(selectAllCheckbox);
    selectAllLabel.appendChild(document.createTextNode(selectAllText));
    list.appendChild(selectAllLabel);

    const separator = document.createElement('div');
    separator.className = 'filter-separator';
    list.appendChild(separator);

    allCategories.forEach(key => {
        const cat = categoryMaster[key];
        const labelText = cat[filterLangCurrent] || cat['ja'];

        const label = document.createElement('label');
        label.className = 'filter-item-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = key;
        checkbox.checked = filterSelectedSet.has(key);

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                filterSelectedSet.add(key);
            } else {
                filterSelectedSet.delete(key);
            }
            filterNotifyChange();

            const isNowAllSelected = filterSelectedSet.size === allCategories.length;
            selectAllCheckbox.checked = isNowAllSelected;
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(labelText));
        list.appendChild(label);
    });
}