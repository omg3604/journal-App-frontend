import React from "react";
import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const host = "http://localhost:8080/user";

    // const username = localStorage.getItem('userName');
    // const password = localStorage.getItem('password');
    
    const [userLoad , setuserLoad] = useState(false);

    

    // Get user details
    // const getUserDetails = async (token) => {
    //     //console.log("the token is", token);
    //     setuserLoad(true);
    //     const response = await fetch(`${host}/api/auth/getuser`, {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": token
    //         }
    //     });
    //     //console.log(response);
    //     const json = await response.json();
    //     // console.log("getting user details");
    //     //console.log(json);
    //     setDetails({
    //         _id : json._id,
    //         name : json.name,
    //         email : json.email,
    //         date : json.date
    //     })
    //     setuserLoad(false);
    //     //console.log(details);
    // }

    // // Edit User Details
    // const editUser = async (id , name , email) =>{
    //     // API Call
    //     setuserLoad(true);
    //     const response = await fetch(`${host}/api/auth/editUser/${id}`, {
    //         method: "PUT", // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token'),
    //         },
    //         body: JSON.stringify({name , email}), // body data type must match "Content-Type" header
    //     });
    //     const json = await response.json();
    //     setDetails({id:details.id , name:name , email:email , date:details.date});
    //     getUserDetails(localStorage.getItem('token'));
    //     setuserLoad(false);
    // }

    // Delete User Account
    const deleteUser = async() => {
        setuserLoad(true);
        const response = await fetch(`${host}/delete-user` , {
            method: "DELETE",
            headers: {
                'Authorization': `Basic ${btoa(`${localStorage.getItem('userName')}:${localStorage.getItem('password')}`)}`,
                "Content-Type": "application/json",

            }
        });
        // const json = await response.json();
        console.log("User deleted successfully!");
        setuserLoad(false);
    }

    return (
        <UserContext.Provider value={{deleteUser , userLoad , setuserLoad }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;