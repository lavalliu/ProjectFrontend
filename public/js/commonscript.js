document.addEventListener('DOMContentLoaded', (event) => {
    const reserveTableLink = document.querySelector('a.nav-link[href="login.html"]');
    
    reserveTableLink.addEventListener('click', function(event) {
                // Prevent the default link behavior
                event.preventDefault();
                
                // Check if 'username' is stored in localStorage
                if (localStorage.getItem('username')) {
                    window.location.href = 'user.html';
                } else {
                    window.location.href = 'login.html';
                }
    });
});
    
function logout() {
    localStorage.removeItem('myResaData');
    localStorage.removeItem('orders');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

function displayWelcomeMessageAndHandleLogout() {
    const username = localStorage.getItem('username');
    const orders = localStorage.getItem('orders');
    const welcomeElement = document.getElementById('usernameDisplay');
    const logoutLink = document.getElementById('logout');
    const myorderDisp = document.getElementById('myorder')
    const myResa = document.getElementById('table');
    
    if (username) {
        welcomeElement.textContent = `Welcome ${username}`;
        logoutLink.style.display = 'block';
    } else {
        welcomeElement.style.display = 'none';
        logoutLink.style.display = 'none';
    }
    
    // Check if orders exist in localStorage
    if (localStorage.getItem('myResaData')) {
        myorderDisp.style.display = 'block';
        myResa.style.display ='none';
    } else {
        myorderDisp.style.display = 'none';
        myResa.style.display ='block';
    }
}

// Attach the logout function to your logout button or link
document.getElementById('logout').addEventListener('click', logout);

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayWelcomeMessageAndHandleLogout);

// Function to fetch item details by item number
async function fetchItemDetails(itemNo) {
    try {
            const response = await fetch(`http://localhost:3000/items/${itemNo}`);
            const itemData = await response.json();
            return itemData.customer.itemname; // Accessing 'itemname' from the 'customer' object
    } catch (error) {
            console.error('Failed to fetch item details:', error);
            return 'Item name not available'; // Fallback value
    }
}