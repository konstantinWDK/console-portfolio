// Simple Terminal Portfolio - Minimal Version
console.log('🚀 Script loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded, starting initialization...');
    
    // Get elements
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const themeToggle = document.getElementById('themeToggle');
    const commandHistory = document.getElementById('commandHistory');
    
    console.log('📊 Found elements:', {
        navItems: navItems.length,
        pages: pages.length,
        themeToggle: !!themeToggle,
        commandHistory: !!commandHistory
    });
    
    // Current state
    let currentPage = 'home';
    let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    // Apply theme
    function applyTheme() {
        if (currentTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
        } else {
            document.body.removeAttribute('data-theme');
        }
        
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
            }
        }
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
    function navigateToPage(pageName) {
        console.log(`🧭 Navigating to: ${pageName}`);
        
        if (currentPage === pageName) {
            console.log('Already on this page');
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
            }
        });
        
        currentPage = pageName;
        addCommand(`cd ${pageName}`, `Switched to ${pageName} page`);
    }
    
    // Toggle theme
    function toggleTheme() {
        console.log('🎨 Toggling theme...');
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', currentTheme);
        applyTheme();
        addCommand('theme --toggle', `Switched to ${currentTheme} mode`);
    }
    
    // Initialize
    applyTheme();
    addCommand('clear', 'Terminal initialized');
    addCommand('ls -la', 'home/ about/ projects/ skills/ contact/');
    
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
    
    // Event listener for theme toggle
    if (themeToggle) {
        console.log('🎨 Adding theme toggle listener...');
        themeToggle.addEventListener('click', function(e) {
            console.log('🖱️ Theme toggle clicked');
            e.preventDefault();
            toggleTheme();
        });
    }
    
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
        
        if (e.key === 't' || e.key === 'T') {
            if (!e.ctrlKey && !e.altKey) {
                console.log('⌨️ Theme toggle via keyboard');
                toggleTheme();
            }
        }
        
        if (e.key === 'h' || e.key === 'H') {
            if (!e.ctrlKey && !e.altKey) {
                addCommand('help', 'Navigation: 1-5 keys, T for theme, H for help');
            }
        }
    });
    
    console.log('✅ Initialization complete!');
});