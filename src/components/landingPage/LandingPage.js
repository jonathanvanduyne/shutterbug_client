import { useEffect, useState } from "react";
import { getCurrentUser } from "../../managers/users.js";
import { Link } from "react-router-dom";

export const LandingPageGreeting = () => {
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

    return <> <span className="landing-page-greeting">Hi {greeting}!</span>
    
    <p>Where would you like to go?</p>
    <p><Link to="/posts">Posts</Link></p>
    <p><Link to="/users">Shutterbug Admin Manager</Link></p>
    </>
};
