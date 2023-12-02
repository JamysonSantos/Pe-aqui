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

function createUserWithEmailAndPassword(companyName, email, password) {
  // Verifica se os dados do formulário são válidos
  if (!companyName || companyName.trim().length === 0) {
    alert("O campo 'Nome da sua empresa' é obrigatório.");
    return;
  }

  if (!email || email.trim().length === 0) {
    alert("O campo 'E-mail' é obrigatório.");
    return;
  }

  if (!password || password.trim().length === 0) {
    alert("O campo 'Crie sua Senha' é obrigatório.");
    return;
  }

  // Valida o e-mail
  if (!validateEmail(email)) {
    alert("O e-mail fornecido é inválido.");
    return;
  }

  // Chama o método `createUserWithEmailAndPassword()` do Firebase
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuário criado com sucesso
      const user = userCredential.user;
      console.log(user);

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
}

// Função para validar um e-mail
function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}
