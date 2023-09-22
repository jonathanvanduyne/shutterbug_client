export const getDirectMessages = async () => {
    try {
        const response = await fetch("http://localhost:8000/direct_messages", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching direct messages: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getDirectMessages:", error);
        throw error;
    }
};

export const createDirectMessage = async (message) => {
    return fetch(`http://localhost:8000/direct_messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(message)
    })
        .then(response => response.json())
}
