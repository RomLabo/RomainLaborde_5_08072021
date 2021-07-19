const apiUrl = "http://localhost:3000/api/cameras";

// Requête à l'api pour récupérer ces données.
fetch(apiUrl)
    .then((response) => 
        response.json()
    .then((data) => {
        getProducts(data);   
    }).catch((err) => console.log('Error :' + err)
));


// Génère un élément article pour chaque produits du tableau 'data'.
let getProducts = data => data.forEach(product => viewProduct(product));


// Créer un article cliquable contenant les informations du produit.
function viewProduct (product) {
    let productHtml = document.createElement('div');
        productHtml.setAttribute("class", "product-content");
        productHtml.innerHTML = 
            `<a href="./product.html?${product._id}" class="product-link" >
                <article  class="product">
                    <img src="${product.imageUrl}" alt"Un appareil photo vintage" class="product__img"/>
                    <div class="product__info">
                        <h3>${product.name}</h3>
                        <p>${(new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 1000))}</p>
                    </div>
                </article>
            </a>`;
    // Ajout les produits dans son conteneur.
    document.getElementById('products').appendChild(productHtml);
};



