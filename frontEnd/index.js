main()

async function main() {
    const products = await getProducts()
    for (product of products) {
        displayAllProduct(product)   
    }
}

function getProducts() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products){
            return products
        })
        .catch(function(error){
            alert(error)
        })
}

function displayAllProduct(product) {
    const templateElement = document.getElementById("articleTemplate")
    const cloneElement = document.importNode(templateElement.content, true)

    let idProd = product._id;
    cloneElement.getElementById("article").setAttribute("id", idProd)
    cloneElement.getElementById("articleTitle").textContent = product.name
    let productPrice = product.price / 1000;
    cloneElement.getElementById("articlePrice").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(productPrice))
    let urlImage = product.imageUrl;
    cloneElement.getElementById("articleImage").setAttribute("src", urlImage)

    document.getElementById("box").appendChild(cloneElement)
    
}







