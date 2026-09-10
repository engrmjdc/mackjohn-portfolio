document.documentElement.classList.add("js-enabled");

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(
    ".nav-links a"
);
const observedSections = document.querySelectorAll(
    "[data-observe]"
);
const processLinks = document.querySelectorAll(
    ".process-list a"
);
const currentYear = document.querySelector("#current-year");

function closeNavigation() {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeNavigation();
        navToggle.focus();
    }
});

document.addEventListener("click", (event) => {
    const clickedInsideNavigation =
        event.target.closest(".navbar");

    if (!clickedInsideNavigation) {
        closeNavigation();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
        closeNavigation();
    }
});

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");

            const sectionId = entry.target.id;

            navigationLinks.forEach((link) => {
                const isCurrent =
                    link.dataset.section === sectionId;

                link.classList.toggle(
                    "is-active",
                    isCurrent
                );

                if (isCurrent) {
                    link.setAttribute(
                        "aria-current",
                        "location"
                    );
                } else {
                    link.removeAttribute("aria-current");
                }
            });

            updateProcessPhase(sectionId);
        });
    },
    {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0
    }
);

observedSections.forEach((section) => {
    sectionObserver.observe(section);
});

function updateProcessPhase(sectionId) {
    const phaseMap = {
        about: "discover",
        skills: "design",
        projects: "execute",
        certifications: "evaluate",
        contact: null
    };

    const activePhase = phaseMap[sectionId];

    processLinks.forEach((link) => {
        link.classList.toggle(
            "is-active",
            link.dataset.phase === activePhase
        );
    });
}

currentYear.textContent = new Date().getFullYear();