import data from '../../../data.json' assert {'type': 'json'};

document.addEventListener('DOMContentLoaded', function () {
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

  document.getElementById('registerButton').addEventListener('click', function () {
    window.location.href = './pages/loginAndRegister/index.html#register-body';
  });

  document.getElementById('btn-login').addEventListener('click', function Validation(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const loginVerify = data.find((element) => element.name === username && element.email === email && element.password === password)

    if (loginVerify) {
      alert('Login efetuado com sucesso');
      window.location.href = '../pages/movie/movie.html'
    } else {
      alert('Por favor preencha todos os campos');
    }
  })

  
});
