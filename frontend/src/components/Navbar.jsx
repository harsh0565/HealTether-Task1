import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleDeleteItem = () => {
    localStorage.removeItem('auth');
    console.log('Item deleted from localStorage');
};
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
       
      </ul>
      <button onClick={handleDeleteItem}>Logout</button>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
