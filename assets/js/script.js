// Simple Terminal Portfolio - Minimal Version
console.log('🚀 Script loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded, starting initialization...');

    // Get elements
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const commandHistory = document.getElementById('commandHistory');
    const commandInput = document.getElementById('commandInput');
    const resizeHandle = document.getElementById('resizeHandle');
    const terminal = document.querySelector('.terminal');
    const themeButtons = document.querySelectorAll('.theme-btn');

    console.log('📊 Found elements:', {
        navItems: navItems.length,
        pages: pages.length,
        commandHistory: !!commandHistory,
        commandInput: !!commandInput
    });

    // Current state
    let currentPage = 'home';
    let isTyping = false;
    let currentLang = localStorage.getItem('portfolioLang') || 'es';

    // Typewriter effect configuration
    const typewriterConfig = {
        charDelay: 5,        // Delay between characters (ms)
        lineDelay: 10,       // Delay between lines (ms)
        chunkDelay: 15,      // Delay for chunk-based typing (ms)
        enabled: true        // Toggle typewriter effect
    };

    // Available commands and pages for autocomplete
    const availableCommands = ['help', 'clear', 'ls', 'echo', 'cd', 'documentation', 'lang'];
    const availablePages = ['home', 'about', 'projects', 'skills', 'contact'];

    // Language translations
    const translations = {
        en: {
            terminalInit: 'Terminal initialized',
            terminalCleared: 'Terminal cleared',
            switchedTo: 'Switched to',
            page: 'page',
            availableCommands: 'Available commands: cd [page], ls, clear, help, echo [text], documentation, lang [en|es]',
            commandNotFound: 'command not found',
            noSuchDirectory: 'No such directory',
            loadingDocs: 'Loading documentation...',
            languageChanged: 'Language changed to English',
            invalidLanguage: 'Invalid language. Use: lang en or lang es'
        },
        es: {
            terminalInit: 'Terminal inicializada',
            terminalCleared: 'Terminal limpiada',
            switchedTo: 'Cambiado a',
            page: 'página',
            availableCommands: 'Comandos disponibles: cd [página], ls, clear, help, echo [texto], documentation, lang [en|es]',
            commandNotFound: 'comando no encontrado',
            noSuchDirectory: 'No existe ese directorio',
            loadingDocs: 'Cargando documentación...',
            languageChanged: 'Idioma cambiado a Español',
            invalidLanguage: 'Idioma inválido. Usa: lang en o lang es'
        }
    };

    // Get translation
    function t(key) {
        return translations[currentLang][key] || key;
    }

    // Update page language
    function updatePageLanguage() {
        const elements = document.querySelectorAll('[data-lang-en], [data-lang-es]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                el.textContent = text;
            }
        });
    }

    // Documentation content
    const documentationBlocks = [
        {
            title: '📚 TERMINAL PORTFOLIO - DOCUMENTATION',
            content: 'Version 1.0 | Last Updated: 2024-11-12'
        },
        {
            title: '🎯 OVERVIEW',
            content: 'This is an interactive terminal-style portfolio built with vanilla JavaScript.\nNavigate through different sections using terminal commands or click navigation.'
        },
        {
            title: '⌨️ AVAILABLE COMMANDS',
            content: `cd [section]     Navigate to a section (home, about, projects, skills, contact)
ls               List all available sections
clear            Clear the command history
echo [text]      Print text to the terminal
help             Show available commands
documentation    Display this documentation`
        },
        {
            title: '🚀 NAVIGATION',
            content: `• Type commands in the input at the bottom
• Use Tab key for autocomplete
• Press 1-5 for quick navigation to sections
• Press H for help
• Click on section names to navigate`
        },
        {
            title: '🎨 FEATURES',
            content: `✓ Typewriter effect on page transitions
✓ Command autocomplete with Tab
✓ Resizable command history (drag the handle)
✓ Command history persistence
✓ Keyboard shortcuts
✓ Responsive design`
        },
        {
            title: '🔧 CUSTOMIZATION',
            content: `The command history height can be adjusted by dragging the resize handle.
Your preferred height is saved automatically in localStorage.
Min height: 60px | Max height: 400px`
        },
        {
            title: '📝 TIPS & TRICKS',
            content: `• Start typing a command and press Tab to autocomplete
• Type "cd a" + Tab to autocomplete to "cd about"
• Use arrow keys to navigate through command history (coming soon)
• The terminal stays focused - just start typing!`
        },
        {
            title: '✅ DOCUMENTATION END',
            content: 'For more information, navigate through the sections or type "help"'
        }
    ];

    // Display documentation progressively
    async function showDocumentation() {
        if (isTyping) return;
        isTyping = true;

        for (let block of documentationBlocks) {
            // Add title
            const titleDiv = document.createElement('div');
            titleDiv.className = 'command-entry';
            titleDiv.innerHTML = `<div class="output" style="color: var(--text-primary); font-weight: bold; margin-top: 10px;">${block.title}</div>`;
            commandHistory.appendChild(titleDiv);
            commandHistory.scrollTop = commandHistory.scrollHeight;
            await sleep(150);

            // Add content line by line
            const lines = block.content.split('\n');
            for (let line of lines) {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'command-entry';
                contentDiv.innerHTML = `<div class="output" style="color: var(--text-muted); margin-left: 10px;">${line}</div>`;
                commandHistory.appendChild(contentDiv);
                commandHistory.scrollTop = commandHistory.scrollHeight;
                await sleep(80);
            }

            // Small pause between blocks
            await sleep(100);
        }

        isTyping = false;
    }

    // Typewriter effect for elements
    async function typewriterEffect(element) {
        if (!typewriterConfig.enabled) {
            return;
        }

        isTyping = true;
        const children = Array.from(element.children);

        // Show elements progressively with typewriter effect
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            // Type headers character by character
            if (child.tagName === 'H2') {
                await typeText(child);
            }
            // For content containers, reveal their children progressively
            else if (child.classList.contains('file-content') ||
                     child.classList.contains('skills-console') ||
                     child.classList.contains('contact-script') ||
                     child.classList.contains('project-list')) {
                await revealContent(child);
            }
            // Default: just add small delay
            else {
                await sleep(typewriterConfig.lineDelay);
            }
        }

        isTyping = false;
    }

    // Type text character by character
    async function typeText(element) {
        const originalText = element.textContent;
        element.textContent = '';

        for (let char of originalText) {
            element.textContent += char;
            await sleep(typewriterConfig.charDelay);
        }
        await sleep(typewriterConfig.lineDelay);
    }

    // Reveal content progressively
    async function revealContent(container) {
        const children = Array.from(container.querySelectorAll('p, div.project-item, div.skill-section, .form-group'));

        // Reveal children progressively
        for (let child of children) {
            // Start hidden
            child.style.opacity = '0';
            child.style.transform = 'translateY(5px)';

            // Small delay
            await sleep(typewriterConfig.chunkDelay);

            // Reveal with transition
            child.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }
    }

    // Sleep utility function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Add command to history
    function addCommand(command, output) {
        if (!commandHistory) return;

        const div = document.createElement('div');
        div.className = 'command-entry';
        div.innerHTML = `
            <div>
                <span class="prompt">portfolio@terminal:~$</span>
                <span class="command">${command}</span>
            </div>
            <div class="output">${output}</div>
        `;

        commandHistory.appendChild(div);
        commandHistory.scrollTop = commandHistory.scrollHeight;
    }
    
    // Navigate to page
    async function navigateToPage(pageName) {
        console.log(`🧭 Navigating to: ${pageName}`);

        if (currentPage === pageName) {
            console.log('Already on this page');
            return;
        }

        // Prevent navigation if currently typing
        if (isTyping) {
            console.log('⏳ Waiting for current typing to finish...');
            return;
        }

        // Update navigation
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageName) {
                item.classList.add('active');
                console.log(`✅ Nav item activated: ${pageName}`);
            }
        });

        // Update pages
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageName) {
                page.classList.add('active');
                console.log(`✅ Page activated: ${pageName}`);

                // Apply typewriter effect to the page content
                const pageContent = page.querySelector('.page-content');
                if (pageContent) {
                    typewriterEffect(pageContent);
                }
            }
        });

        currentPage = pageName;
        addCommand(`cd ${pageName}`, `${t('switchedTo')} ${pageName} ${t('page')}`);
    }

    // Initialize
    updatePageLanguage(); // Apply language on load
    addCommand('clear', t('terminalInit'));
    addCommand('ls -la', 'home/ about/ projects/ skills/ contact/');

    // Apply typewriter effect to initial page
    const initialPage = document.querySelector('.page.active .page-content');
    if (initialPage) {
        typewriterEffect(initialPage);
    }
    
    // Event listeners for navigation
    console.log('🔗 Adding navigation listeners...');
    navItems.forEach((item, index) => {
        console.log(`Adding listener to nav item ${index}:`, item.textContent);
        item.addEventListener('click', function(e) {
            console.log('🖱️ Navigation clicked:', e.target.textContent);
            const page = this.getAttribute('data-page');
            console.log('Page data:', page);
            if (page) {
                navigateToPage(page);
            }
        });
    });
    
    // Process command input
    function processCommand(command) {
        const cmd = command.trim().toLowerCase();

        if (!cmd) return;

        // Add command to history
        addCommand(command, '');

        // Process different commands
        if (cmd === 'help') {
            addCommand('', t('availableCommands'));
        } else if (cmd === 'clear') {
            commandHistory.innerHTML = '';
            addCommand('clear', t('terminalCleared'));
        } else if (cmd === 'ls' || cmd === 'ls -la') {
            addCommand('', 'home/  about/  projects/  skills/  contact/');
        } else if (cmd === 'documentation' || cmd === 'docs') {
            addCommand('documentation', t('loadingDocs'));
            showDocumentation();
        } else if (cmd.startsWith('lang ')) {
            const newLang = cmd.substring(5).trim();
            if (newLang === 'en' || newLang === 'es') {
                currentLang = newLang;
                localStorage.setItem('portfolioLang', newLang);
                updatePageLanguage();
                addCommand('', t('languageChanged'));
            } else {
                addCommand('', t('invalidLanguage'));
            }
        } else if (cmd.startsWith('cd ')) {
            const page = cmd.substring(3).trim();
            const validPages = ['home', 'about', 'projects', 'skills', 'contact'];
            if (validPages.includes(page)) {
                navigateToPage(page);
            } else {
                addCommand('', `cd: ${page}: ${t('noSuchDirectory')}`);
            }
        } else if (cmd.startsWith('echo ')) {
            const text = command.substring(5);
            addCommand('', text);
        } else {
            addCommand('', `${cmd}: ${t('commandNotFound')}`);
        }
    }

    // Autocomplete function
    function autocomplete(input) {
        const parts = input.trim().split(' ');
        const firstWord = parts[0].toLowerCase();

        // If empty or just typing first command
        if (parts.length === 1) {
            const matches = availableCommands.filter(cmd => cmd.startsWith(firstWord));
            if (matches.length === 1) {
                return matches[0];
            } else if (matches.length > 1) {
                // Show available options
                addCommand('', matches.join('  '));
                return input;
            }
        }

        // If typing "cd " followed by page name
        if (firstWord === 'cd' && parts.length === 2) {
            const pagePrefix = parts[1].toLowerCase();
            const matches = availablePages.filter(page => page.startsWith(pagePrefix));
            if (matches.length === 1) {
                return 'cd ' + matches[0];
            } else if (matches.length > 1) {
                // Show available options
                addCommand('', matches.join('  '));
                return input;
            }
        }

        return input;
    }

    // Command input handler
    if (commandInput) {
        commandInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value;
                processCommand(command);
                this.value = '';
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const currentValue = this.value;
                const completed = autocomplete(currentValue);
                this.value = completed;
            }
        });

        // Auto-focus on input when clicking anywhere
        document.addEventListener('click', function() {
            commandInput.focus();
        });

        // Initial focus
        commandInput.focus();
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Skip shortcuts if typing in input
        if (e.target === commandInput) return;

        const keyMap = {
            '1': 'home',
            '2': 'about',
            '3': 'projects',
            '4': 'skills',
            '5': 'contact'
        };

        if (keyMap[e.key]) {
            console.log(`⌨️ Keyboard shortcut: ${e.key} -> ${keyMap[e.key]}`);
            navigateToPage(keyMap[e.key]);
        }

        if (e.key === 'h' || e.key === 'H') {
            if (!e.ctrlKey && !e.altKey) {
                addCommand('help', 'Navigation: 1-5 keys, H for help');
            }
        }
    });

    // Resize functionality for command-history
    if (resizeHandle && commandHistory) {
        let isResizing = false;
        let startY = 0;
        let startHeight = 0;

        // Load saved height from localStorage
        const savedHeight = localStorage.getItem('commandHistoryHeight');
        if (savedHeight) {
            commandHistory.style.height = savedHeight + 'px';
        }

        resizeHandle.addEventListener('mousedown', function(e) {
            isResizing = true;
            startY = e.clientY;
            startHeight = commandHistory.offsetHeight;
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isResizing) return;

            const deltaY = e.clientY - startY;
            const newHeight = startHeight + deltaY;

            // Constrain between min and max
            const minHeight = 60;
            const maxHeight = 400;
            const constrainedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

            commandHistory.style.height = constrainedHeight + 'px';
        });

        document.addEventListener('mouseup', function() {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';

                // Save height to localStorage
                localStorage.setItem('commandHistoryHeight', commandHistory.offsetHeight);
            }
        });
    }

    // Theme switcher functionality
    const currentTheme = localStorage.getItem('portfolioTheme') || 'ubuntu';

    // Apply saved theme on load
    function applyTheme(theme) {
        // Remove all theme classes
        terminal.classList.remove('theme-windows', 'theme-macos', 'theme-matrix');

        // Add new theme class if not ubuntu (default)
        if (theme !== 'ubuntu') {
            terminal.classList.add('theme-' + theme);
        }

        // Update active button
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });

        // Save to localStorage
        localStorage.setItem('portfolioTheme', theme);
    }

    // Apply saved theme
    applyTheme(currentTheme);

    // Theme button event listeners
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent focus on command input
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            console.log('🎨 Theme changed to:', theme);
        });
    });

    console.log('✅ Initialization complete!');
});