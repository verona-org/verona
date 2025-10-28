export function errorRedirect() {
    if (document.title.includes('404') ||
        document.body.textContent.includes('404') ||
        window.location.pathname.includes('404')) {

        // Перенаправляем на кастомную страницу 404
        window.location.href = '../partials/not-found.html';
    }
}