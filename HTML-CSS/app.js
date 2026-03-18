// Seletores principais da navbar mobile.
const menuButton = document.querySelector('#mobile-menu');
const menuContainer = document.querySelector('.navbar__menu');
const menuItems = document.querySelectorAll('.navbar__links, .button');
const scrollTargets = document.querySelectorAll('[data-scroll-target]');

// Inicializa tooltips do Bootstrap para elementos que possuem data-bs-toggle="tooltip".
if (window.bootstrap) {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((triggerElement) => {
        new window.bootstrap.Tooltip(triggerElement);
    });
}

// Controle do menu hambúrguer em telas menores.
if (menuButton && menuContainer) {
    // Fecha menu, remove classes de estado e atualiza acessibilidade.
    const closeMenu = () => {
        menuButton.classList.remove('is-active');
        menuContainer.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    // Alterna abertura/fechamento ao clicar no botão do menu.
    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.classList.toggle('is-active');
        menuContainer.classList.toggle('active', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em um link ou botão interno.
    menuItems.forEach((item) => {
        item.addEventListener('click', closeMenu);
    });

    // Em desktop, garante que o menu mobile seja fechado.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
}

// Navegacao suave para secoes existentes usando atributos data-scroll-target.
if (scrollTargets.length > 0) {
    const navbar = document.querySelector('.navbar');

    const scrollToTarget = (triggerElement) => {
        const targetSelector = triggerElement.getAttribute('data-scroll-target');
        if (!targetSelector) {
            return;
        }

        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            return;
        }

        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const targetRect = targetElement.getBoundingClientRect();
        const currentScroll = window.scrollY;
        const scrollMode = triggerElement.getAttribute('data-scroll-mode');

        let nextTop;

        if (scrollMode === 'center') {
            nextTop = currentScroll + targetRect.top - ((window.innerHeight - targetRect.height) / 2);
        } else {
            nextTop = currentScroll + targetRect.top - navbarHeight - 12;
        }

        window.scrollTo({
            top: Math.max(0, nextTop),
            behavior: 'smooth'
        });
    };

    scrollTargets.forEach((triggerElement) => {
        triggerElement.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToTarget(triggerElement);
        });
    });
}

const projectContainer = document.querySelector('.game__container');
const leftArrowButton = document.querySelector('.leftArrow__button');
const rightArrowButton = document.querySelector('.rightArrow__button');
const toolsContainer = document.querySelector('.tools__container');

// Lógica do carrossel de projetos (navegação pelas setas).
if (projectContainer && leftArrowButton && rightArrowButton) {
    // Lista todos os cards/containers de projeto.
    const projectItems = Array.from(projectContainer.querySelectorAll('.game__item'));

    // Só inicia se existir ao menos um item no carrossel.
    if (projectItems.length > 0) {
        // Índice atualmente centralizado no viewport.
        let currentIndex = 0;
        // Quantidade de itens movidos por clique na seta.
        const maxStepPerClick = 1;

        // Ajusta padding lateral para permitir centralizar primeiro e último item.
        const setEdgePadding = () => {
            const firstItem = projectItems[0];
            const containerWidth = projectContainer.getBoundingClientRect().width;
            const firstItemWidth = firstItem.getBoundingClientRect().width;
            const sidePadding = Math.max(0, (containerWidth - firstItemWidth) / 2);

            projectContainer.style.paddingLeft = `${sidePadding}px`;
            projectContainer.style.paddingRight = `${sidePadding}px`;
        };

        // Descobre qual item está mais próximo do centro visível do container.
        const getCenteredIndex = () => {
            const containerCenter = projectContainer.scrollLeft + (projectContainer.clientWidth / 2);
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            projectItems.forEach((item, index) => {
                const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
                const distance = Math.abs(itemCenter - containerCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        };

        // Centraliza o item de um índice específico com rolagem suave.
        const centerItem = (index, behavior = 'smooth') => {
            const safeIndex = Math.max(0, Math.min(index, projectItems.length - 1));
            const target = projectItems[safeIndex];
            const containerRect = projectContainer.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const left = projectContainer.scrollLeft + (targetRect.left - containerRect.left) - ((containerRect.width - targetRect.width) / 2);

            projectContainer.scrollTo({
                left,
                behavior
            });

            currentIndex = safeIndex;
        };

        // Navega para a esquerda (um item por clique).
        leftArrowButton.addEventListener('click', () => {
            const centeredIndex = getCenteredIndex();
            centerItem(centeredIndex - maxStepPerClick);
        });

        // Navega para a direita (um item por clique).
        rightArrowButton.addEventListener('click', () => {
            const centeredIndex = getCenteredIndex();
            centerItem(centeredIndex + maxStepPerClick);
        });

        // Debounce de scroll para atualizar o índice central sem custo alto.
        let scrollTimer;
        projectContainer.addEventListener('scroll', () => {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(() => {
                currentIndex = getCenteredIndex();
            }, 80);
        });

        // Recalibra centralização quando a tela muda de tamanho.
        window.addEventListener('resize', () => {
            setEdgePadding();
            centerItem(currentIndex, 'auto');
        });

        // Recalibra após o carregamento completo da página.
        window.addEventListener('load', () => {
            setEdgePadding();
            centerItem(currentIndex, 'auto');
        });

        // Recalibra quando cada imagem termina de carregar.
        projectItems.forEach((item) => {
            const itemImage = item.querySelector('img');
            if (itemImage) {
                itemImage.addEventListener('load', () => {
                    setEdgePadding();
                    centerItem(currentIndex, 'auto');
                });
            }
        });

        // Estado inicial do carrossel: bordas ajustadas e primeiro item centralizado.
        setEdgePadding();
        centerItem(0, 'auto');
    }
}