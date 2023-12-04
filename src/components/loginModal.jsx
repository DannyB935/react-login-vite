import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//*Gets closeModal function by props
function LogInModal({onClose, onLogin}) {
    //*Use state for login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handleLogin = async ()=>{
        //*The method creates a call to the API
      try{
        //*Create json user to send it 
        const loginUser = {
          "username": username,
          "password": password
        }

        const res = await axios.post('http://localhost:5000/api/users/login/', loginUser);
        const data = res.data;
				//*Store data on session storage (only current tab)
				sessionStorage.setItem('token', data.token);
				sessionStorage.setItem('username', data.username);
				sessionStorage.setItem('rol', data.rol);
        //*We set the user rol
        onLogin(data.rol);
        onClose();
        }catch(error){
          console.log(error);
        }
    }

  return (
    <>

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <div className="col-12">
                <label htmlFor="username" className="form-label">Username: </label>
                <input type="text" className='form-control' placeholder='Write your username here!' value={username} onChange={handleUsername}/>
            </div>
            <div className="col-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className='form-control' placeholder='Write your password here!' value={password} onChange={handlePassword}/>
            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInModal;