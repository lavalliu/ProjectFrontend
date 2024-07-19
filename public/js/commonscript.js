//Function to move in between the menu group screen
function menuSlides(menugrp) {
    window.location.href = `/${menugrp}`;
}

//Function to clear local storage when user logs out
function logout() {
    localStorage.clear();
    window.location.href = '/index';
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
      displayWelcomeMessageAndHandleLogout();
      });

function displayWelcomeMessageAndHandleLogout() {
    const username = localStorage.getItem('username');
    const resa = localStorage.getItem('myResaData');
    const welcomeElement = document.getElementById('usernameDisplay');
    const logoutLink = document.getElementById('logout');
    const myProfileElement = document.getElementById('myProfile');
    const loginLink = document.getElementById('login'); 
    const myorderDisp = document.getElementById('myorder');
    const orderInstructions = document.getElementById('orderInstructions');
    
    if (username) {
        welcomeElement.textContent = `Welcome ${username}`;
        welcomeElement.style.display = 'block';
        myProfileElement.style.display = 'block';
        logoutLink.style.display = 'block';
        loginLink.style.display = 'none';
        if (username !== 'Admin') {
            orderInstructions.style.display = 'block';
        }
    } else {
        welcomeElement.style.display = 'none'; 
        myProfileElement.style.display = 'none';
        logoutLink.style.display = 'none'; 
        loginLink.style.display = 'block'; 
        orderInstructions.style.display = 'none';
    }
    if (resa) {
        myorderDisp.style.display = 'block';
    } else {
        myorderDisp.style.display = 'none';
    }
}

// Attach the logout function to logout
document.getElementById('logout').addEventListener('click', logout);

// Function to fetch item details by item number
async function fetchItemDetails(itemNo) {
    try {
            const response = await fetch(`${process.env.BACKEND_URL}/items/${itemNo}`);
            const itemData = await response.json();
            return itemData.customer.itemname; 
    } catch (error) {
            console.error('Failed to fetch item details:', error);
            return 'Item name not available'; 
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const togglePasswords = document.getElementById('togglePasswords');
    if (togglePasswords) {
        togglePasswords.addEventListener('click', function () {
        const password = document.getElementById('password');
        const retypePassword = document.getElementById('password2');
        if (password && retypePassword) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            retypePassword.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        }
        });
    }
});

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
    fetch(`${process.env.BACKEND_URL}/items`)
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