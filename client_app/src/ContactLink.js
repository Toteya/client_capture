const ContactLink = ({ clientId, contact, linkContact }) => {
  return (
    <a
      href="/"
      className="dropdown-item"
      onClick={(event) => {
        event.preventDefault();
        console.log(`Linking contact: ${contact.name}`);
        linkContact(clientId, contact.id);
      }}
    >{contact.name} {contact.email}
    </a>
  )
}

export default ContactLink
