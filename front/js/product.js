// Récupération de l'id grâce à URLSearchParams
var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
console.log(productId);

// Initialisation de variables et constantes globals
var product = "";
const colorChoice = document.getElementById("colors");
const colorQuantity = document.getElementById("quantity");

// Récupération du produit de l'API
async function getProduct() {
    let fetchProduct = await fetch("http://localhost:3000/api/products/" + productId)
    console.log(typeof fetchProduct)
    console.log("la récupération s'est bien passé")
    return fetchProduct.json();
}

// Affichage du produit de l'API dans le DOM
async function displayProduct() {
    let result = await getProduct()

    .then(function(resultFetch) {
        product = resultFetch;
        console.table(resultFetch);

        // Insertion de l'élément "img"
        let productImage = document.createElement("img");
        productImage.src = product.imageUrl;
        productImage.alt = product.altTxt;
        document.querySelector(".item__img").appendChild(productImage);   //Utilisation de querySelector over getElementByClassName permet l'affichage (why ?)

        // Insertion de valeur dans le titre "h1"
        let productName = document.getElementById("title");
        productName.innerHTML = product.name;

        // Insertion de valeur dans le prix "p"
        let productPrice = document.getElementById("price");
        productPrice.innerHTML = product.price;

        // Insertion de valeur dans la description "p"
        let productDescription = document.getElementById("description");
        productDescription.innerHTML = product.description;

        // Insertion des choix de couleurs
        for (let i = 0; i < product.colors.length; i++) {
            let color = new Option(product.colors[i], product.colors[i]);
            colorChoice.options.add(color);
        }
    })

    .catch(function(error) {
        console.log("Erreur dans l'affichage");
        return error;
    });
}

displayProduct();

// Ecoute du bouton Ajouter au Panier
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
    if (colorQuantity.value > 0 && colorQuantity.value <= 100 && colorChoice.value) {
        addToCart();
    } else {
        alert("Veuillez choisir une quantité et une couleur.");
    }
});

// Activation du localStorage
function addToCart() {          // Autre possibilité aurait été d'ajouté chaque entrée avec localStorage.setItem() ?
    
    let infosProduct = {
        kanapId : productId,
        kanapName : product.name,
        kanapColor : colorChoice.value,
        kanapQuantity : Number(colorQuantity.value),
        kanapPrice : product.price,
        kanapImage : product.imageUrl,
        kanapAltImage : product.altTxt,
        kanapDescription : product.description
    };

    console.log(infosProduct);

    let infosCart = JSON.stringify(infosProduct); // Converts a JavaScript value to a JavaScript Object Notation (JSON) string
    localStorage.setItem("cart", infosCart);      // La syntaxe localStorage.setItem() permet de stocker une donnée (ici l'objet infosProduct qui réunis toutes les infos)

    alert(`Votre commande de ${colorQuantity.value} ${product.name} de couleur ${colorChoice.value} est ajoutée au panier`);
}
