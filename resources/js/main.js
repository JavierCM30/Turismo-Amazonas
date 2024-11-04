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


// ... (previous JavaScript code for carousel remains unchanged) ...

// Sample data for destinations
const destinations = [
    {
        name: "Fortaleza de Kuélap",
        image: "resources/img/kuelap_upscayl_2x_realesrgan-x4plus.png",
        description: "Una fortaleza prehistórica construida en tiempos de la Cultura Chachapoyana.",
        location: "Luya, Luya, Amazonas",
        province: "Luya",
        type: "Arqueológico"
    },
    {
        name: "Catarata de Gocta",
        image: "resources/img/gocta.png",
        description: "Una de las cataratas más altas del mundo, con una caída de 771 metros.",
        location: "Cocachimba, Bongará, Amazonas",
        province: "Bongara",
        type: "Natural"
    },
    {
        name: "Cavernas de Quiocta",
        image: "resources/img/quiocta.png",
        description: "Un sistema de cuevas con formaciones geológicas impresionantes y pinturas rupestres.",
        location: "Lamud, Luya, Amazonas",
        province: "Luya",
        type: "Natural"
    },
    {
        name: "Sarcófagos de Karajía",
        image: "resources/img/karajia.png",
        description: "Antiguos sarcófagos de la cultura Chachapoyas ubicados en acantilados.",
        location: "Luya, Luya, Amazonas",
        province: "Luya",
        type: "Arqueológico"
    },
    {
        name: "Laguna de los Cóndores",
        image: "resources/img/condores.png",
        description: "Un sitio arqueológico y natural con momias y artefactos de la cultura Chachapoyas.",
        location: "Leymebamba, Chachapoyas, Amazonas",
        province: "Chachapoyas",
        type: "Natural"
    }
];

// Function to create a destination card
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destino-card';
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}">
        <div class="destino-card-content">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="location">
                <i data-feather="map-pin"></i>
                <span>${destination.location}</span>
            </div>
        </div>
    `;
    return card;
}

// Function to render destination cards
function renderDestinations(destinationsToRender) {
    const destinosGrid = document.getElementById('destinos-grid');
    destinosGrid.innerHTML = '';
    destinationsToRender.forEach(destination => {
        const card = createDestinationCard(destination);
        destinosGrid.appendChild(card);
    });
    feather.replace();
}

// Function to filter destinations
function filterDestinations(name, province, type) {
    return destinations.filter(destination => {
        return (
            destination.name.toLowerCase().includes(name.toLowerCase()) &&
            (province === '' || destination.province === province) &&
            (type === '' || destination.type === type)
        );
    });
}

// Debounce function to limit the rate of function calls
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Function to perform search
const performSearch = debounce(() => {
    const name = document.getElementById('search-name').value;
    const province = document.getElementById('search-province').value;
    const type = document.getElementById('search-type').value;
    const filteredDestinations = filterDestinations(name, province, type);
    renderDestinations(filteredDestinations);
}, 300); // 300ms delay

// Add event listeners for real-time search
document.getElementById('search-name').addEventListener('input', performSearch);
document.getElementById('search-province').addEventListener('change', performSearch);
document.getElementById('search-type').addEventListener('change', performSearch);

// Remove form submit event listener as it's no longer needed
document.getElementById('search-form').removeEventListener('submit', performSearch);

// Prevent form submission
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
});

// Initial render of all destinations
renderDestinations(destinations);

// ... (previous JavaScript code remains unchanged) ...

// Existing JavaScript code remains unchanged

// Function to handle the floating vision tag and modal
function handleVisionTag() {
    const visionTag = document.getElementById('visionTag');
    const visionModal = document.getElementById('visionModal');
    const closeModal = document.getElementById('closeModal');

    visionTag.addEventListener('click', () => {
        visionModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        visionModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === visionModal) {
            visionModal.style.display = 'none';
        }
    });
}

// Function to handle the mobile menu toggle
function handleMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Function to handle the carousel
function handleCarousel() {
    // Existing carousel code
}

// Function to handle the search form
function handleSearch() {
    // Existing search form code
}

// Function to initialize Feather icons
function initFeatherIcons() {
    feather.replace();
}

// Main initialization function
function init() {
    handleMobileMenu();
    handleCarousel();
    handleSearch();
    initFeatherIcons();
    handleVisionTag();
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);