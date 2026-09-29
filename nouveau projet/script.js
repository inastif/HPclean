// Progress Bar Animation
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
}

window.addEventListener('scroll', updateProgressBar);
updateProgressBar();

// Floating Contact Button
const floatingContact = document.querySelector('.floating-contact');
if (floatingContact) {
    floatingContact.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Smooth Scrolling for Navigation Links
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

// Header Shrink Effect
const header = document.querySelector('header');
function handleHeaderShrink() {
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
}
window.addEventListener('scroll', handleHeaderShrink);

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll('.fade');
function handleFadeReveal() {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
        if (isVisible) {
            el.classList.add('show');
        }
    });
}
window.addEventListener('scroll', handleFadeReveal);
window.addEventListener('load', handleFadeReveal);

// Reviews System
const reviewForm = document.querySelector('#reviewForm');
const reviewsGrid = document.querySelector('#reviewsGrid');

function renderReviewCard(author, message) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="review-author">${author || 'Anonyme'}</div>
        <p class="review-text">${message}</p>
    `;
    if (reviewsGrid) {
        reviewsGrid.insertBefore(card, reviewsGrid.firstChild);
    }
}

function updateLatestTestimonial(author, message) {
    const testimonialEl = document.querySelector('#latestTestimonial');
    if (testimonialEl) {
        testimonialEl.textContent = `« ${message} » - ${author || 'Anonyme'}`;
        testimonialEl.classList.add('show');
    }
}

function loadSavedReviews() {
    if (!reviewsGrid) return;
    const saved = localStorage.getItem('customerReviews');
    if (saved) {
        try {
            const list = JSON.parse(saved);
            list.forEach(item => renderReviewCard(item.author, item.message));
            if (list.length > 0) {
                const latest = list[0];
                updateLatestTestimonial(latest.author, latest.message);
            }
        } catch (e) {
            console.error('Error loading reviews:', e);
        }
    }
}

function saveReview(author, message) {
    const saved = localStorage.getItem('customerReviews');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift({ author, message, date: new Date().toISOString() });
    localStorage.setItem('customerReviews', JSON.stringify(list.slice(0, 20)));
}

if (reviewForm && reviewsGrid) {
    loadSavedReviews();

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const author = this.querySelector('#reviewAuthor').value.trim();
        const message = this.querySelector('#reviewMessage').value.trim();

        if (!author || !message) {
            alert('Veuillez saisir votre prénom et un avis.');
            return;
        }

        renderReviewCard(author, message);
        updateLatestTestimonial(author, message);
        saveReview(author, message);

        this.reset();
        this.querySelector('#reviewAuthor').focus();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('#newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('#newsletterEmail').value.trim();

        if (!email) {
            alert('Veuillez saisir votre email.');
            return;
        }

        // Simulate submission
        alert('Merci pour votre inscription ! Vous recevrez bientôt nos actualités.');
        this.reset();
    });
}

// Mobile Menu (if needed in future)
function initMobileMenu() {
    const nav = document.querySelector('.nav-list');
    if (!nav) return;

    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('.nav-container').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        burger.classList.toggle('open');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    handleFadeReveal();
});

