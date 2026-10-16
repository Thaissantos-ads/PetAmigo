const botoesFoto = document.querySelectorAll(".foto-btn");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbLegenda = document.getElementById("lb-legenda");
const lbFechar = document.getElementById("lb-fechar");
const lbAnterior = document.getElementById("lb-anterior");
const lbProximo = document.getElementById("lb-proximo");

let indiceAtual = 0;
let botaoQueAbriu = null;

function mostrarFoto(indice) {
  const total = botoesFoto.length;
  indiceAtual = (indice + total) % total;

  const imagem = botoesFoto[indiceAtual].querySelector("img");
  lbImg.src = imagem.src;
  lbImg.alt = imagem.alt;
  lbLegenda.textContent = imagem.alt + " (" + (indiceAtual + 1) + " de " + total + ")";
}

function abrirLightbox(indice) {
  botaoQueAbriu = botoesFoto[indice];
  mostrarFoto(indice);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lbFechar.focus();
}

function fecharLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (botaoQueAbriu) {
    botaoQueAbriu.focus();
  }
}

botoesFoto.forEach(function (botao, indice) {
  botao.addEventListener("click", function () {
    abrirLightbox(indice);
  });
});

lbFechar.addEventListener("click", fecharLightbox);
lbAnterior.addEventListener("click", function () {
  mostrarFoto(indiceAtual - 1);
});
lbProximo.addEventListener("click", function () {
  mostrarFoto(indiceAtual + 1);
});

lightbox.addEventListener("click", function (evento) {
  if (evento.target === lightbox) {
    fecharLightbox();
  }
});

document.addEventListener("keydown", function (evento) {
  if (lightbox.hidden) return;

  if (evento.key === "Escape") fecharLightbox();
  if (evento.key === "ArrowLeft") mostrarFoto(indiceAtual - 1);
  if (evento.key === "ArrowRight") mostrarFoto(indiceAtual + 1);
});