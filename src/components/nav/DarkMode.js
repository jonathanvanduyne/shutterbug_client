import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./darkMode.css";

export const DarkMode = ({ setIsDarkMode }) => {
    const setDarkMode = () => {
        document.body.setAttribute("data-theme", "dark");
        if (document.querySelector(".post-list-container") !== null)
        document.querySelector(".post-list-container").classList.add("dark"); // Add the 'dark' class to the container
        if (document.querySelector(".direct-messages-container") !== null)
        document.querySelector(".direct-messages-container").classList.add("dark"); // Add the 'dark' class to the container
    };

    const setLightMode = () => {
        document.body.setAttribute("data-theme", "light");
        if (document.querySelector(".post-list-container") !== null)
        document.querySelector(".post-list-container").classList.remove("dark"); // Remove the 'dark' class from the container
        if (document.querySelector(".direct-messages-container") !== null)
        document.querySelector(".direct-messages-container").classList.remove("dark"); // Remove the 'dark' class from the container
    };

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
            setIsDarkMode(true);
        } else {
            setLightMode();
            setIsDarkMode(false);
        }
    };

    return (
        <div className="dark_mode">
            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={toggleTheme}
            />
            <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <Sun />
                <Moon />
            </label>
        </div>
    );
};
