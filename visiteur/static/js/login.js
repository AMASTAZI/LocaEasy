  // ===== HEADER SCROLL EFFECT =====
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // ===== MOBILE MENU TOGGLE =====
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // ===== FORM VALIDATION =====
        const loginForm = document.getElementById('loginForm');
        
        // Elements
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        // Error messages
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        
        // Validation functions
        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, emailError, 'Veuillez entrer un email valide');
                return false;
            } else {
                showSuccess(emailInput);
                hideError(emailError);
                return true;
            }
        }
        
        function validatePassword() {
            if (passwordInput.value.trim() === '') {
                showError(passwordInput, passwordError, 'Veuillez entrer votre mot de passe');
                return false;
            } else {
                showSuccess(passwordInput);
                hideError(passwordError);
                return true;
            }
        }
        
        // Helper functions
        function showError(input, errorElement, message) {
            input.classList.add('error');
            input.classList.remove('success');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function showSuccess(input) {
            input.classList.remove('error');
            input.classList.add('success');
        }
        
        function hideError(errorElement) {
            errorElement.style.display = 'none';
        }
        
        // Event listeners for real-time validation
        emailInput.addEventListener('blur', validateEmail);
        passwordInput.addEventListener('blur', validatePassword);
        
        // Form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            
            if (isEmailValid && isPasswordValid) {
                // In a real application, you would submit the form here
                alert('Connexion réussie ! Redirection vers votre tableau de bord...');
                loginForm.reset();
                
                // Remove success classes
                const inputs = loginForm.querySelectorAll('.form-control');
                inputs.forEach(input => {
                    input.classList.remove('success');
                });
                
                // In a real app, you would redirect to dashboard
                // window.location.href = 'dashboard.html';
            }
        });

        // Social login buttons
        document.querySelector('.social-btn.google').addEventListener('click', () => {
            alert('Connexion avec Google - Cette fonctionnalité sera implémentée prochainement');
        });
        
        document.querySelector('.social-btn.facebook').addEventListener('click', () => {
            alert('Connexion avec Facebook - Cette fonctionnalité sera implémentée prochainement');
        });

        // Forgot password
        document.querySelector('.forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fonctionnalité de réinitialisation de mot de passe - Cette fonctionnalité sera implémentée prochainement');
        });

        // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });