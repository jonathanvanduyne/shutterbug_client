import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../managers/users.js";
import { StaffProfile } from "./StaffProfile.js";
import { MyPosts } from "./MyPost.js";

export const UserProfileWithPosts = () => {
    const [currentUserArray, setCurrentUserArray] = useState({});
    const currentUser = currentUserArray[0];

    useEffect(() => {
        getCurrentUser().then((response) => {
            setCurrentUserArray(response);
        });
    }, []);

    return (
        <>
            <div className="profile-section">
                <StaffProfile currentUser={currentUser} />
            </div>
            <div className="post-list-section">
                <MyPosts currentUser={currentUser} />
            </div>
        </>
    );
};