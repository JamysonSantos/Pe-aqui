// Criação da instância Vue fora do template
const app = new Vue({
  el: '#app',
  data: {
    showMenu: false,
    menu: [
      { id: 1, name: 'Big Mac', description: 'Hambúrguer de alta qualidade', price: 10.99, image: 'https://via.placeholder.com/150', quantity: 0 },
      { id: 2, name: 'McChicken', description: 'Frango no pão de bacon', price: 12.99, image: 'https://via.placeholder.com/150', quantity: 0 },
    ],
    order: [],
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    paymentMethod: '',
    observation: '',
    showConfirmationModal: false,
  },
  computed: {
    total() {
      return this.order.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    addItem(item) {
      if (item.quantity > 0) {
        const newItem = { ...item };
        newItem.quantity = item.quantity;
        this.order.push(newItem);
        this.showMenu = false;
        item.quantity = 0;
      } else {
        alert('Selecione uma quantidade maior que zero.');
      }
    },
    removeItem(index) {
      this.order.splice(index, 1);
    },
    clearOrder() {
      this.order = [];
    },
    generateImage() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

            // Configuração para se ajustar à visualização em telas de 15/16 polegadas de notebooks e telas de celular
            canvas.width = 720; // Aumentando a largura para ajustar melhor os elementos
            canvas.height = 1280; // Aumentando a altura para ter espaço suficiente

            // Background da comanda
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Títulos
            ctx.fillStyle = '#000';
            ctx.font = 'bold 24px Arial';
            ctx.fillText('Pedido', 20, 40);

            // Linha divisória após o título
            ctx.beginPath();
            ctx.moveTo(20, 60);
            ctx.lineTo(canvas.width - 20, 60);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
                  ctx.stroke();

            // Itens do Pedido
            ctx.font = 'bold 18px Arial';
            let yOffset = 100;
            this.order.forEach((item, index) => {
            ctx.fillText(`${item.name} - R$ ${item.price.toFixed(2)} x${item.quantity}`, 40, yOffset);
            yOffset += 30;

            // Linha divisória entre os itens selecionados
            ctx.beginPath();
            ctx.moveTo(20, yOffset - 10);
            ctx.lineTo(canvas.width - 20, yOffset - 10);
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 1;
            ctx.stroke();
         });

            // Linha divisória após os itens do pedido
            ctx.beginPath();
            ctx.moveTo(20, yOffset + 10);
            ctx.lineTo(canvas.width - 20, yOffset + 10);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();     

            // Informações do Cliente
            ctx.font = '16px Arial';
            ctx.fillText(`Nome: ${this.customerName}`, 40, yOffset + 50);
            ctx.fillText(`Telefone: ${this.customerPhone}`, 40, yOffset + 80);
            ctx.fillText(`Endereço: ${this.customerAddress}`, 40, yOffset + 110);
            ctx.fillText(`Forma de Pagamento: ${this.paymentMethod}`, 40, yOffset + 140);
            ctx.fillText(`Observação: ${this.observation}`, 40, yOffset + 170);

            // Linha divisória após as informações do cliente
            ctx.beginPath();
            ctx.moveTo(20, yOffset + 200);
            ctx.lineTo(canvas.width - 20, yOffset + 200);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Total
            ctx.font = 'bold 20px Arial';
            ctx.fillText(`Total: R$ ${this.total.toFixed(2)}`, 40, yOffset + 240)

      const storage = firebase.storage();
      const imageRef = storage.ref(`/pedidos/${this.order[0].id}`);
      const data = canvas.toDataURL('image/jpeg');
      imageRef.putString(data, 'data_url').then(() => {
        console.log('Imagem salva com sucesso!');
      });
    },
    submitOrder() {
      this.showConfirmationModal = true;
    },
    confirmOrder() {
      this.generateImage();
      this.resetState();
    },
    resetState() {
      this.order = [];
      this.customerName = '';
      this.customerPhone = '';
      this.customerAddress = '';
      this.paymentMethod = '';
      this.observation = '';
      this.showConfirmationModal = false;
    },
	close() {
    this.showConfirmationModal = false;
  },
});

