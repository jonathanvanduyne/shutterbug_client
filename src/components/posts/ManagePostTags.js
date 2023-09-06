import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getTags, deleteTags } from "../../managers/TagManager"
import { getPostById } from "../../managers/posts";



export const ManagePostTags = () => {

  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getTags().then(tags => setTags(tags))
  }, [])


  useEffect(() => {
    if (postId) {
      getPostById(postId).then(PostDetails => setPost(PostDetails))
    }
  }, [postId])

  useEffect(() => {
    if (post.id) {
      const tagArray = []
      post.tags.map((tag)=>{tagArray.push(tag.id)})
      setSelectedTags(tagArray)
    }
  }, [post])


  const updateTags = () => {
    getTags().then(tagData => setTags(tagData))
  }



const handleSaveButtonClick = (event) => {
  event.preventDefault();

  const postToSend = {
    user: post.user.id,
    category: post.category.id,
    title: post.title,
    publication_date: post.publication_date,
    image_url: post.image_url,
    content: post.content,
    tags: selectedTags,
    approved: true
};


  fetch(`http://localhost:8000/posts/${postId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(postToSend)
  })
      .then(() => {
          getPostById(postId).then(PostDetails => setPost(PostDetails))
          navigate(`/posts/${postId}`)
      })
};

  const handleManageTags = (e) => {
    e.preventDefault()
    const tagId= parseInt(e.target.value)
    const copy = [...selectedTags]
    if(e.target.checked) {
        copy.push(tagId)
        setSelectedTags(copy)
      }
      else{
        const tagArray = copy.filter(tag => tag !==tagId)
        setSelectedTags(tagArray)
      }
      updateTags()
  }


  return (
    <article className="is-flex is-justify-content-space-evenly">
      <div style={{ margin: "0rem 3rem" }} className="column is-two-thirds">

        <fieldset>
          <h3 className="is-size-5 has-text-weight-bold mt-3">Manage Tags for: {post?.title}</h3>
          <section className="py-2 px-4">
            {
              tags.map((tag) => {
                return <div key={`tagManage--${tag.id}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={tag.id}
                      // make sure selected tags only contains primary keys
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => handleManageTags(e)}
                    />
                    {tag.label}
                  </label>
                </div>
              })
            }
          </section>
        </fieldset>
        <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary"
            >
                Save
            </button>
      </div>
    </article>
  )
          
}