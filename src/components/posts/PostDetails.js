import { useNavigate, useParams } from "react-router-dom"
import { getPostById, deletePost } from "../../managers/posts"
import { useEffect, useState } from "react"
import { getUsers } from "../../managers/users"
import { getCategories } from "../../managers/categories"
import { Link } from "react-router-dom"
import { getUserByToken } from "../../managers/tokens"


export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [tagsOnPost, setTags] = useState([])
    const [users, setUsers] = useState([])
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()

    const navigate = useNavigate()

    useEffect(() => {
        getUsers().then(usersData => setUsers(usersData))
    }, [])


    useEffect(() => {
        if (postId) {
            getPostById(postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])
    useEffect(() => {
        if (post.id) {
            setTags(post.tags)
        }
    }, [post])

    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])

    const deleteButton = (post) => {
        return (
            <button
                onClick={() => {
                    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
                    if (shouldDelete) {
                        deletePost(post.id).then(() => {
                            navigate(`/posts`)
                        });
                    }
                }}
                className="submission__delete small-button"
            >
                Delete
            </button>
        );
    }


    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1 className="is-size-5 has-text-weight-bold mt-3">{post?.title}</h1>
            <article className="postDetails">
                <img src={post?.image_url} />
                <div>{post?.content}</div>
                <div>Date: {post?.publication_date}</div>
                <div>Author: <Link to={`/users/${post?.user?.id}`}>{post?.user?.full_name}</Link></div>
                <div>Tags: <ul>{tagsOnPost.map((tag)=> {
                    return (
                        <li>{tag?.label}</li>
                        )
                    })}
                    </ul>
                </div>
                {post?.user?.id === currentUser?.id ? (
                    <div>
                        {deleteButton(post)}
                        <button onClick={() => { navigate(`/tags/${postId}`) }}>Manage Tags</button>
                    </div>
                )
                    : (<div></div>)}
            </article>
            <button onClick={() => { navigate(`/comments/${postId}`) }}>View Comments</button>
            <button onClick={() => { navigate(`/commentform/${postId}`) }}>Add Comment</button>
        </div>
    )
}