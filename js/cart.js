document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update cart count on all pages
    cartCount.innerText = cart.length;

    // Function to render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.innerText = "0.00";
            return;
        }

        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(item.price);
        });

        totalPriceElement.innerText = total.toFixed(2);
    }

    // Function to remove an item
    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        cartCount.innerText = cart.length;
    };

    // Function to clear cart
    clearCartButton.addEventListener("click", function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        cartCount.innerText = 0;
    });

    // Function to checkout (Demo)
    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Checkout successful! (Demo)");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        cartCount.innerText = 0;
    });

    // Initial render
    renderCart();
});
// Load Cart Items
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartList.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price} × ${item.quantity}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
    });

    totalPrice.innerText = `Total: $${total.toFixed(2)}`;

    // Attach Remove Listeners
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.dataset.index;
            removeCartItem(index);
        });
    });
}

// Remove Item from Cart
function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Clear Cart
document.getElementById("clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    loadCart();
});

// Checkout Button
document.getElementById("checkout").addEventListener("click", function () {
    alert("Proceeding to Checkout...");
    window.location.href = "checkout.html"; // Redirect to checkout page
});

// Load Cart on Page Load
window.onload = loadCart;
