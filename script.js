document.addEventListener('DOMContentLoaded', () => {
  // --- MENU BURGER ---
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('show');
    });
  }

  // --- DROPDOWNS ---
  const dropdowns = document.querySelectorAll('.dropdown');

  function closeOtherDropdowns(current) {
    dropdowns.forEach(drop => {
      if (drop !== current) {
        const btn = drop.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        drop.classList.remove('open');
      }
    });
  }

  dropdowns.forEach(drop => {
    const btn = drop.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      const isOpen = drop.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      closeOtherDropdowns(drop);
      e.stopPropagation();
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        drop.classList.remove('open');
        btn.focus();
      }
    });
  });

  // Fermer les dropdowns si clic en dehors
  document.addEventListener('click', () => {
    dropdowns.forEach(drop => {
      const btn = drop.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      drop.classList.remove('open');
    });
  });

  // --- FORMULAIRE DE RECHERCHE ---
  const searchForm = document.querySelector('.search-form');
  const searchInput = searchForm?.querySelector('input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
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

  // --- PANIER LOCALSTORAGE ---
  function getPanier() {
    try {
      const panier = localStorage.getItem('panier');
      return panier ? JSON.parse(panier) : [];
    } catch (e) {
      console.error('Erreur lecture panier :', e);
      return [];
    }
  }

  function setPanier(panier) {
    try {
      localStorage.setItem('panier', JSON.stringify(panier));
    } catch (e) {
      console.error('Erreur écriture panier :', e);
    }
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

  // --- BOUTONS AJOUTER AU PANIER ---
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      if (!productCard) return;

      const nom = productCard.querySelector('.product-title')?.textContent.trim() || 'Produit inconnu';
      const prixText = productCard.querySelector('.product-price')?.textContent.trim() || '0';
      const prix = parseFloat(prixText.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
      const id = nom.toLowerCase().replace(/\s+/g, '-');

      const produit = {
        id,
        nom,
        prix,
        quantite: 1
      };
      ajouterAuPanier(produit);
    });
  });

  // --- AFFICHAGE DU PANIER ---
  function afficherPanier() {
    const conteneur = document.getElementById('contenu-panier');
    if (!conteneur) return;

    const panier = getPanier();
    if (panier.length === 0) {
      conteneur.innerHTML = "<p>Votre panier est vide.</p>";
      return;
    }

    let total = 0;
    let html = '<ul class="liste-panier">';
    panier.forEach(item => {
      // Conversion forcée en nombre pour prix et quantité
      const prix = parseFloat(item.prix) || 0;
      const quantite = parseInt(item.quantite, 10) || 0;
      const itemTotal = prix * quantite;
      total += itemTotal;
      html += `<li>${item.nom} x${quantite} — ${itemTotal.toFixed(2)} €</li>`;
    });
    html += `</ul><p>Total : <strong>${total.toFixed(2)} €</strong></p>`;
    html += `<button id="vider-panier">Vider le panier</button>`;
    conteneur.innerHTML = html;

    document.getElementById('vider-panier')?.addEventListener('click', () => {
      localStorage.removeItem('panier');
      afficherPanier();
    });
  }

  // Appel automatique de affichage panier si page panier.html
  if (window.location.pathname.includes('panier.html')) {
    afficherPanier();
  }

  // --- LIEN ACTIF MENU ---
  const links = document.querySelectorAll("#main-nav a");
  links.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });

  // --- ANIMATION DOUCE AU CHARGEMENT ---
  document.body.classList.add("loaded");
  document.body.style.opacity = "1";
});