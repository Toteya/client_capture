import { useRef } from 'react'

const AddClientForm = ({newClient, setNewClient, addClient, setShowForm}) => {
  const inputRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    addClient(newClient)
    setNewClient('')
    inputRef.current.focus()
  }

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor="addClient"></label>
      <input
        autoFocus
        ref={inputRef}
        type="text"
        id="addClient"
        name="addClient"
        placeholder="Client Name"
        required
        value={newClient}
        onChange={(e) => {
          setNewClient(e.target.value)
        }}
      />
      <button
        type="submit"
      >Submit</button>
      <button
        type="reset"
        onClick={() => {
          setNewClient('');
          setShowForm(false);
        }}
      >Cancel</button>

    </form>
  )
}

export default AddClientForm