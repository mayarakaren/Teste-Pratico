const inputTelefone = document.querySelectorAll("#telefone")[1];
console.log(inputTelefone)

function formatarTelefone(numero) {
    numero = numero.replace(/[^0-9]/g, "");

    if (numero.length === 11) {
        return `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
    }

    return `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
}

inputTelefone.addEventListener("input", (event) => {
    const valorAtual = event.target.value;
    const valorFormatado = formatarTelefone(valorAtual);
    inputTelefone.value = valorFormatado;
});

//CPF
function formatarCPF(numero) {
    numero = numero.replace(/\D/g, "");

    numero = numero.slice(0, 11);
    if (numero.length === 11) {
        return `${numero.slice(0, 3)}.${numero.slice(3, 6)}.${numero.slice(
            6,
            9
        )}-${numero.slice(9, 11)}`;
    } else {
        return `${numero.slice(0, 3)}.${numero.slice(3, 6)}.${numero.slice(6, 9)}-${numero.slice(9, 11)}`;
    }
}
const inputCPF = document.querySelectorAll("#cpf")[1];

inputCPF.addEventListener("input", (event) => {
    const valorAtual = event.target.value;
    const valorFormatado = formatarCPF(valorAtual);

    inputCPF.value = valorFormatado;
});

//CEP
function formatarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length === 8) {
        return `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }
    return cep;
}
const inputCEP = document.querySelectorAll('#cep')[1];

inputCEP.addEventListener('input', (event) => {
    const valorAtual = event.target.value;
    const valorFormatado = formatarCEP(valorAtual);

    inputCEP.value = valorFormatado;
});

//Limpar formulário
function limparFormulario() {
    document.getElementById('signupForm').reset();
}

//Validações

function validarCPF(cpf) {
    const regex = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$/;
    return regex.test(cpf);
  }

  function validarCEP(cep) {
    const regex = /^([0-9]{5}[\-]?[0-9]{3})$/;
    return regex.test(cep);
  }

  function validarEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  
  function validar() {
    const cpf = document.querySelectorAll("#cpf")[1].value;
    const cep = document.querySelectorAll("#cep")[1].value;
    const email = document.querySelectorAll("#email")[1].value;
  
    if (!validarCPF(cpf)) {
      alert("CPF inválido!");
      return;
    }
  
    if (!validarCEP(cep)) {
      alert("CEP inválido!");
      return;
    }
  
    if (!validarEmail(email)) {
      alert("Email inválido!");
      return;
    }
  
    alert("Dados válidos!");
  }

  //idade
  document.getElementById('dataNascimento').addEventListener('change', function() {

    var dataNascimento = new Date(this.value);
    var dataAtual = new Date();
    var diffAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();

    if (dataAtual.getMonth() < dataNascimento.getMonth() || 
        (dataAtual.getMonth() === dataNascimento.getMonth() && dataAtual.getDate() < dataNascimento.getDate())) {
        diffAnos--;
    }

    document.querySelectorAll('#idade')[1].value = diffAnos;
});
