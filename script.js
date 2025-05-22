document.addEventListener('DOMContentLoaded', () => {
  // --- MENU BURGER ---
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav#main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('show');
    });
  }

  // --- DROPDOWNS ---
  const dropdowns = document.querySelectorAll('.dropdown');

  function closeOtherDropdowns(currentDropdown) {
    dropdowns.forEach(drop => {
      if (drop !== currentDropdown) {
        const btn = drop.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        drop.classList.remove('open');
      }
    });
  }

  dropdowns.forEach(drop => {
    const button = drop.querySelector('button');
    if (!button) return;

    button.addEventListener('click', (e) => {
      const isOpen = drop.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      closeOtherDropdowns(drop);
      e.stopPropagation();
    });

    button.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        button.setAttribute('aria-expanded', 'false');
        drop.classList.remove('open');
        button.focus();
      }
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach(drop => {
      const btn = drop.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      drop.classList.remove('open');
    });
  });

  // --- FORMULAIRE RECHERCHE ---
  const searchForm = document.querySelector('.search-form');
  const searchInput = searchForm?.querySelector('input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query !== '') {
        window.location.href = `recherche.html?q=${encodeURIComponent(query)}`;
      }
    });
  }

  // --- NOTIFICATION ---
  function showNotification(message) {
    let notif = document.querySelector('.notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.className = 'notif';
      document.body.appendChild(notif);
    }
    notif.textContent = message;
    notif.classList.add('show');
    setTimeout(() => {
      notif.classList.remove('show');
    }, 2500);
  }

  // --- PANIER ---
  function getPanier() {
    const panier = localStorage.getItem('panier');
    return panier ? JSON.parse(panier) : [];
  }

  function setPanier(panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  function ajouterAuPanier(produit) {
    let panier = getPanier();
    const index = panier.findIndex(p => p.id === produit.id);
    if (index !== -1) {
      panier[index].quantite += produit.quantite;
    } else {
      panier.push(produit);
    }
    setPanier(panier);
    showNotification(`${produit.nom} ajouté au panier !`);
  }

  const commanderButtons = document.querySelectorAll('.btn-commander');
  commanderButtons.forEach(button => {
    button.addEventListener('click', () => {
      const produit = {
        id: button.dataset.id || `id-${Math.random().toString(36).substr(2, 9)}`,
        nom: button.dataset.nom || 'Produit inconnu',
        prix: parseFloat(button.dataset.prix) || 0,
        quantite: 1
      };
      ajouterAuPanier(produit);
    });
  });

  if (window.location.pathname.includes('panier.html')) {
    afficherPanier();
  }

  function afficherPanier() {
    const panier = getPanier();
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

  // --- LIEN ACTIF ---
  const links = document.querySelectorAll("#main-nav a");
  links.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });

  // --- ANIMATION LOADING ---
  document.body.classList.add("loaded");
  document.body.style.opacity = "1";
});