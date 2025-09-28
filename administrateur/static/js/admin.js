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

            // Gestion des modales
            const addUserBtn = document.getElementById('addUserBtn');
            const addUserModal = document.getElementById('addUserModal');
            const cancelAddUser = document.getElementById('cancelAddUser');
            const modalCloseButtons = document.querySelectorAll('.modal-close');
            
            const generateReportBtn = document.getElementById('generateReportBtn');
            const generateReportModal = document.getElementById('generateReportModal');
            const cancelGenerateReport = document.getElementById('cancelGenerateReport');
            
            // Ouvrir la modale d'ajout d'utilisateur
            addUserBtn.addEventListener('click', function() {
                addUserModal.style.display = 'flex';
            });
            
            // Ouvrir la modale de génération de rapport
            generateReportBtn.addEventListener('click', function() {
                generateReportModal.style.display = 'flex';
            });
            
            // Fermer les modales
            function closeModals() {
                addUserModal.style.display = 'none';
                generateReportModal.style.display = 'none';
            }
            
            cancelAddUser.addEventListener('click', closeModals);
            cancelGenerateReport.addEventListener('click', closeModals);
            
            modalCloseButtons.forEach(button => {
                button.addEventListener('click', closeModals);
            });
            
            // Fermer les modales en cliquant en dehors
            window.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal')) {
                    closeModals();
                }
            });
            
            // Actions sur les utilisateurs
            const editButtons = document.querySelectorAll('.action-btn.edit');
            const deleteButtons = document.querySelectorAll('.action-btn.delete');
            const activateButtons = document.querySelectorAll('.action-btn.activate');
            const deactivateButtons = document.querySelectorAll('.action-btn.deactivate');
            
            editButtons.forEach(button => {
                button.addEventListener('click', function() {
                    alert('Modifier l\'utilisateur');
                });
            });
            
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                        alert('Utilisateur supprimé');
                    }
                });
            });
            
            activateButtons.forEach(button => {
                button.addEventListener('click', function() {
                    alert('Utilisateur activé');
                // Mettre à jour l'interface utilisateur
                    const row = this.closest('tr');
                    const statusCell = row.querySelector('.status');
                    statusCell.textContent = 'Actif';
                    statusCell.className = 'status active';
                });
            });
            
            deactivateButtons.forEach(button => {
                button.addEventListener('click', function() {
                    alert('Utilisateur désactivé');
                    // Mettre à jour l'interface utilisateur
                    const row = this.closest('tr');
                    const statusCell = row.querySelector('.status');
                    statusCell.textContent = 'Inactif';
                    statusCell.className = 'status inactive';
                });
            });
        });