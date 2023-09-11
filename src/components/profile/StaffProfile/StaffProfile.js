import { useState, useEffect } from "react";
import { getUserById } from "../../../managers/users.js";
import { useParams } from "react-router-dom";

export const StaffProfile = () => {

    const [currentUser, setCurrentUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getUserById(id) 
            .then((response) => {
                setCurrentUser(response);
        });
    }, []);

    return (
        <div>
            <h1>My Profile</h1>
            <p>First Name: {currentUser.first_name}</p>
            <p>Last Name: {currentUser.last_name}</p>
            <p>Email: {currentUser.email}</p>
            <p>Username: {currentUser.username}</p>
            <p>Role: {currentUser.role}</p>


        </div>
    )
}