(function () {
    window.addMenu = function () {
        var menu = document.querySelector('.mobile-menu');
        menu.classList.add('mobile-menu--hide');
        menu.style.position = 'absolute';
        var buttonElement = document.querySelector('.header__open');
        buttonElement.addEventListener('click', function (evt) {
            if (evt.which === 1) {
                menu.classList.toggle('mobile-menu--hide');
                buttonElement.classList.toggle('header__open--opened');
            }
        });
    }
})();
