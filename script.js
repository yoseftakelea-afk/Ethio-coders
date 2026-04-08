// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('darkMode', isDarkMode);
}

themeToggle.addEventListener('click', toggleTheme);
if (isDarkMode) toggleTheme();

// Language System
let currentLang = localStorage.getItem('language') || 'en';
const translations = {
    en: {
        welcome: "Welcome to Ethio Habesha Coders",
        start: "Start Learning",
        explore: "Explore Courses"
    },
    am: {
        welcome: "እንኳን ወደ ኢትዮ ሀበሻ ኮደርስ በደህና መጡ",
        start: "መማር ጀምር",
        explore: "ኮርሶችን ያስሱ"
    }
};

const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'am' : 'en';
    localStorage.setItem('language', currentLang);
    langToggle.innerHTML = `<i class="fas fa-language"></i> ${currentLang.toUpperCase()}`;
    updateLanguage();
});

function updateLanguage() {
    document.querySelector('.hero h1').innerHTML = currentLang === 'en' ? 
        'Welcome to <span class="ethio-color">Ethio Habesha Coders</span>' :
        'እንኳን ወደ <span class="ethio-color">ኢትዮ ሀበሻ ኮደርስ</span> በደህና መጡ';
}

// Voice Assistant
let recognition = null;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
}

const voiceToggle = document.getElementById('voiceToggle');
let isListening = false;

function startVoiceAssistant() {
    if (!recognition) {
        showNotification("Voice assistant not supported in this browser");
        return;
    }
    
    recognition.lang = currentLang === 'en' ? 'en-US' : 'am-ET';
    recognition.start();
    isListening = true;
    voiceToggle.classList.add('voice-active');
    speakText(currentLang === 'en' ? "Voice assistant activated. How can I help you?" : "የድምጽ ረዳት ነቃ። እንዴት ልረዳዎት?");
}

voiceToggle.addEventListener('click', startVoiceAssistant);

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(command);
    isListening = false;
    voiceToggle.classList.remove('voice-active');
};

recognition.onerror = () => {
    isListening = false;
    voiceToggle.classList.remove('voice-active');
};

function handleVoiceCommand(command) {
    if (command.includes('home') || command.includes('መነሻ')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        speakText("Navigating to home");
    } else if (command.includes('courses') || command.includes('ኮርሶች')) {
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
        speakText("Opening courses section");
    } else if (command.includes('about') || command.includes('ስለ')) {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        speakText("Opening about section");
    } else if (command.includes('contact') || command.includes('አግኙን')) {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        speakText("Opening contact section");
    } else if (command.includes('dark mode') || command.includes('ጨለማ')) {
        if (!isDarkMode) toggleTheme();
        speakText("Dark mode activated");
    } else if (command.includes('light mode') || command.includes('ብርሃን')) {
        if (isDarkMode) toggleTheme();
        speakText("Light mode activated");
    } else {
        speakText("Command not recognized. Please try again.");
    }
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'en' ? 'en-US' : 'am-ET';
    window.speechSynthesis.speak(utterance);
}

// AI Chat System
const aiChatModal = document.getElementById('aiChatModal');
const chatMessages = document.getElementById('chatMessages');
let isAIChatOpen = false;

function openAIChat() {
    aiChatModal.style.display = 'flex';
    isAIChatOpen = true;
}

document.querySelector('.close').addEventListener('click', () => {
    aiChatModal.style.display = 'none';
    isAIChatOpen = false;
});

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    addMessage('Typing...', 'bot', true);
    
    // Simulate AI response
    setTimeout(() => {
        document.querySelector('.message.bot:last-child').remove();
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender, isTyping = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    if (!isTyping) messageDiv.textContent = text;
    else messageDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Typing...';
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('html')) {
        return "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure of web pages.";
    } else if (q.includes('css')) {
        return "CSS (Cascading Style Sheets) is used for styling web pages. It controls layout, colors, fonts, and responsive design.";
    } else if (q.includes('javascript')) {
        return "JavaScript is a programming language that enables interactive web pages. It's essential for frontend development and can also be used on the backend with Node.js.";
    } else if (q.includes('php')) {
        return "PHP is a server-side scripting language designed for web development. It's widely used to create dynamic web pages and interact with databases.";
    } else if (q.includes('java')) {
        return "Java is a object-oriented programming language used for building enterprise applications, Android apps, and backend systems.";
    } else if (q.includes('database')) {
        return "Databases store and organize data. Popular databases include MySQL, PostgreSQL, and MongoDB. They're crucial for backend development.";
    } else if (q.includes('debug')) {
        return "Debugging tips: 1. Use console.log() for JavaScript, 2. Use var_dump() for PHP, 3. Check browser developer tools, 4. Use breakpoints, 5. Read error messages carefully.";
    } else {
        return "I'm your AI coding assistant! I can help you with HTML, CSS, JavaScript, PHP, Java, databases, and debugging. What specific programming question do you have?";
    }
}

// Course Search
const searchInput = document.getElementById('courseSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const courses = document.querySelectorAll('.course-card');
        
        courses.forEach(course => {
            const title = course.querySelector('h3').textContent.toLowerCase();
            const desc = course.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });
}

// Course Progress Tracking
let userProgress = JSON.parse(localStorage.getItem('courseProgress')) || {
    frontend: 0,
    backend: 0,
    fullstack: 0
};

function enrollCourse(course) {
    if (!localStorage.getItem('isLoggedIn')) {
        showNotification('Please login first to enroll in courses!');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    showNotification(`Successfully enrolled in ${course} course!`);
    updateProgress(course, 10);
}

function updateProgress(course, increment) {
    userProgress[course] = Math.min(userProgress[course] + increment, 100);
    localStorage.setItem('courseProgress', JSON.stringify(userProgress));
    
    // Update progress bars
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        let progressKey = '';
        
        if (cardTitle.includes('frontend')) progressKey = 'frontend';
        else if (cardTitle.includes('backend')) progressKey = 'backend';
        else if (cardTitle.includes('full-stack')) progressKey = 'fullstack';
        
        if (progressKey) {
            const progressBar = card.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = `${userProgress[progressKey]}%`;
            }
        }
    });
    
    if (userProgress[course] === 100) {
        showNotification(`🎉 Congratulations! You completed the ${course} course!`);
    }
}

// Load saved progress on page load
window.addEventListener('load', () => {
    updateProgress('frontend', 0);
    updateProgress('backend', 0);
    updateProgress('fullstack', 0);
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We\'ll contact you soon.');
        contactForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = type === 'success' ? 'var(--primary-green)' : 'var(--primary-red)';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Scroll-based animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.course-card, .feature-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Interactive button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-enroll').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
    });
});

// Export functions for global use
window.enrollCourse = enrollCourse;
window.openAIChat = openAIChat;
window.startVoiceAssistant = startVoiceAssistant;
window.sendMessage = sendMessage;
window.showProgress = () => {
    showNotification(`Your progress: Frontend: ${userProgress.frontend}%, Backend: ${userProgress.backend}%, Full-Stack: ${userProgress.fullstack}%`);
};
window.scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
};