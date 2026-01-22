// ===============================
// UTIL
// ===============================
function $(id) {
  return document.getElementById(id);
}

// ===============================
// CLIENTES
// ===============================
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function salvarClientes() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

function addCliente() {
  const nome = $("nome")?.value.trim();
  const telefone = $("telefone")?.value.trim();

  if (!nome || !telefone) {
    alert("Preencha todos os campos");
    return;
  }

  clientes.push({ nome, telefone });
  salvarClientes();
  renderClientes();

  $("nome").value = "";
  $("telefone").value = "";
}

function renderClientes() {
  const tabela = $("listaClientes");
  if (!tabela) return;

  tabela.innerHTML = "";

  clientes.forEach((c, i) => {
    tabela.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${c.nome}</td>
        <td>${c.telefone}</td>
        <td>
          <button onclick="editarCliente(${i})">Editar</button>
          <button onclick="excluirCliente(${i})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function excluirCliente(i) {
  clientes.splice(i, 1);
  salvarClientes();
  renderClientes();
}

function editarCliente(i) {
  const c = clientes[i];
  $("nome").value = c.nome;
  $("telefone").value = c.telefone;
  excluirCliente(i);
}

// ===============================
// CARROS
// ===============================
let carros = JSON.parse(localStorage.getItem("carros")) || [];

function salvarCarros() {
  localStorage.setItem("carros", JSON.stringify(carros));
}

function addCarro() {
  const placa = $("placa")?.value.trim();
  const modelo = $("modelo")?.value.trim();
  const ano = $("ano")?.value.trim();

  if (!placa || !modelo || !ano) {
    alert("Preencha todos os campos");
    return;
  }

  carros.push({ placa, modelo, ano });
  salvarCarros();
  renderCarros();

  $("placa").value = "";
  $("modelo").value = "";
  $("ano").value = "";
}

function renderCarros() {
  const tabela = $("listaCarros");
  if (!tabela) return;

  tabela.innerHTML = "";

  carros.forEach((c, i) => {
    tabela.innerHTML += `
      <tr>
        <td>${c.placa}</td>
        <td>${c.modelo}</td>
        <td>${c.ano}</td>
        <td>
          <button onclick="editarCarro(${i})">Editar</button>
          <button onclick="excluirCarro(${i})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function excluirCarro(i) {
  carros.splice(i, 1);
  salvarCarros();
  renderCarros();
}

function editarCarro(i) {
  const c = carros[i];
  $("placa").value = c.placa;
  $("modelo").value = c.modelo;
  $("ano").value = c.ano;
  excluirCarro(i);
}

// ===============================
// DASHBOARD
// ===============================
function carregarDashboard() {
  if ($("totalClientes")) {
    $("totalClientes").innerText = clientes.length;
  }

  if ($("totalCarros")) {
    $("totalCarros").innerText = carros.length;
  }

  if ($("dataHoje")) {
    $("dataHoje").innerText = new Date().toLocaleDateString("pt-BR");
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderClientes();
  renderCarros();
  carregarDashboard();
});
// ===============================
// ORDEM DE SERVIÇO (OS)
// ===============================
let ordens = JSON.parse(localStorage.getItem("ordens")) || [];

function salvarOS() {
  localStorage.setItem("ordens", JSON.stringify(ordens));
}

function addOS() {
  const cliente = $("osCliente")?.value.trim();
  const veiculo = $("osVeiculo")?.value.trim();
  const servico = $("osServico")?.value.trim();
  const valor = $("osValor")?.value.trim();

  if (!cliente || !veiculo || !servico || !valor) {
    alert("Preencha todos os campos");
    return;
  }

  ordens.push({
    cliente,
    veiculo,
    servico,
    valor
  });

  salvarOS();
  renderOS();

  $("osCliente").value = "";
  $("osVeiculo").value = "";
  $("osServico").value = "";
  $("osValor").value = "";
}

function renderOS() {
  const tabela = $("listaOS");
  if (!tabela) return;

  tabela.innerHTML = "";

  ordens.forEach((o, i) => {
    tabela.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${o.cliente}</td>
        <td>${o.veiculo}</td>
        <td>${o.servico}</td>
        <td>R$ ${Number(o.valor).toFixed(2)}</td>
        <td>
          <button onclick="editarOS(${i})">Editar</button>
          <button onclick="excluirOS(${i})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function excluirOS(i) {
  ordens.splice(i, 1);
  salvarOS();
  renderOS();
}

function editarOS(i) {
  const o = ordens[i];

  $("osCliente").value = o.cliente;
  $("osVeiculo").value = o.veiculo;
  $("osServico").value = o.servico;
  $("osValor").value = o.valor;

  excluirOS(i);
}

