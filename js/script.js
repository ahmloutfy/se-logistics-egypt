// SE Logistics Egypt - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('SE Logistics Egypt - Website Loaded');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a nav link
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Form submission handler - Netlify AJAX
    const contactForm = document.querySelector('form[name="contact-clean"]');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            const formData = new FormData(this);
            
            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    showSuccessToast('The message sent. Thank you!');
                    this.reset();
                } else {
                    showErrorToast('Sorry, there was a problem sending your message.');
                }
            } catch (error) {
                console.error('Submission error:', error);
                showErrorToast('Sorry, there was a problem sending your message.');
            }
        });
    }
});

// Toast Helper Functions
function showSuccessToast(message) {
    showToast(message, '#16a34a', '✓');
}

function showErrorToast(message) {
    showToast(message, '#dc2626', '!');
}

function showToast(message, bgColor, iconText) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <div class="success-toast-icon">${iconText}</div>
        <div class="success-toast-text">${message}</div>
    `;

    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        background: ${bgColor};
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(120%);
        opacity: 0;
        transition: transform 0.35s ease, opacity 0.35s ease;
        font-weight: 600;
    `;

    const icon = toast.querySelector('.success-toast-icon');
    if (icon) {
        icon.style.cssText = `
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(255,255,255,0.18);
            display: grid;
            place-items: center;
            font-size: 18px;
            line-height: 1;
            flex: 0 0 28px;
        `;
    }

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 350);
    }, 2800);
}
