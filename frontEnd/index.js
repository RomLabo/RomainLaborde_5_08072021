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

    cloneElement.getElementById("articleTitle").textContent = product.title
    cloneElement.getElementById("articleDescription").textContent = product.description

    document.getElementById("main").appendChild(cloneElement)
}