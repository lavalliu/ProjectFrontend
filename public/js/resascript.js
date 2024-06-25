function updateFormData() {
      const usernameElement = document.getElementById('inputUsername'); 
      const fnameElement = document.getElementById('inputFirstname');
      const lnameElement = document.getElementById('inputLastname');
      const emailElement = document.getElementById('inputEmail');
      const phonenoElement = document.getElementById('inputPhoneno');
      const formData = {
            username: usernameElement.textContent,
            fname: fnameElement.textContent,
            lname: lnameElement.textContent,
            email: emailElement.textContent,
            phoneno: phonenoElement.textContent,
            date: document.getElementById('inputDate').value,
            time: document.getElementById('inputTime').value,
            takeout: document.getElementById('inputTakeout').checked,
            pax: document.getElementById('inputPersons').value,
            other: document.getElementById('inputOther').value,
      };
      saveFormData(formData);
}
       
// Event Listener to display the username and fetch reservations
document.addEventListener('DOMContentLoaded', async function() {
let username = localStorage.getItem('username');
      try {
            const response = await fetch(`https://projectbackend-fndm.onrender.com/users/${username}`);
            const data = await response.json();
            const email = data.customer.email;
            const lname = data.customer.lname;
            const fname = data.customer.fname;
            const phoneno = data.customer.phoneno;
            if (username) {
                  const usernameElement = document.getElementById('inputUsername');
                  const emailElement = document.getElementById('inputEmail');
                  const fnameElement = document.getElementById('inputFirstname');
                  const lnameElement = document.getElementById('inputLastname');
                  const phonenoElement = document.getElementById('inputPhoneno');
                  usernameElement.textContent = username;
                  emailElement.textContent = email;
                  fnameElement.textContent = fname;
                  lnameElement.textContent = lname;
                  phonenoElement.textContent = phoneno;
                  if (id === 'reservation') {
                        displayResas(username);
                  }
            }
      } catch (error) {
            console.error('Failed to fetch reservations:', error);
      }
});

   // Function to fetch and display reservations by username
   async function displayResas(username) {
      const resasTableBody = document.querySelector('#resasTable tbody');
      resasTableBody.innerHTML = ''; 
      try {
            // Fetch reservations details from the server
            const response = await fetch(`https://projectbackend-fndm.onrender.com/reservations/user/${username}`);
            const data = await response.json();
            // Check if the 'resa' array exists and has elements
            if (data.resa && data.resa.length > 0) {
                  const resasDetails = data.resa; 
                  let total = 0;
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  for (const resas of resasDetails) {
                        // Parse the reservation date
                        const resasDate = new Date(resas.date);
                        // Check if the reservation date is today or in the future
                        if (resasDate >= today) {
                              rows = 1;
                              // Calculate total for each reservation
                              const reservationTotal = resas.orders.reduce((sum, order) => sum + (order.quantity * order.price), 0);
                              total += reservationTotal; // Add to the overall total
                              // Create a row for reservation details
                              const resasRow = document.createElement('tr');
                              resasRow.innerHTML = `
                              <td>${resas.date ? formatDate(resas.date) : 'Date not available'}</td>
                              <td>${resas.time || 'Time not available'}</td>
                              <td>${resas.fname + ' ' + resas.lname || 'Full name not available'}</td>
                              <td>${resas.email || 'Email not available'}</td>
                              <td>${resas.phoneno || 'Phone number not available'}</td>
                              <td>${resas.pax || 'Pax not available'}</td>
                              <td>${resas.other || ''}</td>
                              <td>${resas.takeout ? 'Yes' : 'No'}</td>
                              <td>${reservationTotal ? `Rs${reservationTotal}` : 'No Orders available'}</td>
                              `;
                              resasTableBody.appendChild(resasRow);
                              // Create a row for orders if there are any
                              if (resas.orders.length > 0) {
                                    const ordersRow = document.createElement('tr');
                                    const ordersCell = document.createElement('td');
                                    ordersCell.colSpan = 8; // Span across all columns
                                    const ordersList = document.createElement('ul');
                                    // Create a table element
                                    const ordersTable = document.createElement('table');
                                    ordersTable.classList.add('orders-table');
                                    // Create the header row
                                    const headerRow = ordersTable.insertRow();
                                    const headers = ['Item Name', 'Quantity Ordered', 'Price Each', 'Line Total'];
                                    headers.forEach(headerText => {
                                          let headerCell = document.createElement('th');
                                          headerCell.textContent = headerText;
                                          headerRow.appendChild(headerCell);
                                    });
                                    for (const order of resas.orders) {
                                          const itemName = await fetchItemDetails(order.itemno);
                                          const lineTotal = order.quantity * order.price;
                                          const row = ordersTable.insertRow();
                                          let cell = row.insertCell();
                                          cell.textContent = itemName;
                                          cell = row.insertCell();
                                          cell.textContent = order.quantity;
                                          cell = row.insertCell();
                                          cell.textContent = `Rs${order.price}`;
                                          cell = row.insertCell();
                                          cell.textContent = `Rs${lineTotal}`;
                                    }
                                    ordersList.appendChild(ordersTable);
                                    ordersCell.appendChild(ordersList);
                                    ordersRow.appendChild(ordersCell);
                                    resasTableBody.appendChild(ordersRow);
                              }
                        }
                  }
            } else {
                  resasTableBody.innerHTML = '<tr><td colspan="8">No reservations available.</td></tr>';
            }
      } catch (error) {
            console.error('Failed to fetch reservations:', error);
      }
}

// function to display reservation with the information saved in localstorage
function displayFormData() {
      if (id == 'reservation') {
            rows = 0;
            date = formatDate(new Date());
            document.getElementById('inputDate').value = date;
      } else {
            var savedData = localStorage.getItem('myResaData');
            var data = JSON.parse(savedData);
            document.getElementById('inputEmail').value = data.email;
            document.getElementById('inputFirstname').value = data.fname;
            document.getElementById('inputLastname').value = data.lname;
            document.getElementById('inputPersons').value = data.pax;
            document.getElementById('inputPhoneno').value = data.phoneno;
            document.getElementById('inputDate').value = data.date;
            document.getElementById('inputTime').value = data.time;
            document.getElementById('inputOther').value = data.other; 
            document.getElementById('inputTakeout').checked = data.takeout; 
      }
}

// Function to format the date to DD-MM-YYYY or YYY-MM-DD
function formatDate(isoString) {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      if (rows == 0) {
            return `${year}-${month}-${day}`;
      } else {
            return `${day}-${month}-${year}`;
      }

}

function saveFormData(formData) {
      localStorage.setItem('myResaData', JSON.stringify(formData));
}
window.onload = displayFormData;

