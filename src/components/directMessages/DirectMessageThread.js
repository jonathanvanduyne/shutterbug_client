import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDirectMessages } from "../../managers/directMessages.js";
import { getCurrentUser, getUsers } from "../../managers/users.js";
import { ReplyToDirectMessageForm } from "./ReplyToDirectMessageForm.js";
import "./thread.css"; // Import your CSS file

export const DirectMessageThread = () => {
    const [users, setUsers] = useState([]);
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];

    const [directMessagesList, setDirectMessagesList] = useState([]);
    const [threadMessages, setThreadMessages] = useState([]);

    const { userId } = useParams();
    const sender = users.find((user) => user.id === parseInt(userId));

    const getData = async () => {
        const messages = await getDirectMessages();
        setDirectMessagesList(messages);

        const user = await getCurrentUser();
        setCurrentUserArray(user);

        const allusers = await getUsers();
        setUsers(allusers);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // Filter directMessages to include only messages between the current user and the user in the URL
        const filteredMessages = directMessagesList.filter((message) => {
            if (
                (message.recipient?.user?.id === currentUser?.id &&
                    message.sender?.user?.id === parseInt(userId)) ||
                (message.recipient?.user?.id === parseInt(userId) &&
                    message.sender?.user?.id === currentUser?.id)
            ) {
                return true;
            }
            return false;
        });

        setThreadMessages(filteredMessages);
    }, [directMessagesList, currentUser, userId, users]);

    return (
        <div className="direct-message-thread-container">
            <div className="title-block">
                <h4 className="thread-title">Your Thread with {sender?.user?.first_name} {sender?.user?.last_name}</h4>
            </div>
            <div className="direct-message-list">
                {threadMessages.map((message, index) => (
                    <div className="direct-message-card" key={message.id}>
                            {index === 0 && ( // Render the form only for the first message
                                <div className="direct-message-reply-function">
                                    <ReplyToDirectMessageForm currentUser={currentUser} sender={sender} threadMessages={threadMessages} message={message} getData={getData} />
                                </div>
                            )}
                        <div className="profile-picture">
                            <img src={message.sender.profile_image_url} alt="Profile" />
                        </div>
                        <div className="message-details">
                            <div className="direct-message-sender">
                                {message.sender.user.first_name} {message.sender.user.last_name}
                            </div>
                            <div className="direct-message-content">
                                {message.content}
                            </div>
                            <div className="direct-message-created-on">
                                {message.created_on}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
