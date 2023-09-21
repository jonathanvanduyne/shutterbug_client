import { useState } from "react";
import "./thread.css"; // Import your CSS file

export const ReplyToDirectMessageForm = ({ currentUser, getData, message }) => {
    const [reply, setReply] = useState({
        content: "",
        recipient: message.sender.user.id,
    });
    const [formError, setFormError] = useState(false);

    const handleReplyClick = (event) => {
        event.preventDefault();
        if (!reply.content) {
            setFormError(true);
            console.log("form error");
            return;
        }

        const messageToSendToAPI = {
            content: reply.content,
            recipient_id: reply.recipient,
        };

        fetch("http://localhost:8000/direct_messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify(messageToSendToAPI),
        })
            .then((response) => {
                if (response.status === 201) {
                    setReply({
                        content: "",
                    });
                }
                getData();
            })
            .catch((error) => {
                // Handle any errors here
                console.error("Error sending message:", error);
            });
    };

    return (
        <div className="reply-to-direct-message-form">
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content" className="contentDM subtitle">
                            Type your message here:
                        </label>
                        <textarea
                            required
                            className="textarea"
                            autoFocus={true}
                            rows="3"
                            value={reply.content}
                            onChange={(evt) => {
                                const copy = { ...reply };
                                copy.content = evt.target.value;
                                setReply(copy);
                            }}
                        ></textarea>
                    </div>
                </fieldset>

                <button
                    onClick={(clickEvent) => {
                        handleReplyClick(clickEvent);
                    }}
                    className="btn btn-primary"
                >
                    Reply
                </button>
            </form>
        </div>
    );
};
