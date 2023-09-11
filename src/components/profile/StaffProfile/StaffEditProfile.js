import { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "../../../managers/users.js";
import { useNavigate } from "react-router-dom";

export const StaffEditProfile = () => {
    const [currentUserArray, setCurrentUserArray] = useState({});
    const currentUser = currentUserArray[0];
    const navigate = useNavigate();

    // State for form fields for the User model
    const [userFormData, setUserFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
    });

    // State for form fields for the ShutterbugUser model
    const [shutterbugUserFormData, setShutterbugUserFormData] = useState({
        bio: "",
        profile_image_url: "",
    });

    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                setCurrentUserArray(response);
                // Populate the form fields with current user data
                setUserFormData({
                    first_name: response[0]?.user?.first_name || "",
                    last_name: response[0]?.user?.last_name || "",
                    username: response[0]?.user?.username || "",
                    email: response[0]?.user?.email || "",
                });
                setShutterbugUserFormData({
                    bio: response[0]?.bio || "",
                    profile_image_url: response[0]?.profile_image_url || "",
                });
            });
    }, []);

    // Handle form field changes for User model
    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Handle form field changes for ShutterbugUser model
    const handleShutterbugUserInputChange = (event) => {
        const { name, value } = event.target;
        setShutterbugUserFormData({ ...shutterbugUserFormData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Make a PUT request to update the user data for the User model
        updateUser(currentUser.id, userFormData)
            .then(() => {
                // Make another PUT request to update the data for the ShutterbugUser model
                updateUser(currentUser.id, shutterbugUserFormData, 'shutterbugUser')
                    .then(() => {
                        navigate("/profile"); // Redirect to the desired page
                    })
                    .catch((error) => {
                        console.error("Error updating ShutterbugUser:", error);
                        // Handle error here
                    });
            })
            .catch((error) => {
                console.error("Error updating User:", error);
                // Handle error here
            });
    };

    return (
        <div>
            <h1>Edit My Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={userFormData.first_name}
                        onChange={handleUserInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={userFormData.last_name}
                        onChange={handleUserInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userFormData.username}
                        onChange={handleUserInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userFormData.email}
                        onChange={handleUserInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={shutterbugUserFormData.bio}
                        onChange={handleShutterbugUserInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="profile_image_url">Profile Image URL:</label>
                    <input
                        type="text"
                        id="profile_image_url"
                        name="profile_image_url"
                        value={shutterbugUserFormData.profile_image_url}
                        onChange={handleShutterbugUserInputChange}
                    />
                </div>
                <div>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};
