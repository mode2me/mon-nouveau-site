// === MENU BURGER ===
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('show'));
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && e.target !== menuToggle) {
      mainNav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// === DROPDOWN CATEGORIES ===
const dropdown = document.querySelector('.dropdown');

if (dropdown) {
  const dropdownButton = dropdown.querySelector('button');

  if (dropdownButton) {
    dropdownButton.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      dropdownButton.setAttribute('aria-expanded', dropdown.classList.contains('open'));
    });

    // Fermer le dropdown si on clique en dehors
    document.addEventListener('click', () => {
      if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        dropdownButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// === FORMULAIRE COMMANDE ===
const form = document.querySelector('form');

if (form && form.action.includes('confirmation.html')) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nom = this.querySelector('[name="nom"]');
    alert(`Merci pour votre commande${nom?.value ? `, ${nom.value}` : ''} !`);
    this.reset();

    // Redirection vers la page de confirmation après un court délai (facultatif)
    setTimeout(() => {
      window.location.href = this.action;
    }, 500);
  });
}