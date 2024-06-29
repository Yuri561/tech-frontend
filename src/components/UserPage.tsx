import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faWrench, faBell, faLink, faCalendarAlt, faClipboardList, faToolbox, faHeadset, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './styles/UserPage.css';

const UserPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="user-page" id='home'>
      <div className="grid-container" style={{padding: '2px'}}>
        <Card className="custom-card bg-success align-items-center">
          <Card.Img variant="top" src="/images/tech.jpg" className="roundedCircle" style={{width: '4rem', height: '4rem'}}/>
          <Card.Body className='text-center'>
            <Card.Title><FontAwesomeIcon icon={faUser} /> John Donahue</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faWrench} /> HVAC Technician
              <br />
              johndoe@example.com
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="custom-card bg-primary">
          <Card.Header><FontAwesomeIcon icon={faClipboardList} /> Recent Activity</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={{background: 'white'}}>Completed Work Request #123</ListGroup.Item>
            <ListGroup.Item>Reviewed Time Logs</ListGroup.Item>
            <ListGroup.Item>Updated Toolbox Inventory</ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="custom-card bg-warning">
          <Card.Header><FontAwesomeIcon icon={faBell} /> Notifications</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>New Work Request assigned</ListGroup.Item>
            <ListGroup.Item>Upcoming Training on Safety Procedures</ListGroup.Item>
            <ListGroup.Item>Toolbox Inventory Low</ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="custom-card bg-danger">
          <Card.Header><FontAwesomeIcon icon={faLink} /> Quick Links</Card.Header>
          <Card.Body>
            <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faClipboardList} /> New Work Request</Button>
            <Button variant="secondary"><FontAwesomeIcon icon={faToolbox} /> Access Toolbox</Button>
          </Card.Body>
        </Card>
        <Card className="custom-card bg-secondary calendar-card">
          <Card.Header><FontAwesomeIcon icon={faCalendarAlt} /> Schedule</Card.Header>
          <Card.Body>
            <Calendar />
          </Card.Body>
        </Card>
        <Card className="custom-card bg-info">
          <Card.Header><FontAwesomeIcon icon={faHeadset} /> Tech Support</Card.Header>
          <Card.Body className="tech-support-body">
            <div className="chat-box">
              {messages.map((msg, idx) => (
                <div key={idx} className="chat-bubble">{msg}</div>
              ))}
            </div>
            <div className="chat-input ">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
              />
              <Button variant="success" className='mx-2'onClick={handleSend}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserPage;
