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

//Senha
const passwordInput = document.getElementById("passwordInput");
const passwordConfInput = document.getElementById("passwordConfInput");

// Função para mostrar/esconder a senha
function togglePasswordVisibility(input) {
    const type = input.getAttribute("type");
    const icon = input.parentNode.querySelector(".password-eye-icon");

    if (type === "password") {
        input.setAttribute("type", "text");
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.setAttribute("type", "password");
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Adicionando eventos de clique nos ícones de "olho"
const passwordEyeIcons = document.querySelectorAll(".password-eye-icon");
for (const icon of passwordEyeIcons) {
    icon.addEventListener("click", () => {
        togglePasswordVisibility(icon.parentNode.querySelector("input"));
    });
}

// Validação de senha
passwordConfInput.addEventListener("input", () => {
    if (passwordInput.value !== passwordConfInput.value) {
        passwordConfInput.setCustomValidity("As senhas não coincidem.");
    } else {
        passwordConfInput.setCustomValidity("");
    }
});

//Dados
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("tabela-dados");
    const tbody = tabela.querySelector("tbody");

    function carregarDados() {
        fetch("/api/pessoas")
            .then((response) => response.json())
            .then((data) => {
                tbody.innerHTML = "";
                data.forEach((dado) => {
                    const linha = criarLinha(dado);
                    tbody.appendChild(linha);
                });
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }

    function criarLinha(dado) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dado.nome}</td>
            <td>${dado.cpf}</td>
            <td>${dado.dataNascimento}</td>
            <td class="actions">
                <button class="botao editar" data-id="${dado.id}">Editar</button>
                <button class="botao excluir" data-id="${dado.id}">Excluir</button>
            </td>
        `;
        return tr;
    }

    carregarDados();

    tabela.addEventListener("click", function (event) {
        const botaoEditar = event.target.closest(".editar");
        const botaoExcluir = event.target.closest(".excluir");

        if (botaoEditar) {
            const id = botaoEditar.getAttribute("data-id");
            window.location.href = `/editpessoa/${id}`;
        } else if (botaoExcluir) {
            const id = botaoExcluir.getAttribute("data-id");
            if (confirm("Tem certeza que deseja excluir esta pessoa?")) {
                fetch(`/excluir_pessoa/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        alert(data.message);
                        carregarDados();
                    })
                    .catch((error) => console.error("Erro ao excluir pessoa:", error));
            }
        }
    });
});

