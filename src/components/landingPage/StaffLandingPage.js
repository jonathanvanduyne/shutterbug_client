import { useEffect, useState } from "react";
import { getCurrentUser } from "../../managers/users.js";
import { Link, useNavigate } from "react-router-dom";
import "./staffLandingPage.css";

export const StaffLandingPageGreeting = ({ token, setToken }) => {
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const greeting = currentUser[0]?.user?.first_name;

    return (
        <div className={`landing-page ${token ? "authenticated" : ""}`}>
            <div className="landing-page-greeting">
                <h1>Hi {greeting}!</h1>
                <p>Where would you like to go?</p>
                <ul className="nav-links">
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link to="/direct_messages">Direct Messages</Link>
                    </li>
                    <li>
                        <Link to="/users">Shutterbug Admin Manager</Link>
                    </li>
                    <li>
                        <Link to={`/profile`}>My Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
