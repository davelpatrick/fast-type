const emailInput = document.getElementById('perfilEmail');
const usuarioInput = document.getElementById('perfilUsuario');
const senhaAtual = document.getElementById('senhaAtual');
const novaSenha = document.getElementById('novaSenha');
const confirmaSenha = document.getElementById('confirmaSenha');
const confirmarExclusao = document.getElementById('confirmarExclusao');
const excluirBtn = document.getElementById('excluirConta');

const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  alert('Usuário não autenticado.');
  window.location.href = 'login.html';
}

emailInput.value = user.email;
usuarioInput.value = user.usuario;

// Atualizar nome de usuário
const perfilForm = document.getElementById('perfilForm');
perfilForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const index = usuarios.findIndex(u => u.email === user.email);
  if (index !== -1) {
    usuarios[index].usuario = usuarioInput.value;
    user.usuario = usuarioInput.value;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('user', JSON.stringify(user));
    alert('Dados atualizados com sucesso.');
  } else {
    alert('Erro ao atualizar dados.');
  }
});

// Alterar senha
const senhaForm = document.getElementById('senhaForm');
senhaForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (senhaAtual.value !== user.senha) {
    alert('Senha atual incorreta.');
    return;
  }

  if (novaSenha.value !== confirmaSenha.value) {
    alert('As novas senhas não coincidem.');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const index = usuarios.findIndex(u => u.email === user.email);
  if (index !== -1) {
    usuarios[index].senha = novaSenha.value;
    user.senha = novaSenha.value;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('user', JSON.stringify(user));
    alert('Senha alterada com sucesso.');
    senhaForm.reset();
  } else {
    alert('Erro ao alterar senha.');
  }
});

// Habilitar exclusão
confirmarExclusao.addEventListener('change', () => {
  excluirBtn.disabled = !confirmarExclusao.checked;
});

// Excluir conta
excluirBtn.addEventListener('click', () => {
  if (confirmarExclusao.checked) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const novosUsuarios = usuarios.filter(u => u.email !== user.email);

    localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
    localStorage.removeItem('user');
    alert('Conta excluída com sucesso.');
    window.location.href = 'cadastro.html';
  }
});

// Sair
function sair() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}
