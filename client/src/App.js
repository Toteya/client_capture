import './App.css';
import Header from './Header';
import Nav from './Nav';
import Clients from './Clients';
import Contacts from './Contacts';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {

  const API_BASE_URL = 'http://localhost:5001/api';

  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactSurname, setNewContactSurname] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setClients(data);
        setFetchError(null);
      }
      catch (error) {
        console.error('Error fetching clients:', error.message);
        setFetchError('Failed to fetch data');
      }
      finally {
        setIsLoading(false);
      }
    };

    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setContacts(data);
        setIsLoading(false);
        setFetchError(null);
      }
      catch (error) {
        console.error('Error fetching contacts:', error.message);
        setFetchError('Failed to fetch data');
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchClients();
    fetchContacts();
  }, []);


  const addClient = async (newClient) => {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: newClient}),
      });
      if (!response.ok) {
        throw new Error('Failed to add client');
      }
      const data = await response.json();
      setClients((prevClients) => [...prevClients, data]);
      console.log('Client added successfully:', data);
    }
    catch (error) {
      console.error('Error adding client:', error.message);
    }
  }

  const addContact = async (newContactName, newContactSurname, newContactEmail) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newContactName,
          surname: newContactSurname,
          email: newContactEmail,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      const data = await response.json();
      setContacts((prevContacts) => [...prevContacts, data]);
      console.log('Contact added successfully:', data);
    }
    catch (error) {
      console.error('Error adding contact:', error.message);
    }
  }

  // Link a contact to a client
  const linkContact = async (clientId, contactId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/clients/${clientId}/${contactId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        } 
      )
      if (!response.ok) {
        throw new Error('Failed to link contact');
      }
      const data = await response.json();
      console.log('Contact linked successfully:', data);
    }
    catch (error) {
      console.error('Error linking contact:', error.message);
    }
  }

  // Link a client to a contact  
  const linkClient = async (contactId, clientId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contacts/${contactId}/${clientId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) {
        throw new Error('Failed to link client');
      }
      const data = await response.json();
      console.log('Client linked successfully:', data);
    }
    catch (error) {
      console.error('Error linking client:', error.message);
    }    
  }

  return (
    <div className="App">
      <Header title="Client Capture" />
      <Nav />
      <Switch>
        <Route path="/clients">
          {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !fetchError && (
            <Clients
              clients={clients}
              setClients={setClients}
              contacts={contacts}
              linkContact={linkContact}
              addClient={addClient}
              newClient={newClient}
              setNewClient={setNewClient}
            />
          )}
        </Route>
        <Route path="/contacts">
          {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !fetchError && (
            <Contacts
              contacts={contacts}
              setContacts={setContacts}
              clients={clients}
              linkClient={linkClient}
              addContact={addContact}
              newContactName={newContactName}
              setNewContactName={setNewContactName}
              newContactSurname={newContactSurname}
              setNewContactSurname={setNewContactSurname}
              newContactEmail={newContactEmail}
              setNewContactEmail={setNewContactEmail}
            />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
