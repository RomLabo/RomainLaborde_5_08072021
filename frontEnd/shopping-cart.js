// Récupêre les données de localStorage
var quantityStorage = localStorage.getItem('quantity');
var nameStorage = localStorage.getItem('name');
var priceStorage = localStorage.getItem('price');
var imageStorage = localStorage.getItem('image');


// Vérification qu'il ne soit pas vide


// Convertie la string en Objet
var quantityStorageJSON = JSON.parse(quantityStorage);
var nameStorageJSON = nameStorage;
var priceStorageJSON = priceStorage;
var imageStorageJSON = imageStorage;
console.log(priceStorageJSON);
var sumPrice = quantityStorageJSON * priceStorageJSON;
console.log(sumPrice);
document.getElementById('quantityStor').textContent = quantityStorageJSON;
document.getElementById('nameStor').textContent = nameStorageJSON;
document.getElementById('priceStor').textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(sumPrice / 1000));
document.getElementById('imgStor').setAttribute("src", imageStorageJSON);






