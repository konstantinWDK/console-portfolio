// Simple Terminal Portfolio - Minimal Version
console.log('🚀 Script loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded, starting initialization...');

    // Get elements
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const commandHistory = document.getElementById('commandHistory');

    console.log('📊 Found elements:', {
        navItems: navItems.length,
        pages: pages.length,
        commandHistory: !!commandHistory
    });

    // Current state
    let currentPage = 'home';
    let isTyping = false;

    // Typewriter effect configuration
    const typewriterConfig = {
        charDelay: 5,        // Delay between characters (ms)
        lineDelay: 10,       // Delay between lines (ms)
        chunkDelay: 15,      // Delay for chunk-based typing (ms)
        enabled: true        // Toggle typewriter effect
    };
    
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
        addCommand(`cd ${pageName}`, `Switched to ${pageName} page`);
    }
    
    // Initialize
    addCommand('clear', 'Terminal initialized');
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
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
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
    
    console.log('✅ Initialization complete!');
});