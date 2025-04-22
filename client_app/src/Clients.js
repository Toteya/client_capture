
const Clients = ({ clients, setClients , contacts}) => {
  return (
    <div className="Clients">
      <h2>Clients</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.client_code}</td>
                <td className="dropdown">
                    <button className="dropbtn">Add Contacts</button>
                    <div className="dropdown-content">
                        {contacts.map((contact) => (
                            <a key={contact.id} href="#">
                              {contact.name} {contact.email}
                            </a>
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