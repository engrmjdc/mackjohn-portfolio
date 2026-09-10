const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(
    ".nav-links a"
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

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeNavigation();
    }
});

currentYear.textContent = new Date().getFullYear();