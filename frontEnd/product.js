const apiUrl = "http://localhost:3000/api/cameras";

const productId = window.location.search.substr(1);

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
    let viewProduct = `<article id="${data._id}" class="item m-3 w-50 bg-white">`;
            let allLenses = data.lenses;
            // Pour chaque objectifs du produit il sera crée une option dans l'élément <select>
            let lensesOption = `<select name="lenses" id="lenses-select" class="p-1">`;
                                    for (let lense of allLenses) {
                                        lensesOption += `<option vlaue="${lense}">${lense}</option>`
                                    }
            lensesOption += `</select>`;
            // Créer une liste d'options pour choisir la quantité du produit  
            const allQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let quantityNumber = `<select name="Quantity" id="quantity" class="p-1">`;
                                    for (let number of allQuantity) {
                                        quantityNumber += `<option vlaue="${number}">${number}</option>`
                                    }
            quantityNumber += `</select>`;
            // Ajout des valeurs du produit à chaque élément composant l'élément <article>
            viewProduct += `<img src="${data.imageUrl}" alt"Un appareil photo vintage" class="w-100 rounded-top"/>
                             <div class="d-flex justify-content-between p-2 rounded-bottom">
                                <h3 class="fs-5">${data.name}</h3>
                                <p>${(new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(data.price / 1000))}</p>
                             </div>
                             <p class="p-3">${data.description}</p>
                            <div class="d-flex justify-content-around p-3">
                                <div id="productQuantity"></div>     
                                <div id="option"></div>   
                                <button id="add">Ajouter au panier</button>
                            </div>`    
            viewProduct += `</article>`;
            // Ajout de ces éléments dans leur conteneur
            document.querySelector('#product').innerHTML = viewProduct;
            document.querySelector('#option').innerHTML = lensesOption;
            document.querySelector('#productQuantity').innerHTML = quantityNumber;
}

// Change le texte du titre principal de la page par un message d'alerte.
let urlAlert = () =>  document.getElementById('sectionTitle').innerHTML = `<i class="fas fa-exclamation-triangle"></i>` + "Un problème est servenu veuillez revenir sur la page principal";


/*
document.querySelector('#add').addEventListener('click', ( e => {
    let targ = e.target;
    console.log(targ); 
}));
*/