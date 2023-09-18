import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./darkMode.css";

export const DarkMode = ({setIsDarkMode}) => {
    
    const setDarkMode = () => {
        document.body.setAttribute("data-theme", "dark");
    }

    const setLightMode = () => {
        document.body.setAttribute("data-theme", "light");
    }

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
            setIsDarkMode(true);
        } else {
            setLightMode();
            setIsDarkMode(false);
        }
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

