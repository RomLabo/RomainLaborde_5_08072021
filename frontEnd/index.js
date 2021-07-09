main()

async function main() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(product)   
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

function displayProduct(product) {
    const templateElement = document.getElementById("articleTemplate")
    const cloneElement = document.importNode(templateElement.content, true)


    cloneElement.getElementById("articleTitle").textContent = product.name
    let productPrice = product.price / 1000;
    cloneElement.getElementById("articlePrice").textContent = (new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(productPrice))
    let urlImage = product.imageUrl;
    cloneElement.getElementById("articleImage").setAttribute("src", urlImage)

    document.getElementById("box").appendChild(cloneElement)
}