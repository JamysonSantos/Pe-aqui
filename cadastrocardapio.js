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

// Obtém o ID do usuário logado
const userId = firebase.auth().currentUser.uid;

// Referência para a coleção de empresas do Firestore
const empresasRef = firebase.firestore().collection('Empresas');

// Referência para a coleção de cardápio do usuário
const cardapioRef = empresasRef.doc(userId).collection('cardapio');

// Função para adicionar um novo item ao cardápio
function addItem() {
    const nomeItem = document.getElementById('item-nome').value;
    const descricaoItem = document.getElementById('item-descricao').value;
    const precoItem = document.getElementById('price').value;
    const categoriaItem = document.getElementById('item-categoria').value;
    
    // Verifica se o usuário selecionou alguma imagem
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        // Se nenhum arquivo foi selecionado, salva o item sem imagem
        salvarItemSemImagem(nomeItem, descricaoItem, precoItem, categoriaItem);
    } else {
        // Se o usuário selecionou uma ou mais imagens, salva o item com as imagens
        salvarItemComImagens(nomeItem, descricaoItem, precoItem, categoriaItem, fileInput.files);
    }
}

// Função para salvar um item sem imagem no Firestore
function salvarItemSemImagem(nomeItem, descricaoItem, precoItem, categoriaItem) {
    cardapioRef.add({
        nome: nomeItem,
        descricao: descricaoItem,
        preco: precoItem,
        categoria: categoriaItem,
        imagens: [] // Array vazio para armazenar URLs das imagens
    })
    .then((docRef) => {
        console.log('Item cadastrado com ID:', docRef.id);
        limparCamposDoFormulario();
    })
    .catch((error) => {
        console.error('Erro ao cadastrar item:', error);
    });
}

// Função para salvar um item com imagens no Firestore e armazená-las no Firebase Storage
function salvarItemComImagens(nomeItem, descricaoItem, precoItem, categoriaItem, imagens) {
    // Cria um ID único para este item
    const itemId = firebase.firestore().collection('usuarios').doc().id;
    
    // Salva as imagens no Firebase Storage
    const imagensUrls = [];
    const promises = [];
    imagens.forEach((imagem) => {
        const storageRef = firebase.storage().ref().child(`Empresas/${userId}/cardapio/${itemId}/${imagem.name}`);
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
        .then((docRef) => {
            console.log('Item cadastrado com ID:', docRef.id);
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



