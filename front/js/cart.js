// Récupération de l'objet via localStorage
let productCart = JSON.parse(localStorage.getItem("cart"));
console.table(productCart);

// Affichage d'un message indiquant que le panier est vide
const sectionCart = document.getElementById("cart__items");
const emptyCart = document.createElement("p");
emptyCart.innerHTML = "Votre panier est actuellement vide.";

// Affichage des produits ajoutés au panier
function displayCart() {
    if (productCart == 0 || productCart === null) {
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

        console.log(productCart);
        console.table(productCart);
    }
}

displayCart();

/* <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
</article> */
              