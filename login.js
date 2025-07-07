// Cria o admin automaticamente se ainda não existir
(function () {
  const admin = {
    email: "admin@admin.com",
    senha: "admin123",
    usuario: "Administrador",
    isAdmin: true
  };

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.some(u => u.email === admin.email);

  if (!existe) {
    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Administrador criado automaticamente.");
  }
})();


const form = document.getElementById('loginForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Encontra o usuário completo da lista
  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (user) {
    // Salva o objeto COMPLETO no localStorage
    localStorage.setItem('user', JSON.stringify(user));

    if (user.isAdmin === true) {
      alert('Bem-vindo, administrador!');
      window.location.href = 'admin.html';
    } else {
      alert('Login realizado com sucesso!');
      window.location.href = 'area-usuario.html';
    }
  } else {
    alert('Email ou senha inválidos.');
  }
});
