const formLogin = document.getElementById('form-login');
const msgErro = document.getElementById('mensagem-erro');

const adminUser = {
    login: "admin",
    senha: "123"
};

formLogin.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const loginInput = document.getElementById('login-usuario').value;
    const senhaInput = document.getElementById('login-senha').value;

    if (loginInput === adminUser.login && senhaInput === adminUser.senha) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify({ perfil: 'admin' }));
        window.location.href = 'controle.html';
        return;
    }

    const funcionarios = JSON.parse(localStorage.getItem('funcionariosBanco')) || [];
    const funcionarioEncontrado = funcionarios.find(
        func => func.email === loginInput && func.senha === senhaInput
    );

    if (funcionarioEncontrado) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify({ 
            perfil: 'funcionario', 
            dados: funcionarioEncontrado 
        }));
        window.location.href = 'boasvindas.html';
    } else {
        msgErro.style.display = 'block';
    }
});