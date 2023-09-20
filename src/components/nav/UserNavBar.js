import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkestModeModal } from "./DarkestMode.js";
import { DarkMode } from "./DarkMode.js";
import Logo from "./shutterbug.jpeg";
import batmanLogo from "./batman-logo.png";

export const UserNavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const navbar = useRef();
    const hamburger = useRef();
    const [isDarkMode, setIsDarkMode] = useState(null);
    const [triggerDarkestMode, setTriggerDarkestMode] = useState(false);

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle("is-active");
        navbar.current.classList.toggle("is-active");
    };

    const triggerDarkestModeHandler = () => {
        setTriggerDarkestMode(!triggerDarkestMode);
    };

    return (
        <nav className="bg-blue-500 p-4 dark:bg-gray-800 dark:text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a className="flex items-center space-x-2" href="/">
                        <img src={Logo} alt="Shutterbug Logo" className="w-16 h-12" />
                        <h1 className="text-2xl">ShutterBug</h1>
                    </a>
                </div>

                <div className="hidden lg:flex items-center space-x-4 flex-grow">
                    {token ? (
                        <>
                            <div className="text-center flex-grow space-x-4"> {/* Center-align and add spacing */}
                                <Link to="/posts" className="text-white hover:text-black-500">
                                    Posts
                                </Link>
                                <Link to="/direct_messages" className="text-white hover:text-black-500">
                                    Direct Messages
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {token ? (
                        <>
                            <Link to="/profile" className="text-white hover:text-black-500">
                                My Profile
                            </Link>
                            <div className="dark-mode-container flex items-center space-x-4">
                                <DarkMode setIsDarkMode={setIsDarkMode} />
                                {isDarkMode && (
                                    <div className="flex items-center space-x-2">
                                        <p className="text-yellow-500 text-sm hover:text-black-500">Initiate Darkest Mode?</p>
                                        <img
                                            src={batmanLogo}
                                            alt="Batman Logo"
                                            className="w-16 h-10 cursor-pointer transform hover:scale-105 transition-transform glow-yellow"
                                            onClick={triggerDarkestModeHandler}
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                className="text-white hover:text-black-500"
                                onClick={() => {
                                    setToken("");
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="text-white hover:text-black-500">
                                Register
                            </Link>
                            <Link to="/login" className="text-white hover:text-black-500">
                                Login
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="lg:hidden block navbar-burger text-white hover:text-black-500 focus:outline-none"
                    onClick={showMobileNavbar}
                    ref={hamburger}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>

            {triggerDarkestMode && (
                <DarkestModeModal
                    triggerDarkestMode={triggerDarkestMode}
                    setTriggerDarkestMode={setTriggerDarkestMode}
                />
            )}
        </nav>
    );
};
