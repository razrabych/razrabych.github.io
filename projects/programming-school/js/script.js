document.querySelector('.header_burger').addEventListener('click', function() {
    document.querySelector('.burger').classList.add('burger_active');
});

document.querySelector('.burger_close').addEventListener('click', function() {
    document.querySelector('.burger').classList.remove('burger_active');
});

document.querySelector('.promo_button').addEventListener('click', function() {
    document.querySelector('.pop-up').classList.add('pop-up_active');
});

document.querySelector('.pop-up_content_close').addEventListener('click', function() {
    document.querySelector('.pop-up').classList.remove('pop-up_active');
});

document.addEventListener('click', function(event) {
    const popUpContent = document.querySelector('.pop-up_content');
    const popUp = document.querySelector('.pop-up');

    if (!popUpContent.contains(event.target) && !event.target.classList.contains('promo_button')) {
        popUp.classList.remove('pop-up_active');
    }
});
