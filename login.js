const form = document.getElementById('loginForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const savedUser = JSON.parse(localStorage.getItem('user'));

  if (savedUser && savedUser.email === email && savedUser.senha === senha) {
    alert('Login realizado com sucesso!');
    window.location.href = 'area-usuario.html'; // página futura
  } else {
    alert('Email ou senha inválidos.');
  }
});
