import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getTags } from "../../../managers/TagManager"
import { AuthorCreateTag } from "./AuthorCreateTag.js";


export const AuthorTagList = () => {
    const [tags, setTags] = useState([])
    const { tagId } = useParams()
    const [showForm, updateShowForm] = useState(false)


    const updateTags = () => {
        getTags().then(tagData => setTags(tagData))
    }

    useEffect(() => {
        getTags().then(tagData => setTags(tagData))
    }, [])

    return (
        <article className="is-flex is-justify-content-space-evenly">
            <div style={{ margin: "0rem 3rem" }} className="column is-two-thirds">
                <h1>Tags</h1>

                <div className="tags column is-full is-justify-content-space-evenly">
                    {tags.map((tag) => (
                        <section className="tag" key={tag?.id}>
                            <div className="tagLabel">{tag?.label}</div>
                        </section>
                    ))}
                </div>
            </div>

            <section className="createTag column">
                {
                    showForm
                        ? <AuthorCreateTag
                            updateShowForm={updateShowForm}
                            tagList={tags}
                            updateTags={updateTags} />
                        : <button className="showCreateTag"
                            onClick={click => updateShowForm(!showForm)}
                        >Create New</button>
                }
            </section>

        </article>
    )
}
