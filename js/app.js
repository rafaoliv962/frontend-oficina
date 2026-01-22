// ================================
// CONFIGURAÇÃO DA API
// ================================
const API_URL = "http://localhost:3000";

// ================================
 let clientes = [];

function addCliente() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !telefone) {
    alert("Preencha todos os campos");
    return;
  }

  clientes.push({ nome, telefone });
  renderClientes();

  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
}

function renderClientes() {
  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  clientes.forEach((c, i) => {
    lista.innerHTML += `
      <div class="item">
        <strong>${c.nome}</strong><br>
        ${c.telefone}
        <div class="actions">
          <button class="edit" onclick="editarCliente(${i})">Editar</button>
          <button class="delete" onclick="excluirCliente(${i})">Excluir</button>
        </div>
      </div>
    `;
  });
}

function excluirCliente(index) {
  clientes.splice(index, 1);
  renderClientes();
}

function editarCliente(index) {
  const c = clientes[index];
  document.getElementById("nome").value = c.nome;
  document.getElementById("telefone").value = c.telefone;
  excluirCliente(index);
}

// ================================
// CARROS
// ================================

// Carregar clientes no select
async function carregarClientesSelect() {
  const select = document.getElementById("clienteCarro");
  if (!select) return;

  const res = await fetch(`${API_URL}/clientes`);
  const clientes = await res.json();

  select.innerHTML = `<option value="">Selecione o cliente</option>`;

  clientes.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nome;
    select.appendChild(opt);
  });
}

// Buscar carros
async function carregarCarros() {
  const res = await fetch(`${API_URL}/carros`);
  const carros = await res.json();
  renderCarros(carros);
}

// Renderizar carros
function renderCarros(carros) {
  const lista = document.getElementById("listaCarros");
  if (!lista) return;

  lista.innerHTML = "";

  carros.forEach(carro => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${carro.modelo}</strong><br>
        <small>${carro.placa} - ${carro.ano}</small>
      </div>
      <div>
        <button onclick="editarCarro(${carro.id}, '${carro.modelo}', '${carro.placa}', '${carro.ano}')">Editar</button>
        <button onclick="excluirCarro(${carro.id})">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Adicionar carro
async function addCarro() {
  const cliente_id = document.getElementById("clienteCarro").value;
  const modelo = document.getElementById("modelo").value;
  const placa = document.getElementById("placa").value;
  const ano = document.getElementById("ano").value;

  if (!cliente_id || !modelo || !placa || !ano) {
    alert("Preencha todos os campos");
    return;
  }

  await fetch(`${API_URL}/carros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente_id, modelo, placa, ano })
  });

  document.getElementById("modelo").value = "";
  document.getElementById("placa").value = "";
  document.getElementById("ano").value = "";

  carregarCarros();
}

// Editar carro
async function editarCarro(id, modeloAtual, placaAtual, anoAtual) {
  const modelo = prompt("Modelo:", modeloAtual);
  const placa = prompt("Placa:", placaAtual);
  const ano = prompt("Ano:", anoAtual);

  if (!modelo || !placa || !ano) return;

  await fetch(`${API_URL}/carros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelo, placa, ano })
  });

  carregarCarros();
}

// Excluir carro
async function excluirCarro(id) {
  if (!confirm("Deseja excluir este carro?")) return;

  await fetch(`${API_URL}/carros/${id}`, {
    method: "DELETE"
  });

  carregarCarros();
}

// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", () => {
  carregarClientes();
  carregarClientesSelect();
  carregarCarros();
});
