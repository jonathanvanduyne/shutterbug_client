import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getTags, deleteTags } from "../../../managers/TagManager"
import { CreateTag } from "./CreateTag"
import { EditTag } from "./EditTag"


export const TagList = () => {
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const { tagId } = useParams()
  const [showForm, updateShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false);


  const updateTags = () => {
    getTags().then(tagData => setTags(tagData))
  }


  useEffect(() => {
    getTags().then(tagData => setTags(tagData))
  }, [])
  
  
  const deleteButton = (tagId) => {
    const handleDelete = () => {
      const shouldDeleteTag = window.confirm("Are you sure you want to delete this tag?");
      if (shouldDeleteTag) {
        deleteTags(tagId)
      }
    }

    return (
      <button onClick={handleDelete}>
        Delete
      </button>
    )
  }
  
  const editButton = (tag) => {
    return (<button onClick={() => handleEditTag(tag)}>Edit</button>)
  }
  
    const handleEditTag = (tag) => {
      setSelectedTag(tag)
      setShowEditForm(true)
    }

  
    const handleCancelEdit = () => {
      setSelectedTag(null)
    };

  return (
    <article className="is-flex is-justify-content-space-evenly">
      <div style={{ margin: "0rem 3rem" }} className="column ">
        <h1 className="title">Tags</h1>

        <div className="tags">
          {tags.map((tag) => (
            <section className="tag" key={tag?.id}>
              <div className="tagLabel">{tag?.label}</div>
              <footer>{deleteButton(tag.id)}
                {editButton(tag)}</footer>
            </section>
          ))}
        </div>
      </div>

      <section className="createTag column">
        {
          showForm
            ? <CreateTag
              updateShowForm={updateShowForm}
              tagList={tags}
              updateTags={updateTags} />
            : <button className="showCreateTag"
              onClick={click => updateShowForm(!showForm)}
            >Create New</button>
        }
      </section>
      <section className="editTag column">
        {showEditForm && selectedTag && (
          <EditTag
            tag={selectedTag}
            onCancel={handleCancelEdit}
            onUpdate={(updatedTag) => {
              updateTags()
              setShowEditForm(false)
            }}
          />
        )}
      </section>

    </article>
  )
}
