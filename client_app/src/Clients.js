import ContactLink from "./ContactLink"

const Clients = ({ clients, setClients , contacts, linkContact}) => {
  return (
    <div className="Clients">
      <h2>Clients</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>No. of Contacts</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.client_code}</td>
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
    </div>
  )
}

export default Clients
