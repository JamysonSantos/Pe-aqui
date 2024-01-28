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

function showMenu() {
  isMenuVisible = true;
  renderMenu();
}

function hideMenu() {
  isMenuVisible = false;
  renderMenu();
}

function renderMenu() {
  const menuContainer = document.getElementById('menuItems');
  menuContainer.innerHTML = '';

  if (isMenuVisible) {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'bg-white p-8 rounded-lg shadow-lg';
    menuDiv.onclick = function (event) {
      event.stopPropagation();
    };

    const menuTitle = document.createElement('h2');
    menuTitle.className = 'text-2xl font-bold mb-4';
    menuTitle.innerText = 'Cardápio';

    menuDiv.appendChild(menuTitle);

    menu.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'flex items-center justify-between mb-4';

      const itemDetails = document.createElement('div');
      itemDetails.className = 'flex items-center';

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

      const itemPrice = document.createElement('p');
      itemPrice.className = 'text-lg font-bold';
      itemPrice.innerText = `R$ ${item.price.toFixed(2)}`;

      const itemQuantity = document.createElement('input');
      itemQuantity.type = 'number';
      itemQuantity.min = '0';
      itemQuantity.value = item.quantity;
      itemQuantity.className = 'border-2 border-gray-300 p-2 rounded';
      itemQuantity.placeholder = 'Quantidade';
      itemQuantity.oninput = function () {
        item.quantity = parseInt(itemQuantity.value) || 0;
      };

      itemInfo.appendChild(itemName);
      itemInfo.appendChild(itemDescription);
      itemInfo.appendChild(itemPrice);
      itemInfo.appendChild(itemQuantity);

      itemDetails.appendChild(itemImage);
      itemDetails.appendChild(itemInfo);

      menuItem.appendChild(itemDetails);

      const addItemButton = document.createElement('button');
      addItemButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
      addItemButton.innerText = 'Adicionar';
      addItemButton.onclick = function () {
        addItem(item);
      };

      menuItem.appendChild(addItemButton);

      menuDiv.appendChild(menuItem);
    });

    const closeMenuButton = document.createElement('button');
    closeMenuButton.className = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded';
    closeMenuButton.innerText = 'Fechar Cardápio';
    closeMenuButton.onclick = hideMenu;

    menuDiv.appendChild(closeMenuButton);

    menuContainer.appendChild(menuDiv);
  }
}

function addItem(item) {
  if (item.quantity > 0) {
    const newItem = { ...item };
    newItem.quantity = item.quantity;
    order.push(newItem);
    isMenuVisible = false;
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
  order = [];
  renderOrderSummary();
}

function generateImage() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 720;
  canvas.height = 1280;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('Pedido', 20, 40);

  ctx.beginPath();
  ctx.moveTo(20, 60);
  ctx.lineTo(canvas.width - 20, 60);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = 'bold 18px Arial';
  let yOffset = 100;
  order.forEach((item, index) => {
    ctx.fillText(`${item.name} - R$ ${item.price.toFixed(2)} x${item.quantity}`, 40, yOffset);
    yOffset += 30;

    ctx.beginPath();
    ctx.moveTo(20, yOffset - 10);
    ctx.lineTo(canvas.width - 20, yOffset - 10);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.moveTo(20, yOffset + 10);
  ctx.lineTo(canvas.width - 20, yOffset + 10);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = '16px Arial';
  ctx.fillText(`Nome: ${customerName}`, 40, yOffset + 50);
  ctx.fillText(`Telefone: ${customerPhone}`, 40, yOffset + 80);
  ctx.fillText(`Rua e Número: ${customerStreet}`, 40, yOffset + 110);
  ctx.fillText(`Bairro: ${customerNeighborhood}`, 40, yOffset + 140);
  ctx.fillText(`Ponto de Referência: ${customerLandmark}`, 40, yOffset + 170);
  ctx.fillText(`Forma de Pagamento: ${paymentMethod}`, 40, yOffset + 200);
  ctx.fillText(`Observação: ${observation}`, 40, yOffset + 230);

  ctx.beginPath();
  ctx.moveTo(20, yOffset + 260);
  ctx.lineTo(canvas.width - 20, yOffset + 260);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = 'bold 20px Arial';
  ctx.fillText(`Total: R$ ${total().toFixed(2)}`, 40, yOffset + 290);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/jpeg');
  link.download = 'pedido.jpg';
  link.click();
}

function submitOrder() {
  showConfirmationModal();
}

// Inicializar a renderização do menu e resumo do pedido
renderMenu();
renderOrderSummary();
