// Récupêre les données de localStorage
var quantityStorage = localStorage.getItem('quantity');
var priceStorage = localStorage.getItem('price');
var nameStorage = localStorage.getItem('name');


// Vérification qu'il ne soit pas vide
if (!quatityStorage) {
  console.log("Oups c'est vide");
}
 
// Convertie la string en Objet
var quantityStorageJSON = JSON.parse(quantityStorage);
var nameStorageJSON = JSON.parse(nameStorage);



document.getElementById('quantityStor').textContent = quantityStorageJSON;
document.getElementById('priceStor').textContent = priceStorage;
document.getElementById('nameStor').textContent = nameStorageJSON;

