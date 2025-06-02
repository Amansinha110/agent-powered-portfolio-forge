
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    // Handle navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle mobile menu toggle
    function toggleMobileMenu() {
        const isOpen = !mobileNav.classList.contains('hidden');
        
        if (isOpen) {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileNav.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message (you can replace this with actual form submission)
    alert('Message sent! Thank you for your message. I\'ll get back to you soon.');
    
    // Reset form
    this.reset();
});

// AI Assistant functionality
document.addEventListener('DOMContentLoaded', function() {
    const aiToggle = document.getElementById('aiToggle');
    const aiChat = document.getElementById('aiChat');
    const aiMessages = document.getElementById('aiMessages');
    const aiInput = document.getElementById('aiInput');
    const aiInputForm = document.getElementById('aiInputForm');
    const quickQuestions = document.getElementById('aiQuickQuestions');
    const toggleIcon = aiToggle.querySelector('.ai-toggle-icon');
    const closeIcon = aiToggle.querySelector('.ai-toggle-close');
    
    let isTyping = false;
    let messageCount = 1; // Start with 1 since there's already an initial message
    
    // AI responses
    const aiResponses = {
        "projects": "This portfolio showcases various projects including an e-commerce platform with React and Node.js, a task management app with Vue.js, an AI-powered analytics dashboard, and a social media app with React Native. Each project demonstrates different technical skills and design approaches.",
        "technologies": "The main technologies featured include React, TypeScript, Node.js, Vue.js, React Native, Python, PostgreSQL, MongoDB, Tailwind CSS, and various modern web development tools. There's also expertise in UI/UX design tools like Figma and Adobe XD.",
        "contact": "You can reach out through the contact form on this page, or via email at hello@portfolio.com. You can also connect on GitHub and LinkedIn through the social links in the hero section.",
        "experience": "With 2+ years of experience, 50+ completed projects, and 30+ happy clients, this portfolio demonstrates a strong foundation in both design and development. The focus is on creating user-centered solutions with modern technologies.",
        "default": "I'd be happy to help you learn more about this portfolio! You can ask me about the projects, technologies used, experience, or how to get in touch. What would you like to know?"
    };
    
    function generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('project')) return aiResponses.projects;
        if (message.includes('technolog') || message.includes('skill') || message.includes('stack')) return aiResponses.technologies;
        if (message.includes('contact') || message.includes('email') || message.includes('reach')) return aiResponses.contact;
        if (message.includes('experience') || message.includes('background') || message.includes('level')) return aiResponses.experience;
        
        return aiResponses.default;
    }
    
    function toggleAIChat() {
        const isOpen = !aiChat.classList.contains('hidden');
        
        if (isOpen) {
            aiChat.classList.add('hidden');
            toggleIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            aiChat.classList.remove('hidden');
            toggleIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    }
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${sender}`;
        
        const icon = document.createElement('i');
        icon.className = 'message-icon';
        icon.setAttribute('data-lucide', sender === 'bot' ? 'bot' : 'user');
        
        const textDiv = document.createElement('p');
        textDiv.className = 'message-text';
        textDiv.textContent = content;
        
        messageDiv.appendChild(icon);
        messageDiv.appendChild(textDiv);
        
        aiMessages.appendChild(messageDiv);
        
        // Re-initialize Lucide icons for new elements
        lucide.createIcons();
        
        // Scroll to bottom
        aiMessages.scrollTop = aiMessages.scrollHeight;
        
        messageCount++;
        
        // Hide quick questions after first user message
        if (messageCount > 1 && quickQuestions) {
            quickQuestions.classList.add('hidden');
        }
    }
    
    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message ai-message-bot typing-indicator';
        typingDiv.innerHTML = `
            <i data-lucide="bot" class="message-icon"></i>
            <div class="message-text">
                <div style="display: flex; gap: 4px;">
                    <div style="width: 8px; height: 8px; background-color: #fbbf24; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                    <div style="width: 8px; height: 8px; background-color: #fbbf24; border-radius: 50%; animation: pulse 1.5s infinite 0.1s;"></div>
                    <div style="width: 8px; height: 8px; background-color: #fbbf24; border-radius: 50%; animation: pulse 1.5s infinite 0.2s;"></div>
                </div>
            </div>
        `;
        
        aiMessages.appendChild(typingDiv);
        lucide.createIcons();
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        isTyping = false;
    }
    
    function handleSendMessage(message) {
        if (!message.trim()) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            hideTypingIndicator();
            const aiResponse = generateAIResponse(message);
            addMessage(aiResponse, 'bot');
        }, 1000 + Math.random() * 1000);
    }
    
    // Event listeners
    aiToggle.addEventListener('click', toggleAIChat);
    
    aiInputForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = aiInput.value.trim();
        if (message) {
            handleSendMessage(message);
            aiInput.value = '';
        }
    });
    
    // Quick questions
    const quickQuestionBtns = document.querySelectorAll('.quick-question');
    quickQuestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            handleSendMessage(question);
        });
    });
    
    // Close AI chat when clicking outside
    document.addEventListener('click', function(e) {
        if (!aiChat.contains(e.target) && !aiToggle.contains(e.target) && !aiChat.classList.contains('hidden')) {
            toggleAIChat();
        }
    });
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill cards for progress bar animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
