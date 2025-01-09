let cart = [];

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((count, item) => count + item.quantity, 0);
}

function viewCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
        `;
        cartContent.appendChild(cartItem);
    });

    cartContent.innerHTML += `<p>Total: $${calculateTotal()}</p>`;
    cartModal.classList.remove('hidden');
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartCount();
    viewCart();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function clearCart() {
    cart = [];
    updateCartCount();
    viewCart();
}

function checkout() {
    alert('Checkout successful!');
    clearCart();
}
