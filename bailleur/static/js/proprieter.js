 document.addEventListener('DOMContentLoaded', function() {
            // Gestion des modales
            const addPropertyBtn = document.getElementById('addPropertyBtn');
            const addPropertyModal = document.getElementById('addPropertyModal');
            const editPropertyModal = document.getElementById('editPropertyModal');
            const deletePropertyModal = document.getElementById('deletePropertyModal');
            const modalCloses = document.querySelectorAll('.modal-close');
            const cancelAddProperty = document.getElementById('cancelAddProperty');
            const cancelEditProperty = document.getElementById('cancelEditProperty');
            const cancelDeleteProperty = document.getElementById('cancelDeleteProperty');
            const editPropertyBtns = document.querySelectorAll('.edit-property');
            const deletePropertyBtns = document.querySelectorAll('.delete-property');
            const savePropertyBtn = document.getElementById('saveProperty');
            const updatePropertyBtn = document.getElementById('updateProperty');
            const confirmDeletePropertyBtn = document.getElementById('confirmDeleteProperty');

            // Ouvrir la modale d'ajout
            addPropertyBtn.addEventListener('click', function() {
                addPropertyModal.classList.add('active');
            });

            // Ouvrir la modale de modification
            editPropertyBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const propertyId = this.getAttribute('data-id');
                    document.getElementById('editPropertyId').value = propertyId;
                    
                    // Remplir le formulaire avec les données existantes
                    const propertyData = getPropertyData(propertyId);
                    if (propertyData) {
                        document.getElementById('editPropertyTitle').value = propertyData.title;
                        document.getElementById('editPropertyAddress').value = propertyData.address;
                        document.getElementById('editPropertyCity').value = propertyData.city;
                        document.getElementById('editPropertyPostalCode').value = propertyData.postalCode;
                        document.getElementById('editPropertyType').value = propertyData.type;
                        document.getElementById('editPropertyRooms').value = propertyData.rooms;
                        document.getElementById('editPropertyBedrooms').value = propertyData.bedrooms;
                        document.getElementById('editPropertyBathrooms').value = propertyData.bathrooms;
                        document.getElementById('editPropertySurface').value = propertyData.surface;
                        document.getElementById('editPropertyPrice').value = propertyData.price;
                        document.getElementById('editPropertyDescription').value = propertyData.description;
                    }
                    
                    editPropertyModal.classList.add('active');
                });
            });

            // Ouvrir la modale de suppression
            deletePropertyBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const propertyId = this.getAttribute('data-id');
                    document.getElementById('deletePropertyId').value = propertyId;
                    deletePropertyModal.classList.add('active');
                });
            });

            // Fermer les modales
            function closeModals() {
                addPropertyModal.classList.remove('active');
                editPropertyModal.classList.remove('active');
                deletePropertyModal.classList.remove('active');
            }

            modalCloses.forEach(close => {
                close.addEventListener('click', closeModals);
            });

            cancelAddProperty.addEventListener('click', closeModals);
            cancelEditProperty.addEventListener('click', closeModals);
            cancelDeleteProperty.addEventListener('click', closeModals);

            // Mettre à jour une propriété
            updatePropertyBtn.addEventListener('click', function() {
                // Dans une application réelle, vous enverriez les données à un serveur
                alert('Propriété modifiée avec succès!');
                closeModals();
            });

            // Confirmer la suppression
            confirmDeletePropertyBtn.addEventListener('click', function() {
                const propertyId = document.getElementById('deletePropertyId').value;
                // Dans une application réelle, vous enverriez une requête de suppression à un serveur
                alert(`Propriété ${propertyId} supprimée avec succès!`);
                closeModals();
            });

            // Fonction pour récupérer les données d'une propriété (simulation)
            function getPropertyData(id) {
                const properties = {
                    '1': {
                        title: 'Appartement T3 - Centre-ville Lyon',
                        address: '15 Rue de la République',
                        city: 'Lyon',
                        postalCode: '69001',
                        type: 'appartement',
                        rooms: 3,
                        bedrooms: 2,
                        bathrooms: 1,
                        surface: 65,
                        price: 850,
                        description: 'Bel appartement situé en plein centre-ville de Lyon, à proximité de tous les commerces et transports.'
                    },
                    '2': {
                        title: 'Studio - Proche métro',
                        address: '25 Avenue Roger Salengro',
                        city: 'Villeurbanne',
                        postalCode: '69100',
                        type: 'studio',
                        rooms: 1,
                        bedrooms: 1,
                        bathrooms: 1,
                        surface: 35,
                        price: 550,
                        description: 'Studio fonctionnel situé à proximité du métro, idéal pour étudiant ou jeune actif.'
                    },
                    '3': {
                        title: 'Maison avec jardin - Caluire',
                        address: '8 Chemin de Montessuy',
                        city: 'Caluire-et-Cuire',
                        postalCode: '69300',
                        type: 'maison',
                        rooms: 5,
                        bedrooms: 4,
                        bathrooms: 2,
                        surface: 120,
                        price: 1200,
                        description: 'Belle maison avec jardin, située dans un quartier calme. Parfait pour une famille.'
                    }
                };
                
                return properties[id];
            }
        });