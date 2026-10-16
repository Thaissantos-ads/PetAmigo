const areaForms = document.getElementById("area-forms");
const areaLogado = document.getElementById("area-logado");
const saudacao = document.getElementById("saudacao");
const abaEntrar = document.getElementById("aba-entrar");
const abaCadastro = document.getElementById("aba-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const msgConta = document.getElementById("msg-conta");
const btnSair = document.getElementById("btn-sair");

// ===== localStorage =====
function lerUsuarios() {
  const dados = localStorage.getItem("petamigo-usuarios");
  return dados ? JSON.parse(dados) : [];
}

function salvarUsuarios(lista) {
  localStorage.setItem("petamigo-usuarios", JSON.stringify(lista));
}

// ===== Mostra a tela certa (logado ou formulários) =====
function atualizarTela() {
  const logado = localStorage.getItem("petamigo-logado");
  if (logado) {
    saudacao.textContent = "Olá, " + logado + "! 🐾";
    areaLogado.hidden = false;
    areaForms.hidden = true;
  } else {
    areaLogado.hidden = true;
    areaForms.hidden = false;
  }
}

// ===== Abas =====
function mostrarAba(aba) {
  const entrar = aba === "entrar";
  formLogin.hidden = !entrar;
  formCadastro.hidden = entrar;
  abaEntrar.classList.toggle("ativa", entrar);
  abaCadastro.classList.toggle("ativa", !entrar);
  abaEntrar.setAttribute("aria-selected", entrar);
  abaCadastro.setAttribute("aria-selected", !entrar);
  msgConta.hidden = true;
}

abaEntrar.addEventListener("click", function () { mostrarAba("entrar"); });
abaCadastro.addEventListener("click", function () { mostrarAba("cadastro"); });

// ===== Cadastro =====
formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const campoNome = document.getElementById("cad-nome");
  const campoEmail = document.getElementById("cad-email");
  const campoSenha = document.getElementById("cad-senha");
  const campoConfirmar = document.getElementById("cad-confirmar");

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim().toLowerCase();
  const senha = campoSenha.value;
  const confirmar = campoConfirmar.value;

  let ok = true;

  if (nome.length < 3) {
    mostrarErro(campoNome, "erro-cad-nome", "O nome deve ter pelo menos 3 letras.");
    ok = false;
  } else {
    limparErro(campoNome, "erro-cad-nome");
  }

  if (!emailValido(email)) {
    mostrarErro(campoEmail, "erro-cad-email", "Digite um e-mail válido (ex: nome@email.com).");
    ok = false;
  } else {
    limparErro(campoEmail, "erro-cad-email");
  }

  if (senha.length < 6) {
    mostrarErro(campoSenha, "erro-cad-senha", "A senha deve ter pelo menos 6 caracteres.");
    ok = false;
  } else {
    limparErro(campoSenha, "erro-cad-senha");
  }

  if (confirmar === "" || confirmar !== senha) {
    mostrarErro(campoConfirmar, "erro-cad-confirmar", "As senhas não são iguais.");
    ok = false;
  } else {
    limparErro(campoConfirmar, "erro-cad-confirmar");
  }

  if (!ok) return;

  const usuarios = lerUsuarios();
  const jaExiste = usuarios.some(function (u) { return u.email === email; });

  if (jaExiste) {
    mostrarErro(campoEmail, "erro-cad-email", "Este e-mail já está cadastrado.");
    return;
  }

  usuarios.push({ nome: nome, email: email, senha: senha });
  salvarUsuarios(usuarios);

  formCadastro.reset();
  [campoNome, campoEmail, campoSenha, campoConfirmar].forEach(function (c) {
    c.classList.remove("valido");
  });

  mostrarAba("entrar");
  msgConta.textContent = "✅ Conta criada com sucesso! Agora é só entrar.";
  msgConta.hidden = false;
});

// ===== Login =====
formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const campoEmail = document.getElementById("login-email");
  const campoSenha = document.getElementById("login-senha");
  const email = campoEmail.value.trim().toLowerCase();
  const senha = campoSenha.value;

  let ok = true;

  if (!emailValido(email)) {
    mostrarErro(campoEmail, "erro-login-email", "Digite um e-mail válido.");
    ok = false;
  } else {
    limparErro(campoEmail, "erro-login-email");
  }

  if (senha === "") {
    mostrarErro(campoSenha, "erro-login-senha", "Digite sua senha.");
    ok = false;
  } else {
    limparErro(campoSenha, "erro-login-senha");
  }

  if (!ok) return;

  const usuario = lerUsuarios().find(function (u) {
    return u.email === email && u.senha === senha;
  });

  if (!usuario) {
    mostrarErro(campoSenha, "erro-login-senha", "E-mail ou senha incorretos.");
    return;
  }

  localStorage.setItem("petamigo-logado", usuario.nome);
  formLogin.reset();
  [campoEmail, campoSenha].forEach(function (c) { c.classList.remove("valido"); });
  msgConta.hidden = true;
  atualizarTela();
});

// ===== Sair =====
btnSair.addEventListener("click", function () {
  localStorage.removeItem("petamigo-logado");
  atualizarTela();
});

atualizarTela();