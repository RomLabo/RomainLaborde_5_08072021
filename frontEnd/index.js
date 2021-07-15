const apiUrl = "http://localhost:3000/api/cameras";

// Requête à l'api pour récupérer ces données
fetch(apiUrl)
    .then((response) => 
        response.json()
    .then((data) => {
            //console.log(data);
            // Créer un élément <article> pour chaque produit avec leurs valeurs respectives
            let viewProducts = '<div class="d-flex flex-wrap">';
            for (let product of data) {
                viewProducts += `<a href="./product.html" class="item m-3 w-25" >
                                    <article id="${product._id}" class="m-3">
                                        <img src="${product.imageUrl}" alt"Un appareil photo vintage" class="w-100 rounded-top"/>
                                        <div class="d-flex justify-content-between p-2 bg-white rounded-bottom">
                                            <h3 class="fs-5">${product.name}</h3>
                                            <p>${(new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 1000))}</p>
                                        </div>
                                    </article>
                                </a>`;
            }
            viewProducts += '</div>';
            // Ajout des produits dans son conteneur
            document.querySelector('#products').innerHTML = viewProducts;
        }) 
    ).catch((err) => console.log('Error :' + err)
);


// Ecoute l'évenement 'click' de chaque article, et récupère son id pour la stocker dans une variable
document.querySelector('article').addEventListener('click', ( e => {
    let target = e.target.value;
    let productId = target.getAttribute("id");
    console.log(target);
}));
