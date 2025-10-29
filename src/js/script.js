import swiperSlideMain from './swiper-slide-main.js';
//import initCustomCursorArrows from './init-custom-cursor-arrows.js';
import {catalogue} from './catalogue.js';
import {burgerOpen} from './burger.js';
import {errorRedirect} from './error-redirest.js';
import {orderACall} from './order-a-call.js';

document.addEventListener('DOMContentLoaded', function () {
    swiperSlideMain();
    //initCustomCursorArrows();
    catalogue();
    burgerOpen();
    errorRedirect();
    orderACall();
});
