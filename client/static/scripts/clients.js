$(document).ready(function() {
  const $container = $('#clientList');

  // Fetch the client data from the API
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/clients',
    contentType: 'application/json',
    success: (response) => { 
      const clients = response;
      generateClientTable(clients)
    },
    error: (error) => {
      console.error('Error fetching clients:', error.state);
      $container.append('<p style="color: red">Error fetching clients. Please try again later.</p>');
    }
  });

  
  // Generate the client list
  const generateClientTable = (clients) => {

    if (clients.length === 0) {
      $container.append('<p>No clients found.</p>');
      return;
    }

    const $table = $('<table>', { border: 1, id: 'clientTable' });
    const $thead = $('<thead>').append(`
      <tr>
        <th>Name</th>
        <th>Client Code</th>
        <th>No. of Contacts</th>
      </tr>
    `);
    const $tbody = $('<tbody>');

    clients.forEach(client => {
      const $row = $('<tr>').append(`
        <td>${client.name}</td>
        <td>${client.client_code}</td>
        <td>0</td>
      `);
      $tbody.append($row);
    });

    $table.append($thead, $tbody);
    $container.append($table);
  }

  // Creating a new client
  const $addClientButton = $('#addClientButton');
  const $formContainer = $('#clientFormContainer');
  const $form = $('#clientForm');
  const $cancelButton = $('#cancelButton');

  $addClientButton.on('click', () => {
    $formContainer.show();

    $form.on('submit', (event) => {
      event.preventDefault();

      const clientName = $('#name').val();      
      const clientCode = 194;

      if (clientName) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:5001/api/clients',
          contentType: 'application/json',
          data: JSON.stringify({ name: clientName, client_code: clientCode }),
          success: (response) => {
            alert('Client added successfully!');
            location.reload(); // Reload the page to see the new client
          },
          error: (error) => {
            console.error('Error adding client:', error);
          }
        });
      }
    });

    $cancelButton.on('click', () => {
      $formContainer.hide();
      $form[0].reset();
    });
  });
});