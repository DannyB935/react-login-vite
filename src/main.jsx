import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UsersList from './components/UsersList.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

//*Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

//*Custom styles imports
import './assets/styles.css';

//*Method to verify token
const verifySession = ()=>{
  const token = sessionStorage.getItem('token');
  //*In case the token exists
  if(token){
    const decoded = jwtDecode(token);

    const currentDate = Math.floor(Date.now() / 1000);
    //*If token is no longer valid, it'll return false
    if(decoded.exp < currentDate){
      sessionStorage.clear();
      return false;
    }
    return true
  }
  return false;
}

//*Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/usersList",
    element: <UsersList verify={verifySession}/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
