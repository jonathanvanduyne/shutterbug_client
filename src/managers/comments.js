export const getCommentsByPost = (postId) => {
    return fetch(`http://localhost:8000/comments?post=${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }})
    .then(res => res.json())
}



export const postComment = (comment) => {
    return fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}

