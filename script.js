const formulario = document.getElementById('formulario');
const telefone = '5584988280486';

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

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const texto = `Olá! Me chamo ${nome}, ${mensagem}`;
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
});