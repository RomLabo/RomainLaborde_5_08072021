const apiUrl = "http://localhost:3000/api/cameras";

// Requête à l'api pour récupérer ces données.
fetch(apiUrl)
    .then((response) =>  response.json()
    .then((data) => createProductForEachApiProduct(data))
    .catch((err) => console.log('Error :' + err)
));


// Affichage des produits avec leurs données respectives.
const createProductForEachApiProduct = (data) => data.forEach(product =>  createProductOnHomePage(product));


const createProductOnHomePage = (product) => {
    const modelToBeDuplicated = document.getElementById("template-product")
    const productOnHomePage = document.importNode(modelToBeDuplicated.content, true)
    const urlToThisProductWebpage = "./frontEnd/product.html?ref=" + product._id;
    productOnHomePage.getElementById("product-id").setAttribute('href', urlToThisProductWebpage);
    productOnHomePage.getElementById("product-image").setAttribute('src', product.imageUrl);
    productOnHomePage.getElementById("product-name").textContent = product.name;
    productOnHomePage.getElementById("product-price").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 1000));
    document.getElementById('products').appendChild(productOnHomePage);
}


// Ajoute un compteur de produit au bouton panier.
let viewProductStorage = localStorage.getItem('viewCartProduct');
let viewProductStorageJSON = JSON.parse(viewProductStorage);
let sumOfQuantityProducts = 0;
let counterQuantityDisplay = document.getElementById('count');


const calculateSumOfQuantityProducts = () => viewProductStorageJSON.forEach(product => {
    sumOfQuantityProducts += Number(product.quantity);
    counterQuantityDisplay.textContent = sumOfQuantityProducts;
    sumOfQuantityProducts < 100 ? counterQuantityDisplay.style.display = 'flex' : counterQuantityDisplay.style.display = 'none' ;
})


const getSumOfQuantityProducts = () => {
    if (viewProductStorageJSON != null) {
        calculateSumOfQuantityProducts();
    }
};


window.onload = getSumOfQuantityProducts();




