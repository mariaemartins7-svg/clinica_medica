(function () {
  const form = document.getElementById('form-agendamento');
  if (!form) return;
  const retorno = document.getElementById('retorno');

  // Máscara de telefone: (99) 99999-9999
  const tel = form.elements['telefone'];
  tel.addEventListener('input', () => {
    let v = tel.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d*)/, '($1) $2');
    tel.value = v;
  });

  // Não permite data no passado
  form.elements['data'].min = new Date().toISOString().split('T')[0];

  const regras = {
    nome: v => v.trim().length >= 3 || 'Informe seu nome completo.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Informe um e-mail válido.',
    telefone: v => v.replace(/\D/g, '').length >= 10 || 'Informe o telefone com DDD.',
    especialidade: v => v !== '' || 'Escolha uma especialidade.',
    mensagem: v => v.trim().length >= 10 || 'Conte um pouco mais (mínimo 10 caracteres).'
  };

  function validar(campo) {
    const regra = regras[campo.name];
    if (!regra) return true;
    const res = regra(campo.value);
    const box = campo.closest('.campo');
    box.classList.toggle('invalido', res !== true);
    box.querySelector('.erro').textContent = res === true ? '' : res;
    return res === true;
  }

  form.addEventListener('blur', e => validar(e.target), true);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = Object.keys(regras).map(n => validar(form.elements[n])).every(Boolean);
    if (!ok) { form.querySelector('.invalido input, .invalido select, .invalido textarea')?.focus(); return; }

    // TODO: enviar para o seu back-end (fetch POST) ou serviço de e-mail/WhatsApp.
    const nome = form.elements['nome'].value.trim().split(' ')[0];
    retorno.textContent = `Obrigado, ${nome}! Recebemos seu pedido e entraremos em contato em breve.`;
    retorno.classList.add('ok');
    form.reset();
    retorno.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();