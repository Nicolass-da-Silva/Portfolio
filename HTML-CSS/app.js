// Seletores principais da navbar mobile.
// Botao hamburguer que abre/fecha o menu em telas pequenas.
const menuButton = document.querySelector('#mobile-menu');
// Container da lista de links da navbar.
const menuContainer = document.querySelector('.navbar__menu');
// Todos os itens clicaveis que devem fechar o menu mobile apos clique.
const menuItems = document.querySelectorAll('.navbar__links:not(.navbar__langToggle), .button');
// Elementos que participam da navegacao suave via data-scroll-target.
const scrollTargets = document.querySelectorAll('[data-scroll-target]');
const typewriterRole = document.querySelector('[data-typewriter-role]');
const langToggleButton = document.querySelector('[data-lang-toggle]');
const langPicker = document.querySelector('[data-lang-picker]');
const langMenu = document.querySelector('[data-lang-menu]');
const langCurrentLabel = document.querySelector('[data-lang-current]');
const langCurrentFlag = document.querySelector('[data-lang-current-flag]');
const langOptionButtons = Array.from(document.querySelectorAll('[data-lang-option]'));
const themeToggleButton = document.querySelector('[data-theme-toggle]');

const LANG_STORAGE_KEY = 'portfolio-language';
const THEME_STORAGE_KEY = 'portfolio-theme';
const defaultLanguage = 'pt';
const defaultTheme = 'dark';
let currentLanguage = window.localStorage.getItem(LANG_STORAGE_KEY) || defaultLanguage;
let currentTheme = window.localStorage.getItem(THEME_STORAGE_KEY) || defaultTheme;

if (!['pt', 'en'].includes(currentLanguage)) {
    currentLanguage = defaultLanguage;
}

if (!['light', 'dark'].includes(currentTheme)) {
    currentTheme = defaultTheme;
}

const UI_TRANSLATIONS = {
    pt: {
        htmlLang: 'pt-br',
        navHome: 'Início',
        navProjects: 'Projetos',
        navTools: 'Ferramentas',
        navAbout: 'Sobre',
        navSkills: 'Skills',
        navContact: 'Contato',
        navResume: 'Currículo',
        langPickerAria: 'Selecionar idioma',
        langMenuAria: 'Opções de idioma',
        langCurrentShort: 'PT',
        langOptionPt: 'Português',
        langOptionEn: 'Inglês',
        themeToLightAria: 'Alternar para modo claro',
        themeToDarkAria: 'Alternar para modo escuro',
        heroProjectButton: 'Ver projetos',
        heroContactButton: 'Contato',
        heroProjectTooltip: 'Ir para projetos',
        heroContactTooltip: 'Entrar em contato',
        roles: ['Artista Pixel Art', 'Desenvolvedor Unity'],
        projectsTitle: 'Projetos',
        projectsGames: 'Jogos',
        projectsArt: 'Arte',
        projectsPreviousAria: 'Projeto anterior',
        projectsNextAria: 'Próximo projeto',
        projectsDotAriaPrefix: 'Ir para item',
        projectsDotsAria: 'Indicadores do carrossel',
        toolsTitle: 'Ferramentas que uso',
        toolsMain: 'Principais',
        toolsUsed: 'Já utilizei',
        toolsStudying: 'Estudando',
        aboutTitle: 'Sobre mim',
        aboutP1Start: 'Olá! Meu nome é Nicolas. Sou desenvolvedor Unity e artista pixel art do Brasil',
        aboutP1End: 'com foco na criação de mundos e experiências envolventes para jogadores.',
        aboutFlagAlt: 'Bandeira do Brasil',
        aboutP2: 'Iniciei minha jornada aos 15 anos, quando descobri o universo dos jogos e o potencial criativo e técnico dessa área. Desde então, venho estudando programação e aprimorando minhas habilidades de forma contínua.',
        aboutP3: 'Comecei programando com GameMaker e, durante a graduação em Jogos Digitais, aprofundei meu trabalho com Unity, que hoje é minha principal ferramenta. Busco constantemente novas oportunidades, aprendizado em diferentes frentes do desenvolvimento e evolução profissional, com interesse de longo prazo em Full-Stack.',
        skillsHard: 'Hard Skills',
        skillsSoft: 'Soft Skills',
        skillsModeHard: 'Modo ativo: Hard Skills',
        skillsModeSoft: 'Modo ativo: Soft Skills',
        modalTitleFallback: 'Detalhes do Projeto',
        modalCloseAria: 'Fechar modal',
        modalDescriptionPlaceholder: 'Descrição',
        modalResponsibilitiesTitle: 'Responsabilidades',
        modalTechnologiesTitle: 'Tecnologias',
        modalWhatDidTitle: 'O que eu fiz',
        modalWhatDidPlaceholder: 'Descrição do feito',
        modalPlayDefault: 'Jogar',
        modalComingLabel: 'EM BREVE',
        contactName: 'Nome',
        contactEmail: 'Email',
        contactSubject: 'Assunto',
        contactSubmit: 'Enviar'
    },
    en: {
        htmlLang: 'en',
        navHome: 'Home',
        navProjects: 'Projects',
        navTools: 'Tools',
        navAbout: 'About',
        navSkills: 'Skills',
        navContact: 'Contact',
        navResume: 'Curriculum',
        langPickerAria: 'Select language',
        langMenuAria: 'Language options',
        langCurrentShort: 'EN',
        langOptionPt: 'Portuguese',
        langOptionEn: 'English',
        themeToLightAria: 'Switch to light mode',
        themeToDarkAria: 'Switch to dark mode',
        heroProjectButton: 'View projects',
        heroContactButton: 'Contact',
        heroProjectTooltip: 'Go to projects',
        heroContactTooltip: 'Get in touch',
        roles: ['Pixel Artist', 'Unity Developer'],
        projectsTitle: 'Projects',
        projectsGames: 'Games',
        projectsArt: 'Art',
        projectsPreviousAria: 'Previous project',
        projectsNextAria: 'Next project',
        projectsDotAriaPrefix: 'Go to item',
        projectsDotsAria: 'Carousel indicators',
        toolsTitle: 'Tools I use',
        toolsMain: 'Main',
        toolsUsed: 'Already used',
        toolsStudying: 'Studying',
        aboutTitle: 'About me',
        aboutP1Start: 'Hello! My name is Nicolas. I am a Unity Developer and Pixel Artist from Brazil',
        aboutP1End: 'focused on creating immersive worlds and experiences for players.',
        aboutFlagAlt: 'Brazil flag',
        aboutP2: 'I started this journey at 15, when I discovered the world of games and its creative and technical potential. Since then, I have been studying programming and continuously improving my skills.',
        aboutP3: 'I started with GameMaker and, during my Digital Games degree, I deepened my work with Unity, which is now my main tool. I am constantly seeking new opportunities, learning across different development areas, and long-term growth toward Full-Stack.',
        skillsHard: 'Hard Skills',
        skillsSoft: 'Soft Skills',
        skillsModeHard: 'Active mode: Hard Skills',
        skillsModeSoft: 'Active mode: Soft Skills',
        modalTitleFallback: 'Project Details',
        modalCloseAria: 'Close modal',
        modalDescriptionPlaceholder: 'Description',
        modalResponsibilitiesTitle: 'Responsibilities',
        modalTechnologiesTitle: 'Technologies',
        modalWhatDidTitle: 'What I did',
        modalWhatDidPlaceholder: 'Work summary',
        modalPlayDefault: 'Play',
        modalComingLabel: 'COMING SOON',
        contactName: 'Name',
        contactEmail: 'Email',
        contactSubject: 'Subject',
        contactSubmit: 'Send'
    }
};

const getTranslation = (key) => UI_TRANSLATIONS[currentLanguage][key] || UI_TRANSLATIONS.pt[key] || '';

let typewriterTimerId = null;
let typewriterRoleIndex = 0;
let typewriterCharIndex = 0;
let isTypewriterDeleting = false;

const restartTypewriter = () => {
    if (!typewriterRole) {
        return;
    }

    if (typewriterTimerId) {
        window.clearTimeout(typewriterTimerId);
    }

    const typingDelay = 90;
    const deletingDelay = 45;
    const holdDelay = 1400;

    typewriterRoleIndex = 0;
    typewriterCharIndex = 0;
    isTypewriterDeleting = false;

    const runTypewriter = () => {
        const roles = getTranslation('roles');
        const currentRole = roles[typewriterRoleIndex];

        if (isTypewriterDeleting) {
            typewriterCharIndex = Math.max(0, typewriterCharIndex - 1);
        } else {
            typewriterCharIndex = Math.min(currentRole.length, typewriterCharIndex + 1);
        }

        typewriterRole.textContent = currentRole.slice(0, typewriterCharIndex);

        if (!isTypewriterDeleting && typewriterCharIndex === currentRole.length) {
            isTypewriterDeleting = true;
            typewriterTimerId = window.setTimeout(runTypewriter, holdDelay);
            return;
        }

        if (isTypewriterDeleting && typewriterCharIndex === 0) {
            isTypewriterDeleting = false;
            typewriterRoleIndex = (typewriterRoleIndex + 1) % roles.length;
        }

        typewriterTimerId = window.setTimeout(runTypewriter, isTypewriterDeleting ? deletingDelay : typingDelay);
    };

    typewriterRole.textContent = '';
    runTypewriter();
};

const initializeTooltips = () => {
    if (!window.bootstrap) {
        return;
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((triggerElement) => {
        const existingTooltip = window.bootstrap.Tooltip.getInstance(triggerElement);
        if (existingTooltip) {
            existingTooltip.dispose();
        }

        new window.bootstrap.Tooltip(triggerElement);
    });
};

const updateStaticTexts = () => {
    document.documentElement.lang = getTranslation('htmlLang');

    const homeLink = document.querySelector('.navbar__links[data-scroll-target="#inicio"]');
    const projectsLink = document.querySelector('.navbar__links[data-scroll-target="#projetos"]');
    const toolsLink = document.querySelector('.navbar__links[data-scroll-target="#ferramentas"]');
    const aboutLink = document.querySelector('.navbar__links[data-scroll-target="#sobre"]');
    const skillsLink = document.querySelector('.navbar__links[data-scroll-target="#skills"]');
    const contactLink = document.querySelector('.navbar__links[data-scroll-target="#contato"]');
    const resumeButton = document.querySelector('.navbar__btn .button');

    if (homeLink) homeLink.textContent = getTranslation('navHome');
    if (projectsLink) projectsLink.textContent = getTranslation('navProjects');
    if (toolsLink) toolsLink.textContent = getTranslation('navTools');
    if (aboutLink) aboutLink.textContent = getTranslation('navAbout');
    if (skillsLink) skillsLink.textContent = getTranslation('navSkills');
    if (contactLink) contactLink.textContent = getTranslation('navContact');
    if (resumeButton) resumeButton.textContent = getTranslation('navResume');

    if (langToggleButton) {
        langToggleButton.setAttribute('aria-label', getTranslation('langPickerAria'));
    }
    if (langMenu) {
        langMenu.setAttribute('aria-label', getTranslation('langMenuAria'));
    }
    if (langCurrentLabel) {
        langCurrentLabel.textContent = getTranslation('langCurrentShort');
    }

    if (langCurrentFlag) {
        const isPortuguese = currentLanguage === 'pt';
        langCurrentFlag.src = isPortuguese ? 'images/bandeira-brasil.svg' : 'images/bandeira-eua.svg';
        langCurrentFlag.alt = isPortuguese ? getTranslation('langOptionPt') : getTranslation('langOptionEn');
    }

    const langOptionPtLabel = document.querySelector('[data-lang-option-label="pt"]');
    const langOptionEnLabel = document.querySelector('[data-lang-option-label="en"]');
    if (langOptionPtLabel) {
        langOptionPtLabel.textContent = getTranslation('langOptionPt');
    }
    if (langOptionEnLabel) {
        langOptionEnLabel.textContent = getTranslation('langOptionEn');
    }

    if (themeToggleButton) {
        const nextThemeAria = currentTheme === 'dark' ? getTranslation('themeToLightAria') : getTranslation('themeToDarkAria');
        themeToggleButton.setAttribute('aria-label', nextThemeAria);
    }

    const projectButton = document.querySelector('.project__button');
    const contactButton = document.querySelector('.contact__button');
    if (projectButton) {
        projectButton.textContent = getTranslation('heroProjectButton');
        projectButton.setAttribute('data-bs-title', getTranslation('heroProjectTooltip'));
        projectButton.setAttribute('title', getTranslation('heroProjectTooltip'));
    }
    if (contactButton) {
        contactButton.textContent = getTranslation('heroContactButton');
        contactButton.setAttribute('data-bs-title', getTranslation('heroContactTooltip'));
        contactButton.setAttribute('title', getTranslation('heroContactTooltip'));
    }

    const projectsTitle = document.querySelector('.project__content h2');
    const gamesButton = document.querySelector('.jogos__button');
    const artButton = document.querySelector('.arte__button');
    const leftArrow = document.querySelector('.leftArrow__button');
    const rightArrow = document.querySelector('.rightArrow__button');
    const dots = document.querySelector('.project__dots');
    const comingSoonRibbon = document.querySelector('.coming-soon-ribbon');

    if (projectsTitle) projectsTitle.textContent = getTranslation('projectsTitle');
    if (gamesButton) {
        gamesButton.textContent = getTranslation('projectsGames');
        gamesButton.setAttribute('aria-label', getTranslation('projectsGames'));
    }
    if (artButton) {
        artButton.textContent = getTranslation('projectsArt');
        artButton.setAttribute('aria-label', getTranslation('projectsArt'));
    }
    if (leftArrow) leftArrow.setAttribute('aria-label', getTranslation('projectsPreviousAria'));
    if (rightArrow) rightArrow.setAttribute('aria-label', getTranslation('projectsNextAria'));
    if (dots) dots.setAttribute('aria-label', getTranslation('projectsDotsAria'));
    if (comingSoonRibbon) {
        comingSoonRibbon.setAttribute('data-label', getTranslation('modalComingLabel'));
        comingSoonRibbon.setAttribute('aria-label', getTranslation('modalComingLabel'));
    }

    const currentDots = document.querySelectorAll('.project__dot');
    currentDots.forEach((dot, index) => {
        dot.setAttribute('aria-label', `${getTranslation('projectsDotAriaPrefix')} ${index + 1}`);
    });

    const toolsTitle = document.querySelector('.tools__content h1');
    const toolsMain = document.querySelector('.tools__principal');
    const toolsUsed = document.querySelector('.tools__utilizadas');
    const toolsStudying = document.querySelector('.tools__estudando');

    if (toolsTitle) toolsTitle.textContent = getTranslation('toolsTitle');
    if (toolsMain) toolsMain.textContent = getTranslation('toolsMain');
    if (toolsUsed) toolsUsed.textContent = getTranslation('toolsUsed');
    if (toolsStudying) toolsStudying.textContent = getTranslation('toolsStudying');

    const aboutTitle = document.querySelector('.about__content h2');
    const aboutParagraphs = document.querySelectorAll('.about__text');
    if (aboutTitle) aboutTitle.textContent = getTranslation('aboutTitle');
    if (aboutParagraphs[0]) {
        aboutParagraphs[0].innerHTML = `${getTranslation('aboutP1Start')} <img src="images/bandeira-brasil.svg" alt="${getTranslation('aboutFlagAlt')}" class="about__flag" />, ${getTranslation('aboutP1End')}`;
    }
    if (aboutParagraphs[1]) aboutParagraphs[1].textContent = getTranslation('aboutP2');
    if (aboutParagraphs[2]) aboutParagraphs[2].textContent = getTranslation('aboutP3');

    const hardSkillsButton = document.querySelector('[data-skills-tab="hard"]');
    const softSkillsButton = document.querySelector('[data-skills-tab="soft"]');
    if (hardSkillsButton) hardSkillsButton.textContent = getTranslation('skillsHard');
    if (softSkillsButton) softSkillsButton.textContent = getTranslation('skillsSoft');

    const activeSkillsTab = document.querySelector('[data-skills-tab].skills__tab--active')?.dataset.skillsTab || 'hard';
    const modeLabel = document.querySelector('[data-skills-mode]');
    if (modeLabel) {
        modeLabel.textContent = activeSkillsTab === 'soft' ? getTranslation('skillsModeSoft') : getTranslation('skillsModeHard');
    }

    const modalClose = document.querySelector('.project-modal__close');
    const modalTitle = document.querySelector('#project-modal-title');
    const modalDescription = document.querySelector('[data-project-modal-description]');
    const modalMetaTitles = document.querySelectorAll('.project-modal__metaBlock h3');
    const modalDoneTitle = document.querySelector('.project-modal__done h3');
    const modalWork = document.querySelector('[data-project-modal-work]');
    const modalPlay = document.querySelector('[data-project-modal-link]');
    const modalComing = document.querySelector('[data-project-modal-coming-ribbon]');

    if (modalClose) modalClose.setAttribute('aria-label', getTranslation('modalCloseAria'));
    if (modalTitle && modalTitle.textContent.trim() === '') modalTitle.textContent = getTranslation('modalTitleFallback');
    if (modalDescription && modalDescription.textContent.trim() === '') modalDescription.textContent = getTranslation('modalDescriptionPlaceholder');
    if (modalMetaTitles[0]) modalMetaTitles[0].textContent = getTranslation('modalResponsibilitiesTitle');
    if (modalMetaTitles[1]) modalMetaTitles[1].textContent = getTranslation('modalTechnologiesTitle');
    if (modalDoneTitle) modalDoneTitle.textContent = getTranslation('modalWhatDidTitle');
    if (modalWork && modalWork.textContent.trim() === '') modalWork.textContent = getTranslation('modalWhatDidPlaceholder');
    if (modalPlay && modalPlay.textContent.trim() === '') modalPlay.textContent = getTranslation('modalPlayDefault');
    if (modalComing) {
        modalComing.setAttribute('data-label', getTranslation('modalComingLabel'));
        modalComing.setAttribute('aria-label', getTranslation('modalComingLabel'));
    }

    const contactNameInput = document.querySelector('.contact__input[name="nome"]');
    const contactEmailInput = document.querySelector('.contact__input[name="email"]');
    const contactSubjectInput = document.querySelector('.contact__textarea[name="assunto"]');
    const contactSubmitButton = document.querySelector('.contact__submit');

    if (contactNameInput) {
        contactNameInput.placeholder = getTranslation('contactName');
        contactNameInput.setAttribute('aria-label', getTranslation('contactName'));
    }
    if (contactEmailInput) {
        contactEmailInput.placeholder = getTranslation('contactEmail');
        contactEmailInput.setAttribute('aria-label', getTranslation('contactEmail'));
    }
    if (contactSubjectInput) {
        contactSubjectInput.placeholder = getTranslation('contactSubject');
        contactSubjectInput.setAttribute('aria-label', getTranslation('contactSubject'));
    }
    if (contactSubmitButton) {
        contactSubmitButton.textContent = getTranslation('contactSubmit');
    }
};

const applyLanguage = (lang) => {
    currentLanguage = lang;
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    updateStaticTexts();
    langOptionButtons.forEach((button) => {
        const isActive = button.dataset.langOption === currentLanguage;
        button.classList.toggle('navbar__langOption--active', isActive);
        button.setAttribute('aria-checked', String(isActive));
    });
    restartTypewriter();
    initializeTooltips();
};

const applyTheme = (theme) => {
    currentTheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-bs-theme', theme);

    if (themeToggleButton) {
        const isLight = theme === 'light';
        themeToggleButton.classList.toggle('is-light', isLight);
        themeToggleButton.setAttribute('aria-pressed', String(isLight));
    }

    if (theme === 'dark') {
        document.body.classList.remove('theme-light');
    } else {
        document.body.classList.add('theme-light');
    }

    updateStaticTexts();
};

const closeLanguageMenu = () => {
    if (!langPicker || !langToggleButton) {
        return;
    }

    langPicker.classList.remove('is-open');
    langToggleButton.setAttribute('aria-expanded', 'false');
};

const toggleLanguageMenu = () => {
    if (!langPicker || !langToggleButton) {
        return;
    }

    const isOpen = langPicker.classList.toggle('is-open');
    langToggleButton.setAttribute('aria-expanded', String(isOpen));
};

if (langToggleButton) {
    langToggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleLanguageMenu();
    });
}

if (langOptionButtons.length > 0) {
    langOptionButtons.forEach((optionButton) => {
        optionButton.addEventListener('click', () => {
            const selectedLang = optionButton.dataset.langOption;
            if (!selectedLang || selectedLang === currentLanguage) {
                closeLanguageMenu();
                return;
            }

            applyLanguage(selectedLang);
            closeLanguageMenu();
        });
    });
}

document.addEventListener('click', (event) => {
    if (!langPicker || langPicker.contains(event.target)) {
        return;
    }

    closeLanguageMenu();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLanguageMenu();
    }
});

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

applyTheme(currentTheme);
applyLanguage(currentLanguage);

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
            dot.setAttribute('aria-label', `${getTranslation('projectsDotAriaPrefix')} ${index + 1}`);

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
            skillsModeLabel.textContent = activeSkillsTab === 'hard' ? getTranslation('skillsModeHard') : getTranslation('skillsModeSoft');
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
        description: {
            pt: 'Descrição do projeto. Edite este texto no objeto PROJECT_MODAL_CONTENT.',
            en: 'Project description. Edit this text in the PROJECT_MODAL_CONTENT object.'
        },
        responsibilities: {
            pt: ['Programação', 'Arte', 'Game Design', 'UI'],
            en: ['Programming', 'Art', 'Game Design', 'UI']
        },
        technologies: [
            { name: 'Unity', icon: 'images/Unity--Streamline-Font-Awesome.svg' },
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' },
            { name: 'Github', icon: 'images/Github--Streamline-Unicons.svg' }
        ],
        whatIDid: {
            pt: 'Descreva aqui as principais contribuições e entregas deste projeto.',
            en: 'Describe here the main contributions and deliveries from this project.'
        },
        playLabel: {
            pt: 'Jogar',
            en: 'Play'
        },
        playUrl: '#'
    },
    '6': {
        description: {
            pt: 'Projeto em desenvolvimento. Mais detalhes em breve.',
            en: 'Project in development. More details coming soon.'
        },
        responsibilities: {
            pt: ['Planejamento', 'Prototipação'],
            en: ['Planning', 'Prototyping']
        },
        technologies: [
            { name: 'Unity', icon: 'images/Unity--Streamline-Font-Awesome.svg' }
        ],
        whatIDid: {
            pt: 'Estruturei a base do projeto e defini os próximos passos de implementação.',
            en: 'I structured the project foundation and defined the next implementation steps.'
        },
        playLabel: {
            pt: 'Em breve',
            en: 'Soon'
        },
        playUrl: '#',
        comingSoon: true
    },
    'arte-1': {
        description: {
            pt: 'Estudo de arte com foco em composição e identidade visual.',
            en: 'Art study focused on composition and visual identity.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Figma', icon: 'images/Figma--Streamline-Svg-Logos.svg' },
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Criei conceito visual, refinamento de formas e paleta de cores final.',
            en: 'I created the visual concept, refined forms, and finalized the color palette.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
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

    const getLocalizedValue = (value) => {
        if (value && typeof value === 'object' && !Array.isArray(value) && ('pt' in value || 'en' in value)) {
            return value[currentLanguage] || value.pt || value.en;
        }

        return value;
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
        const localizedDescription = getLocalizedValue(modalContent.description);
        const localizedResponsibilities = getLocalizedValue(modalContent.responsibilities) || [];
        const localizedWhatIDid = getLocalizedValue(modalContent.whatIDid);
        const localizedPlayLabel = getLocalizedValue(modalContent.playLabel);

        projectModalTitle.textContent = cardTitle ? cardTitle.textContent : getTranslation('modalTitleFallback');
        projectModalDescription.textContent = localizedDescription;
        projectModalWork.textContent = localizedWhatIDid;
        projectModalLink.textContent = localizedPlayLabel || getTranslation('modalPlayDefault');
        projectModalLink.href = modalContent.playUrl;

        if (cardImage && cardImage.src) {
            projectModalImage.src = cardImage.src;
            projectModalImage.alt = cardImage.alt || 'Imagem do projeto';
            projectModalImage.hidden = false;
        } else {
            projectModalImage.src = '';
            projectModalImage.alt = currentLanguage === 'en' ? 'Image unavailable' : 'Imagem indisponível';
            projectModalImage.hidden = true;
        }

        projectModalComingRibbon.hidden = !modalContent.comingSoon;

        renderModalResponsibilities(localizedResponsibilities);
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