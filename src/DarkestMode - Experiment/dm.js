const darkModeToggle = document.getElementById("toggle-button");
const body = document.body;

let isDarkMode = false;
let isFlying = false;

darkModeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
});

// Flying button logic
const flyingButton = document.createElement("button");
flyingButton.innerHTML = "Fly!";
flyingButton.classList.add("flying-button");
document.body.appendChild(flyingButton);

flyingButton.addEventListener("click", () => {
    if (!isFlying) {
        isFlying = true;
        flyButton();
    }
});

function flyButton() {
    let posX = 0;
    let posY = 0;
    let speedX = 5;
    let speedY = 5;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const flyInterval = setInterval(() => {
        if (posX >= screenWidth - flyingButton.clientWidth || posX <= 0) {
            speedX = -speedX;
        }

        if (posY >= screenHeight - flyingButton.clientHeight || posY <= 0) {
            speedY = -speedY;
        }

        posX += speedX;
        posY += speedY;

        flyingButton.style.left = posX + "px";
        flyingButton.style.top = posY + "px";
    }, 10);

    flyingButton.addEventListener("click", () => {
        clearInterval(flyInterval);
        isFlying = false;
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DarkModeButton.js
import React, { useState } from 'react';
import './DarkModeButton.css';

const DarkModeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFlying, setIsFlying] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const flyButton = () => {
        if (!isFlying) {
            setIsFlying(true);
            let posX = 0;
            let posY = 0;
            let speedX = 5;
            let speedY = 5;

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const flyInterval = setInterval(() => {
                if (posX >= screenWidth - 100 || posX <= 0) {
                    speedX = -speedX;
                }

                if (posY >= screenHeight - 50 || posY <= 0) {
                    speedY = -speedY;
                }

                posX += speedX;
                posY += speedY;

                document.getElementById('flying-button').style.left = posX + 'px';
                document.getElementById('flying-button').style.top = posY + 'px';
            }, 10);

            document.getElementById('flying-button').addEventListener('click', () => {
                clearInterval(flyInterval);
                setIsFlying(false);
            });
        }
    };

    return (
        <div className={`dark-mode-button ${isDarkMode ? 'dark-mode' : ''}`}>
            <button id="toggle-button" onClick={toggleDarkMode}>
                Toggle Dark Mode
            </button>
            <button id="flying-button" onClick={flyButton}>
                Fly!
            </button>
        </div>
    );
};

export default DarkModeButton;
