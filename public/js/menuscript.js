function updateOrder(quantityField, itemno, price, remove = false) {
    let orders = JSON.parse(localStorage.getItem('orders')) || {};
    if (remove) {
          delete orders[itemno];
    } else {
          orders[itemno] = {quantity: parseInt(quantityField.value), price: price};
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    updateOrderCounter();
}

function updateOrderCounter() {
    try {
          const orders = JSON.parse(localStorage.getItem('orders')) || {};
          const orderCounter = document.getElementById('cartCount');
          if (!orderCounter) throw new Error("Element with id 'cartCount' does not exist.");
          const totalQuantity = Object.values(orders).reduce((sum, order) => {
                const numericQuantity = Number(order.quantity); // Access the quantity property
                if (isNaN(numericQuantity)) throw new Error("Found non-numeric quantity.");
                return sum + numericQuantity;
          }, 0);
          orderCounter.textContent = totalQuantity;
          } catch (error) {
                console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    function createMenuItemRow(menuItem) {
          const itemno = menuItem.itemno ?? 'No item number';
          const itemname = menuItem.itemname ?? 'No name';
          const group = menuItem.group ?? 'No group';
          const description = menuItem.description ?? 'No description';
          const price = menuItem.price ?? '0';

          if (localStorage.getItem('myResaData') !== null) {
              return `
              <div class="menu-item" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
              <h6>${itemname}</h6>
              <h6 style="color:rgb(25,84,117);">Rs ${price}</h6>
              <p>${description}</p>
              </div>
              <div>
              <input type="checkbox" id="menuItem${itemno}" name="menu" value="${itemname}" data-price="${price}">
              <input class="quantity-input" type="number" id="quantity${itemno}" name="quantity" value="1" style="display: none;" min="1" onchange="updateOrder(this, ${itemno}, ${price})">
              </div>
              </div>
              `;
          } else {
              return `
              <div class="menu-item" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
              <h6>${itemname}</h6>
              <h6 style="color:rgb(25,84,117);">Rs ${price}</h6>
              <p>${description}</p>
              </div>
              </div>
          `};
    }
    
    function toggleQuantityField(checkbox, itemno, price) {
          const quantityField = document.getElementById('quantity' + itemno);
          if (checkbox.checked) {
                quantityField.style.display = 'block';
                updateOrder(quantityField, itemno, Number(price)); // Parse price to a number
          } else {
                quantityField.style.display = 'none';
                updateOrder(quantityField, itemno, Number(price), true); // Parse price to a number even when removing
          }
    }
    
    // Fetch the menu items and populate the menu
    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(data => {
          const menuItems = data.items;
          const grpitems = menuItems.filter(item => item.group === menu && item.status === true);
          const container = document.getElementById('menuItemsForm');
          if (container) {
                grpitems.forEach(menuItem => {
                      container.innerHTML += createMenuItemRow(menuItem);
                });
                enableCheckboxes();
                attachCheckboxListeners();
          } else {
                console.error('Element with ID menuItemsForm not found.');
          }
    })
    .catch(error => {
          console.error('Fetch error:', error);
    });

    function enableCheckboxes() {
          var menuCheckboxes = document.querySelectorAll('input[type="checkbox"][name="menu"]');
          menuCheckboxes.forEach(function(checkbox) {
                checkbox.disabled = false; // No need to disable since we're not displaying them without reservation
          });
    }

    function attachCheckboxListeners() {
          document.querySelectorAll('input[type="checkbox"][name="menu"]').forEach(checkbox => {
          checkbox.addEventListener('change', function() {
                const itemno = this.id.replace('menuItem', '');
                const price = this.dataset.price; // Assuming price is stored as a data attribute on the checkbox
                toggleQuantityField(this, itemno, price);
                });
          });
    }
    
    // Update cart count on page load
    updateOrderCounter();
});