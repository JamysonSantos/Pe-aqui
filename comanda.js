function showAdditionalFields(select) {
    var selectedOption = select.value;
    var dinheiroFields = document.getElementById("dinheiro-fields");

    if (selectedOption === "dinheiro") {
        dinheiroFields.style.display = "block";
    } else {
        dinheiroFields.style.display = "none";
    }
}

// Adicione aqui outras funções JavaScript, se necessário
