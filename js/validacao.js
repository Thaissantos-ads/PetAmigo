// ===== Funções reutilizáveis (Contato, Cadastro e Entrar) =====
function mostrarErro(campo, idErro, texto) {
  document.getElementById(idErro).textContent = texto;
  campo.classList.add("invalido");
  campo.classList.remove("valido");
}

function limparErro(campo, idErro) {
  document.getElementById(idErro).textContent = "";
  campo.classList.remove("invalido");
  campo.classList.add("valido");
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== FORMULÁRIO DE CONTATO =====
const formContato = document.getElementById("form-contato");

if (formContato) {
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoAssunto = document.getElementById("assunto");
  const campoMensagem = document.getElementById("mensagem");
  const sucessoContato = document.getElementById("mensagem-sucesso");

  function validarNome() {
    const valor = campoNome.value.trim();
    if (valor === "") {
      mostrarErro(campoNome, "erro-nome", "Digite seu nome.");
      return false;
    }
    if (valor.length < 3) {
      mostrarErro(campoNome, "erro-nome", "O nome deve ter pelo menos 3 letras.");
      return false;
    }
    limparErro(campoNome, "erro-nome");
    return true;
  }

  function validarEmail() {
    const valor = campoEmail.value.trim();
    if (valor === "") {
      mostrarErro(campoEmail, "erro-email", "Digite seu e-mail.");
      return false;
    }
    if (!emailValido(valor)) {
      mostrarErro(campoEmail, "erro-email", "Digite um e-mail válido (ex: nome@email.com).");
      return false;
    }
    limparErro(campoEmail, "erro-email");
    return true;
  }

  function validarAssunto() {
    if (campoAssunto.value === "") {
      mostrarErro(campoAssunto, "erro-assunto", "Escolha um assunto.");
      return false;
    }
    limparErro(campoAssunto, "erro-assunto");
    return true;
  }

  function validarMensagem() {
    const valor = campoMensagem.value.trim();
    if (valor.length < 10) {
      mostrarErro(campoMensagem, "erro-mensagem", "A mensagem deve ter pelo menos 10 caracteres.");
      return false;
    }
    limparErro(campoMensagem, "erro-mensagem");
    return true;
  }

  campoNome.addEventListener("blur", validarNome);
  campoEmail.addEventListener("blur", validarEmail);
  campoAssunto.addEventListener("change", validarAssunto);
  campoMensagem.addEventListener("blur", validarMensagem);

  formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const assuntoOk = validarAssunto();
    const mensagemOk = validarMensagem();

    if (nomeOk && emailOk && assuntoOk && mensagemOk) {
      sucessoContato.hidden = false;
      formContato.reset();
      [campoNome, campoEmail, campoAssunto, campoMensagem].forEach(function (campo) {
        campo.classList.remove("valido");
      });
    } else {
      sucessoContato.hidden = true;
    }
  });
}