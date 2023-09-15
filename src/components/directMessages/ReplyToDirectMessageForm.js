import { useState } from "react";

export const ReplyToDirectMessageForm = ({ currentUser, getData, message}) => {
    const [reply, setReply] = useState({
        content: "",
        recipient: message.sender.user.id,
    });
    const [formError, setFormError] = useState(false);

    const handleReplyClick = (event) => {
        event.preventDefault();
        if (!reply.content) {
            setFormError(true);
            console.log("form error")
            return;
        }

        const messageToSendToAPI = {
            content: reply.content,
            recipient: reply.recipient,
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

    const ReplyForm = () => {
        if (message?.sender?.user?.id === currentUser?.id) {
            return null;
        }
        else {
            return (
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="content" className="contentDM subtitle">
                                Type your message here:
                            </label>
                            <input
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
                            ></input>
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
            );
    };
}

    return (
        <div className="direct-message-form">
            <ReplyForm />
        </div>
    );
};
