export default class ParallaxSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.leftArrow = document.querySelector('.left-arrow');
        this.rightArrow = document.querySelector('.right-arrow');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.leftArrow.addEventListener('click', () => this.handleSwipe('prev'));
        this.rightArrow.addEventListener('click', () => this.handleSwipe('next'));
        this.initCustomCursor();

        // Инициализация первого слайда
        this.slides[this.currentIndex].classList.add('active');
    }

    handleSwipe(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const prevIndex = this.currentIndex;

        if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        }

        this.animateTransition(prevIndex, this.currentIndex, direction);
    }

    animateTransition(prevIndex, newIndex, direction) {
        const currentSlide = this.slides[prevIndex];
        const nextSlide = this.slides[newIndex];

        // Удаляем все классы анимации
        this.slides.forEach(slide => {
            slide.classList.remove('next', 'prev', 'leave-next', 'leave-prev');
        });

        // Устанавливаем начальные позиции
        if (direction === 'prev') {
            nextSlide.classList.add('prev');
            currentSlide.classList.add('leave-next');
        } else {
            nextSlide.classList.add('next');
            currentSlide.classList.add('leave-prev');
        }

        // Активируем новый слайд
        nextSlide.classList.add('active');
        currentSlide.classList.remove('active');

        // Запускаем анимацию
        requestAnimationFrame(() => {
            if (direction === 'prev') {
                nextSlide.classList.remove('prev');
                currentSlide.classList.add('leave-next');
            } else {
                nextSlide.classList.remove('next');
                currentSlide.classList.add('leave-prev');
            }
        });

        // Сброс анимации
        setTimeout(() => {
            currentSlide.classList.remove('leave-next', 'leave-prev');
            this.isAnimating = false;
        }, 800);
    }

    initCustomCursor() {
        let currentCursor = null;

        const createCursor = (arrow) => {
            const cursor = document.createElement('div');
            cursor.className = 'custom-arrow-cursor';
            cursor.style.backgroundImage = arrow.classList.contains('left-arrow')
                ? 'url("assets/icons/arrow-left.png")'
                : 'url("assets/icons/arrow-right.png")';
            document.body.appendChild(cursor);
            currentCursor = cursor;
        };

        const moveCursor = (e) => {
            if (currentCursor) {
                currentCursor.style.left = e.clientX + 'px';
                currentCursor.style.top = e.clientY + 'px';
            }
        };

        const removeCursor = () => {
            if (currentCursor) {
                currentCursor.remove();
                currentCursor = null;
            }
        };

        [this.leftArrow, this.rightArrow].forEach(arrow => {
            arrow.addEventListener('mouseenter', (e) => createCursor(arrow));
            arrow.addEventListener('mousemove', moveCursor);
            arrow.addEventListener('mouseleave', removeCursor);
        });
    }
}
