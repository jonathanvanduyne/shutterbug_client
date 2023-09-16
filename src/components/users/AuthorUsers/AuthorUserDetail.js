import { useEffect, useState } from "react";
import { getUserById } from "../../../managers/users";
import { useNavigate, useParams } from "react-router-dom";
//import { addSubscription, getAllSubscriptions, deleteSubscription } from "../../managers/subscriptions";

export const AuthorUserDetail = ({ token }) => {
    const [user, setUser] = useState()
    //const [subscriptions, setSubscriptions] = useState([])
    //const [alreadySubscribed, setSubscribed] = useState()
    let navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId)
            .then(setUser)
    }, [userId])
    
    

    return (
        <section className="userPage">
            <h1>{user?.full_name}</h1>
            {user?.profile_image_url && (
                <img
                    className="user__profileIMG"
                    src={user.profile_image_url}
                />
            )}
            <div className="user__bio">Bio: {user?.bio}</div>
            <div className="user_email">Email: {user?.user?.email}</div>
            <div className="user__create_date">Rare User since: {user?.created_on}</div>
            <div className="user__profile_type">
                Profile Type: {user?.user?.is_staff ? "Staff" : "Author"}
            </div>
        </section>
    );
};