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

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #ccc;">
                    <p><strong>${item.name}</strong> - $${item.price} x ${item.quantity}</p>
                    <div>
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
            cartContent.appendChild(cartItem);
        });

        cartContent.innerHTML += `
            <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border-top: 1px solid #ccc;">
                <p><strong>Subtotal:</strong> $${calculateTotal()}</p>
                <div>
                    <label for="promo-code">Promo Code:</label>
                    <input type="text" id="promo-code" placeholder="Enter promo code">
                    <button onclick="applyPromoCode()">Apply</button>
                </div>
                <p id="discount-message" style="color: green; display: none;"></p>
                <p id="total-price"><strong>Total:</strong> $${calculateTotal()}</p>
            </div>
        `;
    }

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

function applyPromoCode() {
    const promoCode = document.getElementById('promo-code').value;
    const discountMessage = document.getElementById('discount-message');
    const totalPriceElement = document.getElementById('total-price');

    let discount = 0;
    if (promoCode === 'ostad10') {
        discount = calculateTotal() * 0.10;
        discountMessage.style.display = 'block';
        discountMessage.innerText = '10% discount applied!';
    } else if (promoCode === 'ostad5') {
        discount = calculateTotal() * 0.05;
        discountMessage.style.display = 'block';
        discountMessage.innerText = '5% discount applied!';
    } else {
        discountMessage.style.display = 'block';
        discountMessage.style.color = 'red';
        discountMessage.innerText = 'Invalid promo code.';
        return;
    }

    const finalTotal = calculateTotal() - discount;
    totalPriceElement.innerText = `Total: $${finalTotal.toFixed(2)}`;
}

function checkout() {
    alert('Checkout successful!');
    clearCart();
}
