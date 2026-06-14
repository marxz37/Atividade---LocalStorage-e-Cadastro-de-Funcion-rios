const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

// Se não houver usuário logado, expulsa para o login
if (!usuarioLogado) {
    window.location.href = 'index.html';
} 
// Se houver usuário logado, mas NÃO for admin, manda para a área dele
else if (usuarioLogado.perfil !== 'admin') {
    window.location.href = 'boasvindas.html';
}

// --- LOGOUT ---
document.getElementById('btn-sair').addEventListener('click', () => {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
});

const formFuncionario = document.getElementById('form-funcionario');
const listaFuncionarios = document.getElementById('lista-funcionarios');
const contadorElemento = document.getElementById('contador');

let funcionarios = JSON.parse(localStorage.getItem('funcionariosBanco')) || [];

function salvarNoLocalStorage() {
    localStorage.setItem('funcionariosBanco', JSON.stringify(funcionarios));
}

function renderizarTela() {
    listaFuncionarios.innerHTML = '';
    contadorElemento.textContent = `Total: ${funcionarios.length}`;

    funcionarios.forEach(funcionario => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        divCard.innerHTML = `
            <h3>${funcionario.nome}</h3>
            <p><strong>E-mail:</strong> ${funcionario.email}</p>
            <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
            <p><strong>Departamento:</strong> ${funcionario.departamento}</p>
        `;

        listaFuncionarios.appendChild(divCard);
    });
}

function cadastrarFuncionario(evento) {
    evento.preventDefault();

    const nomeInput = document.getElementById('nome').value;
    const emailInput = document.getElementById('email').value;
    const cargoInput = document.getElementById('cargo').value;
    const departamentoInput = document.getElementById('departamento').value;
    const senhaInput = document.getElementById('senha').value;

    const novoFuncionario = {
        id: Date.now(),
        nome: nomeInput,
        email: emailInput,
        cargo: cargoInput,
        departamento: departamentoInput,
        senha: senhaInput
    };

    funcionarios.push(novoFuncionario);
    salvarNoLocalStorage();
    renderizarTela();
    formFuncionario.reset();
}

formFuncionario.addEventListener('submit', cadastrarFuncionario);
renderizarTela();