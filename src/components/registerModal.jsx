import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

//*Gets closeModal function by props
function RegisterModal({onClose, onLogin}) {
    //*Use state for login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [age, setAge] = useState(0);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    //*Methods for handling register data
    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handleRepPassword = (event)=>{
        setRepPassword(event.target.value);
    }

    const handleAge = (event)=>{
      setAge(event.target.value);
    }

    const handleName = (event)=>{
      setName(event.target.value);
    }

    const handleLastName = (event)=>{
      setLastName(event.target.value);
    }

    const handleLogin = async ()=>{
      try{
        //*Create json user to send it 
        const loginUser = {
          "username": username,
          "password": password
        }

        const res = await axios.post('http://localhost:5000/api/users/login/', loginUser);
        const data = res.data;
				//*Store data on session storage (only current tab)
        sessionStorage.clear();
				sessionStorage.setItem('token', data.token);
				sessionStorage.setItem('username', data.username);
				sessionStorage.setItem('rol', data.rol);
        //*We set the user rol
        onLogin(data.rol);
      }catch(error){
        console.log(error);
      }
    }

    //*Handles register
    const handleRegister = ()=>{
        if(password !== repPassword){
            setErrorMsg("Passwords doesn't match");
        }else{
          //*Register common user
          const registerUser = async ()=>{
            try{
              const res = await axios.post('http://localhost:5000/api/users/newc/',{
                "name": name,
                "lastName": lastName,
                "username": username,
                "password": password,
                "age": age
              });
              console.log(res.data);
              //*If the username exists, shows error
              if(res.data.status === "error"){
                setErrorMsg(res.data.message);
              }else{
                //*Make a login request
                handleLogin();
              }
            }catch(e){
              console.log("Error registering common user, registerModal.jsx: ", e);
            }
          }
          registerUser();  
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
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" className='form-control' placeholder='Write your password here!' value={password} onChange={handlePassword}/>
            </div>
            <div className='col-12'>
                <label htmlFor="repPassword" className="form-label">Repeat your password:</label>
                <input type="password" className='form-control' placeholder='Please, repeat your password' value={repPassword} onChange={handleRepPassword} />
            </div>

            <div className="col-12">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" placeholder='Write down your name' value={name} onChange={handleName}/>
            </div>

            <div className="col-12">
              <label htmlFor="lastName" className="form-label">Last name:</label>
              <input type="text" className="form-control" placeholder='Write down your last name' value={lastName} onChange={handleLastName}/>
            </div>

            <div className="col-12">
              <label htmlFor="age" className="form-label">Age:</label>
              <input type="number" className="form-control" placeholder='Write down your age' value={age} onChange={handleAge}/>
            </div>

            {/* Displays error in case passwords doesnt match */}
            {errorMsg && <div className="form-label text-danger">{errorMsg}</div>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;