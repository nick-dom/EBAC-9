// ==============================
// utils.js
// Funções auxiliares
// ==============================

export function validarEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

export function limparFormulario(formulario) {

    formulario.reset();

}

export function mostrarMensagem(mensagem) {

    alert(mensagem);

}

export function formatarTelefone(telefone) {

    telefone = telefone.replace(/\D/g, "");

    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");

    telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");

    return telefone;

}

export function formatarCPF(cpf) {

    cpf = cpf.replace(/\D/g, "");

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");

    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf;

}

export function atualizarDashboard(clientes) {

    document.getElementById("totalClientes").textContent = clientes.length;

    document.getElementById("clientesHoje").textContent = clientes.reduce(
        (total) => total + 1,
        0
    );

    if (clientes.length > 0) {

        document.getElementById("ultimoCliente").textContent =
            clientes[clientes.length - 1].nome;

    } else {

        document.getElementById("ultimoCliente").textContent = "-";

    }

}

export function pesquisar(clientes, texto) {

    texto = texto.toLowerCase();

    return clientes.filter(cliente =>

        cliente.nome.toLowerCase().includes(texto) ||

        cliente.email.toLowerCase().includes(texto) ||

        (cliente.cidade || "").toLowerCase().includes(texto)

    );

}

export function ordenarPorNome(clientes) {

    return [...clientes].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );

}

export function buscarPorId(clientes, id) {

    return clientes.find(cliente => cliente._id === id);

}

export function contarClientes(clientes) {

    return clientes.reduce((total) => total + 1, 0);

}

export function limparTabela(tabela) {

    tabela.innerHTML = "";

}