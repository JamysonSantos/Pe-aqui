// Cole suas configurações do Firebase aqui
const firebaseConfig = {
   apiKey: "AIzaSyDb7m40G6cT8zZ0tqxmkyQ78OWBHy8w9LI",
    authDomain: "pecaqui-cc6c1.firebaseapp.com",
    projectId: "pecaqui-cc6c1",
    storageBucket: "pecaqui-cc6c1.appspot.com",
    messagingSenderId: "502925766451",
    appId: "1:502925766451:web:52473d00da34033f789846"
  };

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

// Obtenção de instâncias de autenticação e banco de dados
const auth = firebase.auth();

// Função para login com e-mail e senha
function signInWithEmailPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuário autenticado com sucesso
      const user = userCredential.user;
      console.log(user);
      window.location.href = 'home.html'; // Redirecionamento após o login bem-sucedido
    })
    .catch((error) => {
      // Tratamento de erro
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

// Função para salvar dados do usuário no banco de dados
function saveUserData(email) {
  const userId = firebase.auth().currentUser.uid;
  database.ref('usuarios/' + userId).set({
    email: email,
    // Outras informações do usuário...
  })
    .then(() => {
      console.log("Dados do usuário salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados do usuário:", error);
    });
}
