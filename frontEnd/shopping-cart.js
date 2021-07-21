// Récupêre les données de localStorage
let viewProductStorage = localStorage.getItem('viewCartProduct');
console.log(viewProductStorage);


// Analyse la chaine de caractère et construit une valeur javascript.
let viewProductStorageJSON = JSON.parse(viewProductStorage);
console.log(viewProductStorageJSON);


// Pour récupérer par la suite le total des prix.
let sumProductsPriceStorage = 0;


// Pour chaque produit stocké dans le storage, est crée une ligne de tableau et son prix est ajouté au précédent.
for (product of viewProductStorageJSON) {
    addProductStorage(product);
    sumProductsPriceStorage += product.price;
    console.log(sumProductsPriceStorage);
}
let lengthOfStorage = viewProductStorageJSON.length; 


// Créer un titre h2 avec la somme total des produits et l'injecte dans le document.
console.log(lengthOfStorage);
let sumPriceProductElement = document.createElement('h2');
sumPriceProductElement.innerHTML = `Total : ${(new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(sumProductsPriceStorage / 1000))}`;
console.log(sumPriceProductElement); 
document.getElementById('sumPriceProducts').appendChild(sumPriceProductElement);


// Créer une ligne de tableau avec les différentes valeurs du produits
function addProductStorage (product) {
    let productHtml = document.createElement('tr');
        productHtml.setAttribute("class", "cart-product");
        productHtml.innerHTML = 
            `<td class="cart-product__img" ><img id="imgStor" src="${product.image}" alt="Appareil photo" /></td>
             <td id="quantityStor" class="cart-product__quantity">x${product.quantity}</td>
             <td class="cart-product__title"><h3 id="nameStor">${product.nameProduct}</h3></td>
             <td id="priceStor" class="cart-product__price">${(new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 1000))}</td>`;
    // Ajout les produits dans son conteneur.
    document.getElementById('tableStor').appendChild(productHtml);
}







