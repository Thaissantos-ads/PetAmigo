const campoBusca = document.getElementById("busca");
const botoesFiltro = document.querySelectorAll(".btn-filtro");
const cards = document.querySelectorAll("#lista-animais .card-animal");
const mensagemSemResultado = document.getElementById("sem-resultado");
const avisoAdocao = document.getElementById("aviso-adocao");

let tipoAtual = "todos";
let textoBusca = "";

function filtrarAnimais() {
  let totalVisiveis = 0;

  cards.forEach(function (card) {
    const combinaTipo = tipoAtual === "todos" || card.dataset.tipo === tipoAtual;
    const combinaBusca = card.dataset.nome.includes(textoBusca);

    if (combinaTipo && combinaBusca) {
      card.hidden = false;
      totalVisiveis++;
    } else {
      card.hidden = true;
    }
  });

  mensagemSemResultado.hidden = totalVisiveis > 0;
}

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesFiltro.forEach(function (b) {
      b.classList.remove("ativo");
    });
    botao.classList.add("ativo");

    tipoAtual = botao.dataset.tipo;
    filtrarAnimais();
  });
});

campoBusca.addEventListener("input", function () {
  textoBusca = campoBusca.value.toLowerCase().trim();
  filtrarAnimais();
});

document.querySelectorAll(".btn-adotar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const nome = botao.closest(".card-animal").querySelector("h3").textContent;
    avisoAdocao.textContent = "💛 Que ótimo! Você demonstrou interesse em adotar " + nome + ". Entre em contato para combinarmos a visita.";
    avisoAdocao.hidden = false;
    botao.textContent = "Interesse enviado";
    botao.disabled = true;
  });
});