import React, { useState, useEffect } from "react";
import "./darkestMode.css";

export const DarkestModeModal = ({ triggerDarkestMode, setTriggerDarkestMode }) => {
    const [isFlying, setIsFlying] = useState(true);

    const body = document.body;

    const toggleDarkMode = () => {
        setTriggerDarkestMode(!triggerDarkestMode);
        if (!triggerDarkestMode) {
            body.classList.add("darkest-mode");
        } else {
            body.classList.remove("darkest-mode");
        }
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

                const flyingButton = document.getElementById("flying-button");
                if (flyingButton) {
                    flyingButton.style.left = posX + "px";
                    flyingButton.style.top = posY + "px";
                }
            }, 10);

            const flyingButton = document.getElementById("flying-button");
            if (flyingButton) {
                flyingButton.addEventListener("click", () => {
                    clearInterval(flyInterval);
                    setIsFlying(false);
                });
            }
        }
    };

    const flyingButtonClassName = `flying-button ${isFlying ? "flying" : ""}`;

    return (
        <div className="darkest-mode-modal-container">
            <div className="darkest-mode-modal-content">
                <div className="darkest-mode-modal-buttons">
                    <button className={flyingButtonClassName} id="flying-button" onClick={() => setTriggerDarkestMode(false)}>
                        Catch Me!
                    </button>
                    <button className="close-darkest-mode-button" onClick={() => setTriggerDarkestMode(false)}>
                        Close #GiveUp
                    </button>
                </div>
            </div>
        </div>
    );
    }