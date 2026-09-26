/* =========================================================
   AMAAN — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projects = {

        portfolio: {
            number: "01",
            category: "WEB DEVELOPMENT",
            title: "Personal Portfolio",
            description:
                "A modern mobile-first portfolio created from scratch to explore responsive design, animation, interaction and personal branding.",
            role: "Designer & Developer",
            tech: "HTML / CSS / JavaScript",
            focus: "Mobile-first design"
        },

        astronomy: {
            number: "02",
            category: "SCIENCE / EXPLORATION",
            title: "COSMOS",
            description:
                "An interactive solar-system experience built around planets, exploration, motion and the visual language of space.",
            role: "Designer & Developer",
            tech: "HTML / CSS / JavaScript",
            focus: "Science communication"
        },

        restaurant: {
            number: "03",
            category: "BUSINESS / WEB DESIGN",
            title: "NOIR",
            description:
                "A premium restaurant concept focused on atmosphere, visual identity, storytelling and digital brand experience.",
            role: "Designer & Developer",
            tech: "HTML / CSS / JavaScript",
            focus: "Brand experience"
        },

        vanta: {
            number: "04",
            category: "FASHION / E-COMMERCE",
            title: "VANTA",
            description:
                "A contemporary fashion storefront designed around structure, restraint, product presentation and a refined shopping experience.",
            role: "Designer & Developer",
            tech: "HTML / CSS / JavaScript",
            focus: "Digital storefront"
        },

        elan: {
            number: "05",
            category: "LUXURY / PRODUCT DESIGN",
            title: "ÉLAN",
            description:
                "A refined fragrance concept built around minimalism, quiet luxury, product storytelling and an elegant digital experience.",
            role: "Designer & Developer",
            tech: "HTML / CSS / JavaScript",
            focus: "Luxury product experience"
        }

    };


    /* =====================================================
       PROJECT LINKS
    ===================================================== */

    const liveProjects = {
        astronomy: "./solar.html",
        restaurant: "./noir.html",
        vanta: "./clothing.html",
        elan: "./perfume.html"
    };


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.style.overflow =
                isOpen ? "hidden" : "";

        });


        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.style.overflow = "";

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       PROJECT MODAL ELEMENTS
    ===================================================== */

    const projectModal =
        document.querySelector(".project-modal");

    const projectModalBackdrop =
        document.querySelector(".project-modal-backdrop");

    const modalNumber =
        document.getElementById("modalNumber");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalRole =
        document.getElementById("modalRole");

    const modalTech =
        document.getElementById("modalTech");

    const modalFocus =
        document.getElementById("modalFocus");

    const modalClose =
        document.querySelector(".modal-close");


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openModal(projectKey) {

        const project =
            projects[projectKey];

        if (!project || !projectModal) {
            return;
        }

        if (modalNumber) {
            modalNumber.textContent =
                project.number;
        }

        if (modalCategory) {
            modalCategory.textContent =
                project.category;
        }

        if (modalTitle) {
            modalTitle.textContent =
                project.title;
        }

        if (modalDescription) {
            modalDescription.textContent =
                project.description;
        }

        if (modalRole) {
            modalRole.textContent =
                project.role;
        }

        if (modalTech) {
            modalTech.textContent =
                project.tech;
        }

        if (modalFocus) {
            modalFocus.textContent =
                project.focus;
        }

        projectModal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (!projectModal) {
            return;
        }

        projectModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (projectModalBackdrop) {

        projectModalBackdrop.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =====================================================
       PROJECT BUTTONS
    ===================================================== */

    document.querySelectorAll(".project-open").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const projectKey =
                button.getAttribute("data-project");

            /* ---------------------------------------------
               OPEN REAL WEBSITE
            --------------------------------------------- */

            if (liveProjects[projectKey]) {

                window.location.assign(
                    liveProjects[projectKey]
                );

                return;

            }

            /* ---------------------------------------------
               PERSONAL PORTFOLIO → MODAL
            --------------------------------------------- */

            openModal(projectKey);

        });

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.querySelector("header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       SECTION OBSERVER
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav a[href^="#"]'
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentID =
                            entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${currentID}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach(section => {

            observer.observe(section);

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up, .project-card, .service-item, .skill-item"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

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


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       PROJECT CARD MOUSE EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".project-card"
    ).forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.setProperty(
                    "--mouse-x",
                    "0px"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "0px"
                );

            }
        );

    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    document.querySelectorAll(
        ".magnetic"
    ).forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform = "";

            }
        );

    });


    /* =====================================================
       INSTAGRAM
    ===================================================== */

    document.querySelectorAll(
        '[data-social="instagram"]'
    ).forEach(link => {

        link.href =
            "https://www.instagram.com/minimalistic.xo/";

        link.target = "_blank";
        link.rel = "noopener noreferrer";

    });


    /* =====================================================
       PINTEREST
    ===================================================== */

    document.querySelectorAll(
        '[data-social="pinterest"]'
    ).forEach(link => {

        link.href =
            "https://www.pinterest.com/amaannkk/";

        link.target = "_blank";
        link.rel = "noopener noreferrer";

    });


    /* =====================================================
       IMAGE SETTINGS
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        if (!image.hasAttribute("loading")) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

        image.addEventListener(
            "dragstart",
            event => {
                event.preventDefault();
            }
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document.querySelectorAll(
        "[data-year]"
    ).forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "Amaan Portfolio — JavaScript loaded successfully."
    );

});