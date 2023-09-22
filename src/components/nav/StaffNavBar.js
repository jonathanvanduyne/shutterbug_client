import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkestModeModal } from "./Darkestmode.js"; // Import your DarkestMode component
import { DarkMode } from "./DarkMode.js"; // Import your DarkMode component
import Logo from "./shutterbug.jpeg";
import batmanLogo from "./batman-logo.png";
import "./staffNavBar.css";

export const StaffNavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const navbar = useRef();
    const hamburger = useRef();
    const [isDarkMode, setIsDarkMode] = useState(null);
    const [triggerDarkestMode, setTriggerDarkestMode] = useState(false); // State to control the modal

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle("is-active");
        navbar.current.classList.toggle("is-active");
    };

    const triggerDarkestModeHandler = () => {
        setTriggerDarkestMode(!triggerDarkestMode); // Set triggerDarkestMode to true when the logo is clicked
    };

    return (
        <nav
            className="navbar is-info mb-3"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={Logo} height="3rem" alt="Shutterbug Logo" />{" "}
                    <h1 className="title is-4">ShutterBug</h1>
                </a>

                <div className="dark-mode-container">
                    <p className="dark-mode-toggle">
                        <DarkMode setIsDarkMode={setIsDarkMode} />
                    </p>

                    {isDarkMode && (
                        <img
                            src={batmanLogo}
                            height="3rem"
                            alt="Batman-Logo"
                            className="batman-logo"
                            onClick={triggerDarkestModeHandler}
                        />
                    )}
                </div>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={showMobileNavbar}
                    ref={hamburger}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu is-active" ref={navbar}>
                <div className="navbar-start">
                    {token ? (
                        <>
                            <Link to="/posts" className="navbar-item">
                                Posts
                            </Link>
                            <Link to="/direct_messages" className="navbar-item">
                                Direct Messages
                            </Link>
                            <Link to="/users" className="navbar-item">
                                Shutterbug Admin Manager
                            </Link>
                            <Link to="/profile" className="navbar-item">
                                My Profile
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {token ? (
                                <button
                                    className="button is-outlined custom-red-background"
                                    onClick={() => {
                                        setToken("");
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/register" className="button is-link">
                                        Register
                                    </Link>
                                    <Link to="/login" className="button is-outlined">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Render the DarkestMode modal when triggerDarkestMode is true */}
            {triggerDarkestMode && <DarkestModeModal triggerDarkestMode={triggerDarkestMode} setTriggerDarkestMode={setTriggerDarkestMode}/>}
        </nav>
    );
};
