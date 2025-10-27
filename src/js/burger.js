export function burgerOpen () {
    const burgerOpen = document.querySelector('.header__burger');
    const burgerClose = document.querySelector('.header__burger-close');
    const burger = document.querySelector('.burger-overlay');
    const headerContainer = document.querySelector('.header__container');

    burgerOpen.addEventListener('click', openBurger);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burger.classList.contains('burger-overlay--open')) {
            closeBurger();
        }
    });

    burgerClose.addEventListener('click', closeBurger);

    function openBurger() {
        burgerClose.style.display = 'block';
        burgerOpen.style.display = 'none';
        headerContainer.style.borderBottom = '1px solid rgba(145, 132, 79, 1)';
        burger.classList.add('burger-overlay--open');
    }

    function closeBurger() {
        burgerClose.style.display = 'none';
        burgerOpen.style.display = 'block';
        burger.classList.remove('burger-overlay--open');
    }
}