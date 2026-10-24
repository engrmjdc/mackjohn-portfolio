document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');
const links = [...navigation.querySelectorAll('a')];
menu.hidden = false;
function closeMenu(restoreFocus = false) {
 const wasOpen = menu.getAttribute('aria-expanded') === 'true';
 menu.setAttribute('aria-expanded', 'false');
 navigation.classList.remove('open');
 if (wasOpen && restoreFocus) menu.focus();
}
menu.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 navigation.classList.toggle('open', open);
 if (open) links[0].focus();
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape') closeMenu(true);
});
links.forEach(link => link.addEventListener('click', () => {
 closeMenu();
 const target = document.querySelector(link.getAttribute('href'));
 target.setAttribute('tabindex', '-1');
 target.focus({preventScroll:true});
 target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once:true});
}));
window.matchMedia('(max-width:480px)').addEventListener('change', () => closeMenu());
const sections = [...document.querySelectorAll('main > section[id]')];
let scheduled = false;
function updateActive() {
 let current = '';
 for (const section of sections) if (section.getBoundingClientRect().top <= 180) current = section.id;
 for (const link of links) {
  if (link.getAttribute('href') === '#' + current) link.setAttribute('aria-current','location');
  else link.removeAttribute('aria-current');
 }
 scheduled = false;
}
window.addEventListener('scroll', () => {if (!scheduled) { scheduled = true; requestAnimationFrame(updateActive); }}, {passive:true});
document.querySelector('#year').textContent = new Date().getFullYear();
updateActive();
