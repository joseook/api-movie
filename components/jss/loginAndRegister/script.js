document.addEventListener('DOMContentLoaded', function () {

    alertify.set('notifier', 'position', 'top-center');
    alertify.set('notifier', 'delay', 5);

    function showRegisterForm() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-body').classList.remove('hidden');
        document.getElementById('register-form').style.display = 'flex';
    }

    function showLoginForm() {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('register-body').classList.add('hidden');
        document.getElementById('login-form').style.display = 'flex';
    }

    window.showLoginForm = showLoginForm;
    window.showRegisterForm = showRegisterForm;

    document.getElementById('btnLoginReturn').addEventListener('click', function (event) {
        event.preventDefault();
        showLoginForm();
    });

    document.getElementById('btn-login').addEventListener('click', function (e) {
        e.preventDefault();

        const username = document.getElementById('userInput').value;
        const password = document.getElementById('passwordInput').value;
        const email = document.getElementById('emailInput').value;

        fetch('../../../data.json')
            .then(response => response.json())
            .then(data => {
                const user = data.find((element) => element.name === username && element.email === email && element.password.toString() === password);

                if (user) {
                    window.location.href = '../movie/movie.html';
                    return alertify.success('Login efetuado com sucesso');
                } else {
                    if(username === ''){
                        alertify.error('Por favor, insira seu nome.');
                        document.getElementById('userInput').classList.add('invalid');
                        
                        return;
                    } else if(email === ''){
                        alertify.error('Por favor, insira um endereço de e-mail válido.');
                        document.getElementById('emailInput').classList.add('invalid');
                      
                        return;
                    } else if(password === ''){
                        alertify.error('Por favor, insira sua senha.');
                        document.getElementById('passwordInput').classList.add('invalid');
                        return;
                    } 
                    
                    else {
                        alertify.error('Dados não encontrado ou senha incorreta.');
                    }
                }
            })
            .catch(error => console.error('Erro ao carregar dados:', error));
    });

    document.getElementById('btn-register').addEventListener('click', function (e) {
        e.preventDefault();

        const username = document.getElementById('userInputR').value;
        const password = document.getElementById('passwordInputR').value;
        const email = document.getElementById('emailInputR').value;

        fetch('../../../data.json')
            .then(response => response.json())
            .then(data => {
                const existingUser = data.find((element) => element.email === email);

                if (existingUser) {
                    alertify.error('Este e-mail já está cadastrado.');
                } else {
                    if(username === ''){
                        alertify.error('Por favor, insira seu nome.');
                        document.getElementById('userInputR').classList.add('invalid');
                        document.getElementById('userInputR').focus();
                        return;
                    } else if(email === ''){
                        alertify.error('Por favor, insira um endereço de e-mail válido.');
                        document.getElementById('emailInputR').classList.add('invalid');
                        document.getElementById('emailInputR').focus();
                        return;
                    } else if(password === ''){
                        alertify.error('Por favor, insira sua senha.');
                        document.getElementById('passwordInputR').classList.add('invalid');
                        document.getElementById('passwordInputR').focus();
                        return;
                    }
                    alertify.success('Usuário cadastrado com sucesso!');
                    window.location.href = '../movie/movie.html'; 
                }
            })
            .catch(error => console.error('Erro ao carregar dados:', error));
    });

    document.querySelectorAll('.input-field').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    });
});
