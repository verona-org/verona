export default function initCustomCursorArrows() {
    let currentCursor = null;

    function createCustomCursor(e, arrow) {
        // Создаем кастомный курсор
        const cursor = document.createElement('div');
        cursor.className = 'custom-arrow-cursor';
        cursor.style.backgroundImage = arrow.classList.contains('left-arrow')
            ? 'url("../assets/images/icons/arrow-left.png")'
            : 'url("../assets/images/icons/arrow-right.png")';

        document.body.appendChild(cursor);
        currentCursor = cursor;
    }

    function moveCustomCursor(e) {
        if (currentCursor) {
            currentCursor.style.left = e.clientX + 'px';
            currentCursor.style.top = e.clientY + 'px';
        }
    }

    function removeCustomCursor() {
        if (currentCursor) {
            currentCursor.remove();
            currentCursor = null;
        }
    }

    function init() {
        const arrows = document.querySelectorAll('.left-arrow, .right-arrow');

        arrows.forEach(arrow => {
            arrow.style.cursor = 'none'; // Скрываем стандартный курсор

            arrow.addEventListener('mousemove', moveCustomCursor);

            arrow.addEventListener('mouseenter', (e) => {
                createCustomCursor(e, arrow);
            });

            arrow.addEventListener('mouseleave', removeCustomCursor);
        });
    }

    // Инициализируем
    init();
}