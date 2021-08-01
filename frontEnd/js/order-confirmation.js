const contactStor = JSON.parse(localStorage.getItem("contact")) || [];
const productStor = JSON.parse(localStorage.getItem("products")) || [];
const orderStor = JSON.parse(localStorage.getItem("orderId")) ;
const allProductsStor = localStorage.getItem("viewCartProduct") ;
const returnHomeBtn = document.getElementById('return-home');
const seeInvoice = document.getElementById('see-invoice');
let viewProductStorageJSON = JSON.parse(allProductsStor);

// Affiche un message de confirmation de la commande avec ses informations.
const displayConfirmationOrderMessage = () => {
    document.getElementById('confirm-name').textContent = contactStor.firstName;
    document.getElementById('confirm-orderId').textContent = orderStor;
    document.getElementById('confirm-address').textContent = contactStor.address;
    document.getElementById('confirm-city').textContent = contactStor.city;
    document.getElementById('confirm-email').textContent = contactStor.email;
}
displayConfirmationOrderMessage();

let sumProductsPriceStorage ='';
// Pour chaque produit stocké dans le storage, est crée une ligne de tableau et son prix est ajouté au précédent.
let getSumPriceOfProduct = () => viewProductStorageJSON.forEach(product => {
    sumProductsPriceStorage += product.price;
    sumProductsPriceStorage ++ ;
    console.log(sumProductsPriceStorage);
});
getSumPriceOfProduct();

const addInformationForInvoice = () => {
    document.getElementById('invoice-orderId').textContent = (orderStor.substring(5,0)) + (orderStor.substring(26,32));
    document.getElementById('order-total-price').textContent =  (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(sumProductsPriceStorage / 1000));
}



const logoMenuBtn = document.getElementById('logo-btn');
const shoppingCartMenuBtn = document.getElementById('shopping-cart-btn');


// Ecoute le click du bouton 'retour à l'accueil' pour effacer le local storage.
const clearShoppingCart = () => localStorage.clear();
logoMenuBtn.addEventListener('click', clearShoppingCart);
shoppingCartMenuBtn.addEventListener('click', clearShoppingCart);
returnHomeBtn.addEventListener('click', clearShoppingCart);

// Créer une ligne de tableau avec les différentes valeurs du produits.
const createProductLigne = (product) => {
    const templateElement = document.getElementById("productTemplate")
    const productHtml = document.importNode(templateElement.content, true)
    productHtml.getElementById("refStor").setAttribute('id', product.ref);
    productHtml.getElementById("nameStor").textContent = product.nameProduct;
    productHtml.getElementById("quantityStor").textContent = product.quantity;
    productHtml.getElementById("optionStor").textContent = product.option;
    productHtml.getElementById("priceStor").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 1000));
    document.getElementById('tableStor').appendChild(productHtml);
}

const createProductLigneOfInvoice = () => viewProductStorageJSON.forEach(product => createProductLigne(product));


// Permet de visualiser la facture et de l'imprimer.
const printInvoice = () => {
    addInformationForInvoice();
    createProductLigneOfInvoice();
    window.document.close(); // necessary for IE >= 10
    window.focus(); // necessary for IE >= 10*/
    window.print();
    seeInvoice.setAttribute('disabled', true);
}


// Ecoute le click du bouton 'voir la facture' .
seeInvoice.addEventListener('click', printInvoice);