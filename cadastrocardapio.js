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

function addItem() {
  // Obter o usuário atualmente autenticado
  const user = firebase.auth().currentUser;
  if (!user) {
    console.error('Nenhum usuário autenticado encontrado.');
    // Redirecionar o usuário para a página de login ou executar outra ação apropriada
    return;
  }

  // Obter o ID do usuário atualmente autenticado
  const userId = user.uid;

  // Obter os valores dos campos do formulário
  const itemName = document.getElementById("item-nome").value.trim();
  const itemDescription = document.getElementById("item-descricao").value.trim();
  const itemPrice = document.getElementById("price").value.trim();
  const itemCategory = document.getElementById("item-categoria").value.trim();

  // Verificar se os campos obrigatórios estão preenchidos
  if (!itemName || !itemDescription || !itemPrice || !itemCategory) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Criar objeto para armazenar os dados do item
  const itemData = {
    nome: itemName,
    descricao: itemDescription,
    preco: itemPrice,
    categoria: itemCategory
  };

  // Consultar a coleção "Empresas" para encontrar o documento correspondente ao usuário
  db.collection('Empresas').where('userId', '==', userId).get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.error('Nenhuma empresa encontrada para o usuário atual.');
        return Promise.reject(new Error('Nenhuma empresa encontrada para o usuário atual.'));
      }

      // Como o ID do documento da empresa é único, pode-se assumir que só há um documento correspondente
      const empresaDoc = querySnapshot.docs[0];
      const empresaId = empresaDoc.id;

      // Adicionar o item à subcoleção "cardapio" usando o ID da empresa
      return db.collection('Empresas').doc(empresaId).collection('cardapio').add(itemData);
    })
    .then((docRef) => {
      console.log(`Item adicionado ao Firestore com o ID: ${docRef.id}`);

      // Atualizar a interface do usuário para refletir a adição do item
      const itemElement = document.createElement("div");
      itemElement.classList.add("mb-2");
      itemElement.innerHTML = `
        <h3 class="font-bold">${itemName}</h3>
        <p class="text-sm">${itemDescription} | R$ ${itemPrice} | ${itemCategory}</p>
        <div class="mt-2">
          <button class="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" onclick="showDetailModal()">Editar</button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Excluir</button>
        </div>
      `;

      // Adicionar o elemento do item à lista na interface do usuário
      document.getElementById("itemsList").appendChild(itemElement);
    })
    .catch((error) => {
      console.error('Erro ao adicionar item ao Firestore:', error);
      alert('Erro ao adicionar item ao Firestore. Consulte o console para mais informações.');
    });

  // Limpar formulário após salvar
  clearFields();
}

// Função para limpar os campos do formulário
function clearFields() {
  document.getElementById("item-nome").value = '';
  document.getElementById("item-descricao").value = '';
  document.getElementById("price").value = '';
  document.getElementById("item-categoria").value = '';
  document.getElementById("fileInput").value = '';
  document.getElementById("previewContainer").innerHTML = '';
}

// Função para mostrar detalhes do item
function showDetailModal() {
    document.getElementById('detail-modal').classList.remove('hidden');
}

// Função para fechar o modal de detalhes
function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
}

// Função para anexar imagem
function attachImage() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}

// Função para manipular mudanças nos arquivos selecionados
function onFileChange(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("previewContainer");

    if (previewContainer.childElementCount + files.length > 3) {
        alert('Você só pode escolher até 3 fotos.');
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            const canvas = document.createElement("canvas"); // Elemento canvas para redimensionamento
            const ctx = canvas.getContext("2d");
            img.onload = () => {
                const MAX_WIDTH = 200; // Largura máxima desejada
                const MAX_HEIGHT = 200; // Altura máxima desejada
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg'); // Convertendo a imagem redimensionada para base64
                img.src = dataUrl;
            };
            img.src = e.target.result;
            img.alt = "Imagem";
            img.className = "preview-image";
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
    }
}



