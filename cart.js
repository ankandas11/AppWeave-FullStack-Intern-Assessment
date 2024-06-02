const shoppingCart = document.getElementById("shopping-cart");
const label = document.getElementById("label");

let listCards = JSON.parse(localStorage.getItem('cart')) || [];

// loading the products first
const products = [
    { "id": 1, "name": "blue_frock_women", "image": "1.png", "price": 2000, "type": "t-shirt", "color": "blue", "gender": "women", "quantity": 10 },
    { "id": 2, "name": "blue_jeans_men", "image": "2.png", "price": 2200, "type": "t-shirt", "color": "blue", "gender": "men", "quantity": 5 },
    { "id": 3, "name": "green_tshirt_men", "image": "3.png", "price": 2400, "type": "t-shirt", "color": "green", "gender": "men", "quantity": 8 },
    { "id": 4, "name": "Yellow_kurta_men", "image": "4.png", "price": 2600, "type": "t-shirt", "color": "yellow", "gender": "men", "quantity": 6 },
    { "id": 5, "name": "pink_patiyala", "image": "5.png", "price": 1400, "type": "t-shirt", "color": "pink", "gender": "women", "quantity": 7 },
    { "id": 6, "name": "red_saree_women", "image": "6.png", "price": 1800, "type": "t-shirt", "color": "red", "gender": "women", "quantity": 4 },
    { "id": 7, "name": "red_tshirt_men", "image": "7.png", "price": 1800, "type": "t-shirt", "color": "red", "gender": "men", "quantity": 13 },
    { "id": 8, "name": "yellow_lehenga_women", "image": "8.png", "price": 1800, "type": "t-shirt", "color": "yellow", "gender": "women", "quantity": 11 }
];

const renderCart = () => {
    if (listCards.length !== 0) {
        shoppingCart.innerHTML = listCards.map((item, index) => {
            const { id, name, price, image, quantity } = item;
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="img/${image}" alt="${name}">
                    </div>
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">₹ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${index})" class="fa-solid fa-trash"></i>
                        </div>
                        <div class="cart-buttons">
                            <div class="buttons">
                                <i onclick="decrementQuantity(${index})" class="fa-solid fa-circle-minus"></i>
                                <div id="${id}" class="quantity">${quantity}</div>
                                <i onclick="incrementQuantity(${index})" class="fa-solid fa-circle-plus"></i>
                            </div>
                        </div>
                        <h3>₹ ${price * quantity}</h3>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        shoppingCart.innerHTML = "";
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to Home</button>
            </a>
        `;
    }
};

const incrementQuantity = (index) => {
    const product = listCards[index];
    const originalProduct = products.find(p => p.id === product.id);
    if (product.quantity < originalProduct.quantity) {
        listCards[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(listCards));
        renderCart();
        updateTotal();
    } else {
        alert("Cannot add more than available quantity");
    }
};

const decrementQuantity = (index) => {
    if (listCards[index].quantity > 1) {
        listCards[index].quantity -= 1;
    } else {
        listCards.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(listCards));
    renderCart();
    updateTotal();
};

const removeItem = (index) => {
    listCards.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(listCards));
    renderCart();
    updateTotal();
};

//Finally the total price

const updateTotal = () => {
    const total = listCards.reduce((sum, item) => sum + item.price * item.quantity, 0);
    label.innerHTML = `
        <h2>Total Bill: ₹ ${total}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
};

const clearCart = () => {
    listCards = [];
    localStorage.setItem('cart', JSON.stringify(listCards));
    renderCart();
    updateTotal();
};

renderCart();
updateTotal();