/* Responsive navigation, section highlighting, and progressive enhancement */
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
const navigationLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const year = document.querySelector("#current-year");
const mobile = window.matchMedia("(max-width: 800px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (year) year.textContent = new Date().getFullYear();

function closeMenu(restoreFocus = false) {
    if (!menuButton || !navigation) return;
    const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
    if (wasOpen && restoreFocus) menuButton.focus();
}
if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const open = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(open));
        navigation.classList.toggle("open", open);
        document.body.classList.toggle("menu-open", open);
        if (open) navigationLinks[0]?.focus();
    });
    document.addEventListener("keydown", event => {
        if (menuButton.getAttribute("aria-expanded") !== "true") return;
        if (event.key === "Escape") closeMenu(true);
        if (event.key === "Tab") {
            const items = [menuButton, ...navigationLinks];
            const first = items[0], last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });
}
navigationLinks.forEach(link => link.addEventListener("click", () => {
    closeMenu();
    const section = document.querySelector(link.getAttribute("href"));
    if (mobile.matches && section) {
        section.setAttribute("tabindex", "-1");
        section.focus({ preventScroll: true });
        section.addEventListener("blur", () => section.removeAttribute("tabindex"), { once: true });
    }
}));
mobile.addEventListener("change", () => closeMenu());

function updateNavigation() {
    const header = document.querySelector(".site-header");
    const offset = (header?.offsetHeight || 76) + 100;
    let current = "";
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    navigationLinks.forEach(link => {
        const active = link.getAttribute("href") === "#" + current;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
}
let pending = false;
window.addEventListener("scroll", () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { updateNavigation(); pending = false; });
}, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

// Use small targets so long project sections never remain hidden on mobile.
if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const targets = document.querySelectorAll(
        ".section-heading, .projects-intro, .project-metrics, .about-content, .capability-grid, .certification-grid"
    );
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
    document.documentElement.classList.add("js-enabled");
    targets.forEach(target => { target.classList.add("reveal"); observer.observe(target); });
}

