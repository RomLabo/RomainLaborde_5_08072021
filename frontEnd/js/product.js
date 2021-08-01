const apiUrl = "http://localhost:3000/api/cameras";

const productId = window.location.search.substring(5);

// Requête à l'api avec l'id du produit sélectionné
fetch(apiUrl + "/" + productId)
    .then((response) => response.json())
    .then((data) => (productId === data._id) ? addProduct(data) : displayUrlAlert())
    .catch((err) => console.log('Error :' + err))
;


// Créer un article avce toutes les informations liés au produit sélectionné.
const addProduct = (data) => {
    createItem(data);
    addLensesOption(data);
    populateStorage(data); 
}


// Ajout des valeurs du produit à chaque élément composant l'élément 'article'.
const createItem = (data) => {
    document.getElementById("articleId").setAttribute("id", data._id);
    document.getElementById("articleTitle").textContent = data.name;
    document.getElementById("articlePrice").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(data.price / 1000));
    document.getElementById("articleImage").setAttribute("src", data.imageUrl);
    document.getElementById("articleDescription").textContent = data.description;          
}


// Pour chaque objectifs du produit il sera crée une option dans l'élément 'select'
const addLensesOption = (data) => {
    let allLenses = data.lenses;
    let lensesOption = `<option value="option">Choisir une option</option>`;
        for (let lense of allLenses) {
            lensesOption += `<option value="${lense}">${lense}</option>`
        }
    document.querySelector('#lenses-select').innerHTML = lensesOption;
}


// Change le texte du titre principal de la page par un message d'alerte si une érreur est détecté dans l'url.
const displayUrlAlert = () => {
    document.getElementById('sectionTitle').textContent = "Un problème est servenu veuillez revenir sur la page principal, Merci.";
    document.getElementById('product').style.display = 'none';
} 


// Affiche une fenêtre pour confirmer l'ajout du produit au panier.
const confirmationWindow = document.getElementById('window-confirmation');
const windowProduct = document.querySelector('article.product');
const displayConfirmationWindow = () => {
    confirmationWindow.style.display = 'flex';
    windowProduct.style.opacity = '0.2';
}


// Ferme la fenêtre de confirmation.
const closeConfirmationWindow = () => {
    confirmationWindow.style.display = 'none';
    windowProduct.style.opacity = '1';
}

// Ecoute le click du bouton de fermeture de la fenêtre de confirmation.
const confirmationWindowBtn = document.getElementById('confirmation-btn');
confirmationWindowBtn.addEventListener('click', closeConfirmationWindow);



// Affiche une fenêtre pour informer de l'absence de quantité séléctionnée pour le produit.
const errorChoiceWindow = document.getElementById('window-error-quantity');
const displayErrorChoiceWindow = () => {
    errorChoiceWindow.style.display = 'flex';
    windowProduct.style.opacity = '0.2';
}


// Ferme la fenêtre d'erreur.
const closeErrorChoiceWindow = () => {
    errorChoiceWindow.style.display = 'none';
    windowProduct.style.opacity = '1';
}

// Ecoute le click du bouton de fermeture de la fenêtre d'erreur.
const errorChoiceWindowBtn = document.getElementById('error-btn');
errorChoiceWindowBtn.addEventListener('click', closeErrorChoiceWindow);


// Récupère l'option choisie.
let optionChoiceValue = '';
const getOptionChoiceValue = () => {
    optionChoice = document.getElementById('lenses-select');
    optionChoice.addEventListener('change', (e) => {
        optionChoiceValue = e.target.value;
        console.log(optionChoiceValue);
    })
}


// Créer un objet avec les différentes valeurs du produit.
let cartProduct = '';
const createCartProductObject = (data) => {
    cartProduct = {
        ref: data._id,
        price: data.price * quantityChoiceValue,
        nameProduct: data.name,
        quantity: quantityChoiceValue,
        option: optionChoiceValue,
    }
}


// Récupère la quantity choisie et envoie les données dans le localeStorage.
let quantityChoiceValue = '';
const getQuantityChoiceValue = () => {
    let quantityOfProduct = document.getElementById('quantity');
    quantityOfProduct.addEventListener('change', (event) =>  quantityChoiceValue = event.target.value)
}

// Ajoute un compteur de produit au bouton panier.
let viewProductStorage = localStorage.getItem('viewCartProduct');
let viewProductStorageJSON = JSON.parse(viewProductStorage);



// Ajoute un compteur de produit au bouton panier.
let quantityValue = '';
let sumQuantityCount = 0;
let countQuantity = document.getElementById('count');
let getSumQuantityOfProduct = () => {
    if (viewProductStorageJSON != null) {
        viewProductStorageJSON.forEach(product => {
            quantityValue = Number(product.quantity);
            sumQuantityCount += quantityValue;
            countQuantity.textContent = sumQuantityCount;
            if ( sumQuantityCount < 100 && sumQuantityCount > 0) {
                countQuantity.style.display = 'flex';
            }
        })
    }
};
window.onload = getSumQuantityOfProduct;

const updateSumQuantityOfProduct = () => {
    sumQuantityCount += Number(quantityChoiceValue);
    countQuantity.textContent = sumQuantityCount;
    if ( sumQuantityCount < 100 && sumQuantityCount > 0) {
        countQuantity.style.display = 'flex';
    }
};


const addProductOnStorage = (data) => {
    // Ecoute le click du bouton 'ajouter au panier' et envoie les données.
    let addToShoppingCart = document.getElementById('add');
    addToShoppingCart.addEventListener('click', () =>  {
        if ((quantityChoiceValue >= 1 ) && (optionChoiceValue != '')) {
            createCartProductObject(data);
            let productStorage = JSON.parse(localStorage.getItem("viewCartProduct"))
            if (productStorage) {
                if ((productStorage.some(cartProduct => optionChoiceValue === cartProduct.option)) 
                && (productStorage.some(cartProduct => cartProduct.ref === cartProduct.ref))) {
                    let indexProduct;
                    let productQuantityChange;
                    indexProduct = productStorage.findIndex(cartProduct => optionChoiceValue === cartProduct.option);
                    productQuantityChange = JSON.parse(cartProduct.quantity) + JSON.parse(productStorage[indexProduct].quantity);
                    cartProduct.quantity = JSON.stringify(productQuantityChange); 
                    cartProduct.price = data.price * productQuantityChange;   
                    productStorage.splice(indexProduct,1, cartProduct);
                    localStorage.setItem("viewCartProduct", JSON.stringify(productStorage));
                } else {
                    productStorage.push(cartProduct);
                    localStorage.setItem("viewCartProduct", JSON.stringify(productStorage));
                }
            } else {
                // Créer un tableau pour stocker les données du produit si le panier est vide
                productStorage = [];
                productStorage.push(cartProduct);
                localStorage.setItem("viewCartProduct", JSON.stringify(productStorage));
            }
            displayConfirmationWindow(); 
            updateSumQuantityOfProduct();   
        } else {
            displayErrorChoiceWindow();
        }
    })
}

// Execute ces deux fonctions avant l'envoie dans le local storage.
const populateStorage = (data) => {
    getOptionChoiceValue();
    getQuantityChoiceValue();
    addProductOnStorage(data);
}


