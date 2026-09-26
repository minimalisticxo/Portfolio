```javascript
/* =========================================================
   ÉLAN — PREMIUM PERFUME WEBSITE
   JavaScript
========================================================= */


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuButton.classList.toggle("active");

    });

}


/* Close mobile menu when clicking a link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");
        menuButton?.classList.remove("active");

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".product-content, .story-content, .notes-header, .note, .final-cta"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

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


/* =========================
   BUTTON MICRO INTERACTION
========================= */

const buttons = document.querySelectorAll(
    ".primary-btn, .buy-btn"
);

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        const arrow = button.querySelector("span");

        if (arrow) {
            arrow.style.transform = "translateX(5px)";
        }

    });


    button.addEventListener("mouseleave", () => {

        const arrow = button.querySelector("span");

        if (arrow) {
            arrow.style.transform = "translateX(0)";
        }

    });

});


/* =========================
   PRODUCT PARALLAX
========================= */

const bottle = document.querySelector(".bottle-placeholder");

window.addEventListener("scroll", () => {

    if (!bottle) return;

    const scrollPosition = window.scrollY;

    const heroHeight = window.innerHeight;

    if (scrollPosition < heroHeight) {

        const movement = scrollPosition * 0.08;

        bottle.style.transform =
            `translateY(${movement}px)`;

    }

});


/* =========================
   SMOOTH ANCHOR SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.querySelector(".footer-bottom span");

if (yearElement) {

    yearElement.textContent =
        `© ${new Date().getFullYear()} ÉLAN`;

}
```
