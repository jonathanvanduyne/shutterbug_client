import React, { useState, useEffect } from "react";
import { getDirectMessages } from "../../managers/directMessages.js";
import { getCurrentUser } from "../../managers/users.js";
import { Link } from "react-router-dom";

export const DirectMessagesList = () => {
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];
    const [directMessagesList, setDirectMessagesList] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);

    const getData = async () => {
        const messages = await getDirectMessages();
        setDirectMessagesList(messages);

        const user = await getCurrentUser();
        setCurrentUserArray(user);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // Create a set to store unique sender user IDs
        const uniqueSenderUserIds = new Set();

        // Filter directMessages to include only the first message for each unique sender user
        // and messages sent to the current user
        const filteredMessages = directMessagesList.filter((message) => {
            if (!uniqueSenderUserIds.has(message?.sender?.user?.id) && 
                message.recipient?.user?.id === currentUser?.id) {
                // If the sender user ID is not in the set and it's sent to the current user, add it and return true
                uniqueSenderUserIds.add(message?.sender?.user?.id);
                return true;
            }
            return false;
        });

        setFilteredMessages(filteredMessages);
    }, [directMessagesList, currentUser]);

    return (
        <div>
            <div className="Title block">
                <h1 className="title">{currentUser?.user?.first_name}'s Threads</h1>
            </div>
            <div className="direct-message-list">
                {filteredMessages.map((message) => (
                    <div className="direct-message" key={message.id}>
                            <Link to={`/direct_messages_thread/${message.sender.user.id}`}>
                        <div className="direct-message__profile_picture">
                            <img src={message.sender.profile_image_url} alt="Profile" />
                        </div>
                        <div className="direct-message__sender">
                                {message.sender.user.first_name} {message.sender.user.last_name}
                        </div>
                        <div className="direct-message__created_on">
                            {message.created_on}
                            </div>
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
