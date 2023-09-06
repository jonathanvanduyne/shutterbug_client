import { getAllReactions } from "../../managers/reactions.js";
import { useEffect, useState } from "react";
import "./reactions.css";

export const ReactionList = () => {
    const [reactions, setReactions] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newReaction, setNewReaction] = useState({
        label: "",
        image_url: ""
    });

    const getData = () => {
        getAllReactions()
            .then(res => {
                setReactions(res);
            });
    };

    const createReaction = (newReaction) => {
        return fetch("http://localhost:8000/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(newReaction)
        })
        .then(() => {
            getData(); 
            setNewReaction({
                label: "",
                image_url: ""
            });
            setShowCreateForm(false);
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewReaction(prevReaction => ({
            ...prevReaction,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createReaction(newReaction);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1 className="title">Reactions</h1>
            <div className="create-reaction-form">
                <button onClick={() => setShowCreateForm(true)}>Create New Reaction</button>
                {showCreateForm && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Label:
                            <input
                                type="text"
                                name="label"
                                value={newReaction.label}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Image URL:
                            <input
                                type="url"
                                name="image_url"
                                value={newReaction.image_url}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>
            <div className="columns is-multiline">
                {reactions.map(reaction => (
                    <div className="reactions" key={`reaction--${reaction.id}`}>
                        <div className="card">
                            <div className="card-content">
                                <h2 className="title">{reaction.label}</h2>
                                <img
                                    src={reaction.image_url}
                                    alt={`${reaction.label} Image`}
                                    className="reaction-image"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
