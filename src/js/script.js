import swiperSlideMain from './swiper-slide-main.js';
import {catalogue} from './catalogue.js';
import {errorRedirect} from './error-redirest.js';
import {orderACall, burgerOpen, costCatalogue} from './overlay-controller.js';
import productionItem from './gsap-production.js';


document.addEventListener('DOMContentLoaded', function () {
    swiperSlideMain();
    //initCustomCursorArrows();
    catalogue();
    burgerOpen();
    errorRedirect();
    orderACall();
    costCatalogue();
    productionItem();


});
