  // Navigation entre les sections du dashboard
        document.addEventListener('DOMContentLoaded', function() {
            const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
            const dashboardSections = document.querySelectorAll('.dashboard-section');
            
            // Gestion du clic sur les liens de la sidebar
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Retirer la classe active de tous les liens
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    
                    // Ajouter la classe active au lien cliqué
                    this.classList.add('active');
                    
                    // Masquer toutes les sections
                    dashboardSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    
                    // Afficher la section correspondante
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.style.display = 'block';
                    }
                });
            });
            
            // Gestion du menu déroulant utilisateur
            const userMenu = document.querySelector('.user-menu');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            
            userMenu.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
            
            // Fermer le menu déroulant en cliquant ailleurs
            document.addEventListener('click', function() {
                dropdownMenu.classList.remove('show');
            });
            
            // Gestion du bouton menu mobile
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const sidebar = document.querySelector('.sidebar');
            
            mobileMenuBtn.addEventListener('click', function() {
                sidebar.classList.toggle('mobile-open');
            });
        });