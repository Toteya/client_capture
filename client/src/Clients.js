import ContactLink from "./ContactLink";
import AddClientForm from "./AddClientForm";
import { useState } from 'react';


const Clients = ({
  clients, setClients, contacts, linkContact, addClient, newClient, setNewClient
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="Clients">
      <h2>Clients</h2>
        <button
          className="addButton"
          onClick={() => setShowForm(true)}
        >New Client</button>
        {showForm && (
          <AddClientForm
            addClient={addClient}
            newClient={newClient}
            setNewClient={setNewClient}
            setShowForm={setShowForm}
          ></AddClientForm>
        )}
        {clients.length === 0 && <p>No clients found</p>}
        {clients.length > 0 && (
          <table>
            <thead>
              <tr>
                <th align='left'>Name</th>
                <th align='left'>Code</th>
                <th>No. of Contacts</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                  onMouseLeave={(e) => e.currentTarget.style.cursor = 'default'}
                  onClick={() => {
                    console.log(`Client ${client.name} clicked`);
                  }} 
                >
                  <td align='left'>{client.name}</td>
                  <td align='left'>{client.client_code}</td>
                  <td>{client.contacts === undefined ? 0 : client.contacts.length }</td>
                  <td className="dropdown">
                    <button className="dropbtn">Add Contacts</button>
                    <div className="dropdown-content">
                      {contacts.map((contact) => (
                        <ContactLink
                          key={contact.id}
                          clientId={client.id}
                          contact={contact}
                          linkContact={linkContact}
                        ></ContactLink>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} 
    </div>
  )
}

export default Clients
