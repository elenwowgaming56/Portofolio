// ============================================
// FIRSTLYO EILEN RIZQULLOH - 3D PORTFOLIO 2026
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // LOADER
    // ============================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAnimations();
    }, 2500);

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';
    });

    function animateCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX - 20 + 'px';
        cursorRing.style.top = ringY - 20 + 'px';
        requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .gallery-item, .skill-category, .stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    // ============================================
    // PARTICLES
    // ============================================
    const particlesContainer = document.getElementById('particles');
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ============================================
    // NAVBAR
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 3D TILT EFFECT - HERO CARD (Follows Cursor)
    // ============================================
    const hero3dCard = document.getElementById('hero3dCard');
    const hero3dScene = document.getElementById('hero3dScene');

    if (hero3dScene && hero3dCard) {
        hero3dScene.addEventListener('mousemove', (e) => {
            const rect = hero3dScene.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -15;
            const rotateY = (x - centerX) / centerX * 15;

            hero3dCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero3dScene.addEventListener('mouseleave', () => {
            hero3dCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // ============================================
    // 3D TILT - ABOUT CARD
    // ============================================
    const about3dCard = document.getElementById('about3dCard');
    if (about3dCard) {
        about3dCard.addEventListener('mousemove', (e) => {
            const rect = about3dCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            about3dCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        about3dCard.addEventListener('mouseleave', () => {
            about3dCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // ============================================
    // 3D TILT - CONTACT CARD
    // ============================================
    const contact3dCard = document.getElementById('contact3dCard');
    if (contact3dCard) {
        contact3dCard.addEventListener('mousemove', (e) => {
            const rect = contact3dCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            contact3dCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        contact3dCard.addEventListener('mouseleave', () => {
            contact3dCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // ============================================
    // FLOATING ELEMENTS PARALLAX
    // ============================================
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.float-shape');
        shapes.forEach(shape => {
            const speed = parseFloat(shape.dataset.speed) || 2;
            const x = (window.innerWidth / 2 - e.clientX) / speed;
            const y = (window.innerHeight / 2 - e.clientY) / speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ============================================
    // TYPING EFFECT
    // ============================================
    const typingTexts = [
        'Creative Developer',
        'UI/UX Designer',
        '3D Artist',
        'Full Stack Developer',
        'Digital Innovator'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');

    function typeEffect() {
        const currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 3000);

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            updateCounter();
        });
    }

    // ============================================
    // SCROLL REVEAL
    // ============================================
    function initAnimations() {
        const revealElements = document.querySelectorAll('.section-header, .about-3d-card, .skill-category, .project-card, .gallery-item, .contact-info-3d');
        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));

        // Counter observer
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.about-stats');
        if (statsSection) statsObserver.observe(statsSection);
    }

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success') {
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================
    // PROFILE IMAGE UPLOAD
    // ============================================
    const profileUploadBtn = document.getElementById('profileUploadBtn');
    const profileImageInput = document.createElement('input');
    profileImageInput.type = 'file';
    profileImageInput.accept = 'image/*';
    profileImageInput.hidden = true;
    document.body.appendChild(profileImageInput);

    profileUploadBtn.addEventListener('click', () => profileImageInput.click());

    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('File terlalu besar! Maksimal 5MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.getElementById('profileImage');
                const placeholder = document.getElementById('profilePlaceholder');
                img.src = ev.target.result;
                img.classList.add('visible');
                placeholder.classList.add('hidden');
                localStorage.setItem('profileImage', ev.target.result);
                showToast('Foto profil berhasil diupload!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile image
    const savedProfile = localStorage.getItem('profileImage');
    if (savedProfile) {
        const img = document.getElementById('profileImage');
        const placeholder = document.getElementById('profilePlaceholder');
        img.src = savedProfile;
        img.classList.add('visible');
        placeholder.classList.add('hidden');
    }

    // ============================================
    // ABOUT IMAGE UPLOAD
    // ============================================
    const aboutUploadBtn = document.getElementById('aboutUploadBtn');
    const aboutImageInput = document.createElement('input');
    aboutImageInput.type = 'file';
    aboutImageInput.accept = 'image/*';
    aboutImageInput.hidden = true;
    document.body.appendChild(aboutImageInput);

    aboutUploadBtn.addEventListener('click', () => aboutImageInput.click());

    aboutImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('File terlalu besar! Maksimal 5MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.getElementById('aboutImage');
                const placeholder = document.getElementById('aboutImgPlaceholder');
                img.src = ev.target.result;
                img.classList.add('visible');
                placeholder.classList.add('hidden');
                localStorage.setItem('aboutImage', ev.target.result);
                showToast('Foto about berhasil diupload!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });

    const savedAbout = localStorage.getItem('aboutImage');
    if (savedAbout) {
        const img = document.getElementById('aboutImage');
        const placeholder = document.getElementById('aboutImgPlaceholder');
        img.src = savedAbout;
        img.classList.add('visible');
        placeholder.classList.add('hidden');
    }

    // ============================================
    // PROJECTS CRUD
    // ============================================
    const projectsGrid = document.getElementById('projectsGrid');
    const projectModal = document.getElementById('projectModal');
    const projectForm = document.getElementById('projectForm');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const modalClose = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const modalTitle = document.getElementById('modalTitle');
    const saveBtnText = document.getElementById('saveBtnText');

    // Project Image Upload
    const imageUploadArea = document.getElementById('imageUploadArea');
    const projectImageInput = document.getElementById('projectImage');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');
    let currentProjectImage = '';

    imageUploadArea.addEventListener('click', (e) => {
        if (e.target !== removeImageBtn && !removeImageBtn.contains(e.target)) {
            projectImageInput.click();
        }
    });

    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.classList.add('dragover');
    });

    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.classList.remove('dragover');
    });

    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleProjectImage(file);
        }
    });

    projectImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleProjectImage(file);
    });

    function handleProjectImage(file) {
        if (file.size > 5 * 1024 * 1024) {
            showToast('File terlalu besar! Maksimal 5MB', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            currentProjectImage = ev.target.result;
            previewImg.src = ev.target.result;
            uploadPlaceholder.style.display = 'none';
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentProjectImage = '';
        projectImageInput.value = '';
        uploadPlaceholder.style.display = 'block';
        imagePreview.style.display = 'none';
    });

    // CRUD Operations
    let projects = JSON.parse(localStorage.getItem('projects')) || [
        {
            id: 1,
            title: '3D Portfolio Website',
            description: 'Website portfolio interaktif dengan efek 3D yang mengikuti kursor mouse. Dibuat dengan HTML, CSS, dan JavaScript modern.',
            category: 'web',
            tech: 'HTML, CSS, JavaScript, Three.js',
            url: '#',
            image: ''
        },
        {
            id: 2,
            title: 'E-Commerce Mobile App',
            description: 'Aplikasi e-commerce modern dengan fitur lengkap termasuk payment gateway, real-time tracking, dan AI recommendation.',
            category: 'mobile',
            tech: 'React Native, Node.js, MongoDB',
            url: '#',
            image: ''
        },
        {
            id: 3,
            title: 'Brand Identity Design',
            description: 'Desain identitas visual lengkap untuk startup teknologi termasuk logo, color palette, typography, dan brand guidelines.',
            category: 'design',
            tech: 'Figma, Illustrator, Photoshop',
            url: '#',
            image: ''
        }
    ];

    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function renderProjects(filter = 'all') {
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        projectsGrid.innerHTML = '';

        if (filtered.length === 0) {
            projectsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding:60px; color:var(--text-muted);">
                    <i class="fas fa-folder-open" style="font-size:3rem; margin-bottom:15px; opacity:0.3;"></i>
                    <p>Belum ada project. Klik "Add Project" untuk menambahkan!</p>
                </div>
            `;
            return;
        }

        filtered.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            card.style.animationDelay = `${index * 0.1}s`;

            const techTags = project.tech.split(',').map(t =>
                `<span class="tech-tag">${t.trim()}</span>`
            ).join('');

            card.innerHTML = `
                <div class="project-card-image">
                    ${project.image
                        ? `<img src="${project.image}" alt="${project.title}">`
                        : `<div class="no-image"><i class="fas fa-code"></i></div>`
                    }
                    <span class="project-category-badge">${project.category}</span>
                </div>
                <div class="project-card-body">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech-tags">${techTags}</div>
                    <div class="project-card-actions">
                        ${project.url && project.url !== '#' ? `<button class="btn-view" onclick="window.open('${project.url}','_blank')"><i class="fas fa-external-link-alt"></i> View</button>` : ''}
                        <button class="btn-edit" data-id="${project.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn-delete" data-id="${project.id}"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });

        // Re-observe for reveal animation
        setTimeout(() => {
            document.querySelectorAll('.project-card.reveal').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);

        // Attach edit/delete handlers
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => editProject(parseInt(btn.dataset.id)));
        });
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteProject(parseInt(btn.dataset.id)));
        });
    }

    function openModal(project = null) {
        projectModal.classList.add('active');
        if (project) {
            modalTitle.textContent = 'Edit Project';
            saveBtnText.textContent = 'Update Project';
            document.getElementById('projectId').value = project.id;
            document.getElementById('projectTitle').value = project.title;
            document.getElementById('projectDesc').value = project.description;
            document.getElementById('projectCategory').value = project.category;
            document.getElementById('projectTech').value = project.tech;
            document.getElementById('projectUrl').value = project.url || '';
            currentProjectImage = project.image || '';
            if (currentProjectImage) {
                previewImg.src = currentProjectImage;
                uploadPlaceholder.style.display = 'none';
                imagePreview.style.display = 'block';
            } else {
                uploadPlaceholder.style.display = 'block';
                imagePreview.style.display = 'none';
            }
        } else {
            modalTitle.textContent = 'Add New Project';
            saveBtnText.textContent = 'Save Project';
            projectForm.reset();
            document.getElementById('projectId').value = '';
            currentProjectImage = '';
            uploadPlaceholder.style.display = 'block';
            imagePreview.style.display = 'none';
        }
    }

    function closeModal() {
        projectModal.classList.remove('active');
    }

    addProjectBtn.addEventListener('click', () => openModal());
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeModal();
    });

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('projectId').value;
        const projectData = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDesc').value,
            category: document.getElementById('projectCategory').value,
            tech: document.getElementById('projectTech').value,
            url: document.getElementById('projectUrl').value || '#',
            image: currentProjectImage
        };

        if (id) {
            // UPDATE
            const index = projects.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                projects[index] = { ...projects[index], ...projectData };
                showToast('Project berhasil diupdate!', 'success');
            }
        } else {
            // CREATE
            projectData.id = Date.now();
            projects.unshift(projectData);
            showToast('Project berhasil ditambahkan!', 'success');
        }

        saveProjects();
        renderProjects();
        closeModal();
    });

    function editProject(id) {
        const project = projects.find(p => p.id === id);
        if (project) openModal(project);
    }

    function deleteProject(id) {
        if (confirm('Yakin ingin menghapus project ini?')) {
            projects = projects.filter(p => p.id !== id);
            saveProjects();
            renderProjects();
            showToast('Project berhasil dihapus!', 'error');
        }
    }

    // Filter tabs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    renderProjects();

    // ============================================
    // GALLERY CRUD
    // ============================================
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryModal = document.getElementById('galleryModal');
    const galleryForm = document.getElementById('galleryForm');
    const addGalleryBtn = document.getElementById('addGalleryBtn');
    const galleryModalClose = document.getElementById('galleryModalClose');
    const cancelGalleryBtn = document.getElementById('cancelGalleryBtn');

    // Gallery Image Upload
    const galleryUploadArea = document.getElementById('galleryUploadArea');
    const galleryImageInput = document.getElementById('galleryImage');
    const galleryUploadPlaceholder = document.getElementById('galleryUploadPlaceholder');
    const galleryImagePreview = document.getElementById('galleryImagePreview');
    const galleryPreviewImg = document.getElementById('galleryPreviewImg');
    const removeGalleryImageBtn = document.getElementById('removeGalleryImage');
    let currentGalleryImage = '';

    galleryUploadArea.addEventListener('click', (e) => {
        if (e.target !== removeGalleryImageBtn && !removeGalleryImageBtn.contains(e.target)) {
            galleryImageInput.click();
        }
    });

    galleryUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        galleryUploadArea.classList.add('dragover');
    });

    galleryUploadArea.addEventListener('dragleave', () => {
        galleryUploadArea.classList.remove('dragover');
    });

    galleryUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        galleryUploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleGalleryImage(file);
        }
    });

    galleryImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleGalleryImage(file);
    });

    function handleGalleryImage(file) {
        if (file.size > 5 * 1024 * 1024) {
            showToast('File terlalu besar! Maksimal 5MB', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            currentGalleryImage = ev.target.result;
            galleryPreviewImg.src = ev.target.result;
            galleryUploadPlaceholder.style.display = 'none';
            galleryImagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeGalleryImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentGalleryImage = '';
        galleryImageInput.value = '';
        galleryUploadPlaceholder.style.display = 'block';
        galleryImagePreview.style.display = 'none';
    });

    let galleryItems = JSON.parse(localStorage.getItem('gallery')) || [
        {
            id: 1,
            title: 'Sunset Photography',
            description: 'Beautiful sunset captured at the beach',
            image: ''
        },
        {
            id: 2,
            title: 'Urban Architecture',
            description: 'Modern building design in the city',
            image: ''
        }
    ];

    function saveGallery() {
        localStorage.setItem('gallery', JSON.stringify(galleryItems));
    }

    function renderGallery() {
        galleryGrid.innerHTML = '';

        if (galleryItems.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding:60px; color:var(--text-muted);">
                    <i class="fas fa-images" style="font-size:3rem; margin-bottom:15px; opacity:0.3;"></i>
                    <p>Belum ada foto. Klik "Upload Photo" untuk menambahkan!</p>
                </div>
            `;
            return;
        }

        galleryItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'gallery-item reveal';

            div.innerHTML = `
                ${item.image
                    ? `<img src="${item.image}" alt="${item.title}">`
                    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(0,240,255,0.1),rgba(123,47,247,0.1));color:var(--text-muted);font-size:3rem;"><i class="fas fa-image"></i></div>`
                }
                <div class="gallery-item-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description || ''}</p>
                </div>
                <div class="gallery-item-actions">
                    <button class="g-edit" data-id="${item.id}" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="g-delete" data-id="${item.id}" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            `;

            div.addEventListener('click', (e) => {
                if (!e.target.closest('.gallery-item-actions')) {
                    openLightbox(index);
                }
            });

            galleryGrid.appendChild(div);
        });

        setTimeout(() => {
            document.querySelectorAll('.gallery-item.reveal').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);

        document.querySelectorAll('.g-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                editGalleryItem(parseInt(btn.dataset.id));
            });
        });

        document.querySelectorAll('.g-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteGalleryItem(parseInt(btn.dataset.id));
            });
        });
    }

    function openGalleryModal(item = null) {
        galleryModal.classList.add('active');
        if (item) {
            document.getElementById('galleryId').value = item.id;
            document.getElementById('galleryTitle').value = item.title;
            document.getElementById('galleryDesc').value = item.description || '';
            currentGalleryImage = item.image || '';
            if (currentGalleryImage) {
                galleryPreviewImg.src = currentGalleryImage;
                galleryUploadPlaceholder.style.display = 'none';
                galleryImagePreview.style.display = 'block';
            } else {
                galleryUploadPlaceholder.style.display = 'block';
                galleryImagePreview.style.display = 'none';
            }
        } else {
            galleryForm.reset();
            document.getElementById('galleryId').value = '';
            currentGalleryImage = '';
            galleryUploadPlaceholder.style.display = 'block';
            galleryImagePreview.style.display = 'none';
        }
    }

    function closeGalleryModal() {
        galleryModal.classList.remove('active');
    }

    addGalleryBtn.addEventListener('click', () => openGalleryModal());
    galleryModalClose.addEventListener('click', closeGalleryModal);
    cancelGalleryBtn.addEventListener('click', closeGalleryModal);
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeGalleryModal();
    });

    galleryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('galleryId').value;
        const data = {
            title: document.getElementById('galleryTitle').value,
            description: document.getElementById('galleryDesc').value,
            image: currentGalleryImage
        };

        if (id) {
            const index = galleryItems.findIndex(g => g.id === parseInt(id));
            if (index !== -1) {
                galleryItems[index] = { ...galleryItems[index], ...data };
                showToast('Foto berhasil diupdate!', 'success');
            }
        } else {
            data.id = Date.now();
            galleryItems.unshift(data);
            showToast('Foto berhasil diupload!', 'success');
        }

        saveGallery();
        renderGallery();
        closeGalleryModal();
    });

    function editGalleryItem(id) {
        const item = galleryItems.find(g => g.id === id);
        if (item) openGalleryModal(item);
    }

    function deleteGalleryItem(id) {
        if (confirm('Yakin ingin menghapus foto ini?')) {
            galleryItems = galleryItems.filter(g => g.id !== id);
            saveGallery();
            renderGallery();
            showToast('Foto berhasil dihapus!', 'error');
        }
    }

    renderGallery();

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
    }

    function updateLightbox() {
        const item = galleryItems[currentLightboxIndex];
        if (item) {
            lightboxImg.src = item.image || '';
            lightboxTitle.textContent = item.title;
            lightboxDesc.textContent = item.description || '';
        }
    }

    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    lightboxPrev.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });

    lightboxNext.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') lightbox.classList.remove('active');
            if (e.key === 'ArrowLeft') lightboxPrev.click();
            if (e.key === 'ArrowRight') lightboxNext.click();
        }
        if (projectModal.classList.contains('active') && e.key === 'Escape') closeModal();
        if (galleryModal.classList.contains('active') && e.key === 'Escape') closeGalleryModal();
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Pesan berhasil dikirim! Terima kasih 🎉', 'success');
        contactForm.reset();
    });

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // SKILL BARS ANIMATION ON SCROLL
    // ============================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 300);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => {
        skillObserver.observe(cat);
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c🚀 Firstlyo Eilen Rizqulloh - 3D Portfolio 2026', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color: #7b2ff7; font-size: 14px;');

});
