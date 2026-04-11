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
const contactForm = document.querySelector('.contact__form');

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
        toolsHireTitle: 'Áreas contratáveis',
        roleWebTitle: 'Desenvolvimento Web',
        roleWebLevel: 'Desenvolvimento de interfaces e aplicações front-end',
        rolePixelTitle: 'Pixel Art',
        rolePixelLevel: 'Criação de assets visuais para jogos 2D',
        roleUnityTitle: 'Desenvolvimento Unity',
        roleUnityLevel: 'Implementação de mecânicas, sistemas e lógica de gameplay',
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
        skillsCardTitle: 'Titulo',
        skillsCardDescription: 'Descricao',
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
        contactMessage: 'Mensagem',
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
        toolsHireTitle: 'Hireable areas',
        roleWebTitle: 'Website Developer',
        roleWebLevel: 'Complete beginner/student',
        rolePixelTitle: 'Pixel Artist',
        rolePixelLevel: 'Beginner/Intermediate and studying',
        roleUnityTitle: 'Unity Developer',
        roleUnityLevel: 'Beginner/Intermediate and studying',
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
        skillsCardTitle: 'Title',
        skillsCardDescription: 'Description',
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
        contactMessage: 'Message',
        contactSubmit: 'Send'
    }
};

const PROJECT_CARD_TRANSLATIONS = {
    '1': {
        title: { pt: 'Perseguicao do Coelho', en: 'Rabbit Chase' },
        subtitle: { pt: 'Perseguicao do Coelho', en: 'Rabbit Chase' }
    },
    '2': {
        title: { pt: 'O Arraial do Toninho & Tinho', en: "Toninho & Tinho's Festival" },
        subtitle: { pt: 'O Arraial do Toninho & Tinho', en: "Toninho & Tinho's Festival" }
    },
    '3': {
        title: { pt: 'Sirin', en: 'Sirin' },
        subtitle: { pt: 'Sirin', en: 'Sirin' }
    },
    '4': {
        title: { pt: 'O Mundo que cabe na mao', en: 'The World That Fits in Your Hand' },
        subtitle: { pt: 'O Mundo que cabe na mao', en: 'The World That Fits in Your Hand' }
    },
    '5': {
        title: { pt: 'Projeto em desenvolvimento', en: 'Project in development' }
    },
    'arte-1': {
        title: { pt: 'Logo do jogo Sirin', en: 'Sirin game logo' }
    },
    'arte-2': {
        title: { pt: 'Um dos temas do Inktober 2025', en: 'One of the Inktober 2025 themes' }
    },
    'arte-3': {
        title: { pt: 'Tela inicial do jogo Sirin', en: 'Sirin title screen' }
    },
    'arte-4': {
        title: { pt: 'Plantacoes do jogo Toninho & Tinho', en: "Toninho & Tinho crop assets" }
    },
    'arte-5': {
        title: { pt: 'Comidas da loja do jogo Toninho & Tinho', en: "Toninho & Tinho shop foods" }
    },
    'arte-6': {
        title: { pt: 'Arte dos personagens de Sanrio', en: 'Sanrio characters artwork' }
    },
    'arte-7': {
        title: { pt: 'Arte de comidas', en: 'Food artwork' }
    },
    'arte-8': {
        title: { pt: 'Treino de bocas', en: 'Mouth practice' }
    },
    'arte-9': {
        title: { pt: 'Sapo Mago', en: 'Wizard Frog' }
    }
};

const SKILLS_TRANSLATIONS = {
    hard: [
        {
            title: { pt: 'Versionamento de Codigo', en: 'Code Versioning' },
            description: {
                pt: 'Utilizacao de sistemas de versionamento para organizar, controlar e manter o historico de projetos e codigo.',
                en: 'Use of version control systems to organize, track, and maintain project and code history.'
            }
        },
        {
            title: { pt: 'Motores de Jogos', en: 'Game Engines' },
            description: {
                pt: 'Experiencia na utilizacao de game engines para desenvolvimento de mecanicas, sistemas e prototipos jogaveis.',
                en: 'Experience using game engines to build mechanics, systems, and playable prototypes.'
            }
        },
        {
            title: { pt: 'Arquitetura de Sistemas', en: 'Systems Architecture' },
            description: {
                pt: 'Organizacao e estruturacao de sistemas de jogo, garantindo escalabilidade e manutencao do projeto.',
                en: 'Organization and structuring of game systems, ensuring project scalability and maintainability.'
            }
        },
        {
            title: { pt: 'Organizacao de Assets', en: 'Asset Organization' },
            description: {
                pt: 'Estruturacao e organizacao de arquivos visuais, sprites e elementos graficos para manter eficiencia e consistencia na producao artistica.',
                en: 'Structuring and organization of visual files, sprites, and graphic elements to keep artistic production efficient and consistent.'
            }
        },
        {
            title: { pt: 'Softwares Especializados', en: 'Specialized Software' },
            description: {
                pt: 'Uso de ferramentas voltadas a criacao e edicao de artes digitais e assets para jogos.',
                en: 'Use of tools focused on creating and editing digital art and game assets.'
            }
        },
        {
            title: { pt: 'Perspectivas e Estilos', en: 'Perspective and Styles' },
            description: {
                pt: 'Aplicacao de fundamentos visuais, estilizacao e composicao para construcao de identidade visual em projetos.',
                en: 'Application of visual fundamentals, stylization, and composition to build visual identity in projects.'
            }
        }
    ],
    soft: [
        {
            title: { pt: 'Trabalho em Equipe', en: 'Teamwork' },
            description: {
                pt: 'Capacidade de colaborar de forma eficiente com outras pessoas, contribuindo para o andamento do projeto e para um ambiente produtivo.',
                en: 'Ability to collaborate efficiently with others, contributing to project progress and a productive environment.'
            }
        },
        {
            title: { pt: 'Comunicacao', en: 'Communication' },
            description: {
                pt: 'Clareza na troca de informacoes, garantindo alinhamento de ideias, processos e objetivos entre a equipe.',
                en: 'Clarity in communication, ensuring alignment of ideas, processes, and goals across the team.'
            }
        },
        {
            title: { pt: 'Gestao de Tempo', en: 'Time Management' },
            description: {
                pt: 'Organizacao e priorizacao de tarefas para cumprir prazos e manter o fluxo de trabalho eficiente.',
                en: 'Task organization and prioritization to meet deadlines and keep workflow efficient.'
            }
        },
        {
            title: { pt: 'Resiliencia', en: 'Resilience' },
            description: {
                pt: 'Capacidade de lidar com desafios, adaptar-se a imprevistos e manter o progresso mesmo diante de dificuldades.',
                en: 'Ability to handle challenges, adapt to unexpected changes, and keep moving forward despite difficulties.'
            }
        },
        {
            title: { pt: 'Aprendizado Continuo', en: 'Continuous Learning' },
            description: {
                pt: 'Comprometimento com o desenvolvimento constante de habilidades tecnicas e criativas.',
                en: 'Commitment to continuous development of technical and creative skills.'
            }
        },
        {
            title: { pt: 'Flexibilidade', en: 'Flexibility' },
            description: {
                pt: 'Facilidade para se adaptar a mudancas de escopo, novas ferramentas e diferentes demandas de projeto.',
                en: 'Ease in adapting to scope changes, new tools, and different project demands.'
            }
        }
    ]
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

    const projectCards = document.querySelectorAll('.game__item[data-project]');
    projectCards.forEach((card) => {
        const projectId = card.getAttribute('data-project');
        const cardTranslation = PROJECT_CARD_TRANSLATIONS[projectId || ''];

        if (!cardTranslation) {
            return;
        }

        const cardTitle = card.querySelector('.game__title');
        const cardSubtitle = card.querySelector('.game__subtitle');

        if (cardTitle && cardTranslation.title) {
            cardTitle.textContent = cardTranslation.title[currentLanguage] || cardTranslation.title.pt || cardTitle.textContent;
        }

        if (cardSubtitle && cardTranslation.subtitle) {
            cardSubtitle.textContent = cardTranslation.subtitle[currentLanguage] || cardTranslation.subtitle.pt || cardSubtitle.textContent;
        }
    });

    const toolsTitle = document.querySelector('.tools__content h1');
    const toolsMain = document.querySelector('.tools__principal');
    const toolsUsed = document.querySelector('.tools__utilizadas');
    const toolsStudying = document.querySelector('.tools__estudando');
    const toolsHireTitle = document.querySelector('[data-tools-hire-title]');
    const roleWebTitle = document.querySelector('[data-tools-role-web-title]');
    const roleWebLevel = document.querySelector('[data-tools-role-web-level]');
    const rolePixelTitle = document.querySelector('[data-tools-role-pixel-title]');
    const rolePixelLevel = document.querySelector('[data-tools-role-pixel-level]');
    const roleUnityTitle = document.querySelector('[data-tools-role-unity-title]');
    const roleUnityLevel = document.querySelector('[data-tools-role-unity-level]');

    if (toolsTitle) toolsTitle.textContent = getTranslation('toolsTitle');
    if (toolsMain) toolsMain.textContent = getTranslation('toolsMain');
    if (toolsUsed) toolsUsed.textContent = getTranslation('toolsUsed');
    if (toolsStudying) toolsStudying.textContent = getTranslation('toolsStudying');
    if (toolsHireTitle) toolsHireTitle.textContent = getTranslation('toolsHireTitle');
    if (roleWebTitle) roleWebTitle.textContent = getTranslation('roleWebTitle');
    if (roleWebLevel) roleWebLevel.textContent = getTranslation('roleWebLevel');
    if (rolePixelTitle) rolePixelTitle.textContent = getTranslation('rolePixelTitle');
    if (rolePixelLevel) rolePixelLevel.textContent = getTranslation('rolePixelLevel');
    if (roleUnityTitle) roleUnityTitle.textContent = getTranslation('roleUnityTitle');
    if (roleUnityLevel) roleUnityLevel.textContent = getTranslation('roleUnityLevel');

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

    ['hard', 'soft'].forEach((panelType) => {
        const panel = document.querySelector(`[data-skills-panel="${panelType}"]`);
        const cardTranslations = SKILLS_TRANSLATIONS[panelType] || [];

        if (!panel) {
            return;
        }

        const cards = panel.querySelectorAll('.skills__card');
        cards.forEach((card, index) => {
            const translation = cardTranslations[index];
            if (!translation) {
                return;
            }

            const titleElement = card.querySelector('h3');
            const descriptionElement = card.querySelector('p');

            if (titleElement) {
                titleElement.textContent = translation.title[currentLanguage] || translation.title.pt || '';
            }

            if (descriptionElement) {
                descriptionElement.textContent = translation.description[currentLanguage] || translation.description.pt || '';
            }
        });
    });

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
    const contactSubjectInput = document.querySelector('.contact__input[name="assunto"]');
    const contactMessageInput = document.querySelector('.contact__textarea[name="mensagem"]');
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
    if (contactMessageInput) {
        contactMessageInput.placeholder = getTranslation('contactMessage');
        contactMessageInput.setAttribute('aria-label', getTranslation('contactMessage'));
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

    const dismissTriggerTooltip = (triggerElement) => {
        if (!window.bootstrap || !triggerElement) {
            return;
        }

        const tooltipInstance = window.bootstrap.Tooltip.getInstance(triggerElement);
        if (tooltipInstance) {
            tooltipInstance.hide();
        }
    };


if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const recipientEmail = (contactForm.getAttribute('data-contact-email') || '').trim();
        const name = (contactForm.querySelector('[name="nome"]')?.value || '').trim();
        const email = (contactForm.querySelector('[name="email"]')?.value || '').trim();
        const subjectValue = (contactForm.querySelector('[name="assunto"]')?.value || '').trim();
        const message = (contactForm.querySelector('[name="mensagem"]')?.value || '').trim();

        if (!recipientEmail) {
            window.alert(currentLanguage === 'en'
                ? 'Configure your professional email in the contact form.'
                : 'Configure seu e-mail profissional no formulario de contato.');
            return;
        }

        const subjectLine = subjectValue
            ? subjectValue
            : (currentLanguage === 'en' ? 'Portfolio contact' : 'Contato pelo portfolio');

        const body = currentLanguage === 'en'
            ? `Name: ${name}\nEmail: ${email}\n\nSubject:\n${subjectLine}\n\nMessage:\n${message}`
            : `Nome: ${name}\nEmail: ${email}\n\nAssunto:\n${subjectLine}\n\nMensagem:\n${message}`;

        const endpointUrl = (contactForm.getAttribute('data-contact-endpoint') || '').trim();
        const submitButton = contactForm.querySelector('.contact__submit');
        const defaultButtonText = submitButton?.textContent || '';

        const fallbackToMailto = () => {
            const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        };

        if (endpointUrl) {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = currentLanguage === 'en' ? 'Sending...' : 'Enviando...';
            }

            try {
                const response = await window.fetch(endpointUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject: subjectLine,
                        _subject: subjectLine,
                        message,
                        _captcha: 'false'
                    })
                });

                if (response.ok) {
                    window.alert(currentLanguage === 'en'
                        ? 'Message sent successfully.'
                        : 'Mensagem enviada com sucesso.');
                    contactForm.reset();
                    return;
                }
            } catch (error) {
                // If endpoint fails (offline/CORS), keep fallback behavior.
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = defaultButtonText;
                }
            }
        }

        fallbackToMailto();
    });
}
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
            dismissTriggerTooltip(triggerElement);

            if (typeof triggerElement.blur === 'function') {
                triggerElement.blur();
            }
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
    '1': {
        description: {
            pt: 'Rabbit Chase é um jogo de plataforma 2D em Pixel Art que acompanha a história da Ritinha, uma garotinha apaixonada por plantar cenouras. Só que nem tudo é tranquilo… alguns coelhos começaram a invadir sua plantação e roubar tudo! Até que, um dia, eles levam uma cesta inteira e desaparecem por um buraco, e é aí que a Ritinha decide ir atrás deles para recuperar o que é seu.\n Esse foi o primeiro projeto da minha vida e também o primeiro que levei do começo ao fim de verdade. Foi uma experiência muito importante pra mim, tanto que o jogo acabou sendo selecionado pela faculdade para ser exposto no stand da BGS 2024 durante os 5 dias de evento.',
            en: 'Rabbit Chase is a 2D pixel art platformer that follows the story of Ritinha, a little girl who loves growing carrots. But not everything is peaceful… some rabbits have started invading her garden and stealing everything! Until one day, they take an entire basket and disappear down a hole, and that’s when Ritinha decides to go after them to get back what’s hers.\n This was the first project of my life and also the first one I actually saw through from start to finish. It was a very important experience for me, so much so that the game ended up being selected by the college to be exhibited at the BGS 2024 booth during the 5-day event.'
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
            pt: 'Fui responsável por toda a parte de programação do jogo na Unity: movimentação da personagem, habilidades, sistema de morte, respawn, UI, menus, botões, tudo foi desenvolvido por mim.\n Além disso, também participei da parte artística. Criei animações (como a de morte da personagem), desenvolvi a interface (botões, tela inicial) e produzi todo o tileset do jogo, incluindo cenários, obstáculos e itens.\n O próprio level design foi construído diretamente dentro da Unity, onde fui criando e testando tudo de forma mais livre enquanto desenvolvia o jogo.',
            en: 'I was responsible for all the game’s programming in Unity: character movement, abilities, the death system, respawn, UI, menus, buttons—I developed everything myself.\n In addition, I also contributed to the art side of the project. I created animations (such as the character’s death animation), developed the interface (buttons, title screen), and produced the entire game’s tileset, including environments, obstacles, and items.\n The level design itself was built directly within Unity, where I was able to create and test everything more freely while developing the game.'
        },
        playLabel: {
            pt: 'Jogar',
            en: 'Play'
        },
        playUrl: 'https://ticco.itch.io/rabbit-chase'
    },
    '2': {
        description: {
            pt: 'Arraial do Toninho & Tinho foi desenvolvido especialmente para uma Game Jam da faculdade em 2024, com o tema festa junina. O jogo é um clicker casual onde o objetivo é cultivar ingredientes para produzir comidas típicas dessa celebração brasileira.\n Aqui, você controla os dois irmãos tatus, Toninho e Tinho. A mecânica gira em torno de carregar a força para lançar um deles pela plantação, coletando ingredientes importantes para as receitas. Depois disso, você abre a barraquinha para trocar esses itens por moedas. Com elas, é possível evoluir diversos aspectos do jogo, como velocidade dos personagens, tamanho da plantação, quantidade de itens coletados, entre outros upgrades.\n Essa foi a primeira Game Jam que participei e conseguimos ficar em 1° lugar no tema. Além disso, o jogo também foi selecionado, junto com o anterior, para ser exposto durante os 5 dias da BGS 2024.',
            en: 'Arraial do Toninho & Tinho was developed specifically for a college Game Jam in 2024, with the theme of the June Festival. The game is a casual clicker where the goal is to grow ingredients to make traditional foods for this Brazilian celebration.\n Here, you control the two armadillo brothers, Toninho and Tinho. The gameplay revolves around charging up to launch one of them through the plantation, collecting key ingredients for the recipes. After that, you open the little stall to trade these items for coins. With these coins, you can upgrade various aspects of the game, such as character speed, plantation size, and the number of items collected, among other upgrades.\nThis was the first Game Jam I participated in, and we managed to take 1st place in the theme category. Additionally, the game was selected, along with the previous one, to be showcased during the 5 days of BGS 2024.'
        },
        responsibilities: {
            pt: ['Arte'],
            en: ['Art']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável por toda a parte artística do jogo. Criei as pixel arts dos ingredientes da plantação, o background da barraquinha e também os sprites das comidas prontas que aparecem durante a venda.',
            en: "I was responsible for all the game's artwork. I created the pixel art for the farm's ingredients, the background for the little stand, and the sprites for the prepared foods that appear during the sale."
        },
        playLabel: {
            pt: 'Jogar',
            en: 'Play'
        },
        playUrl: 'https://rerezin-das-galaxias.itch.io/arraial-de-toninho-e-tinho'
    },
    '3': {
        description: {
            pt: 'Sirin foi desenvolvido para uma Game Jam da faculdade em 2025, com o tema labirinto dos sonhos. O jogo gira em torno de três puzzles que acontecem dentro dos sonhos de uma garotinha. Você controla essa personagem enquanto ela sonha, enfrentando desafios que precisam ser superados para que ela consiga acordar. A cada fase, é necessário explorar o labirinto em busca de botões que liberam o acesso aos sonhos. Ao concluir um, você avança para o próximo, encarando novos desafios em sequência.\n No final, o jogo culmina em um confronto diferente: uma partida de “21” contra uma espécie de gato misterioso, que atua como o dono do labirinto. O projeto conquistou o 3° lugar na Game Jam.',
            en: 'Sirin was developed for a college Game Jam in 2025, with the theme “Dream Labyrinth.” The game revolves around three puzzles that take place within a little girl’s dreams. You control this character as she dreams, facing challenges that must be overcome so she can wake up. In each stage, you must explore the maze in search of buttons that unlock access to the dreams. Upon completing one, you advance to the next, facing new challenges in sequence.\n In the end, the game culminates in a unique showdown: a game of “21” against a mysterious cat-like creature, who acts as the maze’s master. The project won 3rd place at the Game Jam.'
        },
        responsibilities: {
            pt: ['Arte'],
            en: ['Art']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável por uma parte artística do jogo. Produzi as cutscenes inicial e final, criei as animações da personagem, desenvolvi a logo do jogo e também toda a interface, incluindo menus, opções, indicadores de teclas e os elementos visuais dos botões espalhados pelo labirinto. ',
            en: "I was responsible for the game's artistic direction. I produced the opening and closing cutscenes, created the character animations, designed the game logo, and developed the entire user interface, including menus, options, key bindings, and the visual elements of the buttons scattered throughout the maze."
        },
        playLabel: {
            pt: 'Jogar',
            en: 'Play'
        },
        playUrl: 'https://npcproductions.itch.io/sirin'
    },
    '4': {
        description: {
            pt: 'O Mundo que Cabe na Mão foi desenvolvido para uma Game Jam da faculdade em 2025, com o tema pequenos mundos fantásticos. O jogo gira em torno da imaginação de uma criança enquanto lê um livro junto com sua mãe.\n A jornada começa com a abertura do livro, levando a personagem por três mundos diferentes, cada um com sua própria história e mecânicas. No primeiro mundo, ela se torna um alienígena, voando pelo espaço e desviando de asteroides. No segundo, se transforma em um biscoito de gengibre em um mundo de doces, enfrentando inimigos em formato de caixa de leite e pulando obstáculos. Já no terceiro, vira uma fadinha explorando um labirinto escuro, onde precisa usar sua varinha para iluminar o caminho e avançar.\n Cada fase se conecta com a próxima de forma natural: no espaço, a personagem viaja até um planeta de doces, e ao final desse mundo, encontra a varinha que será essencial na próxima etapa. O jogo conquistou o 3° lugar na Game Jam da faculdade.',
            en: 'The World That Fits in Your Hand was developed for a college Game Jam in 2025, with the theme “small fantasy worlds.” The game revolves around a child’s imagination as they read a book with their mother.\n The journey begins when the book is opened, taking the character through three different worlds, each with its own story and mechanics. In the first world, she becomes an alien, flying through space and dodging asteroids. In the second, she transforms into a gingerbread cookie in a world of candy, facing enemies shaped like milk cartons and jumping over obstacles. In the third, she becomes a little fairy exploring a dark maze, where she must use her wand to light the way and move forward.\n Each stage connects naturally to the next: in space, the character travels to a planet made of candy, and at the end of that world, she finds the wand that will be essential in the next stage. The game won 3rd place at the college’s Game Jam.'
        },
        responsibilities: {
            pt: ['Programação', 'Game Design'],
            en: ['Programming', 'Game Design',]
        },
        technologies: [
            { name: 'Unity', icon: 'images/Unity--Streamline-Font-Awesome.svg' },
            { name: 'Github', icon: 'images/Github--Streamline-Unicons.svg' }
        ],
        whatIDid: {
            pt: 'Fiquei responsável principalmente pela programação geral do projeto. Desenvolvi todas as mecânicas de cada mundo, incluindo movimentação, sistema de iluminação, combate, IA dos inimigos, spawn e alertas de meteoros, coleta de itens, progressão de fases com desbloqueio gradual, além do menu inicial e dos tutoriais.\n Também participei ativamente do game design, com foco maior na fase dos doces e no labirinto, que exigiram um cuidado maior na construção de gameplay e na experiência do jogador.',
            en: 'I was primarily responsible for the project’s overall programming. I developed all the mechanics for each world, including movement, the lighting system, combat, enemy AI, meteor spawns and alerts, item collection, and level progression with gradual unlocking, as well as the main menu and tutorials. I also actively participated in game design, focusing primarily on the candy level and the maze, which required greater attention to gameplay construction and the player experience.'
        },
        playLabel: {
            pt: 'Jogar',
            en: 'Play'
        },
        playUrl: 'https://ansys.itch.io/o-mundo-que-cabe-na-mao'
    },
    '5': {
        description: {
            pt: 'O jogo encontra-se atualmente em desenvolvimento (2026), sendo produzido como parte do Trabalho de Conclusão de Curso (TCC). A pesquisa associada ao projeto tem como foco o resgate e a valorização estética da Pixel Art.\n A proposta consiste em um jogo casual no qual o jogador assume o papel de uma mãe brasileira responsável por administrar uma taverna. Durante o dia, o objetivo é preparar pratos, servir bebidas e gerenciar aspectos como tempo, estoque e organização da cozinha. À noite, a dinâmica se transforma: o jogador explora uma dungeon em busca de ingredientes que serão utilizados no dia seguinte, lidando com limitações de inventário e planejamento estratégico de recursos.',
            en: 'The game is currently in development (2026) and is being produced as part of a final-year project. The research associated with the project focuses on the revival and aesthetic appreciation of pixel art.\n The concept involves a casual game in which the player takes on the role of a Brazilian mother who runs a tavern. During the day, the goal is to prepare dishes, serve drinks, and manage aspects such as timing, inventory, and kitchen organization. At night, the dynamics change: the player explores a dungeon in search of ingredients to be used the following day, dealing with inventory limitations and strategic resource planning.'
        },
        responsibilities: {
            pt: ['Planejamento', 'Prototipação', 'Programação', 'Game Design'],
            en: ['Planning', 'Prototyping', 'Programming', 'Game Design']
        },
        technologies: [
            { name: 'Unity', icon: 'images/Unity--Streamline-Font-Awesome.svg' },
            { name: 'Github', icon: 'images/Github--Streamline-Unicons.svg'}
        ],
        whatIDid: {
            pt: 'Sou o principal responsável pela programação do projeto, atuando no desenvolvimento completo dos sistemas do jogo. Isso inclui a implementação das mecânicas do personagem (movimentação, combate, interação, entre outras), das funcionalidades da taverna (preparo de alimentos, gerenciamento de estoque, corte de itens, atendimento aos clientes, etc.) e dos sistemas da dungeon (spawn de inimigos, inteligência artificial, sistema de morte, entre outros).\n Além disso, também desempenho um papel ativo no Game Design, definindo a organização dos elementos em cena, posicionamento de itens, distribuição e comportamento dos inimigos, bem como o fluxo geral da experiência do jogador.',
            en: "I am primarily responsible for the project's programming, handling the full development of the game's systems. This includes implementing character mechanics (movement, combat, interaction, among others), tavern features (food preparation, inventory management, item crafting, customer service, etc.), and dungeon systems (enemy spawning, artificial intelligence, death mechanics, among others). In addition, I also play an active role in game design, defining the organization of on-screen elements, item placement, enemy distribution and behavior, as well as the overall flow of the player experience."
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
            pt: 'Essa arte foi criada para a identidade visual do jogo Sirin. Fiquei responsável por desenvolver a logo pensando diretamente na premissa do jogo, buscando transmitir sua essência de forma clara já no primeiro contato.',
            en: 'This artwork was created for the visual identity of the game Sirin. I was responsible for designing the logo with the game’s premise in mind, aiming to clearly convey its essence from the very first glance.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Todo o processo foi feito em pixel art no Aseprite, onde trabalhei a composição e os elementos visuais com foco em cartas e baralho, que são centrais para a proposta do jogo. A ideia foi criar algo que não fosse apenas estético, mas que também comunicasse o tema e ajudasse a reforçar a identidade do projeto.',
            en: 'The entire process was done in pixel art using Aseprite, where I worked on the composition and visual elements with a focus on cards and a deck, which are central to the game’s concept. The idea was to create something that wasn’t just aesthetically pleasing, but that also communicated the theme and helped reinforce the project’s identity.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: 'https://www.artstation.com/artwork/0lBG2G'
    },
    'arte-2': {
        description: {
            pt: 'Esta arte foi desenvolvida para o Inktober 2025, a partir do tema “bigode”. Busquei uma abordagem diferenciada, indo além da representação tradicional, criando uma poção em formato de bigode como forma de explorar uma solução visual mais criativa e menos convencional.',
            en: 'This artwork was created for Inktober 2025, based on the theme “mustache.” I sought a unique approach, going beyond traditional depictions by creating a mustache-shaped potion as a way to explore a more creative and less conventional visual solution.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável por todo o conceito e execução da peça, trabalhando com maior liberdade na construção das formas, no posicionamento dos pixels e, principalmente, na escolha das cores. A representação de um material como vidro, contendo líquido em seu interior, exigiu atenção especial para transmitir profundidade, transparência e leitura visual de forma eficiente dentro das limitações da pixel art.',
            en: 'I was responsible for the entire concept and execution of the piece, working with greater freedom in the construction of shapes, the placement of pixels, and, above all, the choice of colors. The representation of a material like glass, containing liquid inside, required special attention to effectively convey depth, transparency, and visual clarity within the limitations of pixel art.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: 'https://www.instagram.com/p/DPR1vnijzA2/?img_index=1'
    },
    'arte-3': {
        description: {
            pt: 'Essa arte faz parte da cutscene de introdução do jogo Sirin, responsável por apresentar o início da narrativa. A cena mostra a personagem indo dormir e, durante o sonho, recebendo uma carta, elemento que se conecta diretamente com a mecânica principal do jogo.',
            en: 'This artwork is part of the introductory cutscene in the game Sirin, which sets the stage for the story. The scene shows the character going to sleep and, during her dream, receiving a letter—an element that ties directly into the game’s core mechanics.'
        },
        responsibilities: {
            pt: ['Arte'],
            en: ['Art']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Desenvolvi o design da mão e da carta, adaptando um modelo existente para uma escala maior e com mais detalhe. Toda a cutscene foi produzida no Aseprite, seguindo a paleta de cores definida pela direção de arte, garantindo consistência com o restante do jogo.',
            en: 'I developed the design for the hand and the letter, adapting an existing model to a larger scale with greater detail. The entire cutscene was produced in Aseprite, following the color palette defined by the art direction, ensuring consistency with the rest of the game.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: '#'
    },
    'arte-4': {
        description: {
            pt: 'Essa arte foi feita para compor o cenário e a jogabilidade de Toninho & Tinho, mais especificamente as áreas de plantação onde os personagens interagem e coletam itens.',
            en: "This artwork was created to enhance the game's setting and gameplay in Toninho & Tinho, and was responsible for designing the farm areas that the characters use to progress and collect resources."
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'A criação foi baseada no GDD do projeto, que definia quais elementos estariam presentes no jogo. A partir disso, desenvolvi as plantações buscando referência em elementos reais, com o objetivo de trazer mais identificação visual. Também segui a paleta de cores definida pelo grupo, mantendo a consistência com o restante do projeto.',
            en: 'Based on the project’s GDD, I designed the visual elements of the plantations using the previously defined items, drawing inspiration from real crops to ensure greater visual coherence. The entire process was carried out in accordance with the color palette established by the team, ensuring aesthetic consistency with the rest of the game.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: 'https://www.artstation.com/artwork/eRLg5b'
    },
    'arte-5': {
        description: {
            pt: 'Esta arte foi desenvolvida para representar os itens comercializados na barraquinha do Arraial de Toninho & Tinho, com foco em transmitir a essência das festas juninas dentro do jogo. Em conjunto com a equipe, definimos as comidas típicas mais representativas para compor essa experiência.',
            en: 'This artwork was created to depict the items sold at the Arraial de Toninho & Tinho stall, with a focus on capturing the essence of the June festivals within the game. Working with the team, we selected the most representative traditional foods to bring this experience to life.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'A partir dessa definição, fui responsável pela criação do conceito visual das peças, buscando o máximo de fidelidade possível por meio de referências reais. O desenvolvimento considerou uma paleta de cores alinhada à temática do jogo, garantindo coerência estética e reforçando a identidade visual proposta.',
            en: 'Based on this definition, I was responsible for creating the visual concept for the assets, striving for the highest possible fidelity using real-world references. The development incorporated a color palette aligned with the game’s theme, ensuring aesthetic consistency and reinforcing the proposed visual identity.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: 'https://www.artstation.com/artwork/eRLg5b'
    },
    'arte-6': {
        description: {
            pt: 'Esta arte pessoal consiste em uma coleção de retratos em pixel art, explorando diferentes personagens com foco em expressões, cores e variações de estilo. A composição apresenta uma grade organizada de rostos, cada um com identidade visual própria, trabalhando contraste, simplicidade de formas e leitura imediata, características essenciais para pixel art em baixa resolução. \n O projeto foi desenvolvido com base em personagens já existentes, principalmente inspirados no universo Sanrio, adaptados para um estilo próprio em pixel art. A proposta foi reinterpretar esses personagens mantendo seus traços marcantes, ao mesmo tempo em que são integrados a uma identidade visual unificada.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável por toda a concepção e execução da arte, desenvolvendo cada personagem individualmente dentro de uma limitação de espaço e resolução. Trabalhei diretamente na construção das expressões faciais, escolha de paleta e posicionamento estratégico dos pixels para garantir clareza visual e reconhecimento imediato.\n Também explorei a adaptação de personagens já conhecidos para um formato padronizado, equilibrando fidelidade visual e estilização. O foco principal foi o aprimoramento de técnicas de pixel art, especialmente em áreas como redução de formas, uso eficiente de cores e criação de identidade visual em espaços reduzidos.',
            en: 'I created the visual concept, refined forms, and finalized the color palette.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: 'https://www.artstation.com/artwork/DLDZ4e'
    },
    'arte-7': {
        description: {
            pt: 'Esta arte pessoal apresenta uma composição rica em elementos naturais, com foco em um campo de flores densamente detalhado, explorando cores vibrantes e variedade de espécies. A cena trabalha contraste entre luz e sombra, além de sobreposição de elementos, criando profundidade e sensação de abundância visual.\n A proposta da peça é explorar um ambiente mais orgânico e vivo, destacando a diversidade de formas e cores presentes na natureza, ao mesmo tempo em que mantém uma estilização própria. A composição também sugere uma leve fragmentação do solo, adicionando interesse visual e narrativa ao cenário.',
            en: 'Art study focused on composition and visual identity.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável pela concepção e execução completa da arte, desenvolvendo toda a composição, escolha de elementos e direção visual. Trabalhei com uma grande variedade de cores e formas para representar diferentes tipos de flores, buscando equilíbrio entre detalhamento e legibilidade.\n Também explorei técnicas de sobreposição e variação de escala para criar profundidade, além de aplicar atenção especial à iluminação e contraste. O foco principal foi o estudo de ambientes naturais, composição visual e uso avançado de cor, visando enriquecer o impacto estético da cena.',
            en: 'I created the visual concept, refined forms, and finalized the color palette.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: '#'
    },
    'arte-8': {
        description: {
            pt: 'Esta arte pessoal apresenta uma composição rica em elementos naturais, com foco em um campo de flores densamente detalhado, explorando cores vibrantes e variedade de espécies. A cena trabalha contraste entre luz e sombra, além de sobreposição de elementos, criando profundidade e sensação de abundância visual.\n A proposta da peça é explorar um ambiente mais orgânico e vivo, destacando a diversidade de formas e cores presentes na natureza, ao mesmo tempo em que mantém uma estilização própria. A composição também sugere uma leve fragmentação do solo, adicionando interesse visual e narrativa ao cenário.',
            en: 'Art study focused on composition and visual identity.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável pela concepção e execução completa da arte, desenvolvendo toda a composição, escolha de elementos e direção visual. Trabalhei com uma grande variedade de cores e formas para representar diferentes tipos de flores, buscando equilíbrio entre detalhamento e legibilidade.\n Também explorei técnicas de sobreposição e variação de escala para criar profundidade, além de aplicar atenção especial à iluminação e contraste. O foco principal foi o estudo de ambientes naturais, composição visual e uso avançado de cor, visando enriquecer o impacto estético da cena.',
            en: 'I created the visual concept, refined forms, and finalized the color palette.'
        },
        playLabel: {
            pt: 'Ver arte',
            en: 'View art'
        },
        playUrl: '#'
    },
    'arte-9': {
        description: {
            pt: 'Esta arte pessoal apresenta uma composição rica em elementos naturais, com foco em um campo de flores densamente detalhado, explorando cores vibrantes e variedade de espécies. A cena trabalha contraste entre luz e sombra, além de sobreposição de elementos, criando profundidade e sensação de abundância visual.\n A proposta da peça é explorar um ambiente mais orgânico e vivo, destacando a diversidade de formas e cores presentes na natureza, ao mesmo tempo em que mantém uma estilização própria. A composição também sugere uma leve fragmentação do solo, adicionando interesse visual e narrativa ao cenário.',
            en: 'Art study focused on composition and visual identity.'
        },
        responsibilities: {
            pt: ['Arte', 'Direção Visual'],
            en: ['Art', 'Visual Direction']
        },
        technologies: [
            { name: 'Aseprite', icon: 'images/Aseprite--Streamline-Simple-Icons.svg' }
        ],
        whatIDid: {
            pt: 'Fui responsável pela concepção e execução completa da arte, desenvolvendo toda a composição, escolha de elementos e direção visual. Trabalhei com uma grande variedade de cores e formas para representar diferentes tipos de flores, buscando equilíbrio entre detalhamento e legibilidade.\n Também explorei técnicas de sobreposição e variação de escala para criar profundidade, além de aplicar atenção especial à iluminação e contraste. O foco principal foi o estudo de ambientes naturais, composição visual e uso avançado de cor, visando enriquecer o impacto estético da cena.',
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
        const playUrl = typeof modalContent.playUrl === 'string' ? modalContent.playUrl.trim() : '';
        const hasPlayableUrl = !modalContent.comingSoon && playUrl !== '' && playUrl !== '#';

        projectModalTitle.textContent = cardTitle ? cardTitle.textContent : getTranslation('modalTitleFallback');
        projectModalDescription.textContent = localizedDescription;
        projectModalWork.textContent = localizedWhatIDid;
        projectModalLink.textContent = localizedPlayLabel || getTranslation('modalPlayDefault');

        if (hasPlayableUrl) {
            projectModalLink.href = playUrl;
            projectModalLink.classList.remove('project-modal__play--disabled');
            projectModalLink.removeAttribute('aria-disabled');
            projectModalLink.removeAttribute('tabindex');
        } else {
            projectModalLink.removeAttribute('href');
            projectModalLink.classList.add('project-modal__play--disabled');
            projectModalLink.setAttribute('aria-disabled', 'true');
            projectModalLink.setAttribute('tabindex', '-1');
        }

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