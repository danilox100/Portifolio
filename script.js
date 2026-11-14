const formulario = document.getElementById('formulario');
const botaoEnvio = document.getElementById('botao-envio');
const telefone = '5584988280486';
const emailDestino = 'nascimentod792@gmail.com';

const botao = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');

function fecharMenu() {
  menu.classList.remove('aberto');
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-label', 'Abrir menu');
  botao.textContent = '☰';
}

botao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botao.setAttribute('aria-expanded', aberto);
  botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  botao.textContent = aberto ? '✕' : '☰';
});

menu.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', fecharMenu);
});

formulario.querySelectorAll('input[name="canal"]').forEach(opcao => {
  opcao.addEventListener('change', () => {
    botaoEnvio.textContent =
      opcao.value === 'email' ? 'Enviar E-mail' : 'Enviar WhatsApp';
  });
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const canal = formulario.querySelector('input[name="canal"]:checked').value;

  const texto = `Olá! Me chamo ${nome}, ${mensagem}`;

  if (canal === 'email') {
    const assunto = `Contato pelo portfólio - ${nome}`;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  } else {
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }
});

const navegacao = document.querySelector('.navegacao');
let ultimoScroll = window.scrollY;

window.addEventListener('scroll', () => {
  const atual = Math.max(window.scrollY, 0);
  const diferenca = atual - ultimoScroll;

  if (Math.abs(diferenca) < 6) return;

  if (diferenca > 0 && atual > 100 && !menu.classList.contains('aberto')) {
    navegacao.classList.add('escondida');
  } else if (diferenca < 0) {
    navegacao.classList.remove('escondida');
  }

  ultimoScroll = atual;
}, { passive: true });