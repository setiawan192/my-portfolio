document.addEventListener('DOMContentLoaded', () => {
    // Pastikan data ada sebelum menjalankan fungsi
    if (typeof portfolioData === 'undefined') {
        console.error('Error: portfolioData is not defined. Make sure data.js is loaded correctly.');
        return;
    }

    // --- 1. HERO TYPING EFFECT ---
    const typingElement = document.getElementById('typing-effect');
    const roles = portfolioData.heroRoles;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        const currentText = isDeleting 
            ? currentRole.substring(0, charIndex--)
            : currentRole.substring(0, charIndex++);
        
        typingElement.textContent = currentText;

        if (!isDeleting && charIndex === currentRole.length + 1) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at end of word
        } else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500); // Pause before new word
        } else {
            const typingSpeed = isDeleting ? 50 : 150;
            setTimeout(type, typingSpeed);
        }
    }

    // --- 2. RENDER ABOUT & CONTACT DETAILS ---
    function renderAbout() {
        document.getElementById('about-text').textContent = portfolioData.about;
        
        const detailsContainer = document.getElementById('contact-details');
        const contact = portfolioData.contact;
        detailsContainer.innerHTML = `
            <div><strong>EMAIL:</strong> <a href="mailto:${contact.email}">${contact.email}</a></div>
            <div><strong>PHONE:</strong> <span>${contact.phone}</span></div>
            <div><strong>PORTFOLIO:</strong> <span>${contact.portfolio}</span></div>
            <div><strong>LOCATION:</strong> <span>${contact.location}</span></div>
        `;
    }

    // --- 3. RENDER EXPERIENCE & EDUCATION ---
    function createTimelineItem(item) {
        return `
            <div class="timeline-item plexiglass-panel">
                <div class="timeline-date">${item.date}</div>
                <h3 class="timeline-title">${item.role || item.degree}</h3>
                <h4 class="timeline-subtitle">${item.company || item.institution}, ${item.location || ''}</h4>
                <div class="timeline-description">
                    ${(item.description || [item.details]).map(line => `<span>// ${line}</span>`).join('')}
                </div>
            </div>
        `;
    }

    function renderExperience() {
        const container = document.getElementById('experience-container');
        container.innerHTML = portfolioData.experience.map(createTimelineItem).join('');
    }

    function renderEducation() {
        const container = document.getElementById('education-container');
        container.innerHTML = portfolioData.education.map(createTimelineItem).join('');
    }

    // --- 4. RENDER SKILLS ---
    function renderSkills() {
        const container = document.getElementById('skills-container');
        container.innerHTML = Object.entries(portfolioData.skills).map(([category, skillsList]) => `
            <div class="skill-category plexiglass-panel">
                <h4>// ${category}</h4>
                <ul>
                    ${skillsList.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // --- 5. SCROLL-BASED FADE-IN ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Amati semua section
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // --- INITIALIZE ---
    if (typingElement) type();
    renderAbout();
    renderExperience();
    renderEducation();
    renderSkills();
});
