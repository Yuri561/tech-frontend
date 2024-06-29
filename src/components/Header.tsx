import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './styles/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload(); // Reload to ensure state updates
  };

  return (
      <Navbar collapseOnSelect expand="lg" className="text-light" style={{ background: '#283048' }}>
        <Container fluid className="text-light">
          <Navbar.Brand href={'/'} className="d-flex align-items-center">
            <img
              src="/images/Logo.png" // Path to your logo in the public folder
              alt="Your Company"
              width="30"
              height="30"
              className="d-inline-block align-top rounded mx-3"
            />
            <span className="text-light">TechNow</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#" className="text-light">Tech Online: {username || 'Guest'}</Nav.Link>
              {username && <Nav.Link onClick={handleLogout} className="text-light border rounded bg-blue-900">Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default Header;
