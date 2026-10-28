(function () {
  const root = document.body.dataset.root || '';      // "" na raiz, "../" em templates/
  const paginas = root ? '' : 'templates/';
  const links = [
    ['Início', root + 'index.html'],
    ['Sobre', paginas + 'sobre.html'],
    ['Especialidades', paginas + 'especialidades.html'],
    ['Médicos', paginas + 'medicos.html'],
    ['Contato', paginas + 'contato.html']
  ];
  const atual = location.pathname.split('/').pop() || 'index.html';
  const logo = root + 'static/img/logo.svg';

  // Cabeçalho
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `<div class="container">
      <a class="logo" href="${links[0][1]}" aria-label="MedTech Clínica Médica – página inicial"><img src="${logo}" alt="MedTech Clínica Médica"></a>
      <button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Abrir menu">☰</button>
      <ul class="nav" id="nav">${links.map(([t, h]) =>
        `<li><a href="${h}" class="${h.endsWith(atual) ? 'ativo' : ''}">${t}</a></li>`).join('')}</ul>
    </div>`;
    const btn = header.querySelector('.menu-btn');
    const nav = header.querySelector('.nav');
    btn.addEventListener('click', () => {
      const aberto = nav.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto);
    });
  }

  // Rodapé
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="container">
      <div class="topo">
        <div><img src="${logo}" alt="MedTech Clínica Médica"><p>Tecnologia e cuidado em cada batimento.</p></div>
        <div><h4>Navegação</h4><ul>${links.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
        <div><h4>Contato</h4><ul>
          <li>(15) 0000-0000</li><li>contato@medtech.com.br</li>
          <li>Seg a sex, 7h às 19h</li></ul></div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} MedTech Clínica Médica. Todos os direitos reservados.</p>
    </div>`;
  }

  // Ícones da marca (traço linear, como na identidade visual)
  const A = 'fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const icones = {
    heart: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><path d="M24 42S6 31 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 13-18 24-18 24Z"/><path d="M10 24h8l3-7 5 13 3-6h9"/></svg>`,
    stetho: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><path d="M14 6v14a8 8 0 0 0 16 0V6"/><path d="M12 6h4M28 6h4"/><path d="M22 28v4a8 8 0 0 0 16 0v-4"/><circle cx="38" cy="25" r="3"/></svg>`,
    shield: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><path d="M24 5l16 5v12c0 10-7 17-16 21C15 39 8 32 8 22V10l16-5Z"/><path d="M17 23l5 5 9-10"/></svg>`,
    calendar: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><rect x="7" y="10" width="34" height="32" rx="5"/><path d="M15 5v9M33 5v9M7 20h34M17 31l5 5 9-10"/></svg>`,
    bone: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><path d="M14 34l20-20M12 30a5 5 0 1 0-4 4 5 5 0 0 0 4 4 5 5 0 0 0 4-4M36 18a5 5 0 1 0 4-4 5 5 0 0 0-4-4 5 5 0 0 0-4 4"/></svg>`,
    child: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><circle cx="24" cy="14" r="7"/><path d="M10 42c1-9 6-14 14-14s13 5 14 14"/></svg>`,
    skin: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><path d="M24 6c8 9 12 14 12 20a12 12 0 0 1-24 0c0-6 4-11 12-20Z"/></svg>`,
    flower: `<svg class="icone" viewBox="0 0 48 48" ${A} stroke="currentColor"><circle cx="24" cy="24" r="5"/><path d="M24 19c-4-8 0-13 0-13s4 5 0 13ZM24 29c4 8 0 13 0 13s-4-5 0-13ZM19 24c-8 4-13 0-13 0s5-4 13 0ZM29 24c8-4 13 0 13 0s-5 4-13 0Z"/></svg>`
  };
  document.querySelectorAll('[data-icone]').forEach(el => {
    el.insertAdjacentHTML('afterbegin', icones[el.dataset.icone] || '');
  });
})();