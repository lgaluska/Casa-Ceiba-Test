let currentImages = [];
let currentIndex = 0;

// ==========================
// Mobile menu
// ==========================

const menuButton =
    document.getElementById("menuButton");

const menu =
    document.getElementById("menu");

if (menuButton && menu) {

    menuButton.addEventListener(
        "click",
        () => {
            menu.classList.toggle("open");
        }
    );

}

// ==========================
// Dynamic gallery
// ==========================


const gallery =
    document.getElementById("gallery");

const filters =
    document.getElementById(
        "galleryFilters"
    );

function drawGallery(
    selectedCategory = "All"
) {

    gallery.innerHTML = "";

    Object.entries(
        galleryImages
    ).forEach(

        ([category, images]) => {

            if (
                selectedCategory !== "All"
                &&
                category !== selectedCategory
            ) {
                return;
            }

            images.forEach(

                (name, index) => {

                    const img =
                        document.createElement(
                            "img"
                        );

                    img.src =
                        `thumb/${name}.webp`;

                    img.loading =
                        "lazy";

                    img.alt =
                        name;

                    img.onclick =
                        () => {

                            openLightbox(
                                images,
                                index
                            );

                        };

                    gallery.appendChild(
                        img
                    );

                }

            );

        }

    );

}

function createFilters() {

    const categories =
        Object.keys(
            galleryImages
        );

    const all =
        document.createElement(
            "button"
        );

    all.textContent = "All";
    all.classList.add(
        "active"
    );

    filters.appendChild(
        all
    );

    all.onclick = () => {

        activateButton(all);
        drawGallery("All");

    };

    categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                category;

            button.onclick =
                () => {

                    activateButton(
                        button
                    );

                    drawGallery(
                        category
                    );

                };

            filters.appendChild(
                button
            );

        }
    );
}

function activateButton(
    activeButton
) {

    document
        .querySelectorAll(
            "#galleryFilters button"
        )
        .forEach(
            button =>
                button.classList.remove(
                    "active"
                )
        );

    activeButton.classList.add(
        "active"
    );
}

createFilters();
drawGallery();


// ==========================
// Lightbox
// ==========================

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


if (lightbox) {

    lightbox.addEventListener(
        "click",
        () => {

            lightbox.style.display =
                "none";

        }
    );

}

function openLightbox(
    images,
    index
) {

    currentImages = images;
    currentIndex = index;

    updateLightbox();

    lightbox.style.display =
        "flex";
}

function updateLightbox() {

    const name =
        currentImages[currentIndex];

    lightboxImage.src =
        `web/${name}.webp`;

    document.getElementById(
        "lightboxCounter"
    ).textContent =
        `${currentIndex + 1} / ${currentImages.length}`;
}

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex =
            currentImages.length - 1;
    }

    updateLightbox();
}

function nextImage() {

    currentIndex++;

    if (
        currentIndex >=
        currentImages.length
    ) {
        currentIndex = 0;
    }

    updateLightbox();
}

document
    .getElementById(
        "prevButton"
    )
    .onclick = e => {

        e.stopPropagation();
        previousImage();

    };

document
    .getElementById(
        "nextButton"
    )
    .onclick = e => {

        e.stopPropagation();
        nextImage();

    };

    lightbox.onclick = e => {

    if (
        e.target === lightbox
    ) {

        lightbox.style.display =
            "none";

    }
};

document.addEventListener(
    "keydown",
    e => {

        if (
            lightbox.style.display !==
            "flex"
        ) {
            return;
        }

        if (
            e.key === "ArrowLeft"
        ) {
            previousImage();
        }

        if (
            e.key === "ArrowRight"
        ) {
            nextImage();
        }

        if (
            e.key === "Escape"
        ) {
            lightbox.style.display =
                "none";
        }

    }
);

const aboutImages = [

    "bedr01",
    "bedr02",
    "outd01",
    "outd02",
    "surr06"
];

let aboutIndex = 0;

const aboutSlideshow =
    document.getElementById(
        "aboutSlideshow"
    );

if (aboutSlideshow) {

    setInterval(() => {

        aboutSlideshow.classList.add(
            "fade-out"
        );

        setTimeout(() => {

            aboutIndex++;

            if (
                aboutIndex >=
                aboutImages.length
            ) {
                aboutIndex = 0;
            }

            aboutSlideshow.src =
                `web/${aboutImages[aboutIndex]}.webp`;

            aboutSlideshow.classList.remove(
                "fade-out"
            );

        }, 1200);

    }, 5000);

}

const logo =
    document.getElementById(
        "headerLogo"
    );

const nav =
    document.querySelector(
        "nav"
    );

const hero =
    document.querySelector(
        ".hero"
    );

const observer =
    new IntersectionObserver(

        entries => {

            const entry =
                entries[0];

            if (
                entry.isIntersecting
            ) {

                logo.src =
                    "CasaCeibaLogoLight.png";

                nav.classList.remove(
                    "scrolled"
                );

            }
            else {

                logo.src =
                    "CasaCeibaLogoDark.png";

                nav.classList.add(
                    "scrolled"
                );

            }

        },

        {
            threshold: 0.01
        }

    );

observer.observe(hero);
