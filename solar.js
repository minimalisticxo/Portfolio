/* =========================================================
   COSMOS — SOLAR SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PLANET DATA
    ===================================================== */

    const planets = {

        mercury: {
            number: "01",
            name: "Mercury",
            type: "TERRESTRIAL PLANET",
            shortType: "TERRESTRIAL",
            image: "./assets/planets/mercury.jpg",
            description:
                "Mercury is the smallest planet in our Solar System and the closest world to the Sun. Its cratered surface experiences enormous temperature changes."
        },

        venus: {
            number: "02",
            name: "Venus",
            type: "TERRESTRIAL PLANET",
            shortType: "TERRESTRIAL",
            image: "./assets/planets/venus.jpg",
            description:
                "Venus is a rocky world covered by a thick atmosphere and bright clouds. Its powerful greenhouse effect makes its surface extremely hot."
        },

        earth: {
            number: "03",
            name: "Earth",
            type: "TERRESTRIAL PLANET",
            shortType: "TERRESTRIAL",
            image: "./assets/planets/earth.jpg",
            description:
                "Earth is our home world, with vast oceans, continents and an atmosphere capable of supporting the life we know."
        },

        mars: {
            number: "04",
            name: "Mars",
            type: "TERRESTRIAL PLANET",
            shortType: "TERRESTRIAL",
            image: "./assets/planets/mars.jpg",
            description:
                "Mars is a cold, dusty world with ancient valleys, enormous volcanoes, polar ice and evidence that water once flowed across its surface."
        },

        jupiter: {
            number: "05",
            name: "Jupiter",
            type: "GAS GIANT",
            shortType: "GAS GIANT",
            image: "./assets/planets/jupiter.jpg",
            description:
                "Jupiter is the largest planet in our Solar System. Its atmosphere contains enormous storms, including the famous Great Red Spot."
        },

        saturn: {
            number: "06",
            name: "Saturn",
            type: "GAS GIANT",
            shortType: "GAS GIANT",
            image: "./assets/planets/saturn.jpg",
            description:
                "Saturn is a massive gas giant surrounded by an extraordinary system of rings made from countless pieces of ice and rock."
        },

        uranus: {
            number: "07",
            name: "Uranus",
            type: "ICE GIANT",
            shortType: "ICE GIANT",
            image: "./assets/planets/uranus.jpg",
            description:
                "Uranus is an ice giant with a pale blue atmosphere. Its extreme axial tilt makes the planet appear to rotate almost on its side."
        },

        neptune: {
            number: "08",
            name: "Neptune",
            type: "ICE GIANT",
            shortType: "ICE GIANT",
            image: "./assets/planets/neptune.jpg",
            description:
                "Neptune is the most distant planet in our Solar System, with a deep blue atmosphere and some of the fastest winds known on any planet."
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".planet-selector button"
        );

    const image =
        document.querySelector("#planet-image");

    const imageWrapper =
        document.querySelector(
            ".planet-image-wrapper"
        );

    const imageNumber =
        document.querySelector(
            "#planet-image-number"
        );

    const name =
        document.querySelector(
            "#planet-name"
        );

    const description =
        document.querySelector(
            "#planet-description"
        );

    const typeLabel =
        document.querySelector(
            "#planet-type-label"
        );

    const order =
        document.querySelector(
            "#planet-order"
        );

    const type =
        document.querySelector(
            "#planet-type"
        );


    /* =====================================================
       CHANGE PLANET
    ===================================================== */

    function selectPlanet(key) {

        const planet = planets[key];

        if (!planet) return;


        /* Active button */

        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.planet === key
            );

        });


        /* Image fade */

        if (imageWrapper) {
            imageWrapper.classList.add("changing");
        }


        setTimeout(() => {

            if (image) {

                image.src = planet.image;

                image.alt =
                    `${planet.name} planet`;

            }

            if (imageNumber) {
                imageNumber.textContent =
                    planet.number;
            }

            if (name) {
                name.textContent =
                    planet.name;
            }

            if (description) {
                description.textContent =
                    planet.description;
            }

            if (typeLabel) {
                typeLabel.textContent =
                    planet.type;
            }

            if (order) {
                order.textContent =
                    planet.number;
            }

            if (type) {
                type.textContent =
                    planet.shortType;
            }


            if (imageWrapper) {

                requestAnimationFrame(() => {

                    imageWrapper.classList.remove(
                        "changing"
                    );

                });

            }

        }, 250);

    }


    /* =====================================================
       PLANET SELECTOR BUTTONS
    ===================================================== */

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectPlanet(
                    button.dataset.planet
                );

            }
        );

    });


    /* =====================================================
       CLICK PLANETS IN SOLAR SYSTEM
    ===================================================== */

    document
        .querySelectorAll(".planet")
        .forEach(planet => {

            planet.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const key =
                        planet.dataset.planet;

                    selectPlanet(key);

                    const explorer =
                        document.querySelector(
                            "#planet-explorer"
                        );

                    if (explorer) {

                        explorer.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       DEFAULT
    ===================================================== */

    selectPlanet("earth");


    /* =====================================================
       EXPLORE BUTTON
    ===================================================== */

    const exploreButton =
        document.querySelector(".explore-btn");

    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            () => {

                document
                    .querySelector("#intro")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-label, .intro-content, .planet-selector, .planet-info, .scale-content, .final-content"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       STAR PARALLAX
    ===================================================== */

    const stars =
        document.querySelector(".stars");

    const stars2 =
        document.querySelector(".stars-2");

    const stars3 =
        document.querySelector(".stars-3");


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;

            mouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;

        }
    );


    function parallax() {

        currentX +=
            (mouseX - currentX) * 0.035;

        currentY +=
            (mouseY - currentY) * 0.035;


        if (stars) {

            stars.style.transform =
                `translate(
                    ${currentX * 4}px,
                    ${currentY * 4}px
                )`;

        }

        if (stars2) {

            stars2.style.transform =
                `translate(
                    ${currentX * 7}px,
                    ${currentY * 7}px
                )`;

        }

        if (stars3) {

            stars3.style.transform =
                `translate(
                    ${currentX * 11}px,
                    ${currentY * 11}px
                )`;

        }


        requestAnimationFrame(parallax);

    }

    parallax();


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const footer =
        document.querySelector(".footer-year");

    if (footer) {
        footer.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    if (image) {

        image.addEventListener(
            "error",
            () => {

                imageWrapper?.classList.remove(
                    "changing"
                );

                image.style.objectFit =
                    "contain";

                image.style.padding =
                    "60px";

                image.style.opacity =
                    "0.35";

            }
        );

    }

});