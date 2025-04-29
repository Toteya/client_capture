
const AddContactForm = ({
  newContactName, setNewContactName,
  newContactSurname, setNewContactSurname,
  newContactEmail, setNewContactEmail,
  addContact, setShowForm
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    addContact(newContactName, newContactSurname, newContactEmail)
    setNewContactName('')
    setNewContactSurname('')
    setNewContactEmail('')
    setShowForm(false);
  }

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor="addContact"></label>
      <input
        autoFocus
        type="text"
        id="addContactName"
        name="addContactName"
        placeholder="Name"
        required
        value={newContactName}
        onChange={(e) => {
          setNewContactName(e.target.value)
        }}
      />
      <input
        type="text"
        id="addContactSurname"
        name="addContactSurname"
        placeholder="Surname"
        required
        value={newContactSurname}
        onChange={(e) => {
          setNewContactSurname(e.target.value)
        }}
      />
      <input
        type="email"
        id="addContactEmail"
        name="addContactEmail"
        placeholder="Email"
        required
        value={newContactEmail}
        onChange={(e) => {
          setNewContactEmail(e.target.value)
        }}
      />
      <button
        type="submit"
      >Submit</button>
      <button
        type="reset"
        onClick={() => {
          setNewContactName('');
          setNewContactSurname('');
          setNewContactEmail('');
          setShowForm(false);
        }}
      >Cancel</button>

    </form>
  )
}

export default AddContactForm
