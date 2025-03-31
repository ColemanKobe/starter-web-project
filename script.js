document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show'); // Toggle the 'show' class
    });

    // Filter Projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            projects.forEach(project => {
                project.classList.toggle('show', category === 'all' || project.dataset.category === category);
            });
        });
    });

    // Lightbox
    const lightboxLinks = document.querySelectorAll('.lightbox');
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.classList.add('lightbox-overlay');
    lightboxOverlay.innerHTML = `
        <span class="close-btn">&times;</span>
        <img src="" alt="Lightbox Image">
    `;
    document.body.appendChild(lightboxOverlay);

    const lightboxImage = lightboxOverlay.querySelector('img');
    const closeBtn = lightboxOverlay.querySelector('.close-btn');

    lightboxLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            lightboxImage.src = link.href;
            lightboxOverlay.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none';
    });

    lightboxOverlay.addEventListener('click', e => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
        }
    });

    // Contact Form Submission
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                form.reset(); // Clear the form
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred. Please try again.');
        }
    });
});