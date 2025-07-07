const tabela = document.querySelector('#tabelaUsuarios tbody');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let userLogado = JSON.parse(localStorage.getItem('user'));

// Verifica se o userLogado existe e é válido (está na lista de usuários)
const usuarioValido = usuarios.find(u => u.email === userLogado?.email && u.senha === userLogado?.senha);

// Protege acesso
if (!usuarioValido || !usuarioValido.isAdmin) {
  alert('Acesso negado. Área restrita ao administrador.');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Atualiza o userLogado com base no que está na lista (caso tenha sido alterado)
userLogado = usuarioValido;
localStorage.setItem('user', JSON.stringify(userLogado)); // Re-salva atualizado

// Renderiza a tabela
function renderTabela() {
  tabela.innerHTML = '';

  usuarios.forEach((usuario, index) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${usuario.email}</td>
      <td>${usuario.usuario}</td>
      <td>${usuario.senha}</td>
      <td>
        ${
          usuario.isAdmin
            ? 'Administrador'
            : `<button onclick="excluirUsuario(${index})">Excluir</button>`
        }
      </td>
    `;

    tabela.appendChild(linha);
  });
}

// Excluir usuário
function excluirUsuario(index) {
  const usuarioRemovido = usuarios[index];

  if (confirm(`Deseja realmente excluir o usuário "${usuarioRemovido.usuario}"?`)) {
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Verifica se o admin logado ainda existe
    const aindaExiste = usuarios.find(u => u.email === userLogado.email);
    if (!aindaExiste) {
      localStorage.removeItem('user');
      alert('Sua conta foi excluída ou está corrompida. Faça login novamente.');
      window.location.href = 'login.html';
      return;
    }

    renderTabela();
  }
}

// Logout
function sair() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Inicializa a tabela
renderTabela();
