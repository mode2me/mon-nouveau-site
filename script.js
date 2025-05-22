// ========== MENU BURGER ==========
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', nav.classList.contains('show'));
});

// ========== DROPDOWN ==========
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
  const button = drop.querySelector('button');
  button.addEventListener('click', () => {
    drop.classList.toggle('open');
    closeOtherDropdowns(drop);
  });
});

function closeOtherDropdowns(currentDropdown) {
  dropdowns.forEach(drop => {
    if (drop !== currentDropdown) {
      drop.classList.remove('open');
    }
  });
}

// Ferme le dropdown si on clique à l'extérieur
document.addEventListener('click', (e) => {
  dropdowns.forEach(drop => {
    if (!drop.contains(e.target)) {
      drop.classList.remove('open');
    }
  });
});

// ========== SEARCH FORM ==========
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm?.querySelector('input');

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query !== '') {
    window.location.href = `recherche.html?q=${encodeURIComponent(query)}`;
  }
});

// ========== BOUTON COMMANDER ==========
const commanderButtons = document.querySelectorAll('.btn-commander');

commanderButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Affiche une notification au lieu d'un simple alert
    showNotification("Produit ajouté au panier !");
    // Stockage dans le localStorage simulé ici
    // Tu peux ajouter des objets produit avec nom, prix, etc.
  });
});

// ========== NOTIFICATION VISUELLE ==========
function showNotification(message) {
  const notif = document.createElement("div");
  notif.className = "notif";
  notif.innerText = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

// ========== ACTIVER LE LIEN ACTIF DANS LE MENU ==========
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#main-nav a");
  links.forEach(link => {
    if (window.location.href.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });

  // Animation de chargement douce
  document.body.classList.add("loaded");
});