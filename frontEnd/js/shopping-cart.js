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



// formulaire
 //regex firstname : 
const postCodeRegex = /^((0[1-9])|([1-8][0-9])|(9[0-8]))[0-9]{3}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const firstNameRegex = /^[A-Z][A-Za-z\é\è\ê\ï\-]+$/;
const nameRegex = /^[A-Z][a-z]/;

const purchaseBtn = document.getElementById("purchase-btn");
const userPostCode = document.getElementById("user_postcode");
const userMail = document.getElementById('user_mail');
const userFirstName = document.getElementById('user_first-name');
const userName = document.getElementById('user_name');




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

// 
const formU = document.getElementById('form');
formU.addEventListener('change', function(z) {
    if ((userName.value != "") && (userFirstName.value != "") && (userMail.value != "") && (userPostCode.value != "")) {
        purchaseBtn.removeAttribute('disabled');
    }
} )

const formValid = () => {
    if (!((nameRegex.test(userName)) && (firstNameRegex.test(userFirstName)) && (emailRegex.test(userMail)) && (postCodeRegex.test(userPostCode)))) {
        alert('ok'); 
        // Autoriser la requête.
    } else {
        alert('Erreur');
        // Refuser la requête et afficher un message comme pour indiquer le panier vide.
    }
}


purchaseBtn.addEventListener('click', formValid)

// Styliser avec des animations les erreurs sur les inputs.
// Ajout de regex et des controles sur les 2 autres inputs .
// Création d'une fonction pour englober la methode post, qu'il faudra intégrer dans formValid.






