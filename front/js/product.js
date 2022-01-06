// Récupération de l'id grâce à URLSearchParams
var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");

// Initialisation de variables et constantes globals
var product = "";
const colorChoice = document.getElementById("colors");
const colorQuantity = document.getElementById("quantity");

// Récupération du produit de l'API
async function getProduct() {
    let fetchProduct = await fetch("http://localhost:3000/api/products/" + productId)
    console.log("La récupération de l'id s'est bien passée");
    console.log(productId);
    return fetchProduct.json();
}

// Affichage du produit de l'API dans le DOM
async function displayProduct() {
    let result = await getProduct()

    .then(function(resultFetch) {
        product = resultFetch;
        console.log("Les informations de ce produit récupérées dans l'API");
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

// Ajout d'un produit dans le panier
function addToCart() {
    
    let colorSelected = colorChoice.value;
    let quantitySelected = colorQuantity.value;
    let productInfos = {
        kanapId : productId,
        kanapName : product.name,
        kanapColor : colorChoice.value,
        kanapQuantity : Number(colorQuantity.value),
        kanapPrice : product.price,
        kanapImage : product.imageUrl,
        kanapAltImage : product.altTxt,
        kanapDescription : product.description
    };

    // Initialisation du localStorage
    let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

    // Le panier contient déja au moins un produit
    if (cartLocalStorage) {
        // Renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument
        const findResult = cartLocalStorage.find(elt => elt.kanapId === productId && elt.kanapColor === colorSelected);
        console.log("findResult indique ci-dessous si ce produit est déja présent dans le panier pour cette couleur")
        console.log(findResult);

        // Le produit est déja présent dans le panier (même id et couleur)
        if (findResult) {
            // Analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée
            let newQuantity = parseInt(productInfos.kanapQuantity) + parseInt(findResult.kanapQuantity);
            findResult.kanapQuantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            console.log("Message 1 : l'incrémentation d'un produit déja présent s'est bien passé");
            console.log("Le localStorage contient actuellement les produits ci-dessous");
            console.table(cartLocalStorage);
            alert(`Votre commande de ${quantitySelected} ${product.name} de couleur ${colorSelected} est ajoutée au panier`);
        
        // Le produit n'est pas présent dans le panier
        } else {
            cartLocalStorage.push(productInfos);
            localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            console.log("Message 2 : l'ajout d'un nouveau produit s'est bien passé");
            console.log("Le localStorage contient actuellement les produits ci-dessous");
            console.table(cartLocalStorage);
            alert(`Votre commande de ${quantitySelected} ${product.name} de couleur ${colorSelected} est ajoutée au panier`);
        }
    
    // Le panier ne contient aucun produit
    } else {
        cartLocalStorage = [];
        cartLocalStorage.push(productInfos);
        localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
        console.log("Message 3 : le localStorage ne contenait aucun produit avant cet ajout");
        console.log("Le localStorage contient actuellement les produits ci-dessous");
        console.table(cartLocalStorage);
        alert(`Votre commande de ${quantitySelected} ${product.name} de couleur ${colorSelected} est ajoutée au panier`);
    }
}