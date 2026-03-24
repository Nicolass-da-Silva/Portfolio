// Seletores principais da navbar mobile.
// Botao hamburguer que abre/fecha o menu em telas pequenas.
const menuButton = document.querySelector('#mobile-menu');
// Container da lista de links da navbar.
const menuContainer = document.querySelector('.navbar__menu');
// Todos os itens clicaveis que devem fechar o menu mobile apos clique.
const menuItems = document.querySelectorAll('.navbar__links, .button');
// Elementos que participam da navegacao suave via data-scroll-target.
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

const projectContainers = Array.from(document.querySelectorAll('.game__container[data-project-type]'));
// Botao da seta esquerda do carrossel.
const leftArrowButton = document.querySelector('.leftArrow__button');
// Botao da seta direita do carrossel.
const rightArrowButton = document.querySelector('.rightArrow__button');
// Botoes que alternam entre os carrosseis de jogos e arte.
const projectTabButtons = Array.from(document.querySelectorAll('[data-project-tab]'));
// Bolinhas indicadoras do carrossel ativo.
const projectDotsContainer = document.querySelector('.project__dots');
// Referencia reservada para futuros comportamentos da secao de ferramentas.
const toolsContainer = document.querySelector('.tools__container');

// Lógica do carrossel de projetos (navegação pelas setas).
if (projectContainers.length > 0 && leftArrowButton && rightArrowButton) {
    // Guarda o tipo ativo e o item atual de cada carrossel para preservar o estado ao alternar abas.
    let activeProjectType = 'jogos';
    const currentIndexByType = {};
    const maxStepPerClick = 1;

    const getContainerByType = (type) => projectContainers.find((container) => container.dataset.projectType === type);

    const getActiveContainer = () => getContainerByType(activeProjectType);

    const getItemsFromContainer = (container) => Array.from(container.querySelectorAll('.game__item'));

    const setActiveDot = (index) => {
        if (!projectDotsContainer) {
            return;
        }

        const dots = Array.from(projectDotsContainer.querySelectorAll('.project__dot'));
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('project__dot--active', dotIndex === index);
        });
    };

    const renderDotsForActiveContainer = () => {
        if (!projectDotsContainer) {
            return;
        }

        const activeContainer = getActiveContainer();
        if (!activeContainer) {
            projectDotsContainer.innerHTML = '';
            return;
        }

        const activeItems = getItemsFromContainer(activeContainer);
        const activeIndex = currentIndexByType[activeProjectType] ?? 0;

        projectDotsContainer.innerHTML = '';

        activeItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'project__dot';
            dot.setAttribute('aria-label', `Ir para item ${index + 1}`);

            if (index === activeIndex) {
                dot.classList.add('project__dot--active');
            }

            dot.addEventListener('click', () => {
                centerItem(activeContainer, activeItems, index);
            });

            projectDotsContainer.appendChild(dot);
        });
    };

    const setEdgePadding = (container, items) => {
        const firstItem = items[0];
        if (!firstItem) {
            return;
        }

        const containerWidth = container.getBoundingClientRect().width;
        const firstItemWidth = firstItem.getBoundingClientRect().width;
        const sidePadding = Math.max(0, (containerWidth - firstItemWidth) / 2);

        container.style.paddingLeft = `${sidePadding}px`;
        container.style.paddingRight = `${sidePadding}px`;
    };

    const getCenteredIndex = (container, items) => {
        const containerCenter = container.scrollLeft + (container.clientWidth / 2);
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        items.forEach((item, index) => {
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            const distance = Math.abs(itemCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    };

    const centerItem = (container, items, index, behavior = 'smooth') => {
        if (items.length === 0) {
            return;
        }

        const safeIndex = Math.max(0, Math.min(index, items.length - 1));
        const target = items[safeIndex];
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const left = container.scrollLeft + (targetRect.left - containerRect.left) - ((containerRect.width - targetRect.width) / 2);

        container.scrollTo({
            left,
            behavior
        });

        currentIndexByType[container.dataset.projectType] = safeIndex;

        if (container.dataset.projectType === activeProjectType) {
            setActiveDot(safeIndex);
        }
    };

    const syncProjectTabs = () => {
        projectTabButtons.forEach((button) => {
            const isActive = button.dataset.projectTab === activeProjectType;
            button.classList.toggle('project-tab--active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        projectContainers.forEach((container) => {
            container.hidden = container.dataset.projectType !== activeProjectType;
        });

        const activeContainer = getActiveContainer();
        if (!activeContainer) {
            return;
        }

        const activeItems = getItemsFromContainer(activeContainer);
        setEdgePadding(activeContainer, activeItems);
        const currentIndex = currentIndexByType[activeProjectType] ?? 0;
        centerItem(activeContainer, activeItems, currentIndex, 'auto');
        renderDotsForActiveContainer();
    };

    projectTabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextType = button.dataset.projectTab;
            if (!nextType || nextType === activeProjectType) {
                return;
            }

            activeProjectType = nextType;
            syncProjectTabs();
        });
    });

    leftArrowButton.addEventListener('click', () => {
        const activeContainer = getActiveContainer();
        if (!activeContainer) {
            return;
        }

        const activeItems = getItemsFromContainer(activeContainer);
        if (activeItems.length === 0) {
            return;
        }

        const centeredIndex = getCenteredIndex(activeContainer, activeItems);
        centerItem(activeContainer, activeItems, centeredIndex - maxStepPerClick);
    });

    rightArrowButton.addEventListener('click', () => {
        const activeContainer = getActiveContainer();
        if (!activeContainer) {
            return;
        }

        const activeItems = getItemsFromContainer(activeContainer);
        if (activeItems.length === 0) {
            return;
        }

        const centeredIndex = getCenteredIndex(activeContainer, activeItems);
        centerItem(activeContainer, activeItems, centeredIndex + maxStepPerClick);
    });

    projectContainers.forEach((container) => {
        const type = container.dataset.projectType;
        const items = getItemsFromContainer(container);
        currentIndexByType[type] = 0;

        let scrollTimer;
        container.addEventListener('scroll', () => {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(() => {
                currentIndexByType[type] = getCenteredIndex(container, items);

                if (type === activeProjectType) {
                    setActiveDot(currentIndexByType[type]);
                }
            }, 80);
        });

        items.forEach((item) => {
            const itemImage = item.querySelector('img');
            if (itemImage) {
                itemImage.addEventListener('load', () => {
                    setEdgePadding(container, items);
                    const currentIndex = currentIndexByType[type] ?? 0;
                    centerItem(container, items, currentIndex, 'auto');
                });
            }
        });
    });

    window.addEventListener('resize', () => {
        projectContainers.forEach((container) => {
            const items = getItemsFromContainer(container);
            setEdgePadding(container, items);
            const type = container.dataset.projectType;
            const currentIndex = currentIndexByType[type] ?? 0;
            centerItem(container, items, currentIndex, 'auto');
        });

        renderDotsForActiveContainer();
    });

    window.addEventListener('load', () => {
        syncProjectTabs();
    });

    syncProjectTabs();
}

const skillsRoot = document.querySelector('[data-skills-root]');
const skillsTabButtons = Array.from(document.querySelectorAll('[data-skills-tab]'));
const skillsPanels = Array.from(document.querySelectorAll('[data-skills-panel]'));
const skillsModeLabel = document.querySelector('[data-skills-mode]');

// Alterna entre os painéis de hard skills e soft skills.
if (skillsRoot && skillsTabButtons.length > 0 && skillsPanels.length > 0) {
    let activeSkillsTab = 'hard';

    const syncSkillsTabs = () => {
        skillsTabButtons.forEach((button) => {
            const isActive = button.dataset.skillsTab === activeSkillsTab;
            button.classList.toggle('skills__tab--active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        skillsPanels.forEach((panel) => {
            panel.hidden = panel.dataset.skillsPanel !== activeSkillsTab;
        });

        skillsRoot.classList.toggle('skills--hard', activeSkillsTab === 'hard');
        skillsRoot.classList.toggle('skills--soft', activeSkillsTab === 'soft');

        if (skillsModeLabel) {
            skillsModeLabel.textContent = activeSkillsTab === 'hard' ? 'Modo ativo: Hard Skills' : 'Modo ativo: Soft Skills';
        }
    };

    skillsTabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextTab = button.dataset.skillsTab;
            if (!nextTab || nextTab === activeSkillsTab) {
                return;
            }

            activeSkillsTab = nextTab;
            syncSkillsTabs();
        });
    });

    syncSkillsTabs();
}

// Configuracao central dos detalhes exibidos no modal para cada card de projeto/arte.
// Edite as chaves (1, 2, arte-1, etc.) para personalizar cada item sem mexer no HTML.
const PROJECT_MODAL_CONTENT = {
    default: {
        description: 'Descricao do projeto. Edite este texto no objeto PROJECT_MODAL_CONTENT.',
        responsibilities: ['Programacao', 'Arte', 'Game Design', 'UI'],
        technologies: [
            { name: 'Unity', icon: 'images/Unity--Streamline-Font-Awesome.svg' },
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' },
            { name: 'Github', icon: 'images/Github--Streamline-Unicons.svg' }
        ],
        whatIDid: 'Descreva aqui as principais contribuicoes e entregas deste projeto.',
        playLabel: 'Jogar',
        playUrl: '#'
    },
    '6': {
        description: 'Projeto em desenvolvimento. Mais detalhes em breve.',
        responsibilities: ['Planejamento', 'Prototipacao'],
        technologies: [
            { name: 'Unity', icon: 'images/Unity--Streamline-Font-Awesome.svg' }
        ],
        whatIDid: 'Estruturei a base do projeto e defini os proximos passos de implementacao.',
        playLabel: 'Em breve',
        playUrl: '#',
        comingSoon: true
    },
    'arte-1': {
        description: 'Estudo de arte com foco em composicao e identidade visual.',
        responsibilities: ['Arte', 'Direcao Visual'],
        technologies: [
            { name: 'Figma', icon: 'images/Figma--Streamline-Svg-Logos.svg' },
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: 'Criei conceito visual, refinamento de formas e paleta de cores final.',
        playLabel: 'Ver arte',
        playUrl: '#'
    }
};

const projectModal = document.querySelector('#project-modal');
const projectCards = Array.from(document.querySelectorAll('.game__item[data-project]'));
const projectModalImage = document.querySelector('[data-project-modal-image]');
const projectModalDescription = document.querySelector('[data-project-modal-description]');
const projectModalResponsibilities = document.querySelector('[data-project-modal-responsibilities]');
const projectModalTechnologies = document.querySelector('[data-project-modal-technologies]');
const projectModalWork = document.querySelector('[data-project-modal-work]');
const projectModalLink = document.querySelector('[data-project-modal-link]');
const projectModalTitle = document.querySelector('#project-modal-title');
const projectModalComingRibbon = document.querySelector('[data-project-modal-coming-ribbon]');
const projectModalCloseElements = Array.from(document.querySelectorAll('[data-project-modal-close]'));

if (projectModal && projectCards.length > 0 && projectModalImage && projectModalDescription && projectModalResponsibilities && projectModalTechnologies && projectModalWork && projectModalLink && projectModalTitle && projectModalComingRibbon) {
    let lastFocusedCard = null;

    const closeProjectModal = () => {
        projectModal.hidden = true;
        document.body.classList.remove('modal-open');

        if (lastFocusedCard) {
            lastFocusedCard.focus();
        }
    };

    const getModalContentForCard = (projectId) => {
        return {
            ...PROJECT_MODAL_CONTENT.default,
            ...(PROJECT_MODAL_CONTENT[projectId] || {})
        };
    };

    const renderModalResponsibilities = (items) => {
        projectModalResponsibilities.innerHTML = '';

        items.forEach((item) => {
            const chip = document.createElement('span');
            chip.className = 'project-modal__chip';
            chip.textContent = item;
            projectModalResponsibilities.appendChild(chip);
        });
    };

    const renderModalTechnologies = (items) => {
        projectModalTechnologies.innerHTML = '';

        items.forEach((item) => {
            const tech = document.createElement('div');
            tech.className = 'project-modal__tech';
            tech.setAttribute('aria-label', item.name || 'Tecnologia');
            tech.setAttribute('title', item.name || 'Tecnologia');

            if (item.icon) {
                const icon = document.createElement('img');
                icon.src = item.icon;
                icon.alt = item.name || 'Tecnologia';
                tech.appendChild(icon);
            } else {
                tech.textContent = (item.name || 'Tech').slice(0, 2).toUpperCase();
            }

            projectModalTechnologies.appendChild(tech);
        });
    };

    const openProjectModal = (card) => {
        const projectId = card.dataset.project;
        if (!projectId) {
            return;
        }

        lastFocusedCard = card;

        const cardTitle = card.querySelector('.game__title');
        const cardImage = card.querySelector('.game__image');
        const modalContent = getModalContentForCard(projectId);

        projectModalTitle.textContent = cardTitle ? cardTitle.textContent : 'Detalhes do Projeto';
        projectModalDescription.textContent = modalContent.description;
        projectModalWork.textContent = modalContent.whatIDid;
        projectModalLink.textContent = modalContent.playLabel;
        projectModalLink.href = modalContent.playUrl;

        if (cardImage && cardImage.src) {
            projectModalImage.src = cardImage.src;
            projectModalImage.alt = cardImage.alt || 'Imagem do projeto';
            projectModalImage.hidden = false;
        } else {
            projectModalImage.src = '';
            projectModalImage.alt = 'Imagem indisponivel';
            projectModalImage.hidden = true;
        }

        projectModalComingRibbon.hidden = !modalContent.comingSoon;

        renderModalResponsibilities(modalContent.responsibilities || []);
        renderModalTechnologies(modalContent.technologies || []);

        projectModal.hidden = false;
        document.body.classList.add('modal-open');
    };

    projectCards.forEach((card) => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', () => {
            openProjectModal(card);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProjectModal(card);
            }
        });
    });

    projectModalCloseElements.forEach((element) => {
        element.addEventListener('click', closeProjectModal);
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !projectModal.hidden) {
            closeProjectModal();
        }
    });
}