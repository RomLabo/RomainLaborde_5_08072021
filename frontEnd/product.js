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
}


function viewItem (data) {
    // Ajout des valeurs du produit à chaque élément composant l'élément <article>
    document.getElementById("articleId").setAttribute("id", data._id);
    document.getElementById("articleTitle").textContent = data.name;
    document.getElementById("articlePrice").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(data.price / 1000));
    document.getElementById("articleImage").setAttribute("src", data.imageUrl);
    document.getElementById("articleDescription").textContent = data.description;          
}


function getLensesOption (data) {
    // Pour chaque objectifs du produit il sera crée une option dans l'élément <select>
    let allLenses = data.lenses;
    let lensesOption = `<select name="lenses" id="lenses-select">`;
        for (let lense of allLenses) {
            lensesOption += `<option value="${lense}">${lense}</option>`
        }
    lensesOption += `</select>`;
    document.querySelector('#option').innerHTML = lensesOption;
}


// Change le texte du titre principal de la page par un message d'alerte.
let urlAlert = () => {
    document.getElementById('sectionTitle').textContent = "Un problème est servenu veuillez revenir sur la page principal, Merci.";
    document.getElementById('product').style.display = 'none';
} 



document.querySelector('#add').addEventListener('click', populateStorage());

function populateStorage() {
    let productPrice = document.getElementById('articlePrice');
    let quantityOfProduct = document.getElementById('quantity');
    let quantityChoice = quantityOfProduct.addEventListener('change', (event) => {
        let quantityChoiceValue = event.target.value;
        localStorage.setItem('quantity', quantityChoiceValue);
    });
    /*let productImage = document.getElementById('articleImage').getAttribute('src');
    console.log(productImage);*/
    let productName = document.getElementById('articleTitle');
    let name = productName.textContent;
    console.log(name);
    /*
    localStorage.setItem('option', document.getElementById('lenses-select').value);*/
    localStorage.setItem('price', productPrice);
    localStorage.setItem('name', productName);
    /*localStorage.setItem('sum',().value);*/
}


/*function change_valeur() {
select = document.getElementById("select");
choice = select.selectedIndex  // Récupération de l'index du <option> choisi
 
valeur_cherchee = select.options[choice].value; // Récupération du texte du <option> d'index "choice"
}*/
