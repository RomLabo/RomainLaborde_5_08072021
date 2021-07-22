// Récupêre les données de localStorage
let viewProductStorage = localStorage.getItem('viewCartProduct');
console.log(viewProductStorage);


// Analyse la chaine de caractère et construit une valeur javascript.
let viewProductStorageJSON = JSON.parse(viewProductStorage);
console.log(viewProductStorageJSON);

if (viewProductStorageJSON == null) {
    let cartInfo = document.getElementById('cart-info');
    cartInfo.style.display = 'flex';
} 
// Pour récupérer par la suite le total des prix.
let sumProductsPriceStorage = 0;


// Créer un titre h2 avec la somme total des produits et l'injecte dans le document.
let lengthOfStorage = viewProductStorageJSON?.length;
let getSumPriceProductStorage = () => {
    console.log(lengthOfStorage);
    let sumPriceProductElement = document.createElement('h2');
    sumPriceProductElement.innerHTML = `Total : ${(new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(sumProductsPriceStorage / 1000))}`;
    console.log(sumPriceProductElement); 
    document.getElementById('sumPriceProducts').appendChild(sumPriceProductElement);
}


// Créer une ligne de tableau avec les différentes valeurs du produits.
const addProductStorage = (product) => {
    const templateElement = document.getElementById("productTemplate")
    const productHtml = document.importNode(templateElement.content, true)
    // Ajoute les valeurs du produit à chaque colonne de la ligne.
    productHtml.getElementById("nameStor").textContent = product.nameProduct;
    productHtml.getElementById("quantityStor").textContent = product.quantity;
    productHtml.getElementById("optionStor").textContent = product.option;
    productHtml.getElementById("priceStor").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 1000));
    // Ajout les produits dans son conteneur.
    document.getElementById('tableStor').appendChild(productHtml);
}


// Pour chaque produit stocké dans le storage, est crée une ligne de tableau et son prix est ajouté au précédent.
let getSumPriceOfProduct = () => viewProductStorageJSON.forEach(product => {
    addProductStorage(product);
    sumProductsPriceStorage += product.price;
    console.log(sumProductsPriceStorage);
});
getSumPriceOfProduct();

const removeAll = () => {
    localStorage.clear();
    document.location.reload();
}


let removeAllProducts = document.getElementById('remove-products');
removeAllProducts.addEventListener('click', removeAll);





// Affiche le prix total.
getSumPriceProductStorage();















