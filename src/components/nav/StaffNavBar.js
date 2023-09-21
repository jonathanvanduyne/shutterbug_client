import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkestModeModal } from "./DarkestMode.js";
import { DarkMode } from "./DarkMode.js";
import Logo from "./shutterbug.jpeg";
import batmanLogo from "./batman-logo.png";
import "./staffNavBar.css";

export const StaffNavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const navbarRef = useRef();
    const hamburgerRef = useRef();
    const [isDarkMode, setIsDarkMode] = useState(null);
    const [triggerDarkestMode, setTriggerDarkestMode] = useState(false);

    const toggleMobileNavbar = () => {
        hamburgerRef.current.classList.toggle("is-active");
        navbarRef.current.classList.toggle("is-active");
    };

    const triggerDarkestModeHandler = () => {
        setTriggerDarkestMode(!triggerDarkestMode);
    };

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item logo">
                    <img src={Logo} height="3rem" alt="Shutterbug Logo" />
                    <h1 className="title">ShutterBug</h1>
                </Link>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={toggleMobileNavbar}
                    ref={hamburgerRef}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu" ref={navbarRef}>
                <div className="navbar-start">
                    {token && (
                        <>
                            <Link to="/posts" className="navbar-links">
                                Posts
                            </Link>
                            <Link to="/direct_messages" className="navbar-links">
                                Messages
                            </Link>
                            <Link to="/users" className="navbar-links">
                                Admin
                            </Link>
                            <Link to="/profile" className="navbar-links">
                                Profile
                            </Link>
                        </>
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {token && (
                                <div className="dark-mode-container">
                                    <DarkMode setIsDarkMode={setIsDarkMode} />
                                </div>
                            )}
                            {isDarkMode && (
                                <div className="dark-mode-toggle-container">
                                    <span className="darkest-mode-text" onClick={triggerDarkestModeHandler}>Dare to trigger Darkest Mode?</span>
                                    <img
                                        src={batmanLogo}
                                        className="batman-logo"
                                        alt="Batman-Logo"
                                        onClick={triggerDarkestModeHandler}
                                    />
                                </div>
                            )}
                            {token && (
                                <button
                                    className="logout-button"
                                    onClick={() => {
                                        setToken("");
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {triggerDarkestMode && <DarkestModeModal triggerDarkestMode={triggerDarkestMode} setTriggerDarkestMode={setTriggerDarkestMode} />}
        </nav>
    );
};
