const menu = [
  { id: 1, name: 'Big Mac', description: 'Hambúrguer de alta qualidade', price: 10.99, image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 2, name: 'McChicken', description: 'Frango no pão de bacon', price: 12.99, image: 'https://via.placeholder.com/150', quantity: 0 },
];

let isMenuVisible = false;
let order = [];
let customerName = '';
let customerPhone = '';
let customerStreet = '';
let customerNeighborhood = '';
let customerLandmark = '';
let paymentMethod = '';
let observation = '';
let isConfirmationModalVisible = false;

// Depois
function showMenu() {
  isMenuVisible = true;
  renderMenu();
}

function hideMenu() {
  isMenuVisible = false;
  renderMenu();
}
/ Função para renderizar o menu dinamicamente
function renderMenu() {
  const menuContainer = document.getElementById('menuItems');
  menuContainer.innerHTML = '';

   if (isMenuVisible) {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'bg-white p-8 rounded-lg shadow-lg';
    menuDiv.onclick = function (event) {
      event.stopPropagation();
    };

function addItem(item) {
  if (item.quantity > 0) {
    const newItem = { ...item }; // Cria uma cópia do objeto para evitar referências diretas
    newItem.quantity = item.quantity; // Define a quantidade selecionada para o novo item
    order.push(newItem); // Adiciona o item ao pedido
    isMenuVisible = false; // Atualiza para ocultar o menu
    renderOrderSummary();
    // Zera a quantidade após adicionar ao pedido
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

// Função para renderizar o resumo do pedido dinamicamente
function renderOrderSummary() {
  const orderSummaryContainer = document.getElementById('orderSummary');
  orderSummaryContainer.innerHTML = '';

  if (order.length === 0) {
    const noItemMessage = document.createElement('p');
    noItemMessage.innerText = 'Nenhum item adicionado ainda.';
    orderSummaryContainer.appendChild(noItemMessage);
  } else {
    order.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'mb-4';

      const itemDetails = document.createElement('div');
      itemDetails.className = 'flex items-center justify-between';

      const itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemImage.className = 'w-12 h-12 mr-4';

      const itemInfo = document.createElement('div');

      const itemName = document.createElement('h3');
      itemName.className = 'font-bold';
      itemName.innerText = item.name;

      const itemDescription = document.createElement('p');
      itemDescription.className = 'text-gray-600';
      itemDescription.innerText = item.description;

      const itemQuantity = document.createElement('p');
      itemQuantity.innerText = `Quantidade: ${item.quantity}`;

      const removeItemButton = document.createElement('button');
      removeItemButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
      removeItemButton.innerText = 'Excluir';
      removeItemButton.onclick = function () {
        removeItem(index);
      };

      itemInfo.appendChild(itemName);
      itemInfo.appendChild(itemDescription);
      itemInfo.appendChild(itemQuantity);

      itemDetails.appendChild(itemImage);
      itemDetails.appendChild(itemInfo);
      itemDetails.appendChild(removeItemButton);

      itemDiv.appendChild(itemDetails);

      orderSummaryContainer.appendChild(itemDiv);
    });

    const totalAmount = document.createElement('p');
    totalAmount.className = 'text-right font-bold mb-4';
    totalAmount.innerText = `Total: R$ ${total().toFixed(2)}`;

    orderSummaryContainer.appendChild(totalAmount);
  }
}

function total() {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

function showConfirmationModal() {
  isConfirmationModalVisible = true;
  renderConfirmationModal();
}

function hideConfirmationModal() {
  isConfirmationModalVisible = false;
  renderConfirmationModal();
}

/ Função para renderizar o modal de confirmação dinamicamente
function renderConfirmationModal() {
  const confirmationModalContainer = document.getElementById('confirmationModal');
  confirmationModalContainer.innerHTML = '';

  if (isConfirmationModalVisible) {
    const modalBackground = document.createElement('div');
    modalBackground.className = 'absolute inset-0 bg-black opacity-50';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-8 rounded-lg shadow-lg z-10';
    modalContent.onclick = function (event) {
      event.stopPropagation();
    };

    const modalTitle = document.createElement('h2');
    modalTitle.className = 'text-2xl font-bold mb-4';
    modalTitle.innerText = 'Resumo do Pedido';

    const confirmationItemsContainer = document.createElement('div');
    confirmationItemsContainer.id = 'confirmationItems';

    if (order.length === 0) {
      const noItemMessage = document.createElement('p');
      noItemMessage.innerText = 'Nenhum item adicionado ainda.';
      confirmationItemsContainer.appendChild(noItemMessage);
    } else {
      order.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'mb-4';

        const itemDetails = document.createElement('div');
        itemDetails.className = 'flex items-center justify-between';

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.className = 'w-12 h-12 mr-4';

        const itemInfo = document.createElement('div');

        const itemName = document.createElement('h3');
        itemName.className = 'font-bold';
        itemName.innerText = item.name;

        const itemDescription = document.createElement('p');
        itemDescription.className = 'text-gray-600';
        itemDescription.innerText = item.description;

        const itemQuantity = document.createElement('p');
        itemQuantity.innerText = `Quantidade: ${item.quantity}`;

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemDescription);
        itemInfo.appendChild(itemQuantity);

        itemDetails.appendChild(itemImage);
        itemDetails.appendChild(itemInfo);

        itemDiv.appendChild(itemDetails);

        confirmationItemsContainer.appendChild(itemDiv);
      });

      const totalAmount = document.createElement('p');
      totalAmount.className = 'text-right font-bold mb-4';
      totalAmount.innerText = `Total: R$ ${total().toFixed(2)}`;

      confirmationItemsContainer.appendChild(totalAmount);
    }

    const confirmationButtonsContainer = document.createElement('div');
    confirmationButtonsContainer.className = 'flex justify-between';

    const confirmOrderButton = document.createElement('button');
    confirmOrderButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
    confirmOrderButton.innerText = 'Confirmar Pedido';
    confirmOrderButton.onclick = confirmOrder;

    const editOrderButton = document.createElement('button');
    editOrderButton.className = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded';
    editOrderButton.innerText = 'Editar Pedido';
    editOrderButton.onclick = hideConfirmationModal;

    confirmationButtonsContainer.appendChild(confirmOrderButton);
    confirmationButtonsContainer.appendChild(editOrderButton);

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(confirmationItemsContainer);
    modalContent.appendChild(confirmationButtonsContainer);

    confirmationModalContainer.appendChild(modalBackground);
    confirmationModalContainer.appendChild(modalContent);
  }
}

function confirmOrder() {
  generateImage();
  hideConfirmationModal();
  order = []; // Resetar o array de pedidos após a confirmação
  renderOrderSummary(); // Atualizar o resumo do pedido
}

// Função para gerar a imagem da comanda
function generateImage() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

function submitOrder() {
  // Exibir o modal de confirmação ao clicar em "Finalizar Pedido"
  showConfirmationModal();
}

// Inicializar a renderização do menu e resumo do pedido
renderMenu();
renderOrderSummary();

