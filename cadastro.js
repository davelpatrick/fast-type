const termos = document.getElementById('termos');
const btn = document.getElementById('btnCadastrar');

termos.addEventListener('change', () => {
  btn.disabled = !termos.checked;
});

// Simulação de armazenamento local
const form = document.getElementById('registerForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const usuario = document.getElementById('usuario').value;

  const userData = { email, senha, usuario };
  localStorage.setItem('user', JSON.stringify(userData));
  alert('Usuário cadastrado com sucesso!');
  window.location.href = 'login.html';
});
