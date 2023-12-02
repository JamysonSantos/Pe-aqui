// Cole suas configurações do Firebase aqui
const firebaseConfig = {
   apiKey: "AIzaSyAgJmyw5DPcPqN73eLqYqL3pMXLU4wqtCg",
    authDomain: "pecaqui-48794.firebaseapp.com",
    databaseURL: "https://pecaqui-48794-default-rtdb.firebaseio.com",
    projectId: "pecaqui-48794",
    storageBucket: "pecaqui-48794.appspot.com",
    messagingSenderId: "530631627445",
    appId: "1:530631627445:web:ae1eff8f00f60ff2d964fc"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Para utilizar os recursos de autenticação e banco de dados
const auth = firebase.auth();
const database = firebase.database();

// Funções de autenticação
function signInWithEmailPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuário autenticado com sucesso
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // Tratamento de erro
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

// Funções de banco de dados
function saveUserData(email) {
  const userId = firebase.auth().currentUser.uid;
  database.ref('usuarios/' + userId).set({
    email: email,
    // Outras informações do usuário
  })
    .then(() => {
      console.log("Dados do usuário salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados do usuário:", error);
    });
}
