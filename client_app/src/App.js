import './App.css';
import Header from './Header';
import Nav from './Nav';
import Clients from './Clients';
import Contacts from './Contacts';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {

  const API_URL = 'http://localhost:5001/api/clients';

  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setClients(data);
      }
      catch (error) {
        console.error('Error fetching clients:', error.message);
      }
    };

    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/contacts');
        const data = await response.json();
        setContacts(data);
      }
      catch (error) {
        console.error('Error fetching contacts:', error.message);
      }
    };

    fetchClients();
    fetchContacts();
  }, []);

  // Link a contact to a client
  const linkContact = async (clientId, contactId) => {
  }

  // Link a client to a contact  
  const linkClient = async (contactId, clientId) => {
  }

  return (
    <div className="App">
      <Header title="Client Capture" />
      <Nav />
      <Switch>
        <Route path="/clients">
          <Clients
            clients={clients}
            setClients={setClients}
            contacts={contacts}
          />
        </Route>
        <Route path="/contacts">
          <Contacts
            contacts={contacts}
            setContacts={setContacts}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
