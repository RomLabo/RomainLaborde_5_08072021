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
    productHtml.getElementById("refStor").setAttribute('id', product.ref);
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


// Fonction pour vider le panier et le local storage.
const removeAll = () => {
    localStorage.clear();
    document.location.reload();
}


// Ecoute le click du bouton 'vider le panier' .
let removeAllProducts = document.getElementById('remove-products');
removeAllProducts.addEventListener('click', removeAll);


// Affiche le prix total.
getSumPriceProductStorage();


// variables stockant les données du formulaire de contact.
const purchaseBtn = document.getElementById("purchase-btn");
const userPostCode = document.getElementById("user_postcode");
const userMail = document.getElementById('user_mail');
const userFirstName = document.getElementById('user_first-name');
const userName = document.getElementById('user_name');
const userCity = document.getElementById('user_city');
const userAddress = document.getElementById('user_address');


// Variables pour stocker les regexs de chaque champ du formulaire.
const postCodeRegex = /^((0[1-9])|([1-8][0-9])|(9[0-8]))[0-9]{3}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const firstNameRegex = /^[A-Z][A-Za-z\é\è\ê\ï\-]+$/;
const nameRegex = /^[A-Z][a-z]/;


// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const firstNameValid = () => {
    userFirstName.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (firstNameRegex.test(e.target.value)) {
            userFirstName.style.backgroundColor = 'green';
        } else {
            userFirstName.style.backgroundColor = 'red';
        }
    })
}
firstNameValid();


// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const nameValid = () => {
    userName.addEventListener('input', function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (nameRegex.test(e.target.value)) {
            userName.style.backgroundColor = 'green';
        } else {
            userName.style.backgroundColor = 'red';
        }
    })
} 
nameValid();


// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const mailValid = () => {
    userMail.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (emailRegex.test(e.target.value)) {
            userMail.style.backgroundColor = 'green';
        } else {
            userMail.style.backgroundColor = 'red';
        }
    })
}
mailValid();


// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const postCodeValid = () => {
    userPostCode.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (postCodeRegex.test(e.target.value)) {
            userPostCode.style.backgroundColor = 'green';
        } else {
            userPostCode.style.backgroundColor = 'red';
        }
    })
     
}
postCodeValid();


// Ecoute d'un input vide pour détecter une attaque.
const inputDetect = document.getElementById('input-detect');
inputDetect.addEventListener("input", function(a) {
    if ((a.target.value) != "") {
        alert("Tentative d'intrusion détectée");
        // Appel d'une fonction qui rejetera la requête.
    }
}); 


// Ecoute le changement de valeur de chaque champs du formulaire et active le bouton commander et créer un objet contact. 
const contactForm = document.getElementById('form');
let contact = '';
contactForm.addEventListener('change', function(z) {
    if ((userName.value != "") && (userFirstName.value != "") && (userMail.value != "") && (userPostCode.value != "")) {
        purchaseBtn.removeAttribute('disabled');
        contact = {
            firstName: userName.value,
            lastName: userFirstName.value,
            address: userAddress.value,
            city: userPostCode.value + " " + userCity.value, 
            email: userMail.value,
            
        };
        //console.log(contact);
    }
})


// Création d'un tableau contenant les références des tout les produits du panier.
let products = [];
viewProductStorageJSON.forEach(function(item) {
    products.push(item.ref);
});
//console.log(products);


// Autorise la requête à l'api si les champs du formulaire comporte des valeurs conforme au attentes.
const formValid = () => {
    if (!((nameRegex.test(userName)) && (firstNameRegex.test(userFirstName)) && (emailRegex.test(userMail)) && (postCodeRegex.test(userPostCode)))) {
        fetch("http://localhost:3000/api/cameras/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ contact, products }),
                })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("contact", JSON.stringify(contact));
                    localStorage.setItem("products", JSON.stringify(products));
                    localStorage.setItem("orderId", JSON.stringify(data.orderId));
                    document.location.href = "order-confirmation.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        // Autoriser la requête.
    } else {
        alert('Erreur');
        // Refuser la requête et afficher un message comme pour indiquer le panier vide.
    }
}


// Ecoute le click du bouton commander et envoie la requête si la condition est respectée.
purchaseBtn.addEventListener('click', formValid);





// Styliser avec des animations les erreurs sur les inputs.








