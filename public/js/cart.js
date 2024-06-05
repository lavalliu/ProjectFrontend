// Function to update the cart count in the navbar
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem('orders')) || {};
    document.getElementById('cartCount').textContent = Object.keys(orders).length;
}

// Function to add an item to the cart
function addToCart(itemno, itemname) {
    var cart = JSON.parse(localStorage.getItem('orders')) || {};
    cart[itemno] = itemname;
    localStorage.setItem('cart', JSON.stringify(orders));
    updateCartCount();
}

// Function to remove an item from the cart
function removeFromCart(itemno) {
    var cart = JSON.parse(localStorage.getItem('orders')) || {};
    delete cart[itemno];
    localStorage.setItem('cart', JSON.stringify(orders));
    updateCartCount();
}

// This function will be called from the main script after the checkboxes are added to the DOM
function attachCheckboxListeners() {
        document.querySelectorAll('input[type="checkbox"][name="menu"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    addToCart(this.id, this.value);
                } else {
                    removeFromCart(this.id);
                }
            });
        });
    }

// Update cart count on page load
updateCartCount();
    