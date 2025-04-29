import ClientLink from "./ClientLink"
import AddContactForm from "./AddContactForm"
import { useState } from "react"

const Contacts = ({
  contacts, setContacts, clients, linkClient, addContact,
  newContactName, setNewContactName,
  newContactSurname, setNewContactSurname,
  newContactEmail, setNewContactEmail,
}) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='Contacts'>
      <h2>Contacts</h2>
        <button
          className="addButton"
          onClick={() => setShowForm(true)}
        >New Contact</button>
        {showForm && (
          <AddContactForm
            addContact={addContact}
            newContactName={newContactName}
            setNewContactName={setNewContactName}
            newContactSurname={newContactSurname}
            setNewContactSurname={setNewContactSurname}
            newContactEmail={newContactEmail}
            setNewContactEmail={setNewContactEmail}
            setShowForm={setShowForm}
          ></AddContactForm>
        )}
      {contacts.length === 0 && <p>No contacts found</p>}
      {contacts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.surname}</td>
                <td>{contact.email}</td>
                <td className="dropdown">
                  <button className="dropbtn">Add Clients</button>
                  <div className="dropdown-content">
                    {clients.map((client) => (
                      <ClientLink
                        key={client.id}
                        contactId={contact.id}
                        client={client}
                        linkClient={linkClient}
                      ></ClientLink>
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

export default Contacts
