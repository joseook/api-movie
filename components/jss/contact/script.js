document.addEventListener('DOMContentLoaded', function () {
    alertify.set('notifier', 'position', 'top-center');
    alertify.set('notifier', 'delay', 5);

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        var nameInput = document.getElementById('nameInput').value.trim();
        var emailInput = document.getElementById('emailInput').value.trim();
        var textareaInput = document.getElementById('textareaInput').value.trim();

    
        if (nameInput === '') {
            alertify.error('Por favor, insira seu nome.');
            document.getElementById('nameInput').focus();
            return;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput)) {
            alertify.error('Por favor, insira um endereço de e-mail válido.');
            document.getElementById('emailInput').focus();
            return;
        }

      
        if (textareaInput === '') {
            alertify.error('Por favor, insira sua mensagem.');
            document.getElementById('textareaInput').focus();
            return;
        }

        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('textareaInput').value = '';

        alertify.success('O formulário foi enviado com sucesso!');
    });
});
