// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDb7m40G6cT8zZ0tqxmkyQ78OWBHy8w9LI",
    authDomain: "pecaqui-cc6c1.firebaseapp.com",
    projectId: "pecaqui-cc6c1",
    storageBucket: "pecaqui-cc6c1.appspot.com",
    messagingSenderId: "502925766451",
    appId: "1:502925766451:web:52473d00da34033f789846"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Funções JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener('change', onFileChange);
});

function attachImage() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}

function onFileChange(e) {
    const files = e.target.files;
    const previewContainer = document.getElementById("previewContainer");
    const imageCaption = document.getElementById("imageCaption");

    if (previewContainer.childElementCount + files.length > 3) {
        alert('Você só pode escolher até 3 fotos.');
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = "Imagem";
            img.className = "previewImage";
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
    }

    imageCaption.style.display = "none";
}

function submitForm() {
    const itemName = document.getElementById("itemName").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const itemCategory = document.getElementById("itemCategory").value;
    const previewContainer = document.getElementById("previewContainer");

    if (itemName && price && previewContainer.childElementCount > 0 && previewContainer.childElementCount <= 3 && itemCategory) {
        const newItem = {
            name: itemName,
            description: description,
            price: parseFloat(price).toFixed(2),
            category: itemCategory,
            images: Array.from(previewContainer.children).map(img => ({ url: img.src }))
        };

        // Substitua 'ID_DA_SUA_EMPRESA' pelo código real da sua empresa
        const empresaId = 'ID_DA_SUA_EMPRESA';

        // Adicione o item ao Firestore
        db.collection('empresas').doc(empresaId).collection('cardapio').add(newItem)
            .then((docRef) => {
                console.log(`Item adicionado ao Firestore com o ID: ${docRef.id}`);
            })
            .catch((error) => {
                console.error('Erro ao adicionar item ao Firestore:', error);
            });

        // Adicione o item à lista na página
        const menuItemsList = document.getElementById("menuItemsList");
        const li = document.createElement("li");
        li.innerHTML = `<strong>${newItem.name}</strong> - R$ ${newItem.price} <button onclick="removeItem(this)" class="bg-red-600 text-white py-1 px-2 rounded">Remover</button>`;
        menuItemsList.appendChild(li);

        clearFields();
    } else {
        alert('Por favor, preencha todos os campos e selecione até 3 imagens.');
    }
}

function clearFields() {
    document.getElementById("itemName").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = '';
    document.getElementById("itemCategory").value = '';
    document.getElementById("fileInput").value = '';
    document.getElementById("previewContainer").innerHTML = '';
    document.getElementById("imageCaption").style.display = "block";
}

function removeItem(button) {
    const li = button.parentNode;
    li.parentNode.removeChild(li);
}

function visualizarCardapio() {
    window.location.href = 'vercadapio.html';
}

function finalizarCadastro() {
    alert('Implemente a lógica para finalizar o cadastro');
}

