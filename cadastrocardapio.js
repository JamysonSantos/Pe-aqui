// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDb7m40G6cT8zZ0tqxmkyQ78OWBHy8w9LI",
    authDomain: "pecaqui-cc6c1.firebaseapp.com",
    projectId: "pecaqui-cc6c1",
    storageBucket: "pecaqui-cc6c1.appspot.com",
    messagingSenderId: "502925766451",
    appId: "1:502925766451:web:52473d00da34033f789846"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Para utilizar os recursos de autenticação e banco de dados
const auth = firebase.auth();
const db = firebase.firestore();

// Array de categorias e itens
let categories = {};

// Adiciona evento ao botão "Salvar Cardápio"
document.querySelector("#saveMenuBtn").addEventListener("click", function () {
  salvarItensCardapio();
});

// Adiciona evento ao botão "Adicionar"
document.querySelector(".bg-red-700").addEventListener("click", function () {
  const name = document.querySelector('input[placeholder="Nome do item"]').value;
  const description = document.querySelector("textarea").value;
  const price = document.querySelector('input[placeholder="Preço"]').value;
  const category = document.getElementById("categoryInput").value;
  const image = document.querySelector('input[type="file"]').files[0]; // Captura o arquivo de imagem selecionado

  const menuItem = { name, description, price, category, image };

  // Verifica se a categoria já existe no objeto categories
  if (!categories[category]) {
    categories[category] = [];
  }

  // Adiciona o item à categoria correspondente
  categories[category].push(menuItem);

  // Limpa os campos do formulário
  document.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));

  // Atualiza a exibição dos itens
  displayMenuItems();
});

// Função para exibir os itens do cardápio
function displayMenuItems() {
  const menuItemsContainer = document.getElementById("menuItems");
  menuItemsContainer.innerHTML = ""; // Limpa o conteúdo existente

  // Percorre as categorias e exibe os itens
  Object.keys(categories).forEach((category) => {
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.toUpperCase();
    categoryTitle.classList.add("text-xl"); // Adiciona classe de estilo para o título da categoria
    menuItemsContainer.appendChild(categoryTitle); // Adiciona título da categoria

    categories[category].forEach((item) => {
      const newItem = document.createElement("div");
      newItem.innerHTML = `
        <div class="border p-4 mb-2 rounded-lg">
          <h3 class="text-lg font-bold">${item.name}</h3>
          <p>${item.description}</p>
          <p class="item-price">R$ ${item.price}</p>
          <img src="${item.image ? URL.createObjectURL(item.image) : ''}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg mt-2">
        </div>
      `;
      menuItemsContainer.appendChild(newItem); // Adiciona item do cardápio
    });
  });
}

// Adiciona evento ao campo de categorias
const categoryInput = document.getElementById("categoryInput");
categoryInput.addEventListener("input", function () {
  const inputValue = this.value.toLowerCase();
  const suggestedCategoriesContainer = document.getElementById("suggestedCategories");

  // Limpa as categorias sugeridas anteriores
  suggestedCategoriesContainer.innerHTML = "";

  // Filtra e exibe as categorias sugeridas que correspondem ao texto digitado
  Object.keys(categories).forEach((category) => {
    if (category.toLowerCase().includes(inputValue)) {
      const categoryElement = document.createElement("div");
      categoryElement.textContent = category;
      categoryElement.classList.add(
        "cursor-pointer",
        "hover:bg-gray-300",
        "rounded-lg",
        "p-1",
        "mb-1"
      );
      categoryElement.addEventListener("click", function () {
        categoryInput.value = category;
        suggestedCategoriesContainer.classList.add("hidden");
      });
      suggestedCategoriesContainer.appendChild(categoryElement);
    }
  });

  // Exibe as categorias sugeridas se houver algum texto digitado
  if (inputValue.trim() !== "") {
    suggestedCategoriesContainer.classList.remove("hidden");
  } else {
    suggestedCategoriesContainer.classList.add("hidden");
  }
});

// Exibe os itens do cardápio ao carregar a página
displayMenuItems();

const botaoVoltar = document.querySelector('.button-voltar');

if (botaoVoltar) {
  botaoVoltar.addEventListener('click', function() {
    // Redirecionar para a página "home.html"
    window.location.href = "home.html";
  });
} else {
  console.error("Elemento '.button-voltar' não encontrado.");
}

// Função para salvar os itens do cardápio
function salvarItensCardapio() {
  const itensCardapio = Object.values(categories).flat(); // Combina todos os itens do objeto categories

  // Laço para cada item do menu
  itensCardapio.forEach((itemCardapio) => {
    // Pega a categoria digitada pelo usuário
    const categoria = document.getElementById("categoryInput").value;

    // Cria uma referência para um novo documento na coleção "Cardápios"
    const referenciaMenu = db.collection("Cardápios").doc();

    // Faz upload da imagem (se selecionada) e obtém a URL de download
    if (itemCardapio.image) {
      const referenciaArmazenamento = firebase.storage().ref(`Fotos de cardapio/${referenciaMenu.id}`);
      const tarefaUpload = referenciaArmazenamento.put(itemCardapio.image);

      tarefaUpload.on(
        "state_changed",
        (snapshot) => {
          // Observe eventos de mudança de estado como progresso, pausa e resumo
          // ...
        },
        (error) => {
          // Trata erros de upload
          console.error("Erro ao carregar imagem:", error);
        },
        () => {
          tarefaUpload.snapshot.ref.getDownloadURL().then((urlDownload) => {
            itemCardapio.image = urlDownload;
            // Adiciona a categoria digitada ao objeto do item
            itemCardapio.category = categoria;
            // Salva o item do menu com a URL de download e categoria
            referenciaMenu.set(itemCardapio);
          });
        }
      );
    } else {
      // Adiciona a categoria digitada ao objeto do item (sem imagem)
      itemCardapio.category = categoria;
      // Salva o item do menu sem imagem
      referenciaMenu.set(itemCardapio);
    }
  });

  // Limpa o objeto de categorias após salvar
  categories = {};

  // Exibe uma mensagem de sucesso ou redireciona para outra página (opcional)
  alert("Cardápio salvo com sucesso!");
}

document.querySelector("#saveMenuBtn").addEventListener("click", function () {
  salvarItensCardapio();
});



