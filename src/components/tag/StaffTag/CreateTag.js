import { useState } from "react"
import { postTags } from "../../../managers/TagManager"

export const CreateTag = ({ updateShowForm, tagList, updateTags }) => {
    const [newTag, updateNewTag] = useState({label: ""})

    const handleSubmitTag = (e) => {
        e.preventDefault()

        // Check if the tag is already in database
        const alreadyAdded = tagList.some(tag => tag.label === newTag.label)

        if (!alreadyAdded && newTag.label.length > 0) {
            // POST tag to API ////////////////////////////////////////////
            postTags(newTag)
                .then(postedTag => {
                    console.log("New tag successfully created", postedTag)
                    // update the tagList state with new posted tag
                    updateTags()
                })
                .catch(error => {
                    console.error("An error occurred:", error);
                    window.alert("Something went wrong");
                });
        } else if (alreadyAdded) {
            window.alert("Tag already in database")
        } else {
            window.alert("Please enter a tag name")
        }
    }

    return <>
    <div className="addTag">
            <label htmlFor="addTag_input">Create New Tag:</label>
            <div>
                <input
                    type="text"
                    className="tag__input"
                    placeholder="Enter your tag"
                    id="addTag_input"
                    value={newTag.label}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...newTag }
                            copy.label = changeEvent.target.value
                            updateNewTag(copy) // Updating new tag with value of copy
                        }
                    } />
            </div>
        </div>
        <button className="btn-secondary btn-group-left"
        onClick={(click) => handleSubmitTag(click)}
        >Submit New Tag</button>

        <button className="btn-secondary btn-group-right"
        onClick={(e) => {
            e.preventDefault()
            updateShowForm(false)
        }}
        >Hide</button>
        <div><p>After adding a new tag, you'll be able to find it in the list to the left.</p></div>
    </>
}