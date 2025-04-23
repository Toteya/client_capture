$(document).ready(function() {
  const $container = $('#clientList');
  
  // Fetch the client data from the API
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/clients',
    contentType: 'application/json',
    success: (response) => { 
      const clients = response;
      generateClientTable(clients);
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
        <td style="text-align: center;">0</td>
        <td style="text-align: center;">
          <div class="custom-dropdown">
            <button class="showDropdownButton">Add Contacts</button>
            <div class="dropdownContainer" style="display: none;">
              <div class="checkboxList"></div>
              <button class="submitSelection">Submit</button>
            </div>
          </div>
        </td>
      `);
      $tbody.append($row);
    });

    $table.append($thead, $tbody);
    $container.append($table);
  };

  // Fetch and populate the checkboxes when the dropdown is shown
  const fetchContacts = (clientId) => {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5001/api/contacts',
      contentType: 'application/json',
      success: (contacts) => {
        generateCheckboxes(contacts, clientId);
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  };

  const generateCheckboxes = (contacts, clientId) => {
    const $checkboxList = $('.checkboxList');
    $checkboxList.empty(); // Clear existing checkboxes

    contacts.forEach(contact => {
      const checkbox = `
        <label>
          <input type="checkbox" class="contactCheckbox" value="${contact.id}" data-client-id="${clientId}">${contact.name}
        </label><br/>
      `;
      $checkboxList.append(checkbox);
    });
  };

  // Show/Hide the dropdown for adding contacts
  $(document).on('click', '.showDropdownButton', function() {
    const $dropdownContainer = $(this).siblings('.dropdownContainer');
    const clientId = $(this).closest('tr').find('td:first').text(); // Assuming first td is the client name or ID
    $dropdownContainer.toggle();
    
    // Fetch contacts when the dropdown is shown
    if ($dropdownContainer.is(':visible')) {
      fetchContacts(clientId);
    }
  });

  // Handle the form submission for adding a client
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
            location.reload();
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
