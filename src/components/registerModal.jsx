import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//*Gets closeModal function by props
function RegisterModal({onClose}) {
    //*Use state for login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handleRepPassword = (event)=>{
        setRepPassword(event.target.value);
    }

    const handleLogin = ()=>{
        console.log(username);
        console.log(password);

        if(password !== repPassword){
            setErrorMsg("Passwords doesn't match");
        }else{
            onClose();
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
            <div className='col-12'>
                <label htmlFor="repPassword" className="form-label">Repeat your password</label>
                <input type="password" className='form-control' placeholder='Please, repeat your password' value={repPassword} onChange={handleRepPassword} />
            </div>

            {/* Displays error in case passwords doesnt match */}
            {errorMsg && <div className="form-label text-danger">{errorMsg}</div>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleLogin}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;