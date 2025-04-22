
const Clients = ({ clients, setClients }) => {
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
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Clients