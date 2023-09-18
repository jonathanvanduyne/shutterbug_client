import { useEffect, useState } from "react";
import { getCurrentUser, getUsers } from "../../managers/users.js";
import { createDirectMessage } from "../../managers/directMessages.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const NewDMForm = () => {
    const [directMessageForm, setDirectMessageForm] = useState({
        recipient_id: "",
        content: ""
    });

    const [users, setUsers] = useState([]);
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];
    const navigate = useNavigate(); // Initialize navigate

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

        // Perform the createDirectMessage action and then navigate
        createDirectMessage(newDirectMessage).then(() => {
            navigate("/direct_messages"); // Use navigate to change the route
        });
    };

    return (
        <>
            <form className="form--login" onSubmit={handleSaveDirectMessage}>
                <h1 className="h3 mb-3 font-weight-normal">Send a Direct Message</h1>
                <fieldset>
                    <label htmlFor="recipient">Recipient: </label>
                    <select
                        id="recipient_id"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
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
                </fieldset>
                <fieldset>
                    <label htmlFor="content">Message: </label>
                    <textarea
                        type="text"
                        id="content"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        value={directMessageForm.content}
                    />
                </fieldset>
                <fieldset>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">
                        Send
                    </button>
                </fieldset>
            </form>
        </>
    );
};
