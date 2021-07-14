const apiUrl = "http://localhost:3000/api/cameras";

fetch(apiUrl)
    .then((response) => 
        response.json()
    .then((data) => {
            //console.log(data);
            let viewProducts = '<div class="d-flex flex-wrap">';
            for (let product of data) {
                viewProducts += `<a href="" class="item m-3 w-25" >
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
            document.querySelector('#products').innerHTML = viewProducts;
        }) 
    ).catch((err) => console.log('Error :' + err)
);



document.querySelector('article').addEventListener('click', function(e) {
    let target = e.target.value;
    console.log(target);
})