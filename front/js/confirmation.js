// Affichage du numéro de commande dans le message de confirmation
function displayConfirmation() {
    const orderIdNumber = document.getElementById("orderId");
    orderIdNumber.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

displayConfirmation();