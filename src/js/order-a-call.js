export function orderACall () {
    const orderACallBtnOpen = document.getElementById('order-a-call-open');
    const orderACallBtnClose = document.getElementById('order-a-call-close');
    const blockOrderACall = document.querySelector('.order-a-call-overlay');

    orderACallBtnOpen.addEventListener('click', openOrderCall);

    orderACallBtnClose.addEventListener('click', closeOrderCall);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blockOrderACall.classList.contains('order-a-call-overlay--open')) {
            closeOrderCall();
        }
    });

    function openOrderCall () {
        blockOrderACall.classList.add('order-a-call-overlay--open');
    }

    function closeOrderCall () {
        blockOrderACall.classList.remove('order-a-call-overlay--open');
    }
}