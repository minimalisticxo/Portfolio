/* =========================================
   NOIR — INTERACTION SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       DISH DATA
    ========================================== */

    const dishes = {

        "dish-1": {
            number: "01",
            title: "Charred Garden",
            description:
                "Seasonal vegetables, smoked butter, herbs and roasted grains — a celebration of ingredients at their most natural.",
            price: "₹ 680",
            image:
                "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=90"
        },

        "dish-2": {
            number: "02",
            title: "Ember Chicken",
            description:
                "Fire-roasted chicken finished with black garlic glaze, wild herbs and a delicate balance of smoke and sweetness.",
            price: "₹ 890",
            image:
                "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1400&q=90"
        },

        "dish-3": {
            number: "03",
            title: "Midnight Pasta",
            description:
                "Handmade pasta with aged cheese, wild mushrooms and truffle — rich, earthy and deliberately understated.",
            price: "₹ 760",
            image:
                "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=90"
        },

        "dish-4": {
            number: "04",
            title: "Noir Chocolate",
            description:
                "Dark chocolate, sea salt, cacao and vanilla cream — an elegant finish built around contrast.",
            price: "₹ 520",
            image:
                "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1400&q=90"
        }

    };


    /* =========================================
       CINEMATIC INTRO
    ========================================== */

    const intro = document.createElement("div");

    intro.className = "noir-intro";

    intro.innerHTML = `
        <div class="intro-line"></div>

        <div class="intro-content">

            <span class="intro-label">
                EST. 2026
            </span>

            <h1>
                NOIR
            </h1>

            <p>
                TASTE THE EXTRAORDINARY
            </p>

        </div>

        <div class="intro-bottom">

            <span>
                RESTAURANT / EXPERIENCE
            </span>

            <span>
                INDIA
            </span>

        </div>
    `;

    document.body.prepend(intro);

    document.body.classList.add("noir-loading");


    window.setTimeout(() => {

        intro.classList.add("intro-finished");

        document.body.classList.remove("noir-loading");

        window.setTimeout(() => {
            intro.remove();
        }, 900);

    }, 2800);



    /* =========================================
       RESERVATION MODAL
    ========================================== */

    const reservationModal =
        document.getElementById("reservationModal");

    const reservationBackdrop =
        document.getElementById("reservationBackdrop");

    const reservationForm =
        document.getElementById("reservationForm");

    const reservationContent =
        document.getElementById("reservationContent");

    const reservationSuccess =
        document.getElementById("reservationSuccess");

    const closeReservation =
        document.getElementById("closeReservation");

    const successClose =
        document.getElementById("successClose");


    function openReservation() {

        if (!reservationModal) return;

        reservationModal.classList.add("open");

        reservationModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        setTimeout(() => {

            const firstInput =
                document.getElementById("guestName");

            if (firstInput) {
                firstInput.focus();
            }

        }, 300);

    }


    function closeReservationModal() {

        if (!reservationModal) return;

        reservationModal.classList.remove("open");

        reservationModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    [
        "openReservation",
        "heroReserve",
        "menuReserve",
        "reserveCTA",
        "finalReserve",
        "contactReserve"
    ].forEach(id => {

        const button =
            document.getElementById(id);

        if (button) {

            button.addEventListener(
                "click",
                openReservation
            );

        }

    });


    if (closeReservation) {

        closeReservation.addEventListener(
            "click",
            closeReservationModal
        );

    }


    if (reservationBackdrop) {

        reservationBackdrop.addEventListener(
            "click",
            closeReservationModal
        );

    }


    if (successClose) {

        successClose.addEventListener(
            "click",
            () => {

                closeReservationModal();

                setTimeout(() => {

                    if (reservationForm) {
                        reservationForm.reset();
                    }

                    if (reservationContent) {
                        reservationContent.style.display =
                            "";
                    }

                    if (reservationSuccess) {
                        reservationSuccess.classList.remove(
                            "show"
                        );
                    }

                }, 400);

            }
        );

    }


    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                reservationContent.style.display =
                    "none";

                reservationSuccess.classList.add(
                    "show"
                );

            }
        );

    }



    /* =========================================
       DISH VIEWER
    ========================================== */

    const dishViewer =
        document.createElement("div");

    dishViewer.className =
        "dish-viewer";

    dishViewer.innerHTML = `

        <div class="dish-viewer-backdrop"></div>

        <div class="dish-viewer-panel">

            <button
                class="dish-viewer-close"
                aria-label="Close dish"
            >
                ×
            </button>

            <div class="dish-viewer-image"></div>

            <div class="dish-viewer-content">

                <span class="dish-viewer-number"></span>

                <h2></h2>

                <p class="dish-viewer-description"></p>

                <span class="dish-viewer-price"></span>

                <button
                    class="dish-reserve-button"
                >
                    Reserve a table ↗
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(dishViewer);


    const dishViewerImage =
        dishViewer.querySelector(
            ".dish-viewer-image"
        );

    const dishViewerNumber =
        dishViewer.querySelector(
            ".dish-viewer-number"
        );

    const dishViewerTitle =
        dishViewer.querySelector(
            "h2"
        );

    const dishViewerDescription =
        dishViewer.querySelector(
            ".dish-viewer-description"
        );

    const dishViewerPrice =
        dishViewer.querySelector(
            ".dish-viewer-price"
        );

    const dishViewerClose =
        dishViewer.querySelector(
            ".dish-viewer-close"
        );

    const dishViewerBackdrop =
        dishViewer.querySelector(
            ".dish-viewer-backdrop"
        );

    const dishReserveButton =
        dishViewer.querySelector(
            ".dish-reserve-button"
        );


    function openDishViewer(id) {

        const dish = dishes[id];

        if (!dish) return;


        dishViewerImage.style.backgroundImage =
            `url("${dish.image}")`;

        dishViewerNumber.textContent =
            dish.number;

        dishViewerTitle.textContent =
            dish.title;

        dishViewerDescription.textContent =
            dish.description;

        dishViewerPrice.textContent =
            dish.price;


        dishViewer.classList.add("open");

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeDishViewer() {

        dishViewer.classList.remove("open");

        if (
            !reservationModal ||
            !reservationModal.classList.contains("open")
        ) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    }


    document
        .querySelectorAll(".menu-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const id =
                        item.dataset.dish;

                    openDishViewer(id);

                }
            );

        });


    dishViewerClose.addEventListener(
        "click",
        closeDishViewer
    );


    dishViewerBackdrop.addEventListener(
        "click",
        closeDishViewer
    );


    dishReserveButton.addEventListener(
        "click",
        () => {

            closeDishViewer();

            setTimeout(
                openReservation,
                250
            );

        }
    );



    /* =========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                dishViewer.classList.contains("open")
            ) {

                closeDishViewer();

            }


            if (
                reservationModal &&
                reservationModal.classList.contains("open")
            ) {

                closeReservationModal();

            }

        }
    );



    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .menu-item, .experience-card, .detail-card"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =========================================
       STAGGERED MENU ANIMATION
    ========================================== */

    document
        .querySelectorAll(".menu-item")
        .forEach(
            (item, index) => {

                item.style.transitionDelay =
                    `${index * 0.08}s`;

            }
        );



    /* =========================================
       EXPERIENCE STAGGER
    ========================================== */

    document
        .querySelectorAll(".experience-card")
        .forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 0.12}s`;

            }
        );



    /* =========================================
       DETAIL CARD STAGGER
    ========================================== */

    document
        .querySelectorAll(".detail-card")
        .forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 0.1}s`;

            }
        );



    /* =========================================
       HERO PARALLAX
    ========================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (
        heroImage &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `scale(1.03) translateY(${scroll * 0.12}px)`;

                }

            },
            {
                passive: true
            }
        );

    }



    /* =========================================
       ATMOSPHERE PARALLAX
    ========================================== */

    const atmosphereImage =
        document.querySelector(
            ".atmosphere-image"
        );


    if (
        atmosphereImage &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const rect =
                    atmosphereImage.parentElement
                        .getBoundingClientRect();

                const viewport =
                    window.innerHeight;

                const progress =
                    (viewport - rect.top) /
                    (viewport + rect.height);

                const movement =
                    (progress - 0.5) * 35;

                atmosphereImage.style.transform =
                    `scale(1.07) translateY(${movement}px)`;

            },
            {
                passive: true
            }
        );

    }



    /* =========================================
       NAVIGATION SCROLL STATE
    ========================================== */

    const nav =
        document.querySelector(
            ".noir-nav"
        );


    function updateNav() {

        if (!nav) return;

        if (window.scrollY > 50) {

            nav.classList.add(
                "scrolled"
            );

        } else {

            nav.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNav,
        {
            passive: true
        }
    );

    updateNav();



    /* =========================================
       ACTIVE NAVIGATION
    ========================================== */

    const sections =
        document.querySelectorAll(
            "#story, #menu, #experience"
        );

    const navLinks =
        document.querySelectorAll(
            ".noir-nav-links a"
        );


    const activeObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    `.noir-nav-links a[href="#${entry.target.id}"]`
                                );


                            if (activeLink) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-30% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            activeObserver.observe(
                section
            );

        }
    );



    /* =========================================
       SMOOTH ANCHOR SCROLL
    ========================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =========================================
       CUSTOM CURSOR
    ========================================== */

    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        finePointer &&
        !reducedMotion
    ) {

        document.body.classList.add(
            "custom-cursor"
        );


        const cursor =
            document.querySelector(
                ".noir-cursor"
            );

        const ring =
            document.querySelector(
                ".noir-cursor-ring"
            );


        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                if (cursor) {

                    cursor.style.left =
                        `${mouseX}px`;

                    cursor.style.top =
                        `${mouseY}px`;

                }

            }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.16;

            ringY +=
                (mouseY - ringY) * 0.16;


            if (ring) {

                ring.style.left =
                    `${ringX}px`;

                ring.style.top =
                    `${ringY}px`;

            }


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const cursorTargets =
            document.querySelectorAll(
                "a, button, .menu-item, .editorial-image"
            );


        cursorTargets.forEach(
            target => {

                target.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                target.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }



    /* =========================================
       BUTTON MOUSE GLOW
    ========================================== */

    document
        .querySelectorAll(
            ".noir-button, .dish-reserve-button"
        )
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    button.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    button.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });



    /* =========================================
       FOOTER YEAR
    ========================================== */

    const footerYear =
        document.querySelector(
            ".footer-year"
        );


    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }



    /* =========================================
       DISABLE BACKGROUND SCROLL
       WHEN MODAL IS OPEN
    ========================================== */

    const style =
        document.createElement("style");

    style.textContent = `
        body.modal-open {
            overflow: hidden;
        }
    `;

    document.head.appendChild(style);



    /* =========================================
       CONSOLE BRANDING
    ========================================== */

    console.log(
        "%cNOIR",
        "font-family: serif; font-size: 40px; color: #b99b67;"
    );

    console.log(
        "%cTaste the extraordinary.",
        "font-size: 13px; color: #888;"
    );

});