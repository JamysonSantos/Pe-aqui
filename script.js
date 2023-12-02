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

// Adiciona um listener para o evento de submit no formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailPassword(email, password);
});

// Função de autenticação por email e senha
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

    signInWithEmailPassword(email, password);
});
