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

        // ===== FORM VALIDATION AND SUBMISSION =====
        const reservationForm = document.getElementById('reservationForm');
        const cancelBtn = document.querySelector('.btn-cancel');
        
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const occupants = document.getElementById('occupants').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !phone || !checkIn || !checkOut) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Check if check-out date is after check-in date
            if (new Date(checkOut) <= new Date(checkIn)) {
                alert('La date de départ doit être postérieure à la date d\'arrivée.');
                return;
            }
            
            // In a real app, you would submit the form here
            alert(`Réservation confirmée pour ${firstName} ${lastName}!\n\nUn email de confirmation a été envoyé à ${email}.\n\nNous vous contacterons dans les 24h pour finaliser votre réservation.`);
            
            // Reset form
            reservationForm.reset();
        });
        
        cancelBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir annuler votre réservation?')) {
                window.location.href = 'index.html'; // Redirect to home page
            }
        });

        // ===== DATE VALIDATION =====
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');
        
        // Set minimum dates to today
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        checkOutInput.min = today;
        
        // Update check-out min date when check-in changes
        checkInInput.addEventListener('change', () => {
            checkOutInput.min = checkInInput.value;
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