import { useState, useEffect } from "react";
import { getCurrentUser, getUserById } from "../../../managers/users.js";
import { useNavigate } from "react-router-dom";
import "./staffProfile.css";

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

    return (
        <div className="profile-container">
            <h1 className="profile-title">My Profile</h1>
            {editProfileButton()}
            <img
                className="profile-image"
                src={currentUser?.profile_image_url}
                alt="Profile Picture"
            />
            <p className="profile-info">First Name: {currentUser?.user?.first_name}</p>
            <p className="profile-info">Last Name: {currentUser?.user?.last_name}</p>
            <p className="profile-info">Email: {currentUser?.user?.email}</p>
            <p className="profile-info">Username: {currentUser?.user?.username}</p>
            <p className="profile-bio">Bio: {currentUser?.bio}</p>
        </div>
    );
};