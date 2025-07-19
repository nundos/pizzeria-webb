fetch('data/items.json')
  .then(res => res.json())
  .then(data => {
    const menuGrid = document.getElementById('menu-grid');
    const offersGrid = document.getElementById('offers-grid');
    const heroSection = document.getElementById('hero-content');
    const infoSection = document.getElementById('info-content');
    const headerTitle = document.getElementById('site-title');
    const nav = document.getElementById('site-nav');
    const footer = document.getElementById('footer-content');
    const bannerSection = document.querySelector('.banner');

    // Header
    const header = data.find(item => item.type === 'header');
    if (header) {
      headerTitle.textContent = header.title;
      nav.innerHTML = '';
      header.nav.forEach(link => {
        const a = document.createElement('a');
        a.href = link.link;
        a.textContent = link.text;
        nav.appendChild(a);
      });

      // Lägg till adress + telefon i header med Font Awesome-ikoner
      if (header.address && header.phone) {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('header-contact');
        contactDiv.innerHTML = `
          <p><i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(header.address)}" target="_blank" rel="noopener">${header.address}</a></p>
          <p><i class="fas fa-phone"></i> <a href="tel:${header.phone.replace(/[^0-9+]/g, '')}">${header.phone}</a></p>
        `;
        headerTitle.insertAdjacentElement('afterend', contactDiv);
      }
    }

    // Hero
    const hero = data.find(item => item.type === 'hero');
    if (hero) {
      heroSection.innerHTML = `
        <h2>${hero.title}</h2>
        <p>${hero.subtitle}</p>
      `;
    }

    // Info
    const info = data.find(item => item.type === 'info');
    if (info) {
      infoSection.innerHTML = `
        <h3>${info.title}</h3>
        <p>${info.description}</p>
      `;
    }

    // Pizzor
    const pizzas = data.filter(item => item.type === 'pizza');
    pizzas.forEach(pizza => {
      const el = document.createElement('div');
      el.classList.add('menu-item');
      el.innerHTML = `
        <h4>${pizza.title}</h4>
        <p>${pizza.description}</p>
        <span>${pizza.price}</span>
      `;
      menuGrid.appendChild(el);
    });

    // Erbjudanden
    const offers = data.filter(item => item.type === 'erbjudande');
    offers.forEach(offer => {
      const el = document.createElement('div');
      el.classList.add('menu-item');
      el.innerHTML = `
        <h4>${offer.title}</h4>
        <p>${offer.description}</p>
        ${offer.price ? `<span>${offer.price}</span>` : ''}
      `;
      offersGrid.appendChild(el);
    });

    // Banner - sätt bakgrundsbild från JSON
    const bannerData = data.find(item => item.type === 'banner');
    if (bannerData && bannerData.image) {
      bannerSection.style.backgroundImage = `url(${bannerData.image})`;
    }

    // Footer med klickbara länkar och ikoner
    const footerData = data.find(item => item.type === 'footer');
    if (footerData) {
      const year = new Date().getFullYear();
      footer.innerHTML = `
        <p><i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerData.address)}" target="_blank" rel="noopener">${footerData.address}</a></p>
        <p><i class="fas fa-phone"></i> <a href="tel:${footerData.phone.replace(/[^0-9+]/g, '')}">${footerData.phone}</a></p>
        <p>${footerData.copyright.replace('2025', year)}</p>
      `;
    }
  })
  .catch(err => console.error('Fel vid hämtning av data:', err));
