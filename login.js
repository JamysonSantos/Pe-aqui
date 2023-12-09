// Cole suas configurações do Firebase aqui
const firebaseConfig = {
  apiKey: "AIzaSyDb7m40G6cT8zZ0tqxmkyQ78OWBHy8w9LI",
  authDomain: "pecaqui-cc6c1.firebaseapp.com",
  projectId: "pecaqui-cc6c1",
  storageBucket: "pecaqui-cc6c1.appspot.com",
  messagingSenderId: "502925766451",
  appId: "1:502925766451:web:52473d00da34033f789846"
};

// Cole suas configurações do Firebase aqui
const firebaseConfig = {
  // ...
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Para utilizar os recursos de autenticação e banco de dados
const auth = firebase.auth();

// Função para redirecionar usuários autenticados
function redirectToHomeIfAuthenticated() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location.href = "home.html";
    }
  });
}

// Função para redirecionar usuários deslogados
function redirectToLoginIfNotAuthenticated() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}

// Adiciona um listener quando o documento HTML estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  redirectToHomeIfAuthenticated();

  // Adiciona um listener para o evento de submit no formulário de login
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verifica se o dispositivo está conectado à internet
    if (navigator.onLine) {
      // Chama o método `signInWithEmailPassword()`
      signInWithEmailPassword(email, password);
    } else {
      // Exiba uma mensagem de erro
      alert("O dispositivo não está conectado à internet.");
    }
  });

  redirectToLoginIfNotAuthenticated(); // Adiciona a verificação de autenticação
});

// Função de autenticação por email e senha
function signInWithEmailPassword(email, password) {
  // Chama o método `signInWithEmailAndPassword()` do Firebase
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuário autenticado com sucesso
      const user = userCredential.user;
      console.log(user);
      // Redirecionamento após o login bem-sucedido
      window.location.href = 'home.html';
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
}


