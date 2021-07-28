const contactStor = JSON.parse(localStorage.getItem("contact")) || [];
const productStor = JSON.parse(localStorage.getItem("products")) || [];
const orderStor = JSON.parse(localStorage.getItem("orderId")) ;


console.log(contactStor);
console.log(productStor);
console.log(orderStor);


// affiche Mes informations
const confirmationName = document.getElementById('confirm-name');
const confirmationOrderIdAndAddress = document.getElementById('confirm-orderId-address');
const confirmationEmail = document.getElementById('confirm-email');

confirmationName.textContent = "Merci " + contactStor.firstName + " pour votre commande.";
confirmationOrderIdAndAddress.textContent = "Nos équipes mettent tout en oeuvre pour vous livrer votre commande n° " + orderStor 
                                            + " dans les plus brefs délais à l'adresse : " + contactStor.address + " " + contactStor.city + ".";
confirmationEmail.textContent = "Un email de confirmation vient d'être envoyé à: " + contactStor.email + ".";

const seeInvoice = document.getElementById('see-invoice');
seeInvoice.addEventListener('click', printDiv);


const clearShoppingCart = () => {
    localStorage.clear();
}


const returnHome = document.getElementById('return-home');
returnHome.addEventListener('click', clearShoppingCart);


function printDiv () {
    let mywindow = window.open('', 'PRINT');
  
    
    mywindow.document.write(`Facture de la commande n°${orderStor} <br> <br> Référence du produit : ${productStor}`);
  
    
  
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  
    mywindow.print();
    mywindow.close();
  
    return true;
};