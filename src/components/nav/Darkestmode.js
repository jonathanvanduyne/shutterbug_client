import React, { useState, useEffect } from "react";
import "./darkestMode.css";
import Joker from "./Joker.png";
import MrFreeze from "./MrFreeze.png";
import Riddler from "./Riddler.png";
import PoisonIvy from "./PoisonIvy.png";
import Penguin from "./Penguin.png";
import HarleyQuinn from "./HarleyQuinn.png";
import Bane from "./Bane.png";

export const DarkestModeModal = ({ triggerDarkestMode, setTriggerDarkestMode }) => {
    const [isFlying, setIsFlying] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerCopy, setTimerCopy] = useState(0); // Used to store the timer value when the timer is paused
    const [showButtons, setShowButtons] = useState(false);
    const [remainingButtons, setRemainingButtons] = useState([
        "joker-button",
        "mr-freeze-button",
        "riddler-button",
        "poison-ivy-button",
        "penguin-button",
        "harley-quinn-button",
        "bane-button",
    ]);

    const body = document.body;

    const flyButton = (buttonId) => {
        if (!isFlying) {
            setIsFlying(true);
        };
    }
        

    const handleButtonClick = (buttonId) => {
        // Remove the clicked button from the remainingButtons array
        setRemainingButtons((prevButtons) => prevButtons.filter((id) => id !== buttonId));

        // Increment the click count
        setClickCount((prevClickCount) => prevClickCount + 1);
    };

    useEffect(() => {
        // Delay the start of the timer and button appearance for 5 seconds
        const delayTimeout = setTimeout(() => {
            setShowButtons(true);
            flyButton("joker-button");
            flyButton("mr-freeze-button");
            flyButton("riddler-button");
            flyButton("poison-ivy-button");
            flyButton("penguin-button");
            flyButton("harley-quinn-button");
            flyButton("bane-button");

            // Start the timer when Darkest Mode is activated
            if (triggerDarkestMode) {
                const interval = setInterval(() => {
                    setTimer((prevTimer) => prevTimer + 1);
                }, 1000); // Update the timer every second

                // Clean up the interval when Darkest Mode is closed or remainingButtons is empty
                return () => {
                    clearInterval(interval);
                };
            }
        }, 7000); // Delay for 5 seconds

        // Clean up the timeout if the component unmounts
        return () => clearTimeout(delayTimeout);
    }, [triggerDarkestMode]); // Include triggerDarkestMode as a dependency

    useEffect(() => {
        // Start flying when the component mounts for all buttons
        remainingButtons.forEach((buttonId) => {
            flyButton(buttonId);
        });
    }, [remainingButtons]);

    useEffect(() => {
        const handleClick = () => {
            // Increment the click count when a click event occurs
            setClickCount((prevClickCount) => prevClickCount + 1);
        };

        // Add a click event listener to the window
        window.addEventListener("click", handleClick);

        // Clean up the event listener when Darkest Mode is closed
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        // Check if all buttons are gone, and if so, show the summary screen for 3 seconds
        if (remainingButtons.length === 0) {
            setTimerCopy(timer);
            setTimeout(() => {
                // Close Darkest Mode after 3 seconds
                setTriggerDarkestMode(false);
            }, 5000);
        }
    }, [remainingButtons, setTriggerDarkestMode]);

    return (
        <div className="darkest-mode-modal-container">
            <h4 className="darkest-mode-modal-title animated fadeInTitle">Darkest Mode</h4>
            <h5 className="darkest-mode-modal-subtitle animated fadeInSubtitle delay-2s">
                The night is darkest just before the dawn. Help save Gotham by catching all the villains!
            </h5>

            {showButtons && (
                <div>
                    <div className="timer">{timer} seconds</div>
                    <div className="click-count">Click Count: {clickCount}</div>

                    {remainingButtons.map((buttonId) => (
                        <button key={buttonId} id={buttonId} onClick={() => handleButtonClick(buttonId)}>
                            {buttonId === "joker-button" && (
                                <img src={Joker} alt="Joker" className={`flying-button ${isFlying ? "flying" : ""}`} />
                            )}
                            {buttonId === "mr-freeze-button" && (
                                <img src={MrFreeze} alt="Mr. Freeze" className={`flying-button2 ${isFlying ? "flying" : ""}`} />
                            )}
                            {buttonId === "riddler-button" && (
                                <img src={Riddler} alt="Riddler" className={`flying-button3 ${isFlying ? "flying" : ""}`} />
                            )}
                            {buttonId === "poison-ivy-button" && (
                                <img src={PoisonIvy} alt="Poison Ivy" className={`flying-button4 ${isFlying ? "flying" : ""}`} />
                            )}
                            {buttonId === "penguin-button" && (
                                <img src={Penguin} alt="Penguin" className={`flying-button5 ${isFlying ? "flying" : ""}`} />
                            )}
                            {buttonId === "harley-quinn-button" && (
                                <img src={HarleyQuinn} alt="Harley Quinn" className={`flying-button6 ${isFlying ? "flying" : ""}`} />
                            )}
                            {buttonId === "bane-button" && (
                                <img src={Bane} alt="Bane" className={`flying-button7 ${isFlying ? "flying" : ""}`} />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {remainingButtons.length === 0 && (
                <div className="summary-screen">
                    <h4 className="summary-screen-title">Congratulations! You saved the city!</h4>
                    <p>Click Count: {clickCount}</p>
                    <p>Time taken: {timerCopy} seconds</p>
                </div>
            )}

            <button className="close-darkest-mode-button" onClick={() => setTriggerDarkestMode(false)}>
                Close Darkest Mode #GiveUp
            </button>
        </div>
    );
}