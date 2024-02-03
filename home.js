// Inicializa o Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDb7m40G6cT8zZ0tqxmkyQ78OWBHy8w9LI",
  authDomain: "pecaqui-cc6c1.firebaseapp.com",
  projectId: "pecaqui-cc6c1",
  storageBucket: "pecaqui-cc6c1.appspot.com",
  messagingSenderId: "502925766451",
  appId: "1:502925766451:web:52473d00da34033f789846"
});

// Observa o estado de autenticação do Firebase
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    // Se não houver usuário autenticado, redirecione para a página de login
    window.location.href = "login.html";
  } else {
    // Obtém o nome da empresa do perfil do usuário
    const companyName = user.displayName;

    // Exibe o nome da empresa na página
    const companyNameElement = document.querySelector('.company-name');
    if (companyNameElement) {
      companyNameElement.textContent = companyName;
    }

    // Adiciona funcionalidade de arrastar e soltar imagens nas colunas do Kanban
    const fileDropContainers = document.querySelectorAll('.kanban-column');

    let draggedItem = null;

    fileDropContainers.forEach((dropArea) => {
      dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.border = '2px dashed #4F46E5';
      });

      dropArea.addEventListener('dragleave', () => {
        dropArea.style.border = '1px solid #ccc';
      });

      dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.style.border = '1px solid #ccc';

        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();

          reader.onload = function (event) {
            const imgSrc = event.target.result;
            const img = document.createElement('img');

            // Cria um canvas para redimensionar a imagem
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 360;
            canvas.height = 640;

            // Cria uma nova imagem no canvas com as dimensões desejadas
            const image = new Image();
            image.src = imgSrc;

            // Desenha a imagem no canvas
            ctx.drawImage(image, 0, 0, 360, 640);

            // Obtém a versão redimensionada da imagem como um data URL
            const resizedImgSrc = canvas.toDataURL('image/jpeg', 0.7); // Qualidade JPEG de 70%

            // Configura a nova imagem
            img.src = resizedImgSrc;
            img.classList.add('resized-image', 'rounded-md');

            // Se o item for arrastado de outra área, remove o item original
            if (draggedItem) {
              draggedItem.remove();
              draggedItem = null;
            }

            // Adiciona a imagem à nova área
            dropArea.appendChild(img);
          };

          reader.readAsDataURL(file);
        }
      });

      dropArea.addEventListener('dragstart', () => {
        draggedItem = dropArea.querySelector('img');
      });
    });

    // Atualiza o link do cardápio com base no ID do usuário
    const copiarLinkBtn = document.getElementById('copiar-link');
    copiarLinkBtn.addEventListener('click', () => {
      const userID = user.uid;
      const linkToCopy = `comanda.html?userID=${userID}`;
      
      // Cria um elemento de input para copiar o texto
      const inputElement = document.createElement('input');
      inputElement.value = linkToCopy;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);

      // Exibe a mensagem de "Link Copiado!"
      document.getElementById('copyLinkMessage').textContent = 'Link Copiado!';
    });
  }
});

// Função para deslogar o usuário
function logout() {
  firebase.auth().signOut().then(function() {
    // Logout com sucesso
    window.location.href = 'login.html'; // Redirecionar para a página de login
  }).catch(function(error) {
    // Ocorreu um erro ao fazer logout
    console.log(error.message);
  });
}

// Adiciona evento de clique ao botão "Cadastrar Cardápio"
document.querySelector(".button-cadastrar").addEventListener("click", function() {
  // Redireciona o usuário para a página de cadastro de cardápio
  window.location.href = "cadastrocardapio.html";
});





