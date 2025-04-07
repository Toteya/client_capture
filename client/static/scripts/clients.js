$(document).ready(function() {
  const $container = $('#clientList');

  // Fetch the client data from the API
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/clients',
    contentType: 'application/json',
    success: (clients) => {
      generateClientTable(clients);
    },
    error: (error) => {
      console.error('Error fetching clients:', error);
    }
  });
  
  // Generate the client list
  const generateClientTable = (clients) => {
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
});