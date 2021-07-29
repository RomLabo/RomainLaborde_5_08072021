const contactStor = JSON.parse(localStorage.getItem("contact")) || [];
const productStor = JSON.parse(localStorage.getItem("products")) || [];
const orderStor = JSON.parse(localStorage.getItem("orderId")) ;


console.log(contactStor);
console.log(productStor);
console.log(orderStor);


// affiche Mes informations
const confirmationName = document.getElementById('confirm-name');
const confirmationOrderId = document.getElementById('confirm-orderId');
const confirmationAddress = document.getElementById('confirm-address');
const confirmationCity = document.getElementById('confirm-city');
const confirmationEmail = document.getElementById('confirm-email');

confirmationName.textContent = contactStor.firstName;
confirmationOrderId.textContent = orderStor; 
confirmationAddress.textContent = contactStor.address;
confirmationCity.textContent = contactStor.city;
confirmationEmail.textContent = contactStor.email;

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