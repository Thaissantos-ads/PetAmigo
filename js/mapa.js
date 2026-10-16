const botoesTipo = document.querySelectorAll(".btn-filtro");
const locais = document.querySelectorAll(".local-btn");
const mapaFrame = document.getElementById("mapa-frame");

locais.forEach(function (local) {
  local.addEventListener("click", function () {
    locais.forEach(function (l) {
      l.classList.remove("selecionado");
    });
    local.classList.add("selecionado");

    const busca = encodeURIComponent(local.dataset.busca);
    mapaFrame.src = "https://www.google.com/maps?q=" + busca + "&output=embed";
  });
});

botoesTipo.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesTipo.forEach(function (b) {
      b.classList.remove("ativo");
    });
    botao.classList.add("ativo");

    const tipo = botao.dataset.tipo;
    locais.forEach(function (local) {
      const mostrar = tipo === "todos" || local.dataset.tipo === tipo;
      local.parentElement.hidden = !mostrar;
    });
  });
});