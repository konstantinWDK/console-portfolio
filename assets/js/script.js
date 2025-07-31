class TerminalPortfolio {
    constructor() {
        this.commandHistory = document.getElementById('commandHistory');
        this.navItems = document.querySelectorAll('.nav-item');
        this.pages = document.querySelectorAll('.page');
        this.currentPage = 'home';
        this.commandQueue = [];
        this.isExecuting = false;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.addInitialCommand();
        this.startCursorBlink();
    }
    
    addEventListeners() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.target.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
        
        // Add form submission handler
        const form = document.querySelector('.terminal-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
    }
    
    addInitialCommand() {
        this.addCommandToHistory('portfolio@terminal:~$', 'clear && echo "Welcome to Terminal Portfolio"', 'Terminal initialized successfully!');
        this.addCommandToHistory('portfolio@terminal:~$', 'ls -la', 'home/ about/ projects/ skills/ contact/');
    }
    
    navigateToPage(pageName) {
        if (this.currentPage === pageName || this.isExecuting) return;
        
        const command = `cd ${pageName}`;
        const output = this.getPageOutput(pageName);
        
        this.addCommandToHistory('portfolio@terminal:~$', command, output);
        this.switchPage(pageName);
    }
    
    getPageOutput(pageName) {
        const outputs = {
            home: 'Entering home directory... Welcome!',
            about: 'Loading about.txt... Personal information displayed.',
            projects: 'Scanning projects directory... Found 4 projects.',
            skills: 'Reading skills.json... Technical skills loaded.',
            contact: 'Opening contact.sh... Contact information ready.'
        };
        return outputs[pageName] || 'Directory changed successfully.';
    }
    
    switchPage(pageName) {
        // Update active nav item
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageName) {
                item.classList.add('active');
            }
        });
        
        // Update active page
        this.pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageName) {
                page.classList.add('active');
            }
        });
        
        this.currentPage = pageName;
    }
    
    addCommandToHistory(prompt, command, output) {
        const commandEntry = document.createElement('div');
        commandEntry.className = 'command-entry';
        
        commandEntry.innerHTML = `
            <div>
                <span class="prompt">${prompt}</span>
                <span class="command">${command}</span>
            </div>
            <div class="output">${output}</div>
        `;
        
        this.commandHistory.appendChild(commandEntry);
        
        // Auto-scroll to bottom
        setTimeout(() => {
            this.commandHistory.scrollTop = this.commandHistory.scrollHeight;
        }, 100);
    }
    
    handleKeyPress(e) {
        const keyCommands = {
            '1': 'home',
            '2': 'about', 
            '3': 'projects',
            '4': 'skills',
            '5': 'contact'
        };
        
        if (keyCommands[e.key]) {
            e.preventDefault();
            this.navigateToPage(keyCommands[e.key]);
        }
        
        // Handle special commands
        if (e.ctrlKey) {
            switch(e.key) {
                case 'l':
                    e.preventDefault();
                    this.clearTerminal();
                    break;
                case 'c':
                    e.preventDefault();
                    this.addCommandToHistory('portfolio@terminal:~$', '^C', 'Process interrupted.');
                    break;
            }
        }
        
        // Handle help command (H key)
        if (e.key === 'h' || e.key === 'H') {
            if (!e.ctrlKey && !e.altKey) {
                this.showHelp();
            }
        }
    }
    
    clearTerminal() {
        this.commandHistory.innerHTML = '';
        this.addCommandToHistory('portfolio@terminal:~$', 'clear', 'Terminal cleared.');
    }
    
    showHelp() {
        const helpText = `Available commands:
- cd [page]: Navigate to page (home, about, projects, skills, contact)
- clear: Clear terminal (Ctrl+L)
- help: Show this help message (H key)
- Keyboard shortcuts: 1-5 to navigate pages
- Ctrl+C: Interrupt command`;
        
        this.addCommandToHistory('portfolio@terminal:~$', 'help', helpText);
    }
    
    handleFormSubmit() {
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const message = document.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            this.addCommandToHistory('portfolio@terminal:~$', './send_message.sh', 'Error: All fields are required.');
            return;
        }
        
        const output = `Message sent successfully!
From: ${name} <${email}>
Content: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}
Status: Delivered to inbox`;
        
        this.addCommandToHistory('portfolio@terminal:~$', './send_message.sh --send', output);
        
        // Clear form
        document.querySelector('.terminal-form').reset();
    }
    
    startCursorBlink() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }
    
    // Simulate typing effect for commands
    typeCommand(element, text, speed = 50) {
        return new Promise((resolve) => {
            let index = 0;
            element.textContent = '';
            
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, speed);
        });
    }
    
    // Add matrix rain effect (Easter egg)
    initMatrixEffect() {
        if (Math.random() < 0.01) { // 1% chance
            this.addCommandToHistory('portfolio@terminal:~$', 'matrix --activate', 'The Matrix has you...');
            // You could add actual matrix effect here
        }
    }
}

// Additional utility functions
function formatDate() {
    return new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

// Easter eggs and special commands
const easterEggs = {
    'sudo': 'Nice try, but you\'re not root here! 😏',
    'rm -rf /': 'Access denied. This portfolio is protected! 🛡️',
    'whoami': 'You are a visitor exploring this portfolio.',
    'pwd': '/home/portfolio/visitor',
    'date': formatDate(),
    'uptime': 'Portfolio has been running since page load.',
    'ps aux': 'PID TTY TIME CMD\n1 pts/0 00:00:01 portfolio-app'
};

// Initialize the terminal portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalPortfolio();
    
    // Add easter egg command listener
    document.addEventListener('keydown', (e) => {
        // Listen for specific key combinations for easter eggs
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            terminal.addCommandToHistory('portfolio@terminal:~$', 'inspect --developer-tools', 'Developer mode detected. Welcome, fellow coder! 👨‍💻');
        }
    });
    
    // Add welcome message after a short delay
    setTimeout(() => {
        terminal.addCommandToHistory('portfolio@terminal:~$', 'echo "Type \'h\' for help or use the navigation above"', 'Ready for commands...');
    }, 1000);
});

// Add some animations and effects
function addGlitchEffect() {
    const terminal = document.querySelector('.terminal');
    terminal.style.animation = 'glitch 0.1s';
    setTimeout(() => {
        terminal.style.animation = '';
    }, 100);
}

// CSS animation for glitch effect (to be added to CSS)
const glitchKeyframes = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

// Inject glitch keyframes into the page
const styleSheet = document.createElement('style');
styleSheet.textContent = glitchKeyframes;
document.head.appendChild(styleSheet);