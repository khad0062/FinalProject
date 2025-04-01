document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const toggleEventDetailsBtn = document.getElementById('toggleEventDetailsBtn');
    const eventDetails = document.getElementById('eventDetails');
    const scheduleForm = document.getElementById('scheduleForm');
    const formMessage = document.getElementById('formMessage');

    // Navigation and Focus Management
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(section => section.classList.add('hidden'));
            targetSection.classList.remove('hidden');
            targetSection.focus();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.title = `${link.textContent} | Empower Ability Labs`;
            history.pushState({}, link.textContent, `#${targetId}`);
        });
    });

    // Browser Back Button Sync
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        const targetSection = document.getElementById(hash);
        sections.forEach(section => section.classList.add('hidden'));
        targetSection.classList.remove('hidden');
        targetSection.focus();

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
        });
        document.title = `${document.querySelector('.active').textContent} | Empower Ability Labs`;
    });

    // Show/Hide Event Details
    toggleEventDetailsBtn.addEventListener('click', () => {
        eventDetails.classList.toggle('hidden');
        if (!eventDetails.classList.contains('hidden')) {
            document.getElementById('eventDetailsText').focus();
        }
    });

    // Form Submission and Validation
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;

        if (!email) {
            formMessage.textContent = 'Error: Email is required.';
            formMessage.style.color = '#ff4d4d';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            formMessage.textContent = 'Error: Please enter a valid email.';
            formMessage.style.color = '#ff4d4d';
        } else {
            formMessage.textContent = 'Thank you, your message has been sent!';
            formMessage.style.color = '#28a745';
            scheduleForm.reset();
            eventDetails.classList.add('hidden');
        }
    });
});
