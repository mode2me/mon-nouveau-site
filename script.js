// === MENU BURGER ===
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });
}

// === DROPDOWN CATEGORIES ===
const dropdown = document.querySelector('.dropdown');

if (dropdown) {
  const dropdownButton = dropdown.querySelector('button');

  if (dropdownButton) {
    dropdownButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !isOpen);
      dropdownButton.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      dropdownButton.setAttribute('aria-expanded', 'false');
    });
  }
}

// === FORMULAIRE COMMANDE OU PAIEMENT ===
const form = document.querySelector('form');

if (form && form.action.includes('confirmation.html')) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = this.querySelector('[name="nom"]');
    if (nom) {
      alert(`Merci pour votre commande, ${nom.value} !`);
    } else {
      alert('Merci pour votre commande !');
    }

    this.reset();
    window.location.href = this.action; // Redirige vers confirmation.html
  });
}