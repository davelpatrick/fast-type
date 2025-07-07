const termos = document.getElementById('termos');
const btn = document.getElementById('btnCadastrar');



termos.addEventListener('change', () => {
  btn.disabled = !termos.checked;
});

const form = document.getElementById('registerForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const usuario = document.getElementById('usuario').value;

  const novoUsuario = { email, senha, usuario };

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar se o e-mail já está cadastrado
  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    alert('Este e-mail já está cadastrado.');
    return;
  }

  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Usuário cadastrado com sucesso!');
  window.location.href = 'login.html';
});
