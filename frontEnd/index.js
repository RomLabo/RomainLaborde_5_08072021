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


// Ecoute le changement de taille de la fenêtre.
window.addEventListener('resize', conditionMenu)


// Vérifie la taille de la fenêtre avant découter le click sur le bouton menu.
function conditionMenu() {
    var elementBtn = document.getElementById('nav-btn');
    var elementNav = document.getElementById('nav-item');
    var windowWidth = window.innerWidth;
    if (windowWidth <= 600){
        elementNav.style.display = 'none';
        elementBtn.addEventListener('click', menuDeroulant);
    } else {
        // Permet de garder le menu apparant lorsque l'on repasse à une taille de fenêtre > 600px.
        elementNav.style.display = 'flex';
    }
}


// Fait apparaître les liens de navigation lors de l'appui sur le bouton menu.
function menuDeroulant(elementNav) {
    var elementNav = document.getElementById('nav-item');
    var etat = elementNav.style.display;
    if (etat == 'flex') {
        elementNav.style.display = 'none';
    } else {
        elementNav.style.display = 'flex';
    };
};
