// Récupération des produits de l'API
async function getProducts() {
    let fetchProducts = await fetch("http://localhost:3000/api/products")
    console.log(typeof fetchProducts)
    console.log("la récupération s'est bien passé")
    return fetchProducts.json();
}

// Affichage des produits de l'API dans le DOM
async function displayProducts() {
    let result = await getProducts()

    .then(function(product) {
        console.log(product.length)
        console.table(product);

        for (let i = 0; i < product.length; i++) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            productLink.href = `product.html?id=${product[i]._id}`;
            document.getElementById("items").appendChild(productLink);

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'élément "img"
            let productImage = document.createElement("img");
            productImage.src = product[i].imageUrl;
            productImage.alt = product[i].altTxt;
            productArticle.appendChild(productImage);

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;
            productArticle.appendChild(productName);

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = product[i].description;
            productArticle.appendChild(productDescription);
        }
    })

    .catch(function(error) {
        console.log("Erreur dans l'affichage");
        return error;
    });
    
    console.log("l'affichage s'est bien passé");
}

displayProducts();