import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import LogInModal from './components/loginModal';
import RegisterModal from './components/registerModal';

function App() {
  
  const [showModal, setShowModal] = useState(false);
  const [opRegModal, setOpRegModal] = useState(false);

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

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
        
        <div className="col-12 col-md-4 ms-1">
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

        {/* Only shows modal if showModal = true and passes function trough props so modal can handle*/}
        {showModal && <LogInModal onClose={closeModal}/>}

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

        {opRegModal && <RegisterModal onClose={closeRegister}/>}

        <div className="col-12 col-md-4 ms-1">
        <div className="card text-center h-100 cardHover">
            <div className="card-body">
              <h5 className="card-title card-header">User list</h5>
              <div className="card-text mt-1">
                <p>Click to see the users list</p>
                <i className='bi bi-person-circle iconSizes'></i>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;