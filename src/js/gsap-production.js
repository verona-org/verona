import {gsap} from 'gsap';

export default function productionItem() {
    // Флаг блокировки анимации для предотвращения конфликтов
    let isAnimating = false;
    // Массив DOM-элементов блоков
    let productItems = [];
    // Текущий активный блок
    let currentActiveIndex = 0;

    // Инициализация галереи
    function initGallery() {
        productItems = document.querySelectorAll('.main-production__item');

        if (productItems.length === 0) {
            console.warn('Элементы .main-production__item не найдены');
            return;
        }

        // Установка начального состояния распределения ширины
        gsap.set(productItems[0], {flex: '2 1 50%'});
        gsap.set(productItems[1], {flex: '1 1 25%'});
        gsap.set(productItems[2], {flex: '1 1 25%'});

        // Устанавливаем начальное положение для всех текстовых элементов
        productItems.forEach((productItem, index) => {
            const textElement = productItem.querySelector('.main-production__text');
            if (textElement) {
                // Для первого блока - видимый и на своем месте
                if (index === 0) {
                    gsap.set(textElement, {
                        opacity: 1,
                        y: 0
                    });
                } else {
                    // Для остальных - скрыты и смещены вниз
                    gsap.set(textElement, {
                        opacity: 0,
                        y: 50 // начальное положение - смещено вниз
                    });
                }
            }
        });

        setupEventListeners();
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Обработчики для каждого блока
        productItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (isAnimating || currentActiveIndex === index) return;
                handleHover(index);
            });
        });

        // Обработчик выхода из контейнера - возврат к первому блоку
        const container = document.querySelector('.main-production');
        if (container) {
            container.addEventListener('mouseleave', () => {
                if (isAnimating || currentActiveIndex === 0) return;
                resetToFirstBlock();
            });
        }
    }

    // Обработка наведения на любой блок
    function handleHover(hoveredIndex) {
        isAnimating = true;
        currentActiveIndex = hoveredIndex;

        const timeline = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        // Анимация изменения flex для всех блоков
        productItems.forEach((productItem, index) => {
            if (index === hoveredIndex) {
                // Расширение активного блока до 50%
                timeline.to(productItem, {
                    flex: '2 1 50%',
                    duration: 0.5,
                    ease: 'power2.out',
                }, 0);
            } else {
                // Сжатие неактивных блоков до 25%
                timeline.to(productItem, {
                    flex: '1 1 25%',
                    duration: 0.5,
                    ease: 'power2.out',
                }, 0);
            }
        });

        // Анимация текстовых элементов - всплывание снизу вверх для активного, уход вниз для неактивных
        productItems.forEach((productItem, index) => {
            const textElement = productItem.querySelector('.main-production__text');
            if (textElement) {
                if (index === hoveredIndex) {
                    // Показ текста активного блока - всплывание снизу вверх
                    timeline.to(textElement, {
                        opacity: 1,
                        y: 50, // конечное положение - на своем месте
                        duration: 0.4,
                        ease: 'power2.out',
                    }, 0.2);
                } else {
                    // Скрытие текста неактивных блоков - уход вниз
                    timeline.to(textElement, {
                        opacity: 0,
                        y: 0, // смещение вниз при скрытии
                        duration: 0.3,
                        ease: 'power2.in',
                    }, 0);
                }
            }
        });
    }

    // Возврат к состоянию первого блока по умолчанию
    function resetToFirstBlock() {
        isAnimating = true;
        currentActiveIndex = 0;

        const timeline = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        // Восстановление начального распределения ширины
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

        // Анимация текстовых элементов - показываем только у первого блока с анимацией снизу вверх
        productItems.forEach((productItem, index) => {
            const textElement = productItem.querySelector('.main-production__text');
            if (textElement) {
                if (index === 0) {
                    // Показываем текст первого блока - всплывание снизу вверх
                    timeline.to(textElement, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                    }, 0.2);
                } else {
                    // Скрываем текст остальных блоков - уход вниз
                    timeline.to(textElement, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power2.in',
                    }, 0);
                }
            }
        });
    }

    // Инициализация после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
}