// EmpowerAbilityLab.js
document.addEventListener('DOMContentLoaded', () => {
    // Navigation and SPA functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    function showSection(targetId) {
        sections.forEach(section => {
            section.hidden = section.id !== targetId;
            section.setAttribute('aria-hidden', section.id !== targetId);
        });
        document.querySelector(`#${targetId}`).focus();
        document.title = `Empower Ability Labs - ${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            window.history.pushState({ section: targetId }, '', `#${targetId}`);
        });
    });

    window.addEventListener('popstate', (e) => {
        const targetId = e.state?.section || 'home';
        showSection(targetId);
    });

    // Lightbox/Modal
    const communityBtn = document.getElementById('community-btn');
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('close-lightbox');

    communityBtn.addEventListener('click', () => {
        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    });

    closeBtn.addEventListener('click', () => {
        lightbox.hidden = true;
        lightbox.setAttribute('aria-hidden', 'true');
        communityBtn.focus();
    });

    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            closeBtn.focus();
        }
    });

    // Switch
    const switchBtn = document.querySelector('[role="switch"]');
    switchBtn.addEventListener('click', () => {
        const isChecked = switchBtn.getAttribute('aria-checked') === 'true';
        switchBtn.setAttribute('aria-checked', !isChecked);
        switchBtn.querySelector('img').src = isChecked ? 'images/switch-off.png' : 'images/switch-on.png';
    });

    // Show/Hide Event Details
    const speakerCheckbox = document.getElementById('speaker');
    const eventDetails = document.getElementById('event-details');

    speakerCheckbox.addEventListener('change', () => {
        eventDetails.hidden = !speakerCheckbox.checked;
        eventDetails.setAttribute('aria-hidden', !speakerCheckbox.checked);
    });

    // Form Submission
    const form = document.getElementById('schedule-form');
    const message = document.getElementById('form-message');
    const formImage = message.querySelector('.form-image');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            message.textContent = 'Thank you! We’ll get back to you soon.';
            formImage.hidden = false;
            form.reset();
        } else {
            message.textContent = 'Please fill out all required fields correctly.';
            formImage.hidden = true;
        }
    });

    // Initial state
    showSection('home');
});
