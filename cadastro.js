// Cole suas configurações do Firebase aqui
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

// Adiciona um listener para o evento de submit no formulário de cadastro
document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const companyName = document.getElementById('companyName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const ownerName = document.getElementById('ownerName').value;
  const contactNumber = document.getElementById('contactNumber').value;
  const addressLine = document.getElementById('addressLine').value;
  const neighborhood = document.getElementById('neighborhood').value;
  const cityState = document.getElementById('cityState').value;

  // Log dos valores para depuração
  console.log('Nome da Empresa:', companyName);
  console.log('Nome do Proprietário:', ownerName);
  console.log('E-mail:', email);
  console.log('Número de Contato:', contactNumber);
  console.log('Rua e Número:', addressLine);
  console.log('Bairro:', neighborhood);
  console.log('Cidade/Estado:', cityState);
  console.log('Senha:', password);

  // Verifica se o dispositivo está conectado à internet
  if (navigator.onLine) {
    // Chama o método `createUserWithEmailAndPassword()` do Firebase
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Usuário criado com sucesso
        const user = userCredential.user;
        console.log(user);

        // Atualiza o nome da empresa no perfil do usuário
        return user.updateProfile({
          displayName: companyName
        });
      })
      .then(() => {
        // Cria um objeto com os dados da empresa
        const empresaData = {
          nomeEmpresa: companyName,
          email: email,
          proprietario: ownerName,
          'numero de contato': contactNumber,
          'rua e numero': addressLine,
          bairro: neighborhood,
          'Cidade/Estado': cityState,
          'Crie sua Senha': password,
        };

        // Adiciona um novo documento à coleção "Empresas"
        return db.collection("Empresas").add(empresaData);
      })
      .then((docRef) => {
          // Obter o ID da empresa recém-cadastrada
          const empresaId = docRef.id;

        // Criar a subcoleção "cardapio" para a nova empresa
        return db.collection("Empresas").doc(empresaId).collection("cardapio").doc("placeholder").set({
            placeholder: "Este documento serve apenas para indicar que a subcoleção foi criada"
        });
      })
      .then(() => {
        // Redirecionamento após o cadastro bem-sucedido
        window.location.href = 'poscadastro.html';
      })
      .catch((error) => {
        // Tratamento de erro
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);

        // Verifica se o erro é de conexão com a internet
        if (errorCode === "auth/network-request-failed") {
          // Exibe uma mensagem de erro personalizada
          alert("O dispositivo não está conectado à internet.");
        } else {
          // Exibe a mensagem de erro padrão do Firebase
          alert(errorMessage);
        }
      });
  } else {
    // Exiba uma mensagem de erro
    alert("O dispositivo não está conectado à internet.");
  }
});

// Função para validar um e-mail
function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}


