import { useState } from "react"
import { putTag } from "../../../managers/TagManager";

export const EditTag = ({ tag, onCancel, onUpdate }) => {
  const [editedTag, setEditedTag] = useState(tag)

  const handleSubmit = async (eventSbm) => {
    eventSbm.preventDefault()

    await putTag(editedTag)
    onUpdate(editedTag)
  }

  const changeGameState = (changeEvent) => {
    const copy = { ...editedTag }
    copy.label = changeEvent.target.value
    setEditedTag(copy)
  };

  return (
    <div className="edit-tag-form">
      <h2>Edit Tag</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            name="label"
            value={editedTag?.label}
            onChange={changeGameState} />
        </div>
        <div className="button-group">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}