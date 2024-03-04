//Validações

function validarCPF(cpf) {
    const regex = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$/;
    return regex.test(cpf);
}

function validarCEP(cep) {
    const regex = /^([0-9]{5}[\-]?[0-9]{3})$/;
    return regex.test(cep);
}

function validarEmail(email) {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
}

//Telefone
const inputTelefone = document.querySelectorAll("#telefone")[1];
console.log(inputTelefone);

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

inputTelefone.addEventListener("keydown", function handleKeyDown(event) {
    if (
        event.key !== "Backspace" &&
        inputTelefone.value.replace(/\D/g, "").length >= 11
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        inputTelefone.removeEventListener("input", handleInput);
    }
});

//CPF
const inputCPF = document.querySelectorAll("#cpf")[1];

inputCPF.addEventListener("input", function handleInput(event) {
    const valorAtual = event.target.value;
    const valorSemMascara = valorAtual.replace(/\D/g, "");

    const valorLimitado = valorSemMascara.slice(0, 11);

    const valorFormatado = formatarCPF(valorLimitado);

    inputCPF.value = valorFormatado;

    if (valorLimitado.length === 11) {
        inputCPF.removeEventListener("input", handleInput);
    }
});

inputCPF.addEventListener("keydown", function handleKeyDown(event) {
    if (
        event.key !== "Backspace" &&
        inputCPF.value.replace(/\D/g, "").length >= 11
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        inputCPF.removeEventListener("input", handleInput);
    }
});

function formatarCPF(numero) {
    if (numero.length <= 3) {
        return numero;
    } else if (numero.length <= 6) {
        return `${numero.slice(0, 3)}.${numero.slice(3)}`;
    } else if (numero.length <= 9) {
        return `${numero.slice(0, 3)}.${numero.slice(3, 6)}.${numero.slice(6)}`;
    } else {
        return `${numero.slice(0, 3)}.${numero.slice(3, 6)}.${numero.slice(
            6,
            9
        )}-${numero.slice(9)}`;
    }
}

//CEP
function formatarCEP(cep) {
    cep = cep.replace(/\D/g, "");
    if (cep.length === 8) {
        return `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }
    return cep;
}
const inputCEP = document.querySelectorAll("#cep")[1];

inputCEP.addEventListener("input", (event) => {
    const valorAtual = event.target.value;
    const valorFormatado = formatarCEP(valorAtual);

    inputCEP.value = valorFormatado;
});

inputCEP.addEventListener("keydown", function handleKeyDown(event) {
    if (
        event.key !== "Backspace" &&
        inputCEP.value.replace(/\D/g, "").length >= 8
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        inputCEP.removeEventListener("input", handleInput);
    }
});


//Limpar formulário
function limparFormulario() {
    document.getElementById("signupForm").reset();
}
//idade
document
    .getElementById("dataNascimento")
    .addEventListener("change", function () {
        var dataNascimento = new Date(this.value);
        var dataAtual = new Date();
        var diffAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();

        if (
            dataAtual.getMonth() < dataNascimento.getMonth() ||
            (dataAtual.getMonth() === dataNascimento.getMonth() &&
                dataAtual.getDate() < dataNascimento.getDate())
        ) {
            diffAnos--;
        }

        document.querySelectorAll("#idade")[1].value = diffAnos;
    });

