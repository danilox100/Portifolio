const formulario = document.getElementById('formulario');
const telefone = '5584988280486';

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const texto = `Olá! Me chamo ${nome}, ${mensagem}`;
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
});