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

// Adiciona um listener para o evento de submit no formulário de cadastro
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const companyName = document.getElementById('companyName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Verifica se o dispositivo está conectado à internet
  if (navigator.onLine) {
    // Chama o método `createUserWithEmailAndPassword()`
    createUserWithEmailAndPassword(companyName, email, password);
  } else {
    // Exiba uma mensagem de erro
    alert("O dispositivo não está conectado à internet.");
  }
});

// Função de criação de novo usuário
function createUserWithEmailAnd
