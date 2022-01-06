// Récupération de l'objet via localStorage
let productCart = JSON.parse(localStorage.getItem("cart"));
console.log("Le localStorage contient actuellement les produits ci-dessous");
console.table(productCart);

// Sélection de la balise Section du cart
const sectionCart = document.querySelector("#cart__items");

// Affichage des produits ajoutés au panier
function displayCart() {

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
            productPrice.innerHTML = productCart[i].kanapQuantity;
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

displayCart();

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

displayTotals();

// Modification de la quantité d'un produit
function modifyProduct() {
    // On sélectionne tous les inputs de quantité des produits affichés
    let modifyInputQty = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < modifyInputQty.length; k++) {
        
        modifyInputQty[k].addEventListener("change", (e) => {

            // le nombre d'exemplaire du produit commandé sur la page product
            let quantityOrdered = productCart[k].kanapQuantity;
            // le nouveau nombre d'exemplaire désiré sur la page cart
            let quantityModified = modifyInputQty[k].valueAsNumber;

            // Renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument
            let findResult = productCart.find(elt => elt.quantityModified !== quantityOrdered);

            findResult.kanapQuantity = quantityModified;
            productCart[k].kanapQuantity = findResult.kanapQuantity;

            // On actualise l'action effectuée dans le localStorage
            localStorage.setItem("cart", JSON.stringify(productCart));
            location.reload();
        });  
    }
}

modifyProduct();

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

deleteProduct();

