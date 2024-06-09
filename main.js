// const products = ./products.json
import data from "./products.json" assert { type: 'json' };
const products = data.products
console.log(data)

window.onload = function() {
const openShopping = document.querySelector(".shopping"),
      body = document.querySelector("body"),
      list = document.querySelector(".list"),
      searchBar = document.getElementById("searchBar"),
      searchButton = document.getElementById("searchButton");


let listCards = JSON.parse(localStorage.getItem('cart')) || [];

const initApp = () => {
    renderProducts(products);
    updateCartQuantity();
}

//Render first 

const renderProducts = (products) => {
    list.innerHTML = "";
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("col-md-4", "item");
        let actionButton = value.quantity>0?`<button class="btn btn-primary" onclick="addToCart(${key})">Add To Cart</button>`:`<button class="btn btn-danger">Out Of Stock</button>`
        newDiv.innerHTML = `
            <div class="product-box">
                <img src="img/${value.image}" class="img-fluid">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                ${actionButton}
            </div>
        `;
        list.appendChild(newDiv);
    });
}
window.renderProducts= renderProducts

const filterProducts = () => {
    const query = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(query) ||  product.color.toLowerCase().includes(query) ||  product.type.toLowerCase().includes(query);
    });
    renderProducts(filteredProducts);
}
window.filterProducts = filterProducts

searchButton.addEventListener("click", filterProducts);

const filterBy = (criteria, value) => {
    let filteredProducts;
    if (criteria === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product[criteria].toLowerCase() === value.toLowerCase());
    }
    renderProducts(filteredProducts);
}
window.filterBy = filterBy

//Adding to our cart

const addToCart = key => {
    const product = products[key];
    const existingProduct = listCards.find(item => item.id === product.id);
    if (existingProduct) {
        if (existingProduct.quantity < product.quantity) {
            existingProduct.quantity += 1;
        } else {
            alert("Cannot add more than available quantity");
        }
    } else {
        const productToAdd = { ...product, quantity: 1 };
        listCards.push(productToAdd);
    }
    localStorage.setItem('cart', JSON.stringify(listCards));
    updateCartQuantity();
}
window.addToCart = addToCart

const updateCartQuantity = () => {
    const totalQuantity = listCards.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".quantity").innerText = totalQuantity;
}
window.updateCartQuantity = updateCartQuantity

initApp();
}
