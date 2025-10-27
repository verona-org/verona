export function catalogue () {
    const catalogue = document.querySelector('.catalog-overlay');
    const catalogueButton = document.querySelector('.header__catalogue');

    catalogueButton.addEventListener('click', toggleCatalog);

    document.addEventListener ('keydown', function(e) {
        if (e.key === 'Escape' && catalogue.classList.contains('catalog-overlay--open')) {
            closeCatalog();
        }
    });

    function toggleCatalog() {
        if (catalogue.classList.contains('catalog-overlay--open')) {
            closeCatalog();
        } else {
            openCatalog();
        }
    }

    function openCatalog() {
        catalogue.classList.add('catalog-overlay--open');
        catalogueButton.classList.add('header__catalogue--active');
    }

    function closeCatalog() {
        catalogue.classList.remove('catalog-overlay--open');
        catalogueButton.classList.remove('header__catalogue--active');
    }
}