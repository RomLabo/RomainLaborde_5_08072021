// Récupêre les données de localStorage
let viewProductStorage = localStorage.getItem('viewCartProduct');
//console.log(viewProductStorage);


// Analyse la chaine de caractère et construit une valeur javascript.
let viewProductStorageJSON = JSON.parse(viewProductStorage);
//console.log(viewProductStorageJSON);

let cartInfo = document.getElementById('cart-info');
viewProductStorageJSON == null ? cartInfo.style.display = 'flex' : cartInfo.style.display = 'none';
    
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
    productHtml.getElementById("remove-item").setAttribute('id', (product.nameProduct + product.option));
    // Ajout les produits dans son conteneur.
    document.getElementById('tableStor').appendChild(productHtml);
}


// Ajoute un compteur de produit au bouton panier.
let quantityValue = '';
let sumQuantityCount = 0;
let countQuantity = document.getElementById('count');
let getSumQuantityOfProduct = () => viewProductStorageJSON.forEach(product => {
    quantityValue = Number(product.quantity);
    sumQuantityCount += quantityValue;
    countQuantity.textContent = sumQuantityCount;
    console.log(sumQuantityCount);
    if ( sumQuantityCount < 100 && sumQuantityCount > 0) {
        countQuantity.style.display = 'flex';
    }
});




// Pour chaque produit stocké dans le storage, est crée une ligne de tableau et son prix est ajouté au précédent.
let getSumPriceOfProduct = () => viewProductStorageJSON.forEach(product => {
    addProductStorage(product);
    sumProductsPriceStorage += product.price;
    console.log(sumProductsPriceStorage);
});


// Fonction pour vider le panier et le local storage.
const removeAll = () => {
    localStorage.clear();
    document.location.reload();
}


// Ecoute le click du bouton 'vider le panier' .
let removeAllProducts = document.getElementById('remove-products');
removeAllProducts.addEventListener('click', removeAll);


// Affiche le prix total.



// variables stockant les données du formulaire de contact.
const contactForm = document.getElementById('form');
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
const nameRegex = /^[A-Z][A-Za-z\é\è\ê\ï\-]+$/;
const addressRegex = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
const cityRegex = /^[A-Z][A-Za-z\é\è\ê\ï\-]+$/;

let inputControlerFirstName;
let inputControlerName;
let inputControlerMail;
let inputControlerPostCode;
let inputControlerAddress;
let inputControlerCity;

// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const checkFirstNameIsValid = () => {
    userFirstName.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (firstNameRegex.test(e.target.value)) {
            userFirstName.style.border = '5px solid green';
            inputControlerFirstName = true;
            console.log(inputControlerFirstName);
        } else {
            userFirstName.style.border = '5px solid red';
            inputControlerFirstName = false;
            console.log(inputControlerFirstName);
        }
    })
}



// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const checkNameIsValid = () => {
    userName.addEventListener('input', function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (nameRegex.test(e.target.value)) {
            userName.style.backgroundColor = 'green';
            inputControlerName = true;
            console.log(inputControlerName);
        } else {
            userName.style.backgroundColor = 'red';
            inputControlerName = false; 
        }
    })
} 



// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const checkMailIsValid = () => {
    userMail.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (emailRegex.test(e.target.value)) {
            userMail.style.backgroundColor = 'green';
            inputControlerMail = true;
            console.log(inputControlerMail);
        } else {
            userMail.style.backgroundColor = 'red';
            inputControlerMail = false;
        }
    })
}



// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const checkPostCodeIsValid = () => {
    userPostCode.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (postCodeRegex.test(e.target.value)) {
            userPostCode.style.backgroundColor = 'green';
            inputControlerPostCode = true;
            console.log(inputControlerPostCode);
        } else {
            userPostCode.style.backgroundColor = 'red';
            inputControlerPostCode = false;
        }
    })
     
}


// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const checkAddressIsValid = () => {
    userAddress.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (addressRegex.test(e.target.value)) {
            userAddress.style.backgroundColor = 'green';
            inputControlerAddress = true;
            console.log(inputControlerAddress);
        } else {
            userAddress.style.backgroundColor = 'red';
            inputControlerAddress = false; 
        }
    })
}


// Ecoute l'input et vérifie que sa valeur soit conforme à son regex. 
const checkCityIsValid = () => {
    userCity.addEventListener("input", function(e) {
        // Ajouter des animations pour indiquer a l'utilisateur qu'il y a une erreur.
        if (cityRegex.test(e.target.value)) {
            userCity.style.backgroundColor = 'green';
            inputControlerCity = true;
        } else {
            userCity.style.backgroundColor = 'red';
            inputControlerCity = false;
        }
    })
}



// Ecoute d'un input vide pour détecter une attaque.
const inputDetect = document.getElementById('input-detect');
inputDetect.addEventListener("input", function(a) {
    if ((a.target.value) != "") {
        alert("Tentative d'intrusion détectée");
    }
}); 
checkFirstNameIsValid();
checkNameIsValid();
checkMailIsValid();
checkPostCodeIsValid();
checkAddressIsValid();
checkCityIsValid();

// Ecoute le changement de valeur de chaque champs du formulaire et active le bouton commander et créer un objet contact. 
let contact = '';
contactForm.addEventListener('change', function(z) {
    if ((userName.value != "") && (userFirstName.value != "") && (userMail.value != "") && (userPostCode.value != "") && (userAddress.value != "") && (userCity.value != "")) {
        checkFormIsValid();
        contact = {
            firstName: userName.value,
            lastName: userFirstName.value,
            address: userAddress.value,
            city: userPostCode.value + " " + userCity.value, 
            email: userMail.value,
        };
        //console.log(contact);
    } 
});


// Création d'un tableau contenant les références des tout les produits du panier.
let products = [];
const addItemOfProdusts = () => viewProductStorageJSON.forEach(item => {
    products.push(item.ref);
});


// Vérifie que le local storage ne soit pas vide.
if (viewProductStorageJSON != null) {
    getSumPriceOfProduct();
    getSumQuantityOfProduct();
    addItemOfProdusts();
    getSumPriceProductStorage();
}


// Contrôle que les informations renseignées par l'utilisateur sont valides.
const checkFormIsValid = () => {
    if ((inputControlerFirstName === true) 
    && (inputControlerName === true)
    && (inputControlerMail === true) 
    && (inputControlerAddress === true) 
    && (inputControlerPostCode === true)
    && (inputControlerCity === true))  {
        purchaseBtn.removeAttribute('disabled');
    } else {
        purchaseBtn.setAttribute('disabled', true)
    }
}


// Envoi des informations de la commande.
const sendOrder = () => {
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
} 


// Ecoute le click du bouton commander et envoie la requête si la condition est respectée.
purchaseBtn.addEventListener('click', sendOrder);





// Styliser avec des animations les erreurs sur les inputs.








