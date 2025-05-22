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

// ========== PANIER AVEC LOCALSTORAGE ==========

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(produit) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];

  const index = panier.findIndex(p => p.id === produit.id);

  if (index !== -1) {
    panier[index].quantite += 1;
  } else {
    panier.push(produit);
  }

  localStorage.setItem('panier', JSON.stringify(panier));
  showNotification(`${produit.nom} ajouté au panier !`);
}

// Exemple d’usage avec un bouton (tu peux adapter avec tes vrais produits)
commanderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const produit = {
      id: button.dataset.id || `id-${Math.random().toString(36).substr(2, 9)}`,
      nom: button.dataset.nom || "Produit inconnu",
      prix: parseFloat(button.dataset.prix) || 0,
      quantite: 1
    };
    ajouterAuPanier(produit);
  });
});

// Affichage sur la page panier
if (window.location.pathname.includes('panier.html')) {
  afficherPanier();
}

function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const conteneur = document.getElementById('contenu-panier');

  if (!conteneur) return;

  if (panier.length === 0) {
    conteneur.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  let total = 0;
  let html = '<ul class="liste-panier">';
  panier.forEach(item => {
    const itemTotal = item.prix * item.quantite;
    total += itemTotal;
    html += `<li>${item.nom} x${item.quantite} — ${itemTotal.toFixed(2)} €</li>`;
  });
  html += `</ul><p>Total : <strong>${total.toFixed(2)} €</strong></p>`;
  html += `<button id="vider-panier">Vider le panier</button>`;

  conteneur.innerHTML = html;

  document.getElementById('vider-panier')?.addEventListener('click', () => {
    localStorage.removeItem('panier');
    afficherPanier();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Animation entrée page
  document.body.classList.add('loaded');

  // Menu burger
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav#main-nav');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('show');
  });

  // Dropdown accessible clavier et souris
  const dropdown = document.querySelector('.dropdown');
  const dropdownBtn = dropdown.querySelector('button');
  const dropdownContent = dropdown.querySelector('.dropdown-content');

  dropdownBtn.addEventListener('click', () => {
    const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownBtn.setAttribute('aria-expanded', !expanded);
    dropdown.classList.toggle('open');
  });

  dropdownBtn.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dropdownBtn.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('open');
      dropdownBtn.focus();
    }
  });

  // Fermer dropdown si clic en dehors
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdownBtn.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('open');
    }
  });

  // Gestion panier simple localStorage (exemple pour lien panier)
  // On stocke un tableau d'objets {id, nom, qte, prix}
  function getPanier() {
    const panier = localStorage.getItem('panier');
    return panier ? JSON.parse(panier) : [];
  }

  function setPanier(panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  // Exemple ajout notification
  function showNotification(msg) {
    let notif = document.querySelector('.notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.className = 'notif';
      document.body.appendChild(notif);
    }
    notif.textContent = msg;
    notif.classList.add('show');
    setTimeout(() => {
      notif.classList.remove('show');
    }, 2500);
  }

  // Simuler ajout produit dans panier (juste pour test)
  // Ici tu peux remplacer par ta logique d'ajout réelle sur ta boutique.
  /*
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const produit = {
        id: btn.dataset.id,
        nom: btn.dataset.nom,
        qte: 1,
        prix: parseFloat(btn.dataset.prix)
      };
      let panier = getPanier();
      const index = panier.findIndex(p => p.id === produit.id);
      if (index > -1) {
        panier[index].qte += 1;
      } else {
        panier.push(produit);
      }
      setPanier(panier);
      showNotification(`${produit.nom} ajouté au panier`);
    });
  });
  */
});