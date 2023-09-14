import { useEffect, useState } from "react";
import { getCurrentUser } from "../../managers/users.js";
import { Link } from "react-router-dom";
import "./staffLandingPage.css";

export const StaffLandingPageGreeting = () => {
    const [currentUser, setCurrentUser] = useState([]);
    
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
        <div className="landing-page">
            <div className="landing-page-greeting">
                <h1>Hi {greeting}!</h1>
                <p>Where would you like to go?</p>
                <p>
                    <Link to="/posts">Posts</Link>
                </p>
                <p>
                    <Link to="/users">Shutterbug Admin Manager</Link>
                </p>
                <p>
                    <Link to={`/profile`}>My Profile</Link>
                </p>
            </div>
        </div>
    );
};
