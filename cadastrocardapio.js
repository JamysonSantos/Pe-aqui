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

// Verifica se há um usuário autenticado
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // O usuário está autenticado
        const userId = user.uid;

        // Função para adicionar um item ao Firestore
        function addItem() {
            const itemName = document.getElementById("item-nome").value;
            const itemDescription = document.getElementById("item-descricao").value;
            const itemPrice = document.getElementById("price").value;
            const itemCategory = document.getElementById("item-categoria").value;

            // Criar objeto para armazenar os dados do item
            const itemData = {
                nome: itemName,
                descricao: itemDescription,
                preco: itemPrice,
                categoria: itemCategory
            };

            // Recuperar o ID da empresa associada ao usuário
            db.collection('Empresas').where('userId', '==', userId).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const empresaId = doc.id;
                        
                        // Verifica se a subcoleção "Cardapio" já existe para esta empresa
                        db.collection('Empresas').doc(empresaId).collection('cardapio').get()
                            .then((snapshot) => {
                                if (snapshot.empty) {
                                    // A subcoleção "Cardapio" não existe, então cria ela
                                    db.collection('Empresas').doc(empresaId).collection('cardapio').add({})
                                        .then((docRef) => {
                                            console.log("Subcoleção 'cardapio' criada com sucesso.");
                                            // Adicionar o item ao Firestore usando o ID da empresa associada ao usuário
                                            db.collection('empresas').doc(empresaId).collection('cardapio').doc(docRef.id).set(itemData)
                                                .then(() => {
                                                    console.log("Item adicionado ao Firestore com sucesso.");
                                                })
                                                .catch((error) => {
                                                    console.error('Erro ao adicionar item ao Firestore:', error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.error('Erro ao criar subcoleção "cardapio":', error);
                                        });
                                } else {
                                    // A subcoleção "Cardapio" já existe, então adiciona o item diretamente
                                    db.collection('Empresas').doc(empresaId).collection('Cardapio').add(itemData)
                                        .then((docRef) => {
                                            console.log(`Item adicionado ao Firestore com o ID: ${docRef.id}`);
                                        })
                                        .catch((error) => {
                                            console.error('Erro ao adicionar item ao Firestore:', error);
                                        });
                                }
                            })
                            .catch((error) => {
                                console.error('Erro ao verificar a existência da subcoleção "cardapio":', error);
                            });
                    });
                })
                .catch((error) => {
                    console.error('Erro ao recuperar o ID da empresa:', error);
                });

            // Limpar formulário após salvar
            clearFields();
        }
    } else {
        // Se não houver usuário autenticado, redirecione para a página de login ou realize outra ação apropriada
        console.log("Nenhum usuário autenticado encontrado.");
    }
});

// Função para limpar os campos do formulário
function clearFields() {
    document.getElementById("item-nome").value = '';
    document.getElementById("item-descricao").value = '';
    document.getElementById("price").value = '';
    document.getElementById("item-categoria").value = '';
    document.getElementById("fileInput").value = '';
    document.getElementById("previewContainer").innerHTML = '';
}

// Function to show detailed view modal
function showDetailModal() {
    document.getElementById('detail-modal').classList.remove('hidden');
}

// Function to close detailed view modal
function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
}

// Function to attach image input
function attachImage() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}

// Function to handle file input change
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

// Função para lidar com a submissão do formulário
function addItem() {
    const itemName = document.getElementById("item-nome").value;
    const itemDescription = document.getElementById("item-descricao").value;
    const itemPrice = document.getElementById("price").value;
    const itemCategory = document.getElementById("item-categoria").value;

    // Criar elemento HTML para o item
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

    // Adicionar item à lista
    document.getElementById("itemsList").appendChild(itemElement);

    // Limpar formulário
    document.getElementById("addItemForm").reset();
}

