// Récupération de l'objet via localStorage
let productCart = JSON.parse(localStorage.getItem("cart"));
console.log("Le localStorage contient actuellement les produits ci-dessous");
console.table(productCart);

// Affichage des produits ajoutés au panier
function displayCart() {

    // Sélection de la balise Section du cart
    const sectionCart = document.getElementById("cart__items");

    if (productCart == 0 || productCart === null) {
        const emptyCart = `<p>Votre panier est actuellement vide.</p>`;
        sectionCart.innerHTML = emptyCart;
    } else {

        for (let i = 0; i < productCart.length; i++) {
            
            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productArticle.classList.add("cart__item");
            productArticle.setAttribute("data-id", productCart[i].kanapId);
            productArticle.setAttribute("data-color", productCart[i].kanapColor);
            sectionCart.appendChild(productArticle);

            // Insertion de l'élément "div" (image)
            let productDivImage = document.createElement("div");
            productDivImage.classList.add("cart__item__img");
            productArticle.appendChild(productDivImage);

            // Insertion de l'élément "img"
            let productImage = document.createElement("img");
            productImage.src = productCart[i].kanapImage;
            productImage.alt = productCart[i].kanapAltImage;
            productDivImage.appendChild(productImage);

            // Insertion de l'élément "div" (content)
            let productDivContent = document.createElement("div");
            productDivContent.classList.add("cart__item__content");
            productArticle.appendChild(productDivContent);

            // Insertion de l'élément "div" (description)
            let productDivDescription = document.createElement("div");
            productDivDescription.classList.add("cart__item__content__description");
            productDivContent.appendChild(productDivDescription);

            // Insertion de l'élément "h2"
            let productName = document.createElement("h2");
            productName.innerHTML = productCart[i].kanapName;
            productDivDescription.appendChild(productName);

            // Insertion de l'élément "p" (couleur)
            let productColor = document.createElement("p");
            productColor.innerHTML = productCart[i].kanapColor;
            productDivDescription.appendChild(productColor);

            // Insertion de l'élément "p" (prix)
            let productPrice = document.createElement("p");
            productPrice.innerHTML = productCart[i].kanapPrice + " €";
            productDivDescription.appendChild(productPrice);

            // Insertion de l'élément "div" (settings)
            let productDivSettings = document.createElement("div");
            productDivSettings.classList.add("cart__item__content__settings");
            productDivContent.appendChild(productDivSettings);

            // Insertion de l'élement "div" (quantity)
            let productDivQuantity = document.createElement("div");
            productDivQuantity.classList.add("cart__item__content__settings__quantity");
            productDivSettings.appendChild(productDivQuantity);

            // Insertion de l'élément "p" 
            let productQte = document.createElement("p");
            productQte.innerHTML = "Qté : ";
            productDivQuantity.appendChild(productQte);

            // Insertion de l'élément input (quantité)
            let productQuantity = document.createElement("input");
            productQuantity.classList.add("itemQuantity");
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("name", "itemQuantity");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productDivQuantity.appendChild(productQuantity);
            productQuantity.value = productCart[i].kanapQuantity;

            // Insertion de l'élément "div" (delete)
            let productDivDelete = document.createElement("div");
            productDivDelete.classList.add("cart__item__content__settings__delete");
            productDivSettings.appendChild(productDivDelete);

            // Insertion de l'élément "p" (supprimer)
            let productDelete = document.createElement("p");
            productDelete.classList.add("deleteItem");
            productDelete.innerText = "Supprimer";
            productDivDelete.appendChild(productDelete);
        }
        console.log("L'affichage des produits s'est bien passée");
    }
}

// Affichage de la quantité des produits et du prix total
function displayTotals() {

    // Affichage de la quantité total
    let inputQuantity = document.getElementsByClassName("itemQuantity");
    let totalLength = inputQuantity.length;
    let totalQuantity = 0;

    for (let j = 0; j < totalLength; ++j) {
        totalQuantity += inputQuantity[j].valueAsNumber;
    }

    let displayQuantity = document.getElementById("totalQuantity");
    displayQuantity.innerHTML = totalQuantity;
    console.log("Ci-dessous se trouve la quantité totale des produits");
    console.log(totalQuantity);

    // Affichage du prix total
    let totalPrice = 0;

    for (let j = 0; j < totalLength; ++j) {
        totalPrice += (inputQuantity[j].valueAsNumber * productCart[j].kanapPrice);
    }

    let displayPrice = document.getElementById("totalPrice");
    displayPrice.innerHTML = totalPrice;
    console.log("Ci-dessous se trouve le prix total de tous les produits");
    console.log(totalPrice);
}

// Modification de la quantité d'un produit
function modifyProduct() {
    // On sélectionne tous les inputs de quantité des produits affichés
    let quantityOrdered = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < quantityOrdered.length; k++) {
        
        quantityOrdered[k].addEventListener("change", (e) => {

            let quantityModified = quantityOrdered[k].valueAsNumber;
            let newQuantity = productCart[k];

            newQuantity.kanapQuantity = quantityModified;
            productCart[k].kanapQuantity = newQuantity.kanapQuantity;

            // On actualise l'action effectuée dans le localStorage
            localStorage.setItem("cart", JSON.stringify(productCart));
            location.reload();
        });  
    }
}

// Supression d'un produit du panier
function deleteProduct() {
    // On sélectionne tous les boutons Supprimer du panier
    let deleteButtons = document.querySelectorAll(".deleteItem");

    for (let l = 0; l < deleteButtons.length; l++) {
        
        deleteButtons[l].addEventListener("click", (e) => {

            // Indentification du produit par son id
            let deleteId = productCart[l].kanapId;
            // Indentification du produit par sa couleur
            let deleteColor = productCart[l].kanapColor;

            //  Crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée (ici tous sauf celui dont l'id et la couleur sont identifiés par l'action du click)
            productCart = productCart.filter(elt => elt.kanapId !== deleteId || elt.kanapColor !== deleteColor);

            // On actualise l'action effectuée dans le localStorage
            localStorage.setItem("cart", JSON.stringify(productCart));
            console.log("Ce produit a été retiré du panier");
            alert("Ce produit a été retiré du panier");
            location.reload();
        })
    }
}

// Vérification des données via des regex
function formRegExp() {
    let form = document.querySelector(".cart__order__form");

    // Ajout des expressions régulières
    const regExpName = /^[a-z]+([-\s]{0,1})[a-z]$/i;
    const regExpAddress = /^[0-9]{1,3}(\s[a-z]{1,30})+$/i;
    const regExpEmail = /[a-z][a-z0-9]+(\.[a-z][a-z0-9]+)*@[a-z][a-z0-9]+(\.[a-z]+)*\.[a-z]{2,5}$/i;

    // Vérification du prénom
    form.firstName.addEventListener('change', function() {
        validateFirstName(this);
    });

    const validateFirstName = function(inputFirstName) {
        let ErrorMsgFirstName = document.getElementById("firstNameErrorMsg");

        if (regExpName.test(inputFirstName.value)) {
            ErrorMsgFirstName.innerHTML = '';
        } else {
            ErrorMsgFirstName.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Vérification du nom
    form.lastName.addEventListener('change', function() {
        validateLastName(this);
    });

    const validateLastName = function(inputLastName) {
        let ErrorMsgLastName = document.getElementById("lastNameErrorMsg");

        if (regExpName.test(inputLastName.value)) {
            ErrorMsgLastName.innerHTML = '';
        } else {
            ErrorMsgLastName.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Vérification de l'adresse
    form.address.addEventListener('change', function() {
        validateAddress(this);
    });

    const validateAddress = function(inputAddress) {
        let ErrorMsgAddress = document.getElementById("addressErrorMsg");

        if (regExpAddress.test(inputAddress.value)) {
            ErrorMsgAddress.innerHTML = '';
        } else {
            ErrorMsgAddress.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Vérification de la ville
    form.city.addEventListener('change', function() {
        validateCity(this);
    });

    const validateCity = function(inputCity) {
        let ErrorMsgCity = document.getElementById("cityErrorMsg");

        if (regExpName.test(inputCity.value)) {
            ErrorMsgCity.innerHTML = '';
        } else {
            ErrorMsgCity.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // Vérification de l'e-mail
    form.email.addEventListener('change', function() {
        validateEmail(this);
    });

    const validateEmail = function(inputEmail) {
        let ErrorMsgEmail = document.getElementById("emailErrorMsg");

        if (regExpEmail.test(inputEmail.value)) {
            ErrorMsgEmail.innerHTML = '';
        } else {
            ErrorMsgEmail.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
}

// Envoi de toutes les informations au localStorage
function formPost() {
    let orderButton = document.getElementById("order");

    orderButton.addEventListener("click", (e) => {

        // Récupération des données du formulaire
        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');

        // Création d'un nouvel array dans le localStorage
        let productsId = [];

        for (let m = 0; m < productCart.length; m++) {
            productsId.push(productCart[m].kanapId);
        }
        console.log(productsId);

        // Réunion des données a envoyé
        const order = {
            contact : {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products : productsId,
        }

        const postInfos = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json"
            }
        };

        fetch("http://localhost:3000/api/products/order", postInfos)

        .then((response) => response.json())

        .then((data) => {
            console.log(data);
            document.location.href = "confirmation.html?orderId=" + data.orderId;
        })

        .catch((error) => {
            alert ("Problème rencontré avec fetch : " + error.message);
        });
    })
}

window.onload = function() { 
    displayCart();
    displayTotals();
    modifyProduct();
    deleteProduct();
    formRegExp();
    formPost();
};