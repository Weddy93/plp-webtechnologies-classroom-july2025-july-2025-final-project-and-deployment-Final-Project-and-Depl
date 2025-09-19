// Navigation highlighting (existing code)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Image Slider ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    let autoSlideTimer;

    // Create dots
    if (slides.length > 0 && sliderDotsContainer) {
        for(let i=0; i<slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDotsContainer.appendChild(dot);
        }
    }
    const dots = sliderDotsContainer ? sliderDotsContainer.querySelectorAll('.dot') : [];

    function showSlide(n) {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === n);
            if (dots[idx]) dots[idx].classList.toggle('active', idx === n);
        });
    }
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
        resetAutoSlide();
    }
    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextSlide, 4000);
    }
    if (slides.length > 0) {
        if (nextBtn) nextBtn.onclick = () => { nextSlide(); resetAutoSlide(); };
        if (prevBtn) prevBtn.onclick = () => { prevSlide(); resetAutoSlide(); };
        autoSlideTimer = setInterval(nextSlide, 4000);
    }

    // --- Contact form validation (existing code) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            if (!name || !email || !message) {
                formMessage.textContent = "Please fill in all fields.";
                formMessage.style.color = "red";
                return;
            }
            // Simple email check
            if (!email.includes('@')) {
                formMessage.textContent = "Please enter a valid email.";
                formMessage.style.color = "red";
                return;
            }
            formMessage.textContent = "Thank you for reaching out! We have received your message.";
            formMessage.style.color = "green";
            contactForm.reset();
        });
    }
});