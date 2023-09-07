export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json());
};

export const getUserById = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json());
};

export const updateUser = (userId, data) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(data), // Send only the updated data
    });
};

export const getCurrentUser = async () => {
    try {
        const response = await fetch(`http://localhost:8000/users?current=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        });

        if (!response.ok) {
            // Handle non-successful response, e.g., throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching current user:", error);
        throw error; // You can choose to handle or rethrow the error as needed
    }
};

