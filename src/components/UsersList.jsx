import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

function UsersList({verify}){
    if(!verify()){
        return <Navigate to="/"/>
    }

    // *In case the user has access to the route, renders the users list
    const [users, setUsers] = useState([]);

    //*When the component is mounted
    useEffect(()=>{
      const getUsers = async ()=>{
        try{  
          const res = await axios.get('http://localhost:5000/api/users/',{
              headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
            });
          //*We set the users
          setUsers(res.data);
        }catch(e){
            console.log("Error loading users, UsersList.jsx: ", e);
        }
      }
      getUsers();
    },[]);    

    return(
        <div className="container">
            <div className="row">
              <div className="h5 col-12 d-flex justify-content-center mt-5 text-white">Users</div>
              <hr />
              <div className="col-12 d-flex flex-wrap justify-content-center">
                {/* *Loop through the users list */}
                { users.map((user)=>(
                  <div key={user.id} className="card col-12 col-md-4 text-center mb-1 ms-1">
                    <div className="card-body">
                      <h5 className="card-header mb-3">{user.username}</h5>
                      <div className="card-subtitle">{user.name} {user.lastName}</div>
                      <div className="card-text">Age: {user.age}</div>
                    </div>
                  </div>
                )) }

              </div>
            </div>
        </div>
    );
}

export default UsersList;