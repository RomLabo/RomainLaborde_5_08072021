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
    document.getElementById('order-product').textContent = '';
    document.getElementById('order-total-price').textContent =  (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(sumProductsPriceStorage / 1000));
}
addInformationForInvoice();



// Ecoute le click du bouton 'retour à l'accueil' pour effacer le local storage.
const clearShoppingCart = () => localStorage.clear();
returnHomeBtn.addEventListener('click', clearShoppingCart);


// Permet de visualiser la facture et de l'imprimer.
const printInvoice = () => {
    window.document.close(); // necessary for IE >= 10
    window.focus(); // necessary for IE >= 10*/
    window.print(`Facture de la commande n°${orderStor} <br> <br> Référence du produit : ${productStor}`);
}


// Ecoute le click du bouton 'voir la facture' .
seeInvoice.addEventListener('click', printInvoice);