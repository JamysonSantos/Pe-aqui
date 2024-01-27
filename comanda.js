const menu = [
  { id: 1, name: 'Big Mac', description: 'Hambúrguer de alta qualidade', price: 10.99, image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 2, name: 'McChicken', description: 'Frango no pão de bacon', price: 12.99, image: 'https://via.placeholder.com/150', quantity: 0 },
];

let order = [];

function addItem(item) {
  if (item.quantity > 0) {
    const newItem = { ...item, quantity: item.quantity };
    order.push(newItem);
    renderOrderSummary();
    item.quantity = 0;
  } else {
    alert('Selecione uma quantidade maior que zero.');
  }
}

function removeItem(index) {
  order.splice(index, 1);
  renderOrderSummary();
}

function clearOrder() {
  order = [];
  renderOrderSummary();
}

function renderOrderSummary() {
  console.clear(); // Limpa o console a cada renderização (pode ser removido em produção)
  console.log('Pedido Atual:', order);
}

function total() {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Teste de exemplo para verificar se as funções estão sendo chamadas
addItem(menu[0]);
addItem(menu[1]);
removeItem(0);
clearOrder();

// Adicione mais chamadas de funções de acordo com suas interações com o código.

