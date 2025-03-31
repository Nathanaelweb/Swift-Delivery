document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            const productName = this.getAttribute("data-name");
            const productPrice = this.getAttribute("data-price");

            if (!productId || !productName || !productPrice) {
                alert("Error: Product details missing!");
                return;
            }

            addToCart(productId, productName, productPrice);
        });
    });
});

// Add to Cart Function
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart!`);
}
productList.innerHTML += `
    <div class="product">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button class="add-to-cart"
            data-id="${product.id}" 
            data-name="${product.name}" 
            data-price="${product.price}">
            Add to Cart
        </button>
    </div>
`;
