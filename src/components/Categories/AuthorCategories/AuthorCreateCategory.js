import { useState } from "react"
import { postCategories } from "../../../managers/categories"

export const AuthorCreateCategory = ({ updateShowForm, categoryList, updateCategories }) => {
    const [newCategory, updateNewCategory] = useState({ label: "" })

    const handleSubmitCategory = (e) => {
        e.preventDefault()

        // Check if the category is already in database
        const alreadyAdded = categoryList.some(category => category.label === newCategory.label)

        if (!alreadyAdded && newCategory.label.length > 0) {
            // POST category to API ////////////////////////////////////////////
            postCategories(newCategory)
                .then(postedCategory => {
                    console.log("New category successfully created", postedCategory)
                    // update the categoryList state with new posted category
                    updateCategories()
                })
                .catch(error => {
                    console.error("An error occurred:", error);
                    window.alert("Something went wrong");
                });
        } else if (alreadyAdded) {
            window.alert("Category already in database")
        } else {
            window.alert("Please enter a category name")
        }
    }

    return <>
        <div className="addCategory">
            <label htmlFor="addCategory_input">Create New Category:</label>
            <div>
                <input
                    type="text"
                    className="category__input"
                    placeholder="Enter your category"
                    id="addCategory_input"
                    value={newCategory.label}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...newCategory }
                            copy.label = changeEvent.target.value
                            updateNewCategory(copy) // Updating new category with value of copy
                        }
                    } />
            </div>
        </div>
        <button className="btn-secondary btn-group-left"
            onClick={(click) => handleSubmitCategory(click)}
        >Submit New Category</button>

        <button className="btn-secondary btn-group-right"
            onClick={(e) => {
                e.preventDefault()
                updateShowForm(false)
            }}
        >Hide</button>
        <div><p>After adding a new category, you'll be able to find it in the list to the left.</p></div>
    </>
}