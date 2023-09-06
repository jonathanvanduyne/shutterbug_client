export const getAllReactions = () => {
    return fetch("http://localhost:8000/reactions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json());
};
