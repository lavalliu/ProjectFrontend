//Function to update orders in localstorage and call function to update cart on navbar
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

//Function to update the Order counter on the Navbar
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

//script to display the orders for the reservation
document.addEventListener('DOMContentLoaded', (event) => {
    function createMenuItemRow(menuItem) {
          const itemno = menuItem.itemno ?? 'No item number';
          const itemname = menuItem.itemname ?? 'No name';
          const group = menuItem.group ?? 'No group';
          const description = menuItem.description ?? 'No description';
          const price = menuItem.price ?? '0';
          let isChecked = '';
          let quantity = '1'; // Default quantity is 1

      if (localStorage.getItem('myResaData') !== null) {
          // Retrieve the current orders from localStorage
          const orders = JSON.parse(localStorage.getItem('orders')) || {};
          const orderno = orders[itemno.toString()]; // Get the order for the current item number

          // Check if the current item number matches an order and set the checkbox and quantity          
            if (orderno && orderno.quantity > 0) {
                  isChecked = 'checked';
                  quantity = orderno.quantity;
            }
              return `
              <div class="menu-item" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
              <h6>${itemname}</h6>
              <h6 style="color:rgb(25,84,117);">Rs ${price}</h6>
              <p>${description}</p>
              </div>
              <div>
              <input type="checkbox" id="menuItem${itemno}" name="menu" value="${itemname}" data-price="${price}" ${isChecked ? 'checked' : ''}>
              <input class="quantity-input" type="number" id="quantity${itemno}" name="quantity" value="${quantity || 1}" style="${isChecked ? "display: inline;" : "display: none;"}" min="1" onchange="updateOrder(this, ${itemno}, ${price})">
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
    
    //Function to show the amount field box once the checkbox for the item is selected
    function toggleQuantityField(checkbox, itemno, price) {
          const quantityField = document.getElementById('quantity' + itemno);
          if (checkbox.checked) {
                quantityField.style.display = 'block';
                updateOrder(quantityField, itemno, Number(price)); 
          } else {
                quantityField.style.display = 'none';
                updateOrder(quantityField, itemno, Number(price), true); 
          }
    }
    
    // Fetch the menu items and populate the menu
    fetch('https://projectbackend-fndm.onrender.com/items')
    .then(response => response.json())
    .then(data => {
          const menuItems = data.items;
          const grpitems = menuItems.filter(item => item.group === menugrp && item.status === true);
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
                checkbox.disabled = false; 
          });
    }

    function attachCheckboxListeners() {
          document.querySelectorAll('input[type="checkbox"][name="menu"]').forEach(checkbox => {
          checkbox.addEventListener('change', function() {
                const itemno = this.id.replace('menuItem', '');
                const price = this.dataset.price; 
                toggleQuantityField(this, itemno, price);
                });
          });
    }
    
    // Update cart count on page load
    updateOrderCounter();
});