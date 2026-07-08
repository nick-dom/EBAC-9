import { Cliente } from "./classes.js";

import {
    validarEmail,
    limparFormulario,
    mostrarMensagem
} from "./utils.js";

const API_URL = "https://crudcrud.com/api/a0e6ae65ef5c4485bf735857fe5a784d/clientes";

const formulario = document.getElementById("clienteForm");
const tabela = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");

const totalClientes = document.getElementById("totalClientes");
const clientesHoje = document.getElementById("clientesHoje");
const ultimoCliente = document.getElementById("ultimoCliente");
const semClientes = document.getElementById("semClientes");

let clientes = [];

window.addEventListener("DOMContentLoaded", listarClientes);

formulario.addEventListener("submit", cadastrarCliente);

pesquisa.addEventListener("input", pesquisarClientes);

async function listarClientes(){

    try{

        const resposta = await fetch(API_URL);

        clientes = await resposta.json();

        renderizarTabela(clientes);

    }

    catch(erro){

        console.error(erro);

        mostrarMensagem("Erro ao carregar clientes.");

    }

}

async function cadastrarCliente(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const cpf = document.getElementById("cpf").value.trim();

    const cidade = document.getElementById("cidade").value.trim();

    const estado = document.getElementById("estado").value;

    if(nome==="" || email===""){

        mostrarMensagem("Nome e e-mail são obrigatórios.");

        return;

    }

    if(!validarEmail(email)){

        mostrarMensagem("Digite um e-mail válido.");

        return;

    }

    const cliente = new Cliente(

        nome,
        email,
        telefone,
        cpf,
        cidade,
        estado

    );

    try{

        const resposta = await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(cliente)

        });

        if(!resposta.ok){

            throw new Error();

        }

        limparFormulario(formulario);

        listarClientes();

    }

    catch(erro){

        console.error(erro);

        mostrarMensagem("Erro ao cadastrar cliente.");

    }

}

async function excluirCliente(id){

    const cliente = clientes.find(c => c._id === id);

    if(!cliente){

        return;

    }

    if(!confirm(`Excluir ${cliente.nome}?`)){

        return;

    }

    try{

        await fetch(`${API_URL}/${id}`,{

            method:"DELETE"

        });

        listarClientes();

    }

    catch(erro){

        console.error(erro);

        mostrarMensagem("Erro ao excluir.");

    }

}

function renderizarTabela(lista){

    tabela.innerHTML = "";

    if(lista.length===0){

        semClientes.style.display="block";

    }

    else{

        semClientes.style.display="none";

    }

    lista.map(cliente=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

            <td>${cliente.nome}</td>

            <td>${cliente.email}</td>

            <td>${cliente.telefone || "-"}</td>

            <td>${cliente.cidade || "-"}</td>

            <td>${cliente.estado || "-"}</td>

            <td>

                <button class="btnExcluir">

                    Excluir

                </button>

            </td>

        `;

        tr.querySelector("button")

            .addEventListener("click",()=>{

                excluirCliente(cliente._id);

            });

        tabela.appendChild(tr);

    });

    atualizarDashboard(lista);

}

function atualizarDashboard(lista){

    totalClientes.textContent = lista.reduce(

        total => total + 1,

        0

    );

    clientesHoje.textContent = lista.reduce(

        total => total + 1,

        0

    );

    if(lista.length){

        ultimoCliente.textContent =

            lista[lista.length-1].nome;

    }

    else{

        ultimoCliente.textContent="-";

    }

}

function pesquisarClientes(){

    const termo = pesquisa.value.toLowerCase();

    const resultado = clientes.filter(cliente=>

        cliente.nome.toLowerCase().includes(termo)

        ||

        cliente.email.toLowerCase().includes(termo)

        ||

        (cliente.cidade || "").toLowerCase().includes(termo)

    );

    renderizarTabela(resultado);

}