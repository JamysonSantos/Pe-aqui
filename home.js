// Importa a biblioteca JavaScript do Firebase
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js");

// Inicializa o Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDb7m40G6cT8zZ0tqxmkyQ78OWBHy8w9LI",
  authDomain: "pecaqui-cc6c1.firebaseapp.com",
  projectId: "pecaqui-cc6c1",
  storageBucket: "pecaqui-cc6c1.appspot.com",
  messagingSenderId: "502925766451",
  appId: "1:502925766451:web:52473d00da34033f789846"
};

// Função para deslogar o usuário
function logout() {
  // Desloga o usuário do sistema
  firebase.auth().signOut();

  // Redireciona o usuário para a página de login
  window.location.href = "login.html";
}
// Adiciona evento de clique ao botão "Cadastrar Cardápio"
document.querySelector(".button-cadastrar").addEventListener("click", function() {
  // Redireciona o usuário para a página de cadastro de cardápio
  window.location.href = "cadastrocardapio.html";
});
