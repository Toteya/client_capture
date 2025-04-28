const ClientLink = ({ contactId, client, linkClient }) => {
  return (
    <a
      href="/"
      className="dropdown-item"
      onClick={(event) => {
        event.preventDefault();
        console.log(`Linking client: ${client.name}`);
        linkClient(contactId, client.id);
      }}
      >
      {client.name} {client.client_code}
    </a>
  )
}

export default ClientLink
