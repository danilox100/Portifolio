const formulario = document.getElementById('formulario');
const botaoEnvio = document.getElementById('botao-envio');
const botaoIdioma = document.getElementById('botao-idioma');
const botaoTema = document.getElementById('botao-tema');
const telefone = '5584988280486';
const emailDestino = 'nascimentod792@gmail.com';

const botao = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
const navegacao = document.querySelector('.navegacao');

let idioma = 'pt';
try {
  idioma = localStorage.getItem('idioma') === 'en' ? 'en' : 'pt';
} catch (erro) {}

let tema = document.documentElement.getAttribute('data-tema') === 'claro' ? 'claro' : 'escuro';

function t(chave) {
  return traducoes[idioma][chave];
}

function preencher(modelo, valores) {
  return modelo.replace(/\{(\w+)\}/g, (_, chave) => valores[chave]);
}

function atualizarMenuToggle() {
  const aberto = menu.classList.contains('aberto');
  botao.setAttribute('aria-expanded', aberto);
  botao.setAttribute('aria-label', aberto ? t('menu.fechar') : t('menu.abrir'));
  botao.textContent = aberto ? '✕' : '☰';
}

function atualizarBotaoEnvio() {
  const canal = formulario.querySelector('input[name="canal"]:checked').value;
  botaoEnvio.textContent = t(canal === 'email' ? 'botao.email' : 'botao.whatsapp');
}

function atualizarBotaoTema() {
  const rotulo = tema === 'escuro' ? t('tema.claro') : t('tema.escuro');
  botaoTema.setAttribute('aria-label', rotulo);
  botaoTema.title = rotulo;
}

function aplicarIdioma() {
  document.documentElement.lang = idioma === 'en' ? 'en' : 'pt-br';
  document.title = t('titulo');

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });

  botaoIdioma.textContent = t('idioma.rotulo');
  botaoIdioma.setAttribute('aria-label', t('idioma.aria'));
  botaoIdioma.title = t('idioma.aria');

  atualizarMenuToggle();
  atualizarBotaoEnvio();
  atualizarBotaoTema();
}

botao.addEventListener('click', () => {
  menu.classList.toggle('aberto');
  atualizarMenuToggle();
});

menu.querySelectorAll('.menu-link').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    atualizarMenuToggle();
  });
});

botaoTema.addEventListener('click', () => {
  tema = tema === 'escuro' ? 'claro' : 'escuro';
  document.documentElement.setAttribute('data-tema', tema);
  try {
    localStorage.setItem('tema', tema);
  } catch (erro) {}
  atualizarBotaoTema();
});

botaoIdioma.addEventListener('click', () => {
  idioma = idioma === 'pt' ? 'en' : 'pt';
  try {
    localStorage.setItem('idioma', idioma);
  } catch (erro) {}
  aplicarIdioma();
});

formulario.querySelectorAll('input[name="canal"]').forEach((opcao) => {
  opcao.addEventListener('change', atualizarBotaoEnvio);
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const canal = formulario.querySelector('input[name="canal"]:checked').value;

  const texto = preencher(t('msg.texto'), { nome, mensagem });

  if (canal === 'email') {
    const assunto = preencher(t('msg.assunto'), { nome });
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  } else {
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }
});

let ultimoScroll = window.scrollY;
let navegandoPorLink = false;
let fimDaNavegacao = null;

function terminarNavegacao() {
  navegandoPorLink = false;
  ultimoScroll = window.scrollY;
}

function aguardarFimDaNavegacao(espera) {
  clearTimeout(fimDaNavegacao);
  fimDaNavegacao = setTimeout(terminarNavegacao, espera);
}

window.addEventListener('scroll', () => {
  if (navegandoPorLink) {
    aguardarFimDaNavegacao(150);
    return;
  }

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

const botaoContratar = document.querySelector('.botao-contratar');

botaoContratar.addEventListener('click', () => {
  menu.classList.remove('aberto');
  atualizarMenuToggle();
  setTimeout(() => {
    document.getElementById('nome').focus({ preventScroll: true });
  }, 700);
});

function irParaSecao(secao, sempreNoFim) {
  const cabeNaTela = secao.offsetHeight <= window.innerHeight;

  navegacao.classList.add('escondida');
  navegandoPorLink = true;
  aguardarFimDaNavegacao(400);

  if (cabeNaTela || sempreNoFim) {
    secao.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return;
  }

  const topo = secao.getBoundingClientRect().top + window.scrollY;
  const recuo = parseFloat(getComputedStyle(secao).paddingTop);
  window.scrollTo({ top: topo + recuo - 24, behavior: 'smooth' });
}

document.querySelectorAll('a[href="#projetos"], a[href="#contato"]').forEach((link) => {
  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    const secao = document.querySelector(link.getAttribute('href'));
    irParaSecao(secao, secao.id === 'contato');
  });
});

aplicarIdioma();