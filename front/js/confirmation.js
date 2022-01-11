// Affichage du numéro de commande dans le message de confirmation
function displayConfirmation() {
    const orderIdNumber = document.getElementById("orderId");
    var str = window.location.href;
    var url = new URL(str);
    orderIdNumber.innerText = url.searchParams.get("orderId");
    localStorage.removeItem("cart");
}

displayConfirmation();