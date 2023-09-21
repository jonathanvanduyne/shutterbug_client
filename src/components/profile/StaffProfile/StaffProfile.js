import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../../managers/users.js";
import { useNavigate } from "react-router-dom";
import "./staffProfile.css";

export const StaffProfile = () => {
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser().then((response) => {
            setCurrentUserArray(response);
        });
    }, []);

    const editProfileButton = () => {
        return (
            <button
                className="edit-profile-button"
                onClick={() => {
                    navigate(`/profile/editForm`);
                }}
            >
                Edit
            </button>
        );
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
            <p className="profile-info">
                <span className="profile-info-label">First Name:</span>{" "}
                {currentUser?.user?.first_name}
            </p>
            <p className="profile-info">
                <span className="profile-info-label">Last Name:</span>{" "}
                {currentUser?.user?.last_name}
            </p>
            <p className="profile-info">
                <span className="profile-info-label">Email:</span>{" "}
                {currentUser?.user?.email}
            </p>
            <p className="profile-info">
                <span className="profile-info-label">Username:</span>{" "}
                {currentUser?.user?.username}
            </p>
            <p className="profile-bio">
                <span className="profile-info-label">Bio:</span> {currentUser?.bio}
            </p>
        </div>
    );
};
