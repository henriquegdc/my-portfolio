function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = loader.querySelector('.loader-progress-bar');
    const loaderPercent = loader.querySelector('.loader-percentage');
    
    if (!loader || !progressBar) return;
    
    let progress = 0;
    const terminalLines = loader.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 200);
    });
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: loader,
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeInOutQuad',
                        complete: () => {
                            loader.classList.add('hidden');
                            initPageAnimations();
                        }
                    });
                } else {
                    loader.classList.add('hidden');
                    initPageAnimations();
                }
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        if (loaderPercent) {
            loaderPercent.textContent = Math.floor(progress) + '%';
        }
    }, 80);
}

function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initParticles() {
    const container = document.getElementById('hackParticles');
    if (!container) return;
    
    const particleCount = 30;
    const chars = ['0', '1', '{', '}', '[', ']', '<', '>', '/', '*'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = chars[Math.floor(Math.random() * chars.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const header = document.getElementById('header');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                const sections = document.querySelectorAll('section[id]');
                const scrollPos = window.scrollY + 200;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initPageAnimations() {
    setTimeout(() => {
        initHeroAnimations();
        initScrollAnimations();
    }, 300);
}

function initHeroAnimations() {
    if (typeof anime === 'undefined') return;
    
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        anime({
            targets: word,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: index * 200,
            duration: 1000,
            easing: 'easeOutExpo'
        });
    });
    
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        anime({
            targets: badge,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: 300,
            duration: 800,
            easing: 'easeOutBack'
        });
    }
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        anime({
            targets: subtitle,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 800,
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    const description = document.querySelector('.hero-description');
    if (description) {
        anime({
            targets: description,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 1000,
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        anime({
            targets: statCards,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100, {start: 1200}),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    const buttons = document.querySelectorAll('.hero-buttons .btn');
    if (buttons.length > 0) {
        anime({
            targets: buttons,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(100, {start: 1800}),
            duration: 800,
            easing: 'easeOutBack'
        });
    }
    
    const monitor = document.querySelector('.security-monitor');
    if (monitor) {
        anime({
            targets: monitor,
            opacity: [0, 1],
            scale: [0.9, 1],
            rotate: [5, 0],
            delay: 1000,
            duration: 1200,
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    const floatIcons = document.querySelectorAll('.float-icon');
    if (floatIcons.length > 0) {
        anime({
            targets: floatIcons,
            opacity: [0, 1],
            scale: [0, 1],
            delay: anime.stagger(150, {start: 1500}),
            duration: 800,
            easing: 'easeOutBack'
        });
    }
}

function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.utils.toArray('.section').forEach(section => {
                const header = section.querySelector('.section-header');
                if (header) {
                    gsap.from(header, {
                        opacity: 0,
                        y: -50,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    });
                }
            });
            
            gsap.utils.toArray('.service-card, .cert-card, .feature-card, .contact-card').forEach(card => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        } catch (e) {
            console.log('GSAP ScrollTrigger not available, using fallback');
            initScrollAnimationsFallback();
        }
    } else {
        initScrollAnimationsFallback();
    }
}

function initScrollAnimationsFallback() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const animateElements = document.querySelectorAll('.service-card, .cert-card, .feature-card, .contact-card, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count') || 0);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: { value: 0 },
                            value: target,
                            duration: 2000,
                            easing: 'easeOutExpo',
                            update: function(anim) {
                                stat.textContent = Math.floor(anim.animatables[0].target.value);
                            }
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

function initParallax() {
    const monitor = document.querySelector('.security-monitor');
    const floatIcons = document.querySelectorAll('.float-icon');
    
    if (!monitor) return;
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('.hero');
                const heroHeight = heroSection.offsetHeight;
                
                if (scrolled < heroHeight) {
                    const parallaxSpeed = 0.2;
                    const offset = scrolled * parallaxSpeed;
                    
                    if (monitor) {
                        monitor.style.transform = `translateY(${offset}px)`;
                    }
                    
                    floatIcons.forEach((icon, index) => {
                        const speed = 0.15 + (index * 0.05);
                        const iconOffset = scrolled * speed;
                        icon.style.transform = `translateY(${iconOffset}px)`;
                    });
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    let useGSAP = false;
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);
            useGSAP = true;
            
            sections.forEach((section) => {
                const bg = section.querySelector('.section-bg');
                if (bg) {
                    gsap.set(bg, { y: 0, clearProps: 'transform' });
                    
                    gsap.to(bg, {
                        y: -20,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                            invalidateOnRefresh: true,
                            onLeave: () => {
                                gsap.set(bg, { y: 0, clearProps: 'transform' });
                            },
                            onEnterBack: () => {
                                gsap.set(bg, { y: 0, clearProps: 'transform' });
                            },
                            onUpdate: (self) => {
                                if (self.progress === 0) {
                                    gsap.set(bg, { y: 0, clearProps: 'transform' });
                                } else if (self.progress === 1) {
                                    gsap.set(bg, { y: -20 });
                                }
                            }
                        }
                    });
                }
            });
            
            const scanLine = document.querySelector('.scan-line');
            if (scanLine) {
                gsap.to(scanLine, {
                    y: window.innerHeight * 2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        } catch (e) {
            console.log('GSAP ScrollTrigger error:', e);
            useGSAP = false;
        }
    }
    
    if (!useGSAP) {
        let ticking = false;
        
        function updateParallax() {
            sections.forEach(section => {
                const bg = section.querySelector('.section-bg');
                if (bg) {
                    const rect = section.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const sectionHeight = rect.height;
                    
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const viewportProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
                        const progress = Math.max(0, Math.min(1, viewportProgress));
                        const maxOffset = 20;
                        const offset = progress * maxOffset;
                        bg.style.transform = `translateY(${offset}px)`;
                    } else if (rect.bottom < 0 || rect.top > windowHeight) {
                        bg.style.transform = 'translateY(0)';
                    }
                }
            });
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
        
        updateParallax();
        
        window.addEventListener('resize', () => {
            updateParallax();
        }, { passive: true });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                const bg = entry.target.querySelector('.section-bg');
                if (bg && !useGSAP) {
                    bg.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    window.addEventListener('load', () => {
        sections.forEach(section => {
            const bg = section.querySelector('.section-bg');
            if (bg) {
                bg.style.transform = 'translateY(0)';
            }
        });
    });
}

function initLanguage() {
    const dirToggle = document.getElementById('dirToggle');
    
    const translations = [
        { pt: "Início", en: "Home" },
        { pt: "Projetos", en: "Projects" },
        { pt: "Sobre", en: "About" },
        { pt: "Feedbacks", en: "Feedbacks" },
        { pt: "Certificações", en: "Certifications" },
        { pt: "Contato", en: "Contact" },
        { pt: "Idioma", en: "Language" },
        { pt: " Desenvolvedor Full-Stack", en: " Full-Stack Developer" },
        { pt: "Desenvolvedor Full-Stack", en: "Full-Stack Developer" },
        { pt: "CRIANDO", en: "BUILDING" },
        { pt: "EXPERIÊNCIAS", en: "DIGITAL" },
        { pt: "DIGITAIS", en: "EXPERIENCES" },
        { pt: "Desenvolvimento Full-Stack", en: "Full-Stack Development" },
        { pt: "Design de API", en: "API Design" },
        { pt: "Arquitetura de Software", en: "Software Architecture" },
        { pt: "Engenheiro de Software focado na construção de arquiteturas robustas e aplicações web de alto desempenho, desde a infraestrutura de backend até interfaces dinâmicas e responsivas.", en: "Software Engineer focused on building robust architectures and high-performance web applications, from backend infrastructure to dynamic and responsive interfaces." },
        { pt: "Sistemas Protegidos", en: "Systems Secured" },
        { pt: "Anos de Experiência", en: "Years Experience" },
        { pt: "Clientes Protegidos", en: "Clients Protected" },
        { pt: "Entre em contato", en: "Contact Me" },
        { pt: "Ver Serviços", en: "View Services" },
        { pt: "Teste de Intrusão", en: "Network Penetration" },
        { pt: "Avaliação avançada de segurança de rede e identificação de vulnerabilidades", en: "Advanced network security assessment and vulnerability identification" },
        { pt: "Sistemas", en: "Systems" },
        { pt: "Sucesso", en: "Success" },
        { pt: "Análise de Criptografia", en: "Encryption Analysis" },
        { pt: "Avaliação de protocolos de criptografia e implementações criptográficas", en: "Evaluating encryption protocols and cryptographic implementations" },
        { pt: "Nível", en: "Level" },
        { pt: "Seguro", en: "Secure" },
        { pt: "Varredura de Vulnerabilidades", en: "Vulnerability Scanning" },
        { pt: "Sistemas abrangentes de varredura de segurança e detecção de ameaças", en: "Comprehensive security scanning and threat detection systems" },
        { pt: "Varreduras", en: "Scans" },
        { pt: "Precisão", en: "Accuracy" },
        { pt: "Resposta a Incidentes", en: "Incident Response" },
        { pt: "Resposta rápida e mitigação de violações de segurança", en: "Rapid response and mitigation of security breaches" },
        { pt: "Suporte", en: "Support" },
        { pt: "Resposta", en: "Response" },
        { pt: "Segurança de Código", en: "Code Security" },
        { pt: "Testes de segurança de aplicações e práticas de codificação segura", en: "Application security testing and secure coding practices" },
        { pt: "Profissional Especialista", en: "Expert Professional" },
        { pt: "Com mais de uma década de experiência em cibersegurança, sou especialista em proteger organizações contra ameaças cibernéticas sofisticadas. Minha experiência abrange testes de invasão, avaliação de vulnerabilidades, resposta a incidentes e design de arquitetura de segurança para sistemas empresariais.", en: "With over a decade of experience in cybersecurity, I specialize in protecting organizations from sophisticated cyber threats. My expertise spans penetration testing, vulnerability assessment, incident response, and security architecture design for enterprise-level systems." },
        { pt: "Hacking Ético", en: "Ethical Hacking" },
        { pt: "Hacker ético certificado com experiência em testes de invasão e avaliação de vulnerabilidades.", en: "Certified ethical hacker with expertise in penetration testing and vulnerability assessment." },
        { pt: "Segurança de Rede", en: "Network Security" },
        { pt: "Configuração avançada de segurança de rede e gerenciamento de firewall.", en: "Advanced network security configuration and firewall management." },
        { pt: "Arquitetura de Segurança", en: "Security Architecture" },
        { pt: "Projetando e implementando arquiteturas de segurança robustas para sistemas corporativos.", en: "Designing and implementing robust security architectures for enterprise systems." },
        { pt: "Monitoramento 24/7 e resposta rápida a incidentes e violações de segurança.", en: "24/7 monitoring and rapid response to security incidents and breaches." },
        { pt: "Teste de Invasão", en: "Penetration Testing" },
        { pt: "Identifique vulnerabilidades antes que os invasores as explorem através de testes de segurança abrangentes.", en: "Identify vulnerabilities before attackers exploit them through comprehensive security testing." },
        { pt: "Teste de Aplicação Web", en: "Web Application Testing" },
        { pt: "Engenharia Social", en: "Social Engineering" },
        { pt: "Segurança Física", en: "Physical Security" },
        { pt: "Avaliação de Vulnerabilidades", en: "Vulnerability Assessment" },
        { pt: "Avaliação sistemática de fraquezas de segurança com análise de risco abrangente.", en: "Systematic evaluation of security weaknesses with comprehensive risk analysis." },
        { pt: "Varredura Automatizada", en: "Automated Scanning" },
        { pt: "Teste Manual", en: "Manual Testing" },
        { pt: "Análise de Risco", en: "Risk Analysis" },
        { pt: "Planos de Correção", en: "Remediation Plans" },
        { pt: "Consultoria de Segurança", en: "Security Consulting" },
        { pt: "Orientação estratégica de segurança para construir mecanismos de defesa robustos e arquitetura personalizada.", en: "Strategic security guidance to build robust defense mechanisms and custom architecture." },
        { pt: "Desenvolvimento de Políticas", en: "Policy Development" },
        { pt: "Auditorias de Conformidade", en: "Compliance Audits" },
        { pt: "Programas de Treinamento", en: "Training Programs" },
        { pt: "Saiba Mais", en: "Learn More" },
        { pt: "Hacker Ético Certificado", en: "Certified Ethical Hacker" },
        { pt: "Profissional Certificado em Segurança de Sistemas de Informação", en: "Certified Information Systems Security Professional" },
        { pt: "Profissional Certificado em Segurança Ofensiva", en: "Offensive Security Certified Professional" },
        { pt: "Global - Remoto Disponível", en: "Global - Remote Available" },
        { pt: "Nome", en: "Name" },
        { pt: "E-mail", en: "Email" },
        { pt: "Telefone", en: "Phone" },
        { pt: "Localização", en: "Location" },
        { pt: "Assunto", en: "Subject" },
        { pt: "Mensagem", en: "Message" },
        { pt: "Enviar Mensagem Segura", en: "Send Secure Message" },
        { pt: "© 2026 Portfolio - Exemplo.", en: "© 2026 Portfolio - Example." },
        { pt: "INICIALIZAÇÃO DO PROCESSO DE BUILD", en: "BUILD PROCESS INITIALIZATION" },
        { pt: "[INFO] Compilando módulos...", en: "[INFO] Compiling modules..." },
        { pt: "[INFO] Construindo backend Java/Spring Boot robusto: ", en: "[INFO] Building robust Java/Spring Boot backend: " },
        { pt: "[INFO] Otimizando assets do frontend Angular: ", en: "[INFO] Optimizing Angular frontend assets: " },
        { pt: "[SUCESSO] Sistema pronto. Iniciando aplicação.", en: "[SUCCESS] System ready. Launching application." },
        { pt: "ATIVO", en: "ACTIVE" },
        { pt: "ONLINE", en: "ONLINE" },
        { pt: "Painel de Segurança", en: "SECURITY DASHBOARD" },
        { pt: "Status do Firewall", en: "Firewall Status" },
        { pt: "Detecção de Ameaças", en: "Threat Detection" },
        { pt: "MONITORANDO", en: "MONITORING" },
        { pt: "Nível de Criptografia", en: "Encryption Level" }
    ];

    let currentLang = localStorage.getItem('lang') || 'en';

    function translatePage(lang) {
        const elements = document.querySelectorAll('span, p, h1, h2, h3, h4, a, label, div');
        
        elements.forEach(el => {
            if (el.childNodes.length > 0) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        let text = node.textContent.trim();
                        if (text) {
                            const match = translations.find(t => t.pt === text || t.en === text);
                            if (match) {
                                node.textContent = node.textContent.replace(text, match[lang]);
                            }
                        }
                    }
                });
            }
        });
        
        const dirText = dirToggle?.querySelector('.dir-text');
        if (dirText) dirText.textContent = lang === 'pt' ? 'EN' : 'PT-BR';
    }

    translatePage(currentLang);

    if (dirToggle) {
        dirToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'pt' : 'en';
            localStorage.setItem('lang', currentLang);
            translatePage(currentLang);
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: dirToggle,
                    rotate: [0, 360],
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
            }
        });
    }
}

function initHacksSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const sliderProgress = document.getElementById('sliderProgress');
    const sliderIndicators = document.getElementById('sliderIndicators');
    const sliderViewport = document.querySelector('.slider-viewport');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const slides = sliderTrack.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isTransitioning = false;
    
    if (totalSlidesEl) totalSlidesEl.textContent = String(totalSlides).padStart(2, '0');
    
    function createIndicators() {
        if (!sliderIndicators) return;
        sliderIndicators.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'slider-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            sliderIndicators.appendChild(indicator);
        });
    }
    
    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const isRTL = document.documentElement.dir === 'rtl';
        const translateX = isRTL ? currentSlide * 100 : -currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        const viewportWidth = sliderViewport ? sliderViewport.offsetWidth : window.innerWidth;
        slides.forEach((slide) => {
            slide.style.width = `${viewportWidth}px`;
        });
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        if (currentSlideEl) {
            currentSlideEl.textContent = String(currentSlide + 1).padStart(2, '0');
        }
        
        if (sliderProgress) {
            sliderProgress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }
        
        if (sliderIndicators) {
            const indicators = sliderIndicators.querySelectorAll('.slider-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }
    
    function resizeSlider() {
        if (sliderViewport && sliderTrack) {
            const viewportWidth = sliderViewport.offsetWidth;
            slides.forEach((slide) => {
                slide.style.width = `${viewportWidth}px`;
            });
            updateSlider();
        }
    }
    
    window.addEventListener('resize', resizeSlider);
    
    function goToSlide(index) {
        if (isTransitioning || index === currentSlide || index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
    
    let autoSlideInterval;
    function startAutoSlide() {
        if (window.innerWidth <= 768) return;
        if (autoSlideInterval) return;
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    if (sliderViewport) {
        sliderViewport.addEventListener('mouseenter', stopAutoSlide);
        sliderViewport.addEventListener('mouseleave', startAutoSlide);
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    if (sliderViewport) {
        sliderViewport.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        }, { passive: true });
        
        sliderViewport.addEventListener('touchmove', (e) => {
            if (isDragging) {
                touchEndX = e.touches[0].clientX;
            }
        }, { passive: true });
        
        sliderViewport.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            touchStartX = 0;
            touchEndX = 0;
        }, { passive: true });
    }
    
    window.addEventListener('resize', () => {
        stopAutoSlide();
        if (window.innerWidth > 768) {
            startAutoSlide();
        }
    });
    
    createIndicators();
    updateSlider();
    startAutoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initMatrix();
    initParticles();
    initNavigation();
    initStats();
    initMobileMenu();
    initParallax();
    initScrollEffects();
    initLanguage(); 
    initHacksSlider();
});

function initEmailJS() {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}


async function enviarEmail({ nome, email, mensagem }) {
  const templateParams = {
    from_name: nome,
    from_email: email,
    message: mensagem,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams
    );
    console.log("Email enviado com sucesso!", response.status, response.text);
    return { sucesso: true, mensagem: "Email enviado com sucesso!" };
  } catch (erro) {
    console.error("Erro ao enviar email:", erro);
    return { sucesso: false, mensagem: "Erro ao enviar. Tente novamente." };
  }
}

const EMAILJS_CONFIG = {
  serviceID: "service_y9s2jn5",
  templateID: "template_2dyxo09",
  publicKey: "KH4L1BXtO99hWbZjI",
};


emailjs.init(EMAILJS_CONFIG.publicKey);


const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector("button[type=submit]");
    const span = btn.querySelector("span"); 
    
    btn.disabled = true;
    span.textContent = "Enviando...";

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceID, 
        EMAILJS_CONFIG.templateID, 
        {
          from_name: document.getElementById("nome").value,
          from_email: document.getElementById("email").value,
          subject: document.getElementById("assunto").value,
          message: document.getElementById("mensagem").value,
        }
      );
      
      alert("Mensagem enviada com sucesso!");
      contactForm.reset();
    } catch (err) {
      console.error("Erro detalhado do EmailJS:", err); 
      alert("Erro ao enviar. Tente novamente.");
    }

    btn.disabled = false;
    span.textContent = "Send Secure Message";
  });
}