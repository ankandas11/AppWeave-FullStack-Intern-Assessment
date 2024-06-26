const openShopping = document.querySelector(".shopping"),
      body = document.querySelector("body"),
      list = document.querySelector(".list"),
      searchBar = document.getElementById("searchBar"),
      searchButton = document.getElementById("searchButton");

let products = [
    { "id": 1, "name": "Frock Women", "image": "1.png", "price": 2000, "type": "t-shirt", "color": "blue", "gender": "women", "quantity": 10 },
    { "id": 2, "name": "Denim Jeans Men", "image": "2.png", "price": 2200, "type": "t-shirt", "color": "blue", "gender": "men", "quantity": 5 },
    { "id": 3, "name": "Lehenga Women", "image": "3.png", "price": 2500, "type": "t-shirt", "color": "yellow", "gender": "women", "quantity": 11 },
    { "id": 4, "name": "Saree Women", "image": "4.png", "price": 1800, "type": "t-shirt", "color": "red", "gender": "women", "quantity": 4 },
    { "id": 5, "name": "T-Shirt Men", "image": "5.png", "price": 1000, "type": "t-shirt", "color": "red", "gender": "men", "quantity": 13 },
    { "id": 6, "name": "Kurta Men", "image": "6.png", "price": 2600, "type": "t-shirt", "color": "yellow", "gender": "men", "quantity": 6 },
    { "id": 7, "name": "T-Shirt Men", "image": "7.png", "price": 2400, "type": "t-shirt", "color": "green", "gender": "men", "quantity": 8 },
    { "id": 8, "name": "Patiyala Women", "image": "8.png", "price": 1400, "type": "t-shirt", "color": "pink", "gender": "women", "quantity": 7 }
];

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
        newDiv.innerHTML = `
            <div class="product-box">
                <img src="img/${value.image}" class="img-fluid">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                <button class="btn btn-primary" onclick="addToCart(${key})">Add To Cart</button>
            </div>
        `;
        list.appendChild(newDiv);
    });
}

const filterProducts = () => {
    const query = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(query) ||  product.color.toLowerCase().includes(query) ||  product.type.toLowerCase().includes(query);
    });
    renderProducts(filteredProducts);
}

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

const updateCartQuantity = () => {
    const totalQuantity = listCards.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".quantity").innerText = totalQuantity;
}

initApp();
