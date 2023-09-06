export const getTags = () => {
  return fetch("http://localhost:8000/tags", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
  .then(res => res.json());
};


export const postTags = (newTag) => {
  return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(newTag)
  }).then(res => res.json());
};

export const putTag = (tag) => {
  return fetch(`http://localhost:8000/tags/${tag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(tag)
  })
}

export const deleteTags = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
        })
        .then(() => {
            window.location.reload()
        })
}
export const postTagRelationships = (postId, tagsToPost) => {
  const postBody = [postId, tagsToPost];

  return fetch("http://localhost:8000/post_tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(postBody)
  }).then(res => res.json());
};

export const getPostTagsByPostId = (postId) => {
  return fetch(`http://localhost:8000/post_tags?post=${postId}`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
  .then(res => res.json());
};

export const deleteTagRelationships = (postTagIdArray) => {
  return fetch("http://localhost:8000/post_tags+bulk_delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(postTagIdArray)
  });
};
