document.addEventListener('DOMContentLoaded', () => {
    const livroFechado = document.querySelector('.livro-fechado');
    const alcaLivro = document.querySelector('.alca-livro');
    const capaLivro = document.querySelector('.capa-livro');
    const bookContainer = document.querySelector('.book-container');
    
    alcaLivro.addEventListener('click', () => {
        livroFechado.classList.add('aberto');
        
        // After book opens, transition to main interface
        setTimeout(() => {
            livroFechado.style.display = 'none';
            capaLivro.classList.remove('hidden');
        }, 1500);
    });

    const abrirLivroBtn = document.getElementById('abrir-livro');
    
    abrirLivroBtn.addEventListener('click', () => {
        capaLivro.style.opacity = '0';
        capaLivro.style.visibility = 'hidden';
        bookContainer.classList.remove('hidden');
    });

    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');
    
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    let currentTabIndex = 0;

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Modified sidebar tab navigation
    sidebarTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Hide all pages first
            pages.forEach(page => page.classList.add('hidden'));
            
            // Default behavior for different tabs
            switch(tabName) {
                case 'livro':
                    // Show first page in book section (História)
                    const historiaPage = document.getElementById('historia-1');
                    historiaPage.classList.remove('hidden');
                    prevPageBtn.style.display = 'block';
                    nextPageBtn.style.display = 'block';
                    currentTabIndex = Array.from(pages).indexOf(historiaPage);
                    break;
                
                case 'criadores':
                case 'galeria':
                case 'configuracoes':
                    // Hide page navigation for these tabs
                    prevPageBtn.style.display = 'none';
                    nextPageBtn.style.display = 'none';
                    
                    // Show corresponding page
                    const targetPage = document.getElementById(tabName);
                    if (targetPage) {
                        targetPage.classList.remove('hidden');
                    }
                    break;
            }
            
            // Close sidebar
            sidebar.classList.remove('open');
        });
    });

    // Create audio element for page flip sound
    const pageFlipAudio = new Audio('/page-flip1-178322.mp3');

    // Modify the page change function to include sound effect
    function changePage(direction) {
        // Only allow navigation for historia section
        const historiaPages = [
            document.getElementById('historia-1'), 
            document.getElementById('historia-2'), 
            document.getElementById('historia-3'), 
            document.getElementById('historia-4'), 
            document.getElementById('historia-5'),
            document.getElementById('historia-fim')
        ].filter(page => page !== null);

        if (historiaPages.length > 0) {
            // Play page flip sound
            pageFlipAudio.currentTime = 0; // Reset to start
            pageFlipAudio.play().catch(error => {
                console.error('Error playing page flip sound:', error);
            });

            // Find currently visible page in historia section
            const currentIndex = historiaPages.findIndex(page => !page.classList.contains('hidden'));
            
            // Calculate next index with wrap-around
            const nextIndex = (currentIndex + direction + historiaPages.length) % historiaPages.length;

            // Hide all pages
            historiaPages.forEach(page => page.classList.add('hidden'));
            
            // Show next page
            historiaPages[nextIndex].classList.remove('hidden');
        }
    }

    // Only enable page controls for história section
    prevPageBtn.addEventListener('click', () => changePage(-1));
    nextPageBtn.addEventListener('click', () => changePage(1));

    const dionMusicIcon = document.createElement('i');
    dionMusicIcon.classList.add('fas', 'fa-play-circle', 'music-play-icon');
    dionMusicIcon.setAttribute('data-audio', 'videoplayback1');

    const arthurMusicIcon = document.createElement('i');
    arthurMusicIcon.classList.add('fas', 'fa-play-circle', 'music-play-icon');
    arthurMusicIcon.setAttribute('data-audio', 'headlock');

    document.querySelectorAll('.criador-music').forEach(musicElement => {
        const musicText = musicElement.querySelector('span').textContent;
        if (musicText === 'Write This Down') {
            musicElement.appendChild(dionMusicIcon);
        }
        if (musicText === 'Headlock') {
            musicElement.appendChild(arthurMusicIcon);
        }
    });

    const audioElements = {
        'videoplayback1': new Audio('/videoplayback (1).m4a'),
        'headlock': new Audio('/deadlock.mp3')
    };

    document.querySelectorAll('.music-play-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const audioKey = this.getAttribute('data-audio');
            const audio = audioElements[audioKey];
            
            if (audio) {
                // Toggle playing state
                if (!audio.paused) {
                    // If currently playing, pause and reset
                    audio.pause();
                    this.classList.remove('playing', 'spinning');
                    this.style.transform = 'scale(1) rotate(0deg)';
                    return;
                }

                // Stop all other audio before playing
                Object.values(audioElements).forEach(a => {
                    a.pause();
                    // Reset all other icons
                    document.querySelectorAll('.music-play-icon').forEach(otherIcon => {
                        otherIcon.classList.remove('playing', 'spinning');
                        otherIcon.style.transform = 'scale(1) rotate(0deg)';
                    });
                });
                
                // Play audio
                audio.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
                
                // Add playing and spinning classes
                this.classList.add('playing', 'spinning');
                
                audio.onended = () => {
                    this.classList.remove('playing', 'spinning');
                    this.style.transform = 'scale(1) rotate(0deg)';
                };
            }
        });
    });

    // Settings Page Functionality
    const temaBotoes = document.querySelectorAll('.tema-btn');
    const animacaoSlider = document.querySelector('.animacao-slider');
    const efeitosToggle = document.querySelector('.efeitos-toggle');
    const previewArea = document.querySelector('.preview-area');

    const temas = {
        classico: {
            background: 'linear-gradient(135deg, #f5f0e1, #e6dbd0, #d7cfc4)',
            textColor: '#3a2c1a',
            accentColor: '#8b6b4e',
            pageBackground: 'linear-gradient(135deg, #f5f0e1, #e6dbd0)',
            sidebarBackground: 'linear-gradient(135deg, rgba(245, 240, 225, 0.9), rgba(230, 219, 208, 0.9))',
            buttonBackground: '#5a3e2a',
            buttonText: 'white'
        },
        escuro: {
            background: 'linear-gradient(135deg, #000000, #121212, #1e1e1e)',
            textColor: '#e0e0e0',
            accentColor: '#bb86fc',
            pageBackground: 'linear-gradient(135deg, #121212, #1e1e1e)',
            sidebarBackground: 'linear-gradient(135deg, rgba(18, 18, 18, 0.9), rgba(30, 30, 30, 0.9))',
            buttonBackground: 'black',
            buttonText: 'white'
        },
        moderno: {
            background: 'linear-gradient(135deg, #f0f4f8, #dae3f0, #cbd5e1)',
            textColor: '#1e293b',
            accentColor: '#3b82f6',
            pageBackground: 'linear-gradient(135deg, #f0f4f8, #dae3f0)',
            sidebarBackground: 'linear-gradient(135deg, rgba(240, 244, 248, 0.9), rgba(218, 227, 240, 0.9))',
            buttonBackground: '#3b82f6',
            buttonText: 'white'
        }
    };

    function aplicarTema(tema) {
        const { 
            background, 
            textColor, 
            accentColor, 
            pageBackground, 
            sidebarBackground, 
            buttonBackground, 
            buttonText 
        } = temas[tema];

        document.body.style.background = background;
        document.body.style.color = textColor;

        const book = document.querySelector('.book');
        if (book) {
            book.style.background = pageBackground;
        }

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.background = sidebarBackground;
            sidebar.style.color = textColor;

            // New code to handle sidebar navigation title color
            const sidebarNavTitle = sidebar.querySelector('h3');
            if (sidebarNavTitle) {
                sidebarNavTitle.style.color = tema === 'escuro' ? 'white' : '#3a2c1a';
            }
        }

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.backgroundColor = buttonBackground;
            btn.style.color = buttonText;
        });

        const tabs = document.querySelectorAll('.tab, .sidebar-tab');
        tabs.forEach(tab => {
            tab.style.color = textColor;
            tab.style.borderColor = accentColor;
        });

        const pageControls = document.querySelectorAll('.page-controls button');
        pageControls.forEach(btn => {
            btn.style.color = accentColor;
        });

        const criadorCards = document.querySelectorAll('.criador-card');
        criadorCards.forEach(card => {
            card.style.backgroundColor = `rgba(${getColorValue(background)}, 0.7)`;
        });

        const configPage = document.getElementById('configuracoes');
        if (configPage) {
            if (tema !== 'escuro') {
                configPage.style.background = 'linear-gradient(135deg, #f5f0e1, #e6dbd0)';
                configPage.style.color = '#3a2c1a';

                const configContainers = configPage.querySelectorAll(
                    '.tema-selecao, .animacao-controle, .efeitos-controle, .modo-biblioteca'
                );
                configContainers.forEach(container => {
                    container.style.background = 'rgba(255, 255, 255, 0.2)';
                    container.style.color = '#3a2c1a';
                });

                const configButtons = configPage.querySelectorAll('.tema-btn, .biblioteca-btn');
                configButtons.forEach(btn => {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = '#3a2c1a';
                    btn.style.borderColor = '#8b6b4e';
                });

                const previewAreaConfig = configPage.querySelector('.preview-area');
                if (previewAreaConfig) {
                    previewAreaConfig.style.background = 'rgba(255, 255, 255, 0.1)';
                    previewAreaConfig.style.color = '#3a2c1a';
                }
            }
        }

        previewArea.innerHTML = `
            <p>Tema selecionado: ${tema}</p>
            <p style="color: ${accentColor}">Cor de destaque</p>
        `;
    }

    function getColorValue(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
            : '245, 240, 225';
    }

    temaBotoes.forEach(btn => {
        btn.addEventListener('click', () => {
            const tema = btn.getAttribute('data-tema');
            aplicarTema(tema);
            
            btn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        });
    });

    animacaoSlider.addEventListener('input', () => {
        const speed = animacaoSlider.value;
        document.body.style.setProperty('--animation-speed', `${speed}s`);
        
        previewArea.innerHTML = `
            <p>Velocidade de Animação: ${speed}x</p>
        `;
    });

    efeitosToggle.addEventListener('change', () => {
        const efeitosAtivos = efeitosToggle.checked;
        document.body.classList.toggle('efeitos-desativados', !efeitosAtivos);
        
        previewArea.innerHTML = `
            <p>Efeitos: ${efeitosAtivos ? 'Ativados' : 'Desativados'}</p>
        `;
    });

    const lofiToggle = document.querySelector('.lofi-toggle');
    const lofiAudio = new Audio('/videoplayback (3).m4a');
    lofiAudio.loop = true; // Make the audio loop

    lofiToggle.addEventListener('change', () => {
        if (lofiToggle.checked) {
            lofiAudio.play().catch(error => {
                console.error('Error playing Lo-Fi audio:', error);
            });
            
            previewArea.innerHTML = `
                <p>Lo-Fi Music: Ativado</p>
            `;
        } else {
            lofiAudio.pause();
            lofiAudio.currentTime = 0;
            
            previewArea.innerHTML = `
                <p>Lo-Fi Music: Desativado</p>
            `;
        }
    });
});