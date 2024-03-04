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