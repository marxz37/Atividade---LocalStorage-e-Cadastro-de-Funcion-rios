const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

// Se não houver usuário logado, expulsa para o login
if (!usuarioLogado) {
    window.location.href = 'index.html';
}

// Confirma que é o perfil de funcionário antes de tentar ler os dados
if (usuarioLogado && usuarioLogado.perfil === 'funcionario') {
    const dados = usuarioLogado.dados;
    
    document.getElementById('msg-boasvindas').textContent = `Bem-vindo(a), ${dados.nome}`;
    document.getElementById('info-email').textContent = dados.email;
    document.getElementById('info-cargo').textContent = dados.cargo;
    document.getElementById('info-departamento').textContent = dados.departamento;
}

// --- LOGOUT ---
document.getElementById('btn-sair').addEventListener('click', () => {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
});