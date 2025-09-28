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
        const registrationForm = document.getElementById('registrationForm');
        
        // Elements
        const nomInput = document.getElementById('nom');
        const prenomInput = document.getElementById('prenom');
        const adresseInput = document.getElementById('adresse');
        const ageInput = document.getElementById('age');
        const telephoneInput = document.getElementById('telephone');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const conditionsInput = document.getElementById('conditions');
        
        // Error messages
        const nomError = document.getElementById('nomError');
        const prenomError = document.getElementById('prenomError');
        const adresseError = document.getElementById('adresseError');
        const ageError = document.getElementById('ageError');
        const telephoneError = document.getElementById('telephoneError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const conditionsError = document.getElementById('conditionsError');
        
        // Validation functions
        function validateNom() {
            if (nomInput.value.trim() === '') {
                showError(nomInput, nomError, 'Veuillez entrer votre nom');
                return false;
            } else {
                showSuccess(nomInput);
                hideError(nomError);
                return true;
            }
        }
        
        function validatePrenom() {
            if (prenomInput.value.trim() === '') {
                showError(prenomInput, prenomError, 'Veuillez entrer votre prénom');
                return false;
            } else {
                showSuccess(prenomInput);
                hideError(prenomError);
                return true;
            }
        }
        
        function validateAdresse() {
            if (adresseInput.value.trim() === '') {
                showError(adresseInput, adresseError, 'Veuillez entrer votre adresse');
                return false;
            } else {
                showSuccess(adresseInput);
                hideError(adresseError);
                return true;
            }
        }
        
        function validateAge() {
            const age = parseInt(ageInput.value);
            if (isNaN(age) || age < 18) {
                showError(ageInput, ageError, 'Vous devez avoir au moins 18 ans');
                return false;
            } else {
                showSuccess(ageInput);
                hideError(ageError);
                return true;
            }
        }
        
        function validateTelephone() {
            const phoneRegex = /^\+237[6-9][0-9]{8}$/;
            const phoneValue = telephoneInput.value.replace(/\s/g, '');
            
            if (!phoneRegex.test(phoneValue)) {
                showError(telephoneInput, telephoneError, 'Veuillez entrer un numéro camerounais valide (ex: +237 6XX XX XX XX)');
                return false;
            } else {
                showSuccess(telephoneInput);
                hideError(telephoneError);
                return true;
            }
        }
        
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
            if (passwordInput.value.length < 8) {
                showError(passwordInput, passwordError, 'Le mot de passe doit contenir au moins 8 caractères');
                return false;
            } else {
                showSuccess(passwordInput);
                hideError(passwordError);
                return true;
            }
        }
        
        function validateConfirmPassword() {
            if (confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, confirmPasswordError, 'Les mots de passe ne correspondent pas');
                return false;
            } else {
                showSuccess(confirmPasswordInput);
                hideError(confirmPasswordError);
                return true;
            }
        }
        
        function validateConditions() {
            if (!conditionsInput.checked) {
                showError(conditionsInput, conditionsError, 'Vous devez accepter les conditions générales');
                return false;
            } else {
                hideError(conditionsError);
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
        nomInput.addEventListener('blur', validateNom);
        prenomInput.addEventListener('blur', validatePrenom);
        adresseInput.addEventListener('blur', validateAdresse);
        ageInput.addEventListener('blur', validateAge);
        telephoneInput.addEventListener('blur', validateTelephone);
        emailInput.addEventListener('blur', validateEmail);
        passwordInput.addEventListener('blur', validatePassword);
        confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
        conditionsInput.addEventListener('change', validateConditions);
        
        // Form submission
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isNomValid = validateNom();
            const isPrenomValid = validatePrenom();
            const isAdresseValid = validateAdresse();
            const isAgeValid = validateAge();
            const isTelephoneValid = validateTelephone();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            const isConditionsValid = validateConditions();
            
            if (isNomValid && isPrenomValid && isAdresseValid && isAgeValid && 
                isTelephoneValid && isEmailValid && isPasswordValid && 
                isConfirmPasswordValid && isConditionsValid) {
                
                // In a real application, you would submit the form here
                alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                registrationForm.reset();
                
                // Remove success classes
                const inputs = registrationForm.querySelectorAll('.form-control');
                inputs.forEach(input => {
                    input.classList.remove('success');
                });
            }
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