import { Navigate } from "react-router-dom";

function UsersList({verify}){
    if(!verify()){
        return <Navigate to="/"/>
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 bg-warning">Testing Users List route</div>
            </div>
        </div>
    );
}

export default UsersList;