import React, { useState, useEffect } from "react";
import { getDirectMessages } from "../../managers/directMessages.js";
import { getCurrentUser } from "../../managers/users.js";
import { Link, useNavigate } from "react-router-dom";

export const DirectMessagesList = () => {
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];
    const [directMessagesList, setDirectMessagesList] = useState([]);
    const [filteredThreads, setFilteredThreads] = useState([]);
    const navigate = useNavigate();

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
        // Create a set to store unique thread identifiers
        const uniqueThreadIdentifiers = new Set();

        // Filter directMessages to include threads where the current user is either sender or recipient
        // and exclude threads where the current user is both sender and recipient
        const threads = directMessagesList.reduce((filtered, message) => {
            const senderUserId = message.sender?.user?.id;
            const recipientUserId = message.recipient?.user?.id;

            // Check if the message involves the current user as sender or recipient
            const isCurrentUserSender = senderUserId === currentUser?.id;
            const isCurrentUserRecipient = recipientUserId === currentUser?.id;

            if (isCurrentUserSender || isCurrentUserRecipient) {
                // Generate a unique thread identifier by combining sender and recipient IDs
                const threadIdentifier = [senderUserId, recipientUserId].sort().join('-');

                // Check if this thread has already been added
                if (!uniqueThreadIdentifiers.has(threadIdentifier)) {
                    uniqueThreadIdentifiers.add(threadIdentifier);

                    // Determine the other user in the thread
                    const otherUser = isCurrentUserSender ? message.recipient.user : message.sender.user;

                    // Add the thread to the filtered array
                    filtered.push({
                        id: threadIdentifier, // Use the thread identifier as a unique ID
                        otherUser,
                        latestMessage: message,
                    });
                }
            }

            return filtered;
        }, []);

        // Sort the threads by the latest message's created_on timestamp
        threads.sort((a, b) =>
            new Date(b.latestMessage.created_on) - new Date(a.latestMessage.created_on)
        );

        setFilteredThreads(threads);
    }, [directMessagesList, currentUser]);

    const createNewThreadButton = () => {
        return (
            <div className="direct-message">
                <button className="create-new-thread-button" onClick={() => navigate("/newDM")}>
                    Create New Thread
                </button>
            </div>
        );
    };

    return (
        <div>
            <div className="Title block">
                <h1 className="title">{currentUser?.user?.first_name}'s Threads</h1>
            </div>
            <div className="direct-message-list">
                {filteredThreads.map((thread) => (
                    <div className="direct-message" key={thread.id}>
                        <Link to={`/direct_messages_thread/${thread.otherUser.id}`}>
                            <div className="direct-message__sender">
                                {thread.otherUser.first_name} {thread.otherUser.last_name}
                            </div>
                            <div className="direct-message__profile_picture">
                                "{thread.latestMessage.content}""
                            </div>
                            <div className="direct-message__created_on">
                                {thread.latestMessage.created_on}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {createNewThreadButton()}
        </div>
    );
};
