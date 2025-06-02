
// Advanced 4D Portfolio JavaScript

class AdvancedPortfolio {
    constructor() {
        this.isLoaded = false;
        this.aiAssistant = null;
        this.neuralCanvas = null;
        this.currentSection = 'home';
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupAIAssistant();
        this.setupNeuralNetwork();
        this.setupTypewriter();
        this.setupCounters();
        this.setupAILab();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.querySelector('.progress-bar');
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoaded = true;
                    this.startPortfolioAnimations();
                }, 500);
            }
        }, 200);
    }

    startPortfolioAnimations() {
        // Start neural network animation
        this.animateNeuralNetwork();
        
        // Start stat counters
        this.animateCounters();
        
        // Start typewriter
        this.startTypewriter();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link-4d');
        const sections = document.querySelectorAll('section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.scrollToSection(targetSection);
                this.updateActiveNav(link);
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            this.updateNavigationOnScroll();
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            this.currentSection = sectionId;
        }
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link-4d').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateNavigationOnScroll() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                if (this.currentSection !== id) {
                    this.currentSection = id;
                    const navLink = document.querySelector(`[href="#${id}"]`);
                    if (navLink) {
                        this.updateActiveNav(navLink);
                    }
                }
            }
        });
    }

    setupTypewriter() {
        this.typewriterTexts = [
            "Creating Tomorrow's Digital Experiences",
            "AI-Powered Innovation & Design",
            "4D Visualization & Interaction",
            "Next-Generation Web Technologies"
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typewriterElement = document.getElementById('typewriterText');
    }

    startTypewriter() {
        if (!this.typewriterElement) return;
        
        const currentText = this.typewriterTexts[this.currentTextIndex];
        const speed = this.isDeleting ? 50 : 100;

        if (this.isDeleting) {
            this.typewriterElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.typewriterElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            setTimeout(() => {
                this.isDeleting = true;
            }, 2000);
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
        }

        setTimeout(() => {
            this.startTypewriter();
        }, speed);
    }

    setupCounters() {
        this.counters = document.querySelectorAll('[data-count]');
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    setupNeuralNetwork() {
        this.neuralCanvas = document.getElementById('neuralCanvas');
        if (this.neuralCanvas) {
            this.neuralCtx = this.neuralCanvas.getContext('2d');
            this.resizeNeuralCanvas();
            this.initializeNeuralNodes();
        }

        // Neural visualizer canvas
        this.neuralVizCanvas = document.getElementById('neuralVizCanvas');
        if (this.neuralVizCanvas) {
            this.neuralVizCtx = this.neuralVizCanvas.getContext('2d');
            this.setupNeuralVisualizer();
        }

        window.addEventListener('resize', () => {
            this.resizeNeuralCanvas();
        });
    }

    resizeNeuralCanvas() {
        if (!this.neuralCanvas) return;
        
        this.neuralCanvas.width = window.innerWidth;
        this.neuralCanvas.height = window.innerHeight;
    }

    initializeNeuralNodes() {
        this.nodes = [];
        const nodeCount = 50;
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.neuralCanvas.width,
                y: Math.random() * this.neuralCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    animateNeuralNetwork() {
        if (!this.neuralCtx || !this.isLoaded) return;

        this.neuralCtx.clearRect(0, 0, this.neuralCanvas.width, this.neuralCanvas.height);

        // Update and draw nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.neuralCanvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.neuralCanvas.height) node.vy *= -1;

            // Draw node
            this.neuralCtx.beginPath();
            this.neuralCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.neuralCtx.fillStyle = `rgba(220, 38, 38, ${node.opacity})`;
            this.neuralCtx.fill();
        });

        // Draw connections
        this.nodes.forEach((node, i) => {
            this.nodes.slice(i + 1).forEach(otherNode => {
                const distance = Math.sqrt(
                    Math.pow(node.x - otherNode.x, 2) + 
                    Math.pow(node.y - otherNode.y, 2)
                );

                if (distance < 150) {
                    this.neuralCtx.beginPath();
                    this.neuralCtx.moveTo(node.x, node.y);
                    this.neuralCtx.lineTo(otherNode.x, otherNode.y);
                    this.neuralCtx.strokeStyle = `rgba(239, 68, 68, ${0.3 * (1 - distance / 150)})`;
                    this.neuralCtx.lineWidth = 1;
                    this.neuralCtx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animateNeuralNetwork());
    }

    setupNeuralVisualizer() {
        if (!this.neuralVizCanvas) return;
        
        this.neuralVizCanvas.width = this.neuralVizCanvas.offsetWidth;
        this.neuralVizCanvas.height = this.neuralVizCanvas.offsetHeight;
        
        this.networkLayers = [
            { nodes: 4, x: 50 },
            { nodes: 6, x: 150 },
            { nodes: 8, x: 250 },
            { nodes: 3, x: 350 }
        ];
        
        this.drawNeuralNetwork();
    }

    drawNeuralNetwork() {
        if (!this.neuralVizCtx) return;
        
        this.neuralVizCtx.clearRect(0, 0, this.neuralVizCanvas.width, this.neuralVizCanvas.height);
        
        const height = this.neuralVizCanvas.height;
        
        // Draw connections first
        for (let i = 0; i < this.networkLayers.length - 1; i++) {
            const currentLayer = this.networkLayers[i];
            const nextLayer = this.networkLayers[i + 1];
            
            for (let j = 0; j < currentLayer.nodes; j++) {
                for (let k = 0; k < nextLayer.nodes; k++) {
                    const y1 = (height / (currentLayer.nodes + 1)) * (j + 1);
                    const y2 = (height / (nextLayer.nodes + 1)) * (k + 1);
                    
                    this.neuralVizCtx.beginPath();
                    this.neuralVizCtx.moveTo(currentLayer.x, y1);
                    this.neuralVizCtx.lineTo(nextLayer.x, y2);
                    this.neuralVizCtx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
                    this.neuralVizCtx.lineWidth = 1;
                    this.neuralVizCtx.stroke();
                }
            }
        }
        
        // Draw nodes
        this.networkLayers.forEach(layer => {
            for (let i = 0; i < layer.nodes; i++) {
                const y = (height / (layer.nodes + 1)) * (i + 1);
                
                this.neuralVizCtx.beginPath();
                this.neuralVizCtx.arc(layer.x, y, 8, 0, Math.PI * 2);
                this.neuralVizCtx.fillStyle = '#dc2626';
                this.neuralVizCtx.fill();
                
                this.neuralVizCtx.beginPath();
                this.neuralVizCtx.arc(layer.x, y, 12, 0, Math.PI * 2);
                this.neuralVizCtx.strokeStyle = '#ef4444';
                this.neuralVizCtx.lineWidth = 2;
                this.neuralVizCtx.stroke();
            }
        });
    }

    setupAIAssistant() {
        const aiToggle = document.getElementById('aiToggle4D');
        const aiAssistant = document.getElementById('aiAssistant4D');
        const chatInput = document.getElementById('chatInput');
        const chatForm = document.getElementById('chatInputForm');
        const suggestionsContainer = document.getElementById('chatSuggestions');
        
        this.aiResponses = {
            'ai projects': 'Our AI projects include advanced neural networks, computer vision systems, and natural language processing models. We\'ve developed cutting-edge solutions for image recognition, predictive analytics, and automated decision-making systems.',
            'how does 4d visualization work': '4D visualization adds the dimension of time or interactivity to traditional 3D graphics. We use advanced CSS transforms, WebGL, and mathematical projections to create immersive experiences that respond to user input and change over time.',
            'show me the latest experiments': 'Our latest experiments include real-time AI image generation, neural network visualization, and interactive machine learning demos. You can try them in the AI Lab section above!',
            'what makes this portfolio advanced': 'This portfolio features 4D visual effects, real-time neural network animations, AI-powered interactions, advanced CSS transforms, and cutting-edge web technologies that push the boundaries of what\'s possible in web design.',
            'default': 'I\'m ARIA, your AI assistant! I can help you explore this portfolio, explain the technologies used, or discuss any aspect of AI and 4D visualization. What would you like to know?'
        };

        if (aiToggle) {
            aiToggle.addEventListener('click', () => {
                aiAssistant.classList.toggle('open');
            });
        }

        if (chatForm) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message) {
                    this.sendAIMessage(message);
                    chatInput.value = '';
                }
            });
        }

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.getAttribute('data-prompt');
                this.sendAIMessage(prompt);
                suggestionsContainer.style.display = 'none';
            });
        });

        // Voice controls
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                this.startVoiceRecognition();
            });
        }
    }

    sendAIMessage(message) {
        const chatMessages = document.getElementById('chatMessages4D');
        
        // Add user message
        this.addChatMessage(message, 'user');
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addChatMessage(response, 'ai');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages4D');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i data-lucide="${sender === 'user' ? 'user' : 'bot'}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Reinitialize icons
        lucide.createIcons();
    }

    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(this.aiResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return this.aiResponses.default;
    }

    startVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chatInput').value = transcript;
            };
            
            recognition.onerror = (event) => {
                console.log('Speech recognition error:', event.error);
            };
            
            recognition.start();
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    }

    setupAILab() {
        // Image generation
        const generateImageBtn = document.getElementById('generateImageBtn');
        if (generateImageBtn) {
            generateImageBtn.addEventListener('click', () => {
                this.generateAIImage();
            });
        }

        // Text generation
        const generateTextBtn = document.getElementById('generateTextBtn');
        if (generateTextBtn) {
            generateTextBtn.addEventListener('click', () => {
                this.generateAIText();
            });
        }

        // Neural network training
        const trainNetworkBtn = document.getElementById('trainNetworkBtn');
        if (trainNetworkBtn) {
            trainNetworkBtn.addEventListener('click', () => {
                this.trainNeuralNetwork();
            });
        }
    }

    generateAIImage() {
        const prompt = document.getElementById('imagePrompt').value;
        const resultDiv = document.getElementById('generatedImage');
        
        if (!prompt) {
            resultDiv.innerHTML = '<p style="color: #ef4444;">Please enter a prompt first!</p>';
            return;
        }
        
        resultDiv.innerHTML = '<p>Generating image with AI...</p>';
        
        // Simulate AI image generation
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div style="background: linear-gradient(45deg, #dc2626, #ef4444); height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; margin-top: 1rem;">
                    <div style="text-align: center;">
                        <i data-lucide="image" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                        <p>AI Generated: "${prompt}"</p>
                        <small>Simulated result - Connect real AI service</small>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }, 2000);
    }

    generateAIText() {
        const prompt = document.getElementById('textPrompt').value;
        const resultDiv = document.getElementById('aiResponse');
        
        if (!prompt) {
            resultDiv.innerHTML = '<p style="color: #ef4444;">Please enter a question first!</p>';
            return;
        }
        
        resultDiv.innerHTML = '<p>AI is thinking...</p>';
        
        // Simulate AI text generation
        setTimeout(() => {
            const responses = [
                "That's a fascinating question! In the context of AI and machine learning, the possibilities are endless. Our advanced algorithms can process complex data patterns and generate insights that would take humans much longer to discover.",
                "Based on current AI research trends, this relates to deep learning architectures that can understand context and generate human-like responses. The future of AI interaction is moving towards more natural and intuitive interfaces.",
                "This question touches on the intersection of artificial intelligence and user experience design. By combining 4D visualization with AI capabilities, we can create immersive experiences that adapt to user behavior in real-time."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            resultDiv.innerHTML = `<p>${randomResponse}</p>`;
        }, 1500);
    }

    trainNeuralNetwork() {
        const btn = document.getElementById('trainNetworkBtn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Training...</span><i data-lucide="loader"></i>';
        btn.disabled = true;
        
        // Animate the neural network visualizer
        let progress = 0;
        const trainingInterval = setInterval(() => {
            progress += 2;
            this.animateNeuralTraining(progress);
            
            if (progress >= 100) {
                clearInterval(trainingInterval);
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
            }
        }, 50);
    }

    animateNeuralTraining(progress) {
        if (!this.neuralVizCtx) return;
        
        this.neuralVizCtx.clearRect(0, 0, this.neuralVizCanvas.width, this.neuralVizCanvas.height);
        
        const height = this.neuralVizCanvas.height;
        const intensity = progress / 100;
        
        // Draw animated connections
        for (let i = 0; i < this.networkLayers.length - 1; i++) {
            const currentLayer = this.networkLayers[i];
            const nextLayer = this.networkLayers[i + 1];
            
            for (let j = 0; j < currentLayer.nodes; j++) {
                for (let k = 0; k < nextLayer.nodes; k++) {
                    const y1 = (height / (currentLayer.nodes + 1)) * (j + 1);
                    const y2 = (height / (nextLayer.nodes + 1)) * (k + 1);
                    
                    this.neuralVizCtx.beginPath();
                    this.neuralVizCtx.moveTo(currentLayer.x, y1);
                    this.neuralVizCtx.lineTo(nextLayer.x, y2);
                    this.neuralVizCtx.strokeStyle = `rgba(220, 38, 38, ${0.3 + intensity * 0.7})`;
                    this.neuralVizCtx.lineWidth = 1 + intensity * 2;
                    this.neuralVizCtx.stroke();
                }
            }
        }
        
        // Draw pulsing nodes
        this.networkLayers.forEach(layer => {
            for (let i = 0; i < layer.nodes; i++) {
                const y = (height / (layer.nodes + 1)) * (i + 1);
                const pulseSize = 8 + Math.sin(Date.now() * 0.01 + i) * 4 * intensity;
                
                this.neuralVizCtx.beginPath();
                this.neuralVizCtx.arc(layer.x, y, pulseSize, 0, Math.PI * 2);
                this.neuralVizCtx.fillStyle = `rgba(220, 38, 38, ${0.5 + intensity * 0.5})`;
                this.neuralVizCtx.fill();
                
                this.neuralVizCtx.beginPath();
                this.neuralVizCtx.arc(layer.x, y, pulseSize + 4, 0, Math.PI * 2);
                this.neuralVizCtx.strokeStyle = `rgba(239, 68, 68, ${intensity})`;
                this.neuralVizCtx.lineWidth = 2;
                this.neuralVizCtx.stroke();
            }
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm4D');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e);
            });
        }
    }

    handleContactSubmit(e) {
        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span><i data-lucide="loader"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Message sent successfully! Thank you for reaching out.');
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            lucide.createIcons();
        }, 2000);
    }

    setupScrollEffects() {
        // Add parallax and scroll effects
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax effect for floating cubes
            const cubes = document.querySelectorAll('.cube-4d');
            cubes.forEach((cube, index) => {
                const speed = 0.1 + (index * 0.05);
                cube.style.transform = `translateY(${scrolled * speed}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('skill-cube-4d')) {
                        entry.target.style.animationPlayState = 'running';
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.about-card-4d, .skill-cube-4d, .experiment-card, .project-card-4d, .contact-card-4d');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) rotateX(15deg)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }
}

// Initialize the portfolio
function initializePortfolio() {
    new AdvancedPortfolio();
}

// Additional utility functions
function createParticleSystem() {
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: Math.random() * 100,
            decay: Math.random() * 0.02 + 0.01
        });
    }
    
    return particles;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedPortfolio;
}
