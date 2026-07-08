
const API_URL="https://crudcrud.com/api/a0e6ae65ef5c4485bf735857fe5a784d/clientes";
const form=document.getElementById("clienteForm");
const lista=document.getElementById("listaClientes");
const pesquisa=document.getElementById("pesquisa");
let clientes=[];
window.onload=listar;
form.addEventListener("submit",salvar);
pesquisa.addEventListener("input",()=>render(clientes.filter(c=>(c.nome||"").toLowerCase().includes(pesquisa.value.toLowerCase()))));
async function listar(){const r=await fetch(API_URL);clientes=await r.json();render(clientes);}
function render(d){lista.innerHTML="";document.getElementById("totalClientes").textContent=d.length;document.getElementById("clientesHoje").textContent=d.length;document.getElementById("ultimoCliente").textContent=d.length?d[d.length-1].nome:"-";document.getElementById("semClientes").style.display=d.length?"none":"block";d.forEach(c=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${c.nome||""}</td><td>${c.email||""}</td><td>${c.telefone||"-"}</td><td>${c.cidade||"-"}</td><td>${c.estado||"-"}</td><td><button class="btnExcluir">Excluir</button></td>`;tr.querySelector("button").onclick=()=>del(c._id);lista.appendChild(tr);});}
async function salvar(e){e.preventDefault();const obj={nome:nome.value,email:email.value,telefone:telefone.value,cpf:cpf.value,cidade:cidade.value,estado:estado.value};await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(obj)});form.reset();listar();}
async function del(id){if(!confirm("Excluir cliente?"))return;await fetch(API_URL+"/"+id,{method:"DELETE"});listar();}
