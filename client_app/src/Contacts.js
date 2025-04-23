import ClientLink from "./ClientLink"

const Contacts = ({ contacts, setContacts, clients, linkClient }) => {
  return (
    <div className='Contacts'>
      <h2>Contact List</h2>
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
    </div>
  )
}

export default Contacts
