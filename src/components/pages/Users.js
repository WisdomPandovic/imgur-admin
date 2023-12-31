import AsideBar from "../pages/AsideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function formatDate(timestamp) {
    if (!timestamp) {
        return 'Never';
    }

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year}  ${hours}:${minutes}`;
}

function Users(){

    const [AdminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);

  

    useEffect(() => {
        fetch("http://localhost:3007/users")
        .then((resp) => resp.json())
        .then((data) => {
            setAdminUsers(data);
            setLoading(false)
        });

        
    },[]);

      const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3007/user/" + _id); 
          setAdminUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
          toast.success("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user");
        }
        console.log(_id)
      };
      
    const setData = (data) => {
        console.log(data)
      
    }

    return (
        <div>
            <AsideBar />
            <div className="admin-users">Users</div>
            <div className="users-list">
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th >#</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Last Logged In</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AdminUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td >{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{formatDate(user.lastLogin)}</td>
                                    <td className="flexv">
                                        <div className="tag-edit">

                                           <Link to={`/updateUsers/${user._id}`}>
                                                <button onClick={() => setData()}>Edit</button>
                                           </Link>
                                        </div>
                                        <button onClick={() => onDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}

export default Users;