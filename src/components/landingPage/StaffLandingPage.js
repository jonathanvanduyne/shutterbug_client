import { useEffect, useState } from "react";
import { getCurrentUser } from "../../managers/users.js";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800">
            <div className="max-w-md p-8 bg-white dark:bg-gray-900 shadow-md rounded-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                    Hi {greeting}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                    Where would you like to go?
                </p>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/posts"
                                className="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/direct_messages"
                                className="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Direct Messages
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Shutterbug Admin Manager
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/profile`}
                                className="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button
                    className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 rounded-md focus:outline-none"
                    onClick={() => {
                        setToken("");
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
