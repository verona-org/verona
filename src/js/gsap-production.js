import { gsap } from '/node_modules/gsap/gsap-core.js';
console.log(gsap);

export function productionItem() {
    // Состояние анимации
    let isAnimating = false;
    let productItems = [];

    // Начальное состояние галереи
    function initGallery() {
        productItems = document.querySelectorAll('.main-production__item');

        if (productItems.length === 0) {
            console.warn('Элементы .main-production__item не найдены');
            return;
        }

        gsap.set(productItems[0], {flex: '2 1 50%'});
        gsap.set(productItems[1], {flex: '1 1 25%'});
        gsap.set(productItems[2], {flex: '1 1 25%'});

        setupEventListeners();
    }

    function setupEventListeners() {
        productItems.forEach((productItem) => {
            productItem.addEventListener('mouseenter', (e) => {
                if (isAnimating) return;
                handleHover(parseInt(e.currentTarget.dataset.index));
            });

            productItem.addEventListener('mouseleave', () => {
                if (isAnimating) return;
                resetToDefault();
            });
        });
    }

    function handleHover(hoveredIndex) {
        isAnimating = true;

        const timeline = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        productItems.forEach((productItem, index) => {
            if (index === hoveredIndex) {
                timeline.to(productItem, {
                    flex: '2 1 50%',
                    duration: 0.5,
                    ease: 'power2.out',
                }, 0);
            } else {
                timeline.to(productItem, {
                    flex: '1 1 25%',
                    duration: 0.5,
                    ease: 'power2.out',
                }, 0);
            }
        });

        // Исправленная строка - используем productItems вместо productionItem
        const textElement = productItems[hoveredIndex].querySelector('.main-production__text');
        if (textElement) {
            timeline.to(textElement, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            }, 0.2);
        }
    }

    function resetToDefault() {
        isAnimating = true;

        const timeline = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        timeline.to(productItems[0], {
            flex: '2 1 50%',
            duration: 0.5,
            ease: 'power2.out',
        }, 0);

        timeline.to([productItems[1], productItems[2]], {
            flex: '1 1 25%',
            duration: 0.5,
            ease: 'power2.out',
        }, 0);

        timeline.to('.main-production__text', {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
        }, 0);
    }

    // Инициализируем когда DOM готов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
}