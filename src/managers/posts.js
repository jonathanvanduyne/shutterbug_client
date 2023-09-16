export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const getPostsByApproval = () => {
    return fetch("http://localhost:8000/posts?approved=true", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const getPostById = async (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8000/posts?category=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const viewUserPost = ({ token }) => {
    return fetch(`http://localhost:8000/posts?user=current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then((res) => res.json());
};

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    });
};

export const putPost = (postId, post) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
};

export const getPostsByUser = async (userId) => {
    return fetch(`http://localhost:8000/posts?user=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const getPostsByTitle = (title) => {
    return fetch(`http://localhost:8000/posts?title=${title}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const getPostsByTag = (tagId) => {
    return fetch(`http://localhost:8000/posts?tag=${tagId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
};

export const flagPost = (post) => {
    const postToAPI = {
        title: post.title,
        shutterbug_user: post?.shutterbug_user?.id,
        image_url: post.image_url,
        content: post.content,
        published_on: post.published_on,
        category: post?.category?.id,
        approved: post.approved,
        flagged: !post.flagged,
    };

    return fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postToAPI)
    })
};

export const UnapprovePost = (post) => {
    const postToAPI = {
        title: post.title,
        shutterbug_user: post?.shutterbug_user?.id,
        image_url: post.image_url,
        content: post.content,
        published_on: post.published_on,
        category: post?.category?.id,
        approved: !post.approved,
        flagged: post.flagged,
    };

    return fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postToAPI)
    })
}

export const getFlaggedPosts = () => {
    return fetch("http://localhost:8000/posts?flagged=true", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}

export const getUnapprovedPosts = () => {
    return fetch("http://localhost:8000/posts?approved=false", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then(res => res.json());
}
