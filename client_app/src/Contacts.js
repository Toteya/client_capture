import React from 'react'

const Contacts = ({ contacts, setContacts }) => {
  return (
    <div className='Contacts'>
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.surname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Contacts