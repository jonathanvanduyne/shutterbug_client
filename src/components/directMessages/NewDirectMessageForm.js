import { useEffect, useState } from "react";
import { getCurrentUser, getUsers } from "../../managers/users.js";
import { createDirectMessage } from "../../managers/directMessages.js";
import { useNavigate } from "react-router-dom";
import "./newDM.css";

export const NewDMForm = () => {
    const [directMessageForm, setDirectMessageForm] = useState({
        recipient_id: "",
        content: ""
    });

    const [users, setUsers] = useState([]);
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];
    const navigate = useNavigate();

    const getData = async () => {
        const currentUser = await getCurrentUser();
        setCurrentUserArray(currentUser);

        const allUsers = await getUsers();
        setUsers(allUsers);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleControlledInputChange = (event) => {
        const newDirectMessageForm = { ...directMessageForm };
        newDirectMessageForm[event.target.id] = event.target.value;
        setDirectMessageForm(newDirectMessageForm);
    };

    const handleSaveDirectMessage = (event) => {
        event.preventDefault();
        const newDirectMessage = {
            sender_id: parseInt(currentUser.id),
            recipient_id: parseInt(directMessageForm.recipient_id),
            content: directMessageForm.content
        };

        createDirectMessage(newDirectMessage).then(() => {
            navigate("/direct_messages");
        });
    };

    return (
        <div className="dm-form-container">
            <form className="dm-form" onSubmit={handleSaveDirectMessage}>
                <h1 className="dm-form-title">Send a Direct Message</h1>
                <div className="dm-form-field">
                    <label htmlFor="recipient" className="dm-form-label">
                        Recipient:
                    </label>
                    <select
                        id="recipient_id"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="dm-form-select"
                        value={directMessageForm.recipient_id}
                    >
                        <option value="0">Select a recipient</option>
                        {users
                            .filter((user) => user.id !== currentUser.id)
                            .map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.full_name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="dm-form-field">
                    <label htmlFor="content" className="dm-form-label">
                        Message:
                    </label>
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="dm-form-textarea"
                        value={directMessageForm.content}
                    />
                </div>
                <div className="dm-form-field">
                    <button className="dm-form-button" type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};
