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

        // ===== SIGNATURE FUNCTIONALITY =====
        const signatureOptions = document.querySelectorAll('.signature-option');
        const drawSignatureContainer = document.getElementById('draw-signature');
        const typeSignatureContainer = document.getElementById('type-signature');
        const signatureCanvas = document.getElementById('signature-canvas');
        const clearSignatureBtn = document.getElementById('clear-signature');
        const typedSignatureInput = document.getElementById('typed-signature');
        const signatureStyleSelect = document.getElementById('signature-style');
        const signaturePreview = document.getElementById('signature-preview');
        const confirmSignatureBtn = document.getElementById('confirm-signature');
        const downloadContractBtn = document.getElementById('download-contract');
        const contractStatus = document.getElementById('contract-status');
        const backToDashboardBtn = document.getElementById('back-to-dashboard');
        const tenantNameElement = document.getElementById('tenant-name');
        
        let isDrawing = false;
        let canvasContext;
        let currentSignature = null;
        
        // Initialize canvas
        function initCanvas() {
            canvasContext = signatureCanvas.getContext('2d');
            canvasContext.lineWidth = 2;
            canvasContext.lineCap = 'round';
            canvasContext.lineJoin = 'round';
            canvasContext.strokeStyle = '#000';
            
            // Set canvas dimensions
            const containerWidth = drawSignatureContainer.clientWidth;
            const containerHeight = drawSignatureContainer.clientHeight;
            signatureCanvas.width = containerWidth;
            signatureCanvas.height = containerHeight;
            
            // Clear canvas
            canvasContext.fillStyle = '#f9f9f9';
            canvasContext.fillRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        }
        
        // Canvas event listeners
        signatureCanvas.addEventListener('mousedown', startDrawing);
        signatureCanvas.addEventListener('mousemove', draw);
        signatureCanvas.addEventListener('mouseup', stopDrawing);
        signatureCanvas.addEventListener('mouseout', stopDrawing);
        
        // Touch events for mobile devices
        signatureCanvas.addEventListener('touchstart', startDrawingTouch);
        signatureCanvas.addEventListener('touchmove', drawTouch);
        signatureCanvas.addEventListener('touchend', stopDrawing);
        
        function startDrawing(e) {
            isDrawing = true;
            draw(e);
        }
        
        function startDrawingTouch(e) {
            e.preventDefault();
            isDrawing = true;
            drawTouch(e);
        }
        
        function draw(e) {
            if (!isDrawing) return;
            
            canvasContext.lineTo(e.offsetX, e.offsetY);
            canvasContext.stroke();
            canvasContext.beginPath();
            canvasContext.moveTo(e.offsetX, e.offsetY);
            
            // Update signature preview
            updateSignaturePreview();
        }
        
        function drawTouch(e) {
            if (!isDrawing) return;
            
            const touch = e.touches[0];
            const rect = signatureCanvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            canvasContext.lineTo(x, y);
            canvasContext.stroke();
            canvasContext.beginPath();
            canvasContext.moveTo(x, y);
            
            // Update signature preview
            updateSignaturePreview();
        }
        
        function stopDrawing() {
            isDrawing = false;
            canvasContext.beginPath();
        }
        
        // Clear signature
        clearSignatureBtn.addEventListener('click', () => {
            canvasContext.fillStyle = '#f9f9f9';
            canvasContext.fillRect(0, 0, signatureCanvas.width, signatureCanvas.height);
            currentSignature = null;
            signaturePreview.innerHTML = '';
            signaturePreview.style.display = 'none';
        });
        
        // Signature option selection
        signatureOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all options
                signatureOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                option.classList.add('active');
                
                const signatureType = option.getAttribute('data-type');
                
                if (signatureType === 'draw') {
                    drawSignatureContainer.style.display = 'block';
                    typeSignatureContainer.style.display = 'none';
                    initCanvas();
                } else {
                    drawSignatureContainer.style.display = 'none';
                    typeSignatureContainer.style.display = 'block';
                    updateSignaturePreview();
                }
            });
        });
        
        // Update signature preview for typed signature
        typedSignatureInput.addEventListener('input', updateSignaturePreview);
        signatureStyleSelect.addEventListener('change', updateSignaturePreview);
        
        function updateSignaturePreview() {
            const activeOption = document.querySelector('.signature-option.active');
            const signatureType = activeOption.getAttribute('data-type');
            
            if (signatureType === 'draw') {
                // For drawn signature, we'll use the canvas content
                currentSignature = signatureCanvas.toDataURL();
                if (currentSignature) {
                    signaturePreview.innerHTML = `<img src="${currentSignature}" class="signature-image" alt="Signature">`;
                    signaturePreview.style.display = 'block';
                }
            } else {
                // For typed signature
                const signatureText = typedSignatureInput.value;
                if (signatureText) {
                    const style = signatureStyleSelect.value;
                    let fontStyle = '';
                    
                    switch(style) {
                        case 'cursive':
                            fontStyle = 'font-family: "Dancing Script", cursive; font-size: 24px;';
                            break;
                        case 'print':
                            fontStyle = 'font-family: "Courier New", monospace; font-size: 20px;';
                            break;
                        case 'formal':
                            fontStyle = 'font-family: "Times New Roman", serif; font-size: 22px; font-style: italic;';
                            break;
                    }
                    
                    signaturePreview.innerHTML = `<div style="${fontStyle} border-bottom: 2px solid #000; padding-bottom: 5px; display: inline-block;">${signatureText}</div>`;
                    signaturePreview.style.display = 'block';
                    currentSignature = signatureText;
                    
                    // Update tenant name in contract
                    tenantNameElement.textContent = signatureText;
                } else {
                    signaturePreview.innerHTML = '';
                    signaturePreview.style.display = 'none';
                    currentSignature = null;
                    tenantNameElement.textContent = '[Votre nom]';
                }
            }
        }
        
        // Confirm signature
        confirmSignatureBtn.addEventListener('click', () => {
            if (!currentSignature) {
                alert('Veuillez fournir votre signature avant de confirmer.');
                return;
            }
            
            if (confirm('Êtes-vous sûr de vouloir signer ce contrat ? Cette action est définitive.')) {
                // Show success message
                contractStatus.style.display = 'block';
                
                // Scroll to status
                contractStatus.scrollIntoView({ behavior: 'smooth' });
                
                // In a real application, you would send the signature to the server here
                console.log('Signature confirmed:', currentSignature);
            }
        });
        
        // Download contract
        downloadContractBtn.addEventListener('click', () => {
            alert('Le contrat va être téléchargé. Cette fonctionnalité serait implémentée dans une version complète.');
            // In a real application, this would generate and download a PDF of the contract
        });
        
     
        
        // Initialize canvas on page load
        window.addEventListener('load', () => {
            initCanvas();
            
            // Set current date in contract
            const now = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            document.getElementById('contract-date').textContent = now.toLocaleDateString('fr-FR', options);
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

        