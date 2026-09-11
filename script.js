document.documentElement.classList.add("js-enabled");


/* =========================================================
   ELEMENTS
========================================================= */

const menuButton =
    document.querySelector(".menu-button");

const navigation =
    document.querySelector(".nav-links");

const navigationLinks =
    document.querySelectorAll(".nav-links a");

const observedSections =
    document.querySelectorAll("main section[id]");

const revealElements =
    document.querySelectorAll(
        ".editorial-section, .projects-intro, .project"
    );

const yearElement =
    document.querySelector("#current-year");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMenu() {

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    navigation.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "menu-open"
    );
}


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                menuButton.getAttribute(
                    "aria-expanded"
                ) === "true";


            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            navigation.classList.toggle(
                "open",
                !isOpen
            );


            document.body.classList.toggle(
                "menu-open",
                !isOpen
            );

        }
    );

}


/* Close menu when navigation item is selected */

navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* Close mobile menu when desktop layout activates */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 720) {
            closeMenu();
        }

    }
);


/* Escape key closes navigation */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    let currentSection = "";

    const viewportPosition =
        window.scrollY + 180;


    observedSections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            viewportPosition >= sectionTop &&
            viewportPosition <
                sectionTop + sectionHeight
        ) {
            currentSection =
                section.id;
        }

    });


    navigationLinks.forEach((link) => {

        const target =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================================
   REVEAL ANIMATION
========================================================= */

revealElements.forEach((element) => {

    element.classList.add(
        "reveal"
    );

});


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.1,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}