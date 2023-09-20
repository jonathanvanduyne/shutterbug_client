import React from "react";
import "./darkMode.css";

export const DarkMode = ({ setIsDarkMode }) => {
    
    const setDarkMode = () => {
        document.body.classList.add("dark");
        setIsDarkMode(true);
    };

    const setLightMode = () => {
        document.body.classList.remove("dark");
        setIsDarkMode(false);
    };

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    return (
        <div className="group dark_mode">
            <input
                className="dark_mode_input hidden"
                type="checkbox"
                id="darkmode-toggle"
                onChange={toggleTheme}
            />
            <label
                className="dark_mode_label cursor-pointer select-none"
                htmlFor="darkmode-toggle"
            >
            </label>
        </div>
    );
};
