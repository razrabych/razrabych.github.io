const RAZRABYCH_URL = 'https://razrabych.ru';

document.addEventListener('DOMContentLoaded', function () {
    // Все кнопки и кнопки отправки форм ведут на razrabych.ru
    document.querySelectorAll('button, input[type="submit"]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(RAZRABYCH_URL, '_blank');
        });
    });
});
