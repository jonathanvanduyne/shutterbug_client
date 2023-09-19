import React, { useState, useEffect } from "react";
import "./darkestMode.css";
import Joker from "./Joker.png";
import MrFreeze from "./MrFreeze.png";

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

    const flyButton = (buttonId) => {
        if (!isFlying) {
            setIsFlying(true);
            const button = document.getElementById(buttonId);
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Create an array of random positions within the screen boundaries
            const positions = [];
            for (let i = 0; i < 100; i++) {
                const posX = Math.random() * screenWidth;
                const posY = Math.random() * screenHeight;
                positions.push({ posX, posY });
            }

            let currentPositionIndex = 0;

            const flyInterval = setInterval(() => {
                // Get the next random position from the array
                const { posX, posY } = positions[currentPositionIndex];

                // Create keyframes for random movement
                const keyframes = [
                    { transform: `translate(${button.style.left || "0"}, ${button.style.top || "0"})` },
                    { transform: `translate(${posX}px, ${posY}px)` },
                ];

                // Define animation options
                const options = {
                    duration: 1000, // 1 second
                    easing: "ease-in-out",
                    iterations: 1,
                };

                // Apply the animation
                button.animate(keyframes, options);

                // Update button position
                button.style.left = `${posX}px`;
                button.style.top = `${posY}px`;

                // Move to the next position in the array (loop back to the beginning if needed)
                currentPositionIndex = (currentPositionIndex + 1) % positions.length;
            }, 100000); // Change the interval to control the speed of movement
        }
    };

    useEffect(() => {
        // Start flying when the component mounts for both buttons
        flyButton("joker-button");
        flyButton("mr-freeze-button");
    }, []);

    return (
        <div className="darkest-mode-modal-container">
            <h4 className="darkest-mode-modal-title animated fadeInTitle">Darkest Mode</h4>
            <h5 className="darkest-mode-modal-subtitle animated fadeInSubtitle delay-2s">
                The Night is darkest just before the dawn. Help save the city by catching a villain
            </h5>

            <button
                className={`flying-button ${isFlying ? "flying" : ""}`}
                id="joker-button"
                onClick={() => setTriggerDarkestMode()}
            >
                <img src={Joker} alt="Joker" />
            </button>

            <button
                className={`flying-button2 ${isFlying ? "flying" : ""}`}
                id="mr-freeze-button"
                onClick={() => setTriggerDarkestMode()}
            >
                <img src={MrFreeze} alt="Mr. Freeze" />
            </button>

            <button className="close-darkest-mode-button" onClick={() => setTriggerDarkestMode()}>
                Close Darkest Mode #GiveUp
            </button>
        </div>
    );
};
