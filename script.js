/* =====================================
   Casa Ceiba
   script.js
===================================== */

/* =====================================
   Global variables
===================================== */

// Images currently displayed in Lightbox

let currentIndex = 0;

let lightboxImages = [];

let visibleImages = [];

/* =====================================
   DOM references
===================================== */

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

const gallery = document.getElementById("gallery");
const filters = document.getElementById("galleryFilters");

/* =====================================
   Mobile menu
===================================== */

if (menuButton && menu) {

    menuButton.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

}

/* =====================================
   Gallery
===================================== */

// Draw gallery according to selected category
function drawGallery(selectedCategory = "All") {

    gallery.innerHTML = "";
    visibleImages = [];

    Object.entries(galleryImages).forEach(([category, images]) => {

        if (selectedCategory !== "All" && category !== selectedCategory) {
            return;
        }

        images.forEach(name => {

            const img = document.createElement("img");

            img.src = `thumb/${name}.webp`;
            img.alt = name;
            img.loading = "lazy";

            img.onclick = () => {

                const imageIndex = visibleImages.indexOf(name);
                openLightbox(visibleImages, imageIndex);

            };

            visibleImages.push(name);
            gallery.appendChild(img);

        });

    });

}

/* =====================================
   Gallery filters
===================================== */

// Create filter buttons
function createFilters() {

    const categories = Object.keys(galleryImages);

    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.classList.add("active");

    allButton.onclick = () => {
        activateButton(allButton);
        drawGallery("All");
    };

    filters.appendChild(allButton);

    categories.forEach(category => {

        const button = document.createElement("button");

        button.textContent = category;

        button.onclick = () => {
            activateButton(button);
            drawGallery(category);
        };

        filters.appendChild(button);

    });

}

// Highlight selected filter
function activateButton(activeButton) {

    document
        .querySelectorAll("#galleryFilters button")
        .forEach(button => button.classList.remove("active"));

    activeButton.classList.add("active");

}

/* =====================================
   Initialization
===================================== */

createFilters();
drawGallery();


/* =====================================
   Lightbox
===================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const lightboxCounter = document.getElementById("lightboxCounter");

// Open selected image
function openLightbox(images, index) {

    lightboxImages  = images;
    currentIndex = index;

    updateLightbox();

    lightbox.style.display = "flex";

}

// Refresh displayed image and counter
function updateLightbox() {

    const name = lightboxImages[currentIndex];

    lightboxImage.src = `web/${name}.webp`;
    lightboxCounter.textContent =
        `${currentIndex + 1} / ${lightboxImages.length}`;

}

// Previous image
function previousImage() {

    currentIndex =
        (currentIndex - 1 + lightboxImages.length)
        % lightboxImages.length;

    updateLightbox();

}

// Next image
function nextImage() {

    currentIndex =
        (currentIndex + 1)
        % lightboxImages.length;

    updateLightbox();

}

// Buttons
prevButton.onclick = e => {

    e.stopPropagation();
    previousImage();

};

nextButton.onclick = e => {

    e.stopPropagation();
    nextImage();

};

// Close only when clicking outside the image
lightbox.onclick = e => {

    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }

};

// Keyboard control
document.addEventListener("keydown", e => {

    if (lightbox.style.display !== "flex") {
        return;
    }

    switch (e.key) {

        case "ArrowLeft":
            previousImage();
            break;

        case "ArrowRight":
            nextImage();
            break;

        case "Escape":
            lightbox.style.display = "none";
            break;

    }

});

/* =====================================
   About slideshow
===================================== */

const aboutImages = [
    "bedr01",
    "bedr02",
    "outd01",
    "outd02",
    "surr06"
];

let aboutIndex = 0;

const aboutSlideshow =
    document.getElementById("aboutSlideshow");

// Advance slideshow index
function nextAboutImage() {

    aboutIndex =
        (aboutIndex + 1)
        % aboutImages.length;

}

// Show first image
if (aboutSlideshow && aboutImages.length > 0) {
    aboutSlideshow.src = `web/${aboutImages[0]}.webp`;
}

// Missing image handler
if (aboutSlideshow) {

    aboutSlideshow.onerror = () => {

        console.warn("Missing image:", aboutSlideshow.src);

        nextAboutImage();

        aboutSlideshow.src =
            `web/${aboutImages[aboutIndex]}.webp`;

    };

}

// Automatic slideshow
if (aboutSlideshow) {

    setInterval(() => {

        aboutSlideshow.classList.add("fade-out");

        setTimeout(() => {

            nextAboutImage();

            aboutSlideshow.src =
                `web/${aboutImages[aboutIndex]}.webp`;

            aboutSlideshow.classList.remove("fade-out");

        }, 1200);

    }, 5000);

}

/* =====================================
   Header observer
===================================== */

const logo = document.getElementById("headerLogo");
const nav = document.querySelector("nav");
const hero = document.querySelector(".hero");

const observer = new IntersectionObserver(entries => {

    const entry = entries[0];

    if (entry.isIntersecting) {

        logo.src = "CasaCeibaLogoLight.png";
        nav.classList.remove("scrolled");

    } else {

        logo.src = "CasaCeibaLogoDark.png";
        nav.classList.add("scrolled");

    }

}, {
    threshold: 0.01
});

/* =====================================
   Initialization
===================================== */

if (hero) {
    observer.observe(hero);
}
