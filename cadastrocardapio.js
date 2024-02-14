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

// Função para adicionar um novo item ao cardápio
function addItem() {
    // Obter o ID do usuário atualmente autenticado
    const userId = firebase.auth().currentUser.uid;

    // Obter os valores dos campos do formulário
    const nomeItem = document.getElementById('item-nome').value.trim();
    const descricaoItem = document.getElementById('item-descricao').value.trim();
    const precoItem = document.getElementById('price').value.trim();
    const categoriaItem = document.getElementById('item-categoria').value.trim();

    // Verificar se os campos obrigatórios estão preenchidos
    if (!nomeItem || !descricaoItem || !precoItem || !categoriaItem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Obter referência para a coleção "cardapio" do usuário atual
    const cardapioRef = db.collection('Empresas').doc(userId).collection('cardapio');

    // Verifica se o usuário selecionou alguma imagem
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        // Se nenhum arquivo foi selecionado, salva o item sem imagem
        salvarItemSemImagem(cardapioRef, nomeItem, descricaoItem, precoItem, categoriaItem);
    } else {
        // Se o usuário selecionou uma ou mais imagens, salva o item com as imagens
        salvarItemComImagens(cardapioRef, nomeItem, descricaoItem, precoItem, categoriaItem, fileInput.files);
    }
}

// Função para salvar um item sem imagem no Firestore
function salvarItemSemImagem(cardapioRef, nomeItem, descricaoItem, precoItem, categoriaItem) {
    cardapioRef.add({
        nome: nomeItem,
        descricao: descricaoItem,
        preco: precoItem,
        categoria: categoriaItem,
        imagens: [] // Array vazio para armazenar URLs das imagens
    })
    .then(() => {
        console.log('Item cadastrado com sucesso');
        limparCamposDoFormulario();
    })
    .catch((error) => {
        console.error('Erro ao cadastrar item:', error);
    });
}

// Função para salvar um item com imagens no Firestore e armazená-las no Firebase Storage
function salvarItemComImagens(cardapioRef, nomeItem, descricaoItem, precoItem, categoriaItem, imagens) {
    // Salva as imagens no Firebase Storage
    const imagensUrls = [];
    const promises = [];
    imagens.forEach((imagem) => {
        const storageRef = firebase.storage().ref().child(`usuarios/${userId}/cardapio/${imagem.name}`);
        const uploadTask = storageRef.put(imagem);
        promises.push(
            new Promise((resolve, reject) => {
                uploadTask.on('state_changed', null, reject, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        imagensUrls.push(downloadURL);
                        resolve();
                    });
                });
            })
        );
    });
    
    // Após todas as imagens serem carregadas, salva o item no Firestore
    Promise.all(promises).then(() => {
        cardapioRef.add({
            nome: nomeItem,
            descricao: descricaoItem,
            preco: precoItem,
            categoria: categoriaItem,
            imagens: imagensUrls // URLs das imagens carregadas
        })
        .then(() => {
            console.log('Item cadastrado com sucesso');
            limparCamposDoFormulario();
        })
        .catch((error) => {
            console.error('Erro ao cadastrar item:', error);
        });
    }).catch((error) => {
        console.error('Erro ao carregar imagens:', error);
    });
}

// Função para limpar os campos do formulário após o cadastro
function limparCamposDoFormulario() {
    document.getElementById('item-nome').value = '';
    document.getElementById('item-descricao').value = '';
    document.getElementById('price').value = '';
    document.getElementById('item-categoria').value = '';
    document.getElementById('fileInput').value = ''; // Limpa a seleção de arquivos
}

// Função para manipular a mudança de arquivos (se o usuário estiver anexando imagens)
function onFileChange(event) {
    // Adicione o código para manipular a mudança de arquivos aqui
}

// Função para anexar imagens aos itens do cardápio
function attachImage() {
    // Adicione o código para anexar imagens aqui
}




