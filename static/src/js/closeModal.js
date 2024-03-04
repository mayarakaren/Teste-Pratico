//Pop-up
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('flash-close-btn')) {
            var flashMessage = document.getElementById('flash-messages');

            // Verifica se o elemento existe antes de tentar removê-lo
            if (flashMessage) {
                flashMessage.parentNode.removeChild(flashMessage);
            }
        }
    });
});