export default function swiperSlideMain() {
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const sliderContainer = document.querySelector('.slider');

    let currentIndex = 0;
    let isAnimating = false;

    if (!slides.length || !leftArrow || !rightArrow || !sliderContainer) {
        console.warn('Swiper: Не найдены необходимые DOM элементы');
        return;
    }

    const getNextIndex = (currentIndex, totalSlides) => (currentIndex + 1) % totalSlides;
    const getPrevIndex = (currentIndex, totalSlides) => currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;

    function removeAnimationClasses(slide) {
        slide.classList.remove('slide-next', 'slide-prev', 'slide-out-next', 'slide-out-prev'); // исправлено slide-out-new на slide-out-next
    }

    function animateSlideOut(slide, direction) {
        const animationClass = direction === 'next' ? 'slide-out-next' : 'slide-out-prev'; // исправлено slide-out-next на slide-out-prev для 'prev'
        slide.classList.add(animationClass);
    }

    function animateSlideIn(slide, direction) {
        const animationClass = direction === 'next' ? 'slide-next' : 'slide-prev';
        slide.classList.add(animationClass, 'active'); // добавлен 'active'
    }

    function resetSlide(slide) {
        slide.classList.remove('active');
        removeAnimationClasses(slide);
        // Убираем градиенты
        slide.style.background = '';

    }

    function nextSlide() {
        if (isAnimating) return;

        isAnimating = true;
        const currentSlide = slides[currentIndex];
        const nextIndex = getNextIndex(currentIndex, slides.length);
        const nextSlide = slides[nextIndex];

        animateSlideOut(currentSlide, 'next');
        animateSlideIn(nextSlide, 'next');

        setTimeout(() => {
            resetSlide(currentSlide);
            removeAnimationClasses(nextSlide);
            currentIndex = nextIndex;
            isAnimating = false;
        }, 600);
    }

    function prevSlide() {
        if (isAnimating) return;

        isAnimating = true;
        const currentSlide = slides[currentIndex];
        const prevIndex = getPrevIndex(currentIndex, slides.length);
        const prevSlide = slides[prevIndex];

        animateSlideOut(currentSlide, 'prev');
        animateSlideIn(prevSlide, 'prev');

        setTimeout(() => {
            resetSlide(currentSlide);
            removeAnimationClasses(prevSlide);
            currentIndex = prevIndex;
            isAnimating = false;
        }, 600);
    }

    // Функции для управления стрелками
    const showLeftArrow = () => {
        leftArrow.classList.add('show');
        rightArrow.classList.remove('show');
        sliderContainer.classList.add('darken-left');
        sliderContainer.classList.remove('darken-right');
    };

    const showRightArrow = () => {
        rightArrow.classList.add('show');
        leftArrow.classList.remove('show');
        sliderContainer.classList.add('darken-right');
        sliderContainer.classList.remove('darken-left');
    };

    const hideArrows = () => {
        leftArrow.classList.remove('show');
        rightArrow.classList.remove('show');
        sliderContainer.classList.remove('darken-left', 'darken-right');
    };

    // Обработчик движения мыши
    const handleMouseMove = (e) => {
        const windowWidth = window.innerWidth;
        const mouseX = e.clientX;

        if (mouseX < windowWidth / 2) {
            showLeftArrow();
        } else {
            showRightArrow();
        }
    };

    // Инициализация слайдера
    const initSlider = () => {
        // Показываем первую картинку
        slides[currentIndex].classList.add('active');

        // Добавляем обработчики событий
        leftArrow.addEventListener('click', prevSlide);
        rightArrow.addEventListener('click', nextSlide);
        document.addEventListener('mousemove', handleMouseMove);
        sliderContainer.addEventListener('mouseleave', hideArrows);
    };

    // ВЫЗОВ ИНИЦИАЛИЗАЦИИ - этот вызов нужно добавить
    initSlider();
}