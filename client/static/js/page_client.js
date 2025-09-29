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

        // ===== PROPERTY FILTERING =====
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // In a real app, you would filter properties here
                // For this demo, we'll just log the filter
                console.log(`Filtering by: ${btn.textContent}`);
            });
        });

        // ===== TESTIMONIAL SLIDER =====
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const sliderDots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        
        function goToSlide(slideIndex) {
            testimonialTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
            
            // Update active dot
            sliderDots.forEach(dot => dot.classList.remove('active'));
            sliderDots[slideIndex].classList.add('active');
            
            currentSlide = slideIndex;
        }
        
        // Add click events to dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Auto slide (optional)
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(nextSlide);
        }, 5000);

        // ===== ANIMATION ON SCROLL =====
        const animatedElements = document.querySelectorAll('.feature-card, .property-card');
        
        function checkScroll() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Initial check
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);

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

        // ===== FORM VALIDATION =====
        const searchForm = document.querySelector('.search-form');
        
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const location = document.getElementById('location').value;
            const propertyType = document.getElementById('property-type').value;
            const budget = document.getElementById('budget').value;
            
            if (!location) {
                alert('Veuillez indiquer une localisation.');
                return;
            }
            
            // In a real app, you would submit the form here
            alert(`Recherche de ${propertyType} à ${location} avec un budget ${budget}`);
        });

   
