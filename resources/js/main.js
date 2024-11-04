document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Feather Icons
    feather.replace();

    // Manejo del menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    // Crear el overlay si no existe
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        body.appendChild(overlay);
    }

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        overlay.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
        setTimeout(() => {
            overlay.classList.toggle('active');
        }, 10);
    });

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    });

    // Cambio dinámico del nombre de la región
    const regionName = document.getElementById('region-name');
    const regions = ['Bagua', 'Bongara', 'Chachapoyas', 'Condorcanqui', 'Luya', 'Rodriguez De Mendoza', 'Utcubamba'];
    let currentRegionIndex = 0;

    setInterval(() => {
        currentRegionIndex = (currentRegionIndex + 1) % regions.length;
        regionName.textContent = regions[currentRegionIndex];
    }, 5000);

    // Cerrar el menú móvil cuando se hace clic en un enlace
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        });
    });

    // Cambiar el color del header al hacer scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.background = 'linear-gradient(to right, #388E3C, #1976D2)';
        } else {
            header.style.background = 'linear-gradient(to right, #4CAF50, #2196F3)';
        }
        lastScrollTop = scrollTop;
    });
});

// Carrusel
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentSlide = 0;
const totalSlides = slides.length;

// Crear dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-play
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play cuando el mouse está sobre el carrusel
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// Soporte para gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();
    }
});
