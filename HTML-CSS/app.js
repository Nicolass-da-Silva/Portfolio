const menuButton = document.querySelector('#mobile-menu');
const menuContainer = document.querySelector('.navbar__menu');
const menuItems = document.querySelectorAll('.navbar__links, .button');

if (menuButton && menuContainer) {
    const closeMenu = () => {
        menuButton.classList.remove('is-active');
        menuContainer.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.classList.toggle('is-active');
        menuContainer.classList.toggle('active', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    menuItems.forEach((item) => {
        item.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 960) {
            closeMenu();
        }
    });
}