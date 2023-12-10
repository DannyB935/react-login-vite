import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import LogInModal from './components/loginModal';
import RegisterModal from './components/registerModal';

function App() {
  
  const [showModal, setShowModal] = useState(false);
  const [opRegModal, setOpRegModal] = useState(false);
  const [userRol, setUserRol] = useState(0);

  useEffect(()=>{
    const userRolStorage = sessionStorage.getItem('rol');
    if(userRolStorage){
      //*We set the rol in case it's still existing
      setUserRol(userRolStorage);
    }
  },[userRol]);

  const openModal = () =>{
    setShowModal(true);
  }

  const closeModal = () =>{
    setShowModal(false);
  }
  
  const openRegister = ()=>{
    setOpRegModal(true);
  }

  const closeRegister = ()=>{
    setOpRegModal(false);
  }

  const handleUserRol = (rol)=>{
    setUserRol(rol);
  }

  //*Method to log out
  const logOut = ()=>{
    sessionStorage.clear();
    setUserRol(0);
  }

  return (
    <div className="container d-flex flex-wrap justify-content-center align-items-center min-vh-100">

        {!userRol ? (
          <div className="col-12 col-md-4 ms-0">
            {/* When clicked, opens login modal */}
            <div className="card text-center h-100 cardHover" onClick={openModal}>
              <div className="card-body">
                <h5 className="card-title card-header">Log In</h5>
                <div className="card-text mt-1">
                  <p>Log in here!</p>
                  <i className='bi bi-arrow-90deg-down iconSizes'></i>
                </div>
              </div>
            </div>
          </div>
          ) : (
            <div className="col-12 col-md-4 ms-0 h5 text-white text-center">You're logged in!</div>
          ) 
        }

        {/* Only shows modal if showModal = true and passes function trough props so modal can handle*/}
        {showModal && <LogInModal onClose={closeModal} onLogin={handleUserRol}/>}

        {/* *If there is not a logged in user */}
        {!userRol &&
          <div className="col-12 col-md-4 ms-1">
          <div className="card text-center h-100 cardHover" onClick={openRegister}>
              <div className="card-body">
                <h5 className="card-title card-header">Register</h5>
                <div className="card-text mt-1">
                  <p>Register here!</p>
                  <i className='bi bi-check-square-fill iconSizes'></i>
                </div>
              </div>
            </div>
          </div>
        }

        {opRegModal && <RegisterModal onClose={closeRegister} onLogin={handleUserRol}/>}

        {userRol == 1 &&
          <div className="col-12 col-md-4 ms-1">
            <Link to={"/usersList"} className="card text-center h-100 cardHover routerLinks">
              <div className="card-body">
                <h5 className="card-title card-header">User list</h5>
                <div className="card-text mt-1">
                  <p>Click to see the users list</p>
                  <i className='bi bi-person-circle iconSizes'></i>
                </div>
              </div>
            </Link>
          </div>
        }

        {userRol && 
          <div className="col-12">
            <div className="card text-center cardHover" onClick={logOut}>
              <div className="card-body">
                <h5 className="card-title card-header">Log Out</h5>
                <div className="card-text mt-1">
                  <p>Log out here!</p>
                  <i className='bi bi-arrow-90deg-up iconSizes'></i>
                </div>
              </div>
            </div>
          </div>
        }

    </div>
  );
}

export default App;