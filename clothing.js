/* =========================================================
   VANTA — CLOTHING BRAND
   clothing.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       ELEMENTS
       ========================================================= */

    const body = document.body;

    // Loader
    const loader = document.getElementById("vantaLoader");

    // Navigation
    const header = document.querySelector(".vanta-header");
    const menuButton = document.getElementById("vantaMenuButton");
    const mobileMenu = document.getElementById("vantaMobileMenu");
    const mobileLinks = document.querySelectorAll(".vanta-mobile-link");

    // Newsletter
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterMessage = document.getElementById("newsletterMessage");

    // Product modal
    const productModal = document.getElementById("productModal");
    const productModalBackdrop = document.getElementById("productModalBackdrop");
    const productModalClose = document.getElementById("productModalClose");

    const modalProductImage = document.getElementById("productModalImage");
    const modalProductNumber = document.getElementById("modalProductNumber");
    const modalProductCategory = document.getElementById("modalProductCategory");
    const modalProductTitle = document.getElementById("modalProductTitle");
    const modalProductDescription = document.getElementById("modalProductDescription");
    const modalProductPrice = document.getElementById("modalProductPrice");

    const modalAddButton = document.getElementById("modalAddButton");
    const modalAddedMessage = document.getElementById("modalAddedMessage");

    // Footer
    const footerYear = document.getElementById("footerYear");

    // Product cards
    const productCards = document.querySelectorAll("[data-product]");

    // Size buttons
    const sizeButtons = document.querySelectorAll(".size-option");

    // Cursor
    const cursor = document.querySelector(".vanta-cursor");
    const cursorDot = document.querySelector(".vanta-cursor-dot");


    /* =========================================================
       PRODUCT DATA
       ========================================================= */

    const products = {
        structure: {
            number: "01",
            category: "OUTERWEAR",
            title: "Structure Jacket",
            description:
                "A sharp everyday layer built around clean proportions, structured shoulders and a minimal silhouette.",
            price: "₹ 4,800",
            image:
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85"
        },

        form: {
            number: "02",
            category: "ESSENTIALS",
            title: "Form Shirt",
            description:
                "A refined essential designed with a relaxed cut, understated detailing and a focus on everyday movement.",
            price: "₹ 2,400",
            image:
                "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85"
        },

        trousers: {
            number: "03",
            category: "BOTTOMS",
            title: "Wide Trousers",
            description:
                "Wide-leg trousers with a clean architectural shape, designed to create an effortless contemporary silhouette.",
            price: "₹ 3,200",
            image:
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85"
        },

        core: {
            number: "04",
            category: "ESSENTIALS",
            title: "Core T-Shirt",
            description:
                "A foundational piece with a substantial feel and relaxed fit. Simple by design, intentional in every detail.",
            price: "₹ 1,600",
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85"
        }
    };


    /* =========================================================
       LOADER
       ========================================================= */

    const hideLoader = () => {
        if (!loader) return;

        loader.classList.add("is-hidden");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    };

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 500);
    });

    // Safety fallback
    setTimeout(hideLoader, 3000);


    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */

    const openMenu = () => {
        if (!menuButton || !mobileMenu) return;

        menuButton.classList.add("is-active");
        mobileMenu.classList.add("is-open");

        menuButton.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");

        body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!menuButton || !mobileMenu) return;

        menuButton.classList.remove("is-active");
        mobileMenu.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");

        body.classList.remove("menu-open");
    };

    const toggleMenu = () => {
        if (!mobileMenu) return;

        if (mobileMenu.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    if (menuButton) {
        menuButton.addEventListener("click", toggleMenu);
    }

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /* =========================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ========================================================= */

    document.addEventListener("click", (event) => {
        if (!mobileMenu || !menuButton) return;

        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedButton = menuButton.contains(event.target);

        if (
            mobileMenu.classList.contains("is-open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {
            closeMenu();
        }
    });


    /* =========================================================
       NAVIGATION SCROLL STATE
       ========================================================= */

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();


    /* =========================================================
       PRODUCT MODAL
       ========================================================= */

    let activeProduct = null;
    let selectedSize = "M";

    const openProductModal = (productKey) => {
        const product = products[productKey];

        if (!product || !productModal) return;

        activeProduct = productKey;

        if (modalProductImage) {
            modalProductImage.src = product.image;
            modalProductImage.alt = product.title;
        }

        if (modalProductNumber) {
            modalProductNumber.textContent = product.number;
        }

        if (modalProductCategory) {
            modalProductCategory.textContent = product.category;
        }

        if (modalProductTitle) {
            modalProductTitle.textContent = product.title;
        }

        if (modalProductDescription) {
            modalProductDescription.textContent = product.description;
        }

        if (modalProductPrice) {
            modalProductPrice.textContent = product.price;
        }

        if (modalAddedMessage) {
            modalAddedMessage.textContent = "";
            modalAddedMessage.classList.remove("is-visible");
        }

        if (modalAddButton) {
            modalAddButton.disabled = false;
            modalAddButton.classList.remove("is-added");
            modalAddButton.textContent = "Add to collection";
        }

        productModal.classList.add("is-open");
        productModal.setAttribute("aria-hidden", "false");

        body.classList.add("modal-open");

        // Reset size
        selectedSize = "M";

        sizeButtons.forEach((button) => {
            button.classList.toggle(
                "is-selected",
                button.dataset.size === selectedSize
            );
        });
    };

    const closeProductModal = () => {
        if (!productModal) return;

        productModal.classList.remove("is-open");
        productModal.setAttribute("aria-hidden", "true");

        body.classList.remove("modal-open");

        activeProduct = null;
    };


    /* =========================================================
       PRODUCT CARD EVENTS
       ========================================================= */

    productCards.forEach((card) => {
        card.addEventListener("click", () => {
            const productKey = card.dataset.product;

            if (productKey) {
                openProductModal(productKey);
            }
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                const productKey = card.dataset.product;

                if (productKey) {
                    openProductModal(productKey);
                }
            }
        });
    });


    /* =========================================================
       PRODUCT MODAL CLOSE
       ========================================================= */

    if (productModalClose) {
        productModalClose.addEventListener("click", closeProductModal);
    }

    if (productModalBackdrop) {
        productModalBackdrop.addEventListener("click", closeProductModal);
    }


    /* =========================================================
       SIZE SELECTOR
       ========================================================= */

    sizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            sizeButtons.forEach((item) => {
                item.classList.remove("is-selected");
            });

            button.classList.add("is-selected");

            selectedSize = button.dataset.size || button.textContent.trim();
        });
    });


    /* =========================================================
       ADD TO COLLECTION
       ========================================================= */

    if (modalAddButton) {
        modalAddButton.addEventListener("click", () => {
            if (!activeProduct) return;

            modalAddButton.disabled = true;
            modalAddButton.classList.add("is-added");
            modalAddButton.textContent = "Added";

            if (modalAddedMessage) {
                modalAddedMessage.textContent =
                    `${products[activeProduct].title} · Size ${selectedSize} added to your collection.`;

                modalAddedMessage.classList.add("is-visible");
            }

            setTimeout(() => {
                if (!modalAddButton) return;

                modalAddButton.disabled = false;
                modalAddButton.classList.remove("is-added");
                modalAddButton.textContent = "Add to collection";
            }, 1800);
        });
    }


    /* =========================================================
       NEWSLETTER
       ========================================================= */

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = newsletterEmail
                ? newsletterEmail.value.trim()
                : "";

            if (!email) {
                if (newsletterMessage) {
                    newsletterMessage.textContent =
                        "Enter your email to join VANTA.";
                    newsletterMessage.classList.add("is-visible");
                }

                return;
            }

            if (!email.includes("@")) {
                if (newsletterMessage) {
                    newsletterMessage.textContent =
                        "Please enter a valid email address.";
                    newsletterMessage.classList.add("is-visible");
                }

                return;
            }

            if (newsletterMessage) {
                newsletterMessage.textContent =
                    "You're on the list. Welcome to VANTA.";
                newsletterMessage.classList.add("is-visible");
            }

            newsletterForm.classList.add("is-submitted");

            if (newsletterEmail) {
                newsletterEmail.value = "";
            }

            setTimeout(() => {
                newsletterForm.classList.remove("is-submitted");
            }, 1500);
        });
    }


    /* =========================================================
       ESCAPE KEY
       ========================================================= */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (productModal && productModal.classList.contains("is-open")) {
            closeProductModal();
        }

        if (mobileMenu && mobileMenu.classList.contains("is-open")) {
            closeMenu();
        }
    });


    /* =========================================================
       SMOOTH ANCHOR SCROLL
       ========================================================= */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =========================================================
       SCROLL REVEAL
       ========================================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .vanta-reveal, [data-reveal]"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    } else if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* =========================================================
       PRODUCT CARD STAGGER
       ========================================================= */

    if (!prefersReducedMotion) {
        productCards.forEach((card, index) => {
            card.style.setProperty(
                "--vanta-delay",
                `${index * 80}ms`
            );
        });
    }


    /* =========================================================
       HERO PARALLAX
       ========================================================= */

    const hero = document.querySelector(".vanta-hero");
    const heroImage = document.querySelector(".vanta-hero-image");

    if (
        hero &&
        heroImage &&
        !prefersReducedMotion &&
        window.matchMedia("(min-width: 900px)").matches
    ) {
        let ticking = false;

        const updateHeroParallax = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition <= window.innerHeight) {
                const movement = scrollPosition * 0.08;

                heroImage.style.transform =
                    `translate3d(0, ${movement}px, 0)`;
            }

            ticking = false;
        };

        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateHeroParallax);
                    ticking = true;
                }
            },
            { passive: true }
        );
    }


    /* =========================================================
       IMAGE FADE-IN
       ========================================================= */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        if (image.complete) {
            image.classList.add("is-loaded");
        } else {
            image.addEventListener(
                "load",
                () => {
                    image.classList.add("is-loaded");
                },
                { once: true }
            );
        }
    });


    /* =========================================================
       CUSTOM CURSOR
       ========================================================= */

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (
        finePointer &&
        cursor &&
        cursorDot &&
        !prefersReducedMotion
    ) {
        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.16;
            cursorY += (mouseY - cursorY) * 0.16;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        const interactiveElements = document.querySelectorAll(
            "a, button, [data-product], input, textarea, select"
        );

        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", () => {
                cursor.classList.add("is-hovering");
                cursorDot.classList.add("is-hovering");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("is-hovering");
                cursorDot.classList.remove("is-hovering");
            });
        });

        document.addEventListener("mouseleave", () => {
            cursor.classList.add("is-hidden");
            cursorDot.classList.add("is-hidden");
        });

        document.addEventListener("mouseenter", () => {
            cursor.classList.remove("is-hidden");
            cursorDot.classList.remove("is-hidden");
        });
    }


    /* =========================================================
       BUTTON MAGNETIC EFFECT
       ========================================================= */

    if (!prefersReducedMotion && finePointer) {
        const magneticButtons = document.querySelectorAll(
            ".vanta-button, .vanta-link-button, .vanta-cta-button"
        );

        magneticButtons.forEach((button) => {
            button.addEventListener("mousemove", (event) => {
                const rect = button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;
            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });
        });
    }


    /* =========================================================
       LOOKBOOK HOVER MOVEMENT
       ========================================================= */

    if (!prefersReducedMotion && finePointer) {
        const lookbookItems = document.querySelectorAll(
            ".lookbook-item, .vanta-lookbook-item"
        );

        lookbookItems.forEach((item) => {
            const image = item.querySelector("img");

            if (!image) return;

            item.addEventListener("mousemove", (event) => {
                const rect = item.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) / rect.width - 0.5) *
                    8;

                const y =
                    ((event.clientY - rect.top) / rect.height - 0.5) *
                    8;

                image.style.transform =
                    `scale(1.03) translate(${x}px, ${y}px)`;
            });

            item.addEventListener("mouseleave", () => {
                image.style.transform = "";
            });
        });
    }


    /* =========================================================
       RESIZE HANDLING
       ========================================================= */

    window.addEventListener("resize", () => {
        // Close mobile menu when moving into desktop layout
        if (
            window.innerWidth >= 900 &&
            mobileMenu &&
            mobileMenu.classList.contains("is-open")
        ) {
            closeMenu();
        }
    });


    /* =========================================================
       FOOTER YEAR
       ========================================================= */

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =========================================================
       ACCESSIBILITY
       ========================================================= */

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    if (mobileMenu) {
        mobileMenu.setAttribute("aria-hidden", "true");
    }

    if (productModal) {
        productModal.setAttribute("aria-hidden", "true");
    }


    /* =========================================================
       CONSOLE BRANDING
       ========================================================= */

    console.log(
        "%cVANTA",
        "font-size: 28px; font-weight: 700; letter-spacing: 8px;"
    );

    console.log(
        "%cDEFINED BY FORM.",
        "font-size: 12px; letter-spacing: 4px;"
    );
});