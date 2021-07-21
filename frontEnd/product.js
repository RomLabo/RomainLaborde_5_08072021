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
function getProduct (data) {
    // Ajout de ces éléments dans leur conteneur
    viewItem(data);
    // Ajout des options du produit
    getLensesOption(data);
    // Ajout d'un sélecteur de quantité 
    populateStorage(data);   
}


// Ajout des valeurs du produit à chaque élément composant l'élément 'article'.
function viewItem (data) {
    document.getElementById("articleId").setAttribute("id", data._id);
    document.getElementById("articleTitle").textContent = data.name;
    document.getElementById("articlePrice").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(data.price / 1000));
    document.getElementById("articleImage").setAttribute("src", data.imageUrl);
    document.getElementById("articleDescription").textContent = data.description;          
}


// Pour chaque objectifs du produit il sera crée une option dans l'élément 'select'
function getLensesOption (data) {
    let allLenses = data.lenses;
    let lensesOption = `<select name="lenses" id="lenses-select">`;
        for (let lense of allLenses) {
            lensesOption += `<option value="${lense}">${lense}</option>`
        }
    lensesOption += `</select>`;
    document.querySelector('#option').innerHTML = lensesOption;
}


// Change le texte du titre principal de la page par un message d'alerte si une érreur est détecté dans l'url.
let urlAlert = () => {
    document.getElementById('sectionTitle').textContent = "Un problème est servenu veuillez revenir sur la page principal, Merci.";
    document.getElementById('product').style.display = 'none';
} 


// Ecoute le click du bouton 'ajouter au panier' et utilise la fonction 'populateStorage'.
document.querySelector('#add').addEventListener('click', populateStorage);

// Récupère les donées du produit et les envoie dans le local storage.
function populateStorage(data) {
    let quantityOfProduct = document.getElementById('quantity');
    quantityOfProduct.addEventListener('change', (event) =>  {
        let quantityChoiceValue = event.target.value;
        let cartProduct = {
            image: data.imageUrl,
            price: data.price * quantityChoiceValue,
            nameProduct: data.name,
            quantity: quantityChoiceValue,
        }
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
    }); // Ajouter les options au storage
    confirmationWindow();   
    
}


// Créer une fenêtre pour consulter son panier ou continuer ses achats
const confirmationWindow = (data) => {
    if (window.confirm(`${data.name} option : ${lense} a bien été ajouté au panier
    Consulter le panier OK ou continuer vos achats ANNULER`)){
        window.location.href = "shopping-cart.html";
    } else {
        window.location.href = "index.html";
    }
}





/*function change_valeur() {
select = document.getElementById("select");
choice = select.selectedIndex  // Récupération de l'index du <option> choisi
 
valeur_cherchee = select.options[choice].value; // Récupération du texte du <option> d'index "choice"
}*/
