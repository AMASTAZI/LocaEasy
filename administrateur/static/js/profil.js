 document.addEventListener('DOMContentLoaded', function() {
            // Gestion des modales
            const editProfileBtn = document.getElementById('editProfileBtn');
            const editProfileModal = document.getElementById('editProfileModal');
            const modalCloses = document.querySelectorAll('.modal-close');
            const cancelEditProfile = document.getElementById('cancelEditProfile');
            const saveProfileBtn = document.getElementById('saveProfile');

            // Ouvrir la modale d'édition
            editProfileBtn.addEventListener('click', function() {
                editProfileModal.classList.add('active');
            });

            // Fermer les modales
            function closeModals() {
                editProfileModal.classList.remove('active');
            }

            modalCloses.forEach(close => {
                close.addEventListener('click', closeModals);
            });

            cancelEditProfile.addEventListener('click', closeModals);

            // Sauvegarder le profil
            saveProfileBtn.addEventListener('click', function() {
                // Dans une application réelle, vous enverriez les données à un serveur
                alert('Profil modifié avec succès!');
                closeModals();
                
                // Mettre à jour les valeurs affichées
                document.getElementById('firstName').value = document.getElementById('editFirstName').value;
                document.getElementById('lastName').value = document.getElementById('editLastName').value;
                document.getElementById('email').value = document.getElementById('editEmail').value;
                document.getElementById('phone').value = document.getElementById('editPhone').value;
                document.getElementById('role').value = document.getElementById('editRole').value;
                document.getElementById('bio').value = document.getElementById('editBio').value;
            });
        });