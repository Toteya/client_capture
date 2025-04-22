import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='Nav'>
      <ul>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
      </ul>
    </nav>
  )
}

export default Nav