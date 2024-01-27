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

      // ... (restante do código para gerar a imagem na tela)

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
  },
});
