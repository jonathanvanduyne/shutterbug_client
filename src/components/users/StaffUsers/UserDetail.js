import { useEffect, useState } from "react";
import { getUserById } from "../../../managers/users";
import { useNavigate, useParams } from "react-router-dom";
import { UserDetailPosts } from "./UserPostDetail.js";


export const UserDetail = () => {
    const [user, setUser] = useState({});
    const { Id } = useParams();
    const navigate = useNavigate();

    const getData = async () => {
            const user = await getUserById(Id);
            setUser(user);
    }
    
    useEffect(() => {
        getData();
    }
    , []);

    return (
        <>
        <div className="user-detail-container">
            <h2 className="user-detail-title">User Detail</h2>
            <div className="user-detail">
                <div className="user-detail-info">
                    <p className="user-detail-info-item">
                        <span className="user-detail-info-item-label">Username:</span>
                        <span className="user-detail-info-item-value">{user?.user?.username}</span>
                    </p>
                    <p className="user-detail-info-item">
                        <span className="user-detail-info-item-label">First Name:</span>
                        <span className="user-detail-info-item-value">{user?.user?.first_name}</span>
                    </p>
                    <p className="user-detail-info-item">
                        <span className="user-detail-info-item-label">Last Name:</span>
                        <span className="user-detail-info-item-value">{user?.user?.last_name}</span>
                    </p>
                    <p className="user-detail-info-item">
                        <span className="user-detail-info-item-label">Email:</span>
                        <span className="user-detail-info-item-value">{user?.user?.email}</span>
                    </p>
                    <p className="user-detail-info-item">
                        <span className="user-detail-info-item-label">Is Staff:</span>
                        <span className="user-detail-info-item-value">{user?.user?.is_staff ? "Yes" : "No"}</span>
                    </p>
                </div>
                <div className="user-detail-buttons">
                    <button className="user-detail-button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>

        <div className="user-posts-container">
            <UserDetailPosts />


        </div>
        </>
    );
};
