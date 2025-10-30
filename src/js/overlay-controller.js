export function createOverlayController(config) {
    const {
        openButton,
        closeButton,
        overlayElement,
        openClass = '--open', // класс по умолчанию
        onOpen = null, // дополнительная логика при открытии
        onClose = null, // дополнительная логика при закрытии
        closeOnEscape = true // закрывать по Escape
    } = config;

    function openOverlay() {
        overlayElement.classList.add(openClass);
        if (onOpen) onOpen();
    }

    function closeOverlay() {
        overlayElement.classList.remove(openClass);
        if (onClose) onClose();
    }

    // Обработчики событий
    openButton.addEventListener('click', openOverlay);

    if (closeButton) {
        closeButton.addEventListener('click', closeOverlay);
    }

    if (closeOnEscape) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlayElement.classList.contains(openClass)) {
                closeOverlay();
            }
        });
    }

    // Возвращаем методы для внешнего контроля
    return {
        open: openOverlay,
        close: closeOverlay
    };
}

export function orderACall() {
    return createOverlayController({
        openButton: document.getElementById('order-a-call-open'),
        closeButton: document.getElementById('order-a-call-close'),
        overlayElement: document.querySelector('.order-a-call-overlay'),
        openClass: 'order-a-call-overlay--open',
    });
}

export function costCatalogue() {
    return createOverlayController({
        openButton: document.getElementById('cost-calculation-open'),
        closeButton: document.getElementById('cost-calculation-close'),
        overlayElement: document.querySelector('.cost-calculation-overlay'),
        openClass: 'cost-calculation-overlay--open'
    });
}

export function burgerOpen() {
    const burgerOpenBtn = document.querySelector('.header__burger');
    const burgerCloseBtn = document.querySelector('.header__burger-close');
    const burgerOverlay = document.querySelector('.burger-overlay');
    const headerContainer = document.querySelector('.header__container');

    return createOverlayController({
        openButton: burgerOpenBtn,
        closeButton: burgerCloseBtn,
        overlayElement: burgerOverlay,
        openClass: 'burger-overlay--open',
        onOpen: () => {
            burgerCloseBtn.style.display = 'block';
            burgerOpenBtn.style.display = 'none';
            headerContainer.style.borderBottom = '1px solid rgba(145, 132, 79, 1)';
        },
        onClose: () => {
            burgerCloseBtn.style.display = 'none';
            burgerOpenBtn.style.display = 'block';
            headerContainer.style.borderBottom = '1px solid rgba(255, 255, 255, 0.5)';
        }
    });
}