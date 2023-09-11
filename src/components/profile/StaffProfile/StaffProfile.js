import { useState, useEffect } from "react";
import { getCurrentUser, getUserById } from "../../../managers/users.js";
import { useNavigate } from "react-router-dom";

export const StaffProfile = () => {

    const [currentUserArray, setCurrentUserArray] = useState({});
    const currentUser = currentUserArray[0];
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                setCurrentUserArray(response);
            });
    }, []);

    const editProfileButton = () => {
        return <>
            <button
                onClick={() => {
                    navigate(`/profile/editForm`);
                }}
            >
                Edit
            </button>
        </>
    };

    return <>
        <div>
            <h1>My Profile</h1>
            {editProfileButton()}
            <img src={currentUser?.profile_image_url} alt="profile picture"></img>
            <p>First Name: {currentUser?.user?.first_name}</p>
            <p>Last Name: {currentUser?.user?.last_name}</p>
            <p>Email: {currentUser?.user?.email}</p>
            <p>Username: {currentUser?.user?.username}</p>
            <p>Bio: {currentUser?.bio}</p>
        </div>
    </>
}