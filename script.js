/* ============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Firstlyo Eilen Rizqulloh - 2026
   ============================================ */

// ============================================
// 1. NAVIGATION & SCROLL EFFECTS
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Update active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 2. ANIMATED COUNTER
// ============================================

const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when in viewport
const heroSection = document.querySelector('.hero');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            animateCounters();
            counted = true;
        }
    });
}, observerOptions);

if (heroSection) {
    observer.observe(heroSection);
}

// ============================================
// 3. SKILL BARS ANIMATION
// ============================================

const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ============================================
// 4. CRUD OPERATIONS FOR PROJECTS
// ============================================

// Project data storage key
const STORAGE_KEY = 'firstlyo_portfolio_projects';

// DOM Elements
const projectForm = document.getElementById('projectForm');
const projectsGrid = document.getElementById('projectsGrid');
const emptyState = document.getElementById('emptyState');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const projectId = document.getElementById('projectId');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    // Add some sample data if empty
    if (getProjects().length === 0) {
        addSampleProjects();
    }
});

// Get all projects from localStorage
function getProjects() {
    const projects = localStorage.getItem(STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
}

// Save projects to localStorage
function saveToLocalStorage(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Add sample projects
function addSampleProjects() {
    const sampleProjects = [
        {
            id: '1',
            title: 'E-Commerce Platform',
            category: 'Web Development',
            year: '2025',
            description: 'Platform e-commerce lengkap dengan sistem pembayaran terintegrasi, manajemen inventori, dan dashboard analitik untuk seller.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: 'https://example.com'
        },
        {
            id: '2',
            title: 'Task Management App',
            category: 'Mobile App',
            year: '2025',
            description: 'Aplikasi manajemen tugas dengan fitur kolaborasi tim, notifikasi real-time, dan integrasi calendar.',
            technologies: ['React Native', 'Firebase', 'Redux'],
            link: 'https://example.com'
        },
        {
            id: '3',
            title: 'Finance Dashboard',
            category: 'UI/UX Design',
            year: '2024',
            description: 'Dashboard keuangan interaktif dengan visualisasi data, laporan otomatis, dan prediksi anggaran.',
            technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
            link: 'https://example.com'
        }
    ];
    
    saveToLocalStorage(sampleProjects);
    loadProjects();
}

// Load and display projects
function loadProjects() {
    const projects = getProjects();
    
    if (projects.length === 0) {
        projectsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    projectsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-meta">
                <span><i class="fas fa-folder"></i> ${project.category}</span>
                <span><i class="fas fa-calendar"></i> ${project.year}</span>
            </div>
        </div>
        <div class="project-body">
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-actions">
                ${project.link ? `
                    <a href="${project.link}" target="_blank" class="btn btn-primary" style="flex: 2;">
                        <i class="fas fa-external-link-alt"></i> Kunjungi
                    </a>
                ` : ''}
                <button class="btn-edit" onclick="editProject('${project.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteProject('${project.id}')">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Form submission
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const projectData = {
        id: projectId.value || Date.now().toString(),
        title: document.getElementById('projectTitle').value,
        category: document.getElementById('projectCategory').value,
        year: document.getElementById('projectYear').value,
        description: document.getElementById('projectDescription').value,
        technologies: document.getElementById('projectTechnologies').value.split(',').map(t => t.trim()),
        link: document.getElementById('projectLink').value
    };
    
    const projects = getProjects();
    
    if (projectId.value) {
        // Update existing project
        const index = projects.findIndex(p => p.id === projectId.value);
        if (index !== -1) {
            projects[index] = projectData;
        }
    } else {
        // Add new project
        projects.push(projectData);
    }
    
    saveToLocalStorage(projects);
    resetForm();
    loadProjects();
    
    // Show success message
    showNotification(projectId.value ? 'Proyek berhasil diupdate!' : 'Proyek berhasil ditambahkan!', 'success');
});

// Edit project
window.editProject = function(id) {
    const projects = getProjects();
    const project = projects.find(p => p.id === id);
    
    if (project) {
        projectId.value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectYear').value = project.year;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectTechnologies').value = project.technologies.join(', ');
        document.getElementById('projectLink').value = project.link || '';
        
        submitBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update Proyek';
        cancelBtn.style.display = 'inline-flex';
        
        // Scroll to form
        document.querySelector('.crud-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
};

// Delete project
window.deleteProject = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
        let projects = getProjects();
        projects = projects.filter(p => p.id !== id);
        saveToLocalStorage(projects);
        loadProjects();
        showNotification('Proyek berhasil dihapus', 'info');
    }
};

// Reset form
function resetForm() {
    projectForm.reset();
    projectId.value = '';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Simpan Proyek';
    cancelBtn.style.display = 'none';
}

// Cancel edit
cancelBtn.addEventListener('click', resetForm);

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// 5. CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// ============================================
// 6. THREE.JS 3D BACKGROUND ANIMATION
// ============================================

const canvas = document.getElementById('canvas-3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create geometric shapes
const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x6366f1, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Add particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.6
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation loop
const clock = new THREE.Clock();

function animate3D() {
    requestAnimationFrame(animate3D);
    
    const elapsedTime = clock.getElapsedTime();
    
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    // Smooth rotation following mouse
    shape.rotation.y += 0.05 * (targetX - shape.rotation.y);
    shape.rotation.x += 0.05 * (targetY - shape.rotation.x);
    shape.rotation.z += 0.002;
    
    // Rotate particles slowly
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.0001;
    
    renderer.render(scene, camera);
}

animate3D();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// 7. SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll('.skill-category, .project-card, .contact-card, .about-text, .about-images');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ============================================
// 8. PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listener
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based animations can go here
}, 10));

console.log('🚀 Portfolio website loaded successfully!');
console.log('👨‍💻 Developed by Firstlyo Eilen Rizqulloh');
