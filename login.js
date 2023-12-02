// Configuração do Firebase
const firebaseConfig = {
  // ...suas credenciais do Firebase aqui
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Função de autenticação por email e senha
function signInWithEmailPassword(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
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
    });
}

// Adiciona um listener para o evento de clique no botão de login
document.getElementById('loginButton').addEventListener('click', function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailPassword(email, password);
});
