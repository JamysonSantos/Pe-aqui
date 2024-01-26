// Adiciona um evento de load à página
window.addEventListener("load", function() {
  // Verifica se o usuário está logado
  if (!firebase.auth().currentUser) {
    // Redirecione para a página de login se o usuário não estiver logado
    window.location.href = "login.html";
  }

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
          img.src = imgSrc;
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
});



