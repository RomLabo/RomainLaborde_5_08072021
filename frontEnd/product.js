const apiUrl = "http://localhost:3000/api/cameras";

const productId = window.location.search.substr(5);

// Requête à l'api avec l'id du produit sélectionné
fetch(apiUrl + "/" + productId)
    .then((response) => 
        response.json()
    .then((data) => {
            // Condition pour vérifier les donnés envoyer dans l'url.
            if (productId === data._id) {
                // Création d'un élément contenant les valeurs du produit sélectionné
                getProduct(data);
            } else {
               urlAlert();
            }
        }) 
    ).catch((err) => console.log('Error :' + err)
);


// Créer un article avce toutes les informations liés au produit sélectionné.
const getProduct = (data) => {
    // Ajout de ces éléments dans leur conteneur
    viewItem(data);
    // Ajout des options du produit
    getLensesOption(data);
    // Ajout d'un sélecteur de quantité 
    populateStorage(data);   
}


// Ajout des valeurs du produit à chaque élément composant l'élément 'article'.
const viewItem = (data) => {
    document.getElementById("articleId").setAttribute("id", data._id);
    document.getElementById("articleTitle").textContent = data.name;
    document.getElementById("articlePrice").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(data.price / 1000));
    document.getElementById("articleImage").setAttribute("src", data.imageUrl);
    document.getElementById("articleDescription").textContent = data.description;          
}


// Pour chaque objectifs du produit il sera crée une option dans l'élément 'select'
const getLensesOption = (data) => {
    let allLenses = data.lenses;
    let lensesOption = `<option value="option">Choisir une option</option>`;
        for (let lense of allLenses) {
            lensesOption += `<option value="${lense}">${lense}</option>`
        }
    document.querySelector('#lenses-select').innerHTML = lensesOption;
}


// Change le texte du titre principal de la page par un message d'alerte si une érreur est détecté dans l'url.
const urlAlert = () => {
    document.getElementById('sectionTitle').textContent = "Un problème est servenu veuillez revenir sur la page principal, Merci.";
    document.getElementById('product').style.display = 'none';
} 


// Créer une fenêtre pour consulter son panier ou continuer ses achats
const confirmationWindow = () => {
    if (window.confirm(`Votre produit a bien été ajouté au panier
    Consulter le panier OK ou continuer vos achats ANNULER`)){
        window.location.href = "./shopping-cart.html";
    } else {
        window.location.href = "./index.html";
    }
}


// Récupère l'option choisie.
let optionChoiceValue = '';
const getOptionChoiceValue = () => {
    let optionChoice = document.getElementById('lenses-select');
    optionChoice.addEventListener('change', (e) => {
        optionChoiceValue = e.target.value;
    })
}

// Créer un objet avec les différentes valeurs du produit.
let cartProduct = '';
const getCartProductObject = (data) => {
    cartProduct = {
        image: data.imageUrl,
        price: data.price * quantityChoiceValue,
        nameProduct: data.name,
        quantity: quantityChoiceValue,
        option: optionChoiceValue,
    }
}

// Récupère la quantity choisie et envoie les données dans le localeStorage.
let quantityChoiceValue = '';
const getQuantityChoiceValue = (data) => {
    let quantityOfProduct = document.getElementById('quantity');
    quantityOfProduct.addEventListener('change', (event) =>  {
        quantityChoiceValue = event.target.value;
        getCartProductObject(data);
        let productStorage = JSON.parse(localStorage.getItem("viewCartProduct"))
        if (productStorage) {
            // Ajoute les données du produit dans le localStorage
            productStorage.push(cartProduct);
            localStorage.setItem("viewCartProduct", JSON.stringify(productStorage));
            console.log(productStorage);
        } else {
            // Créer un tableau pour stocker les données du produit si le panier est vide
            productStorage = [];
            productStorage.push(cartProduct);
            localStorage.setItem("viewCartProduct", JSON.stringify(productStorage));
            console.log(productStorage);
        } 
    })
}

// Execute ces deux fonctions avant l'envoie dans le local storage.
const populateStorage = (data) => {
    getOptionChoiceValue();
    getQuantityChoiceValue(data);
}

// Ecoute le click du bouton 'ajouter au panier' et utilise la fonction 'populateStorage'.
document.querySelector('#add').addEventListener('click', (populateStorage, confirmationWindow));










/*function change_valeur() {
select = document.getElementById("select");
choice = select.selectedIndex  // Récupération de l'index du <option> choisi
 
valeur_cherchee = select.options[choice].value; // Récupération du texte du <option> d'index "choice"
}*/
