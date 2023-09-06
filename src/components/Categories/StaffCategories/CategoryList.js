import { useEffect, useState } from "react";
import { CreateCategory } from "./CreateCategory";
import { getCategories, deleteCategory } from "../../../managers/categories.js";

export const CategoryList = () => {
  const [categoryList, setList] = useState([]);
  const [showForm, updateShowForm] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);

  const updateCategories = () => {
    getCategories().then((categoryList) => {
      setList(categoryList);
    });
  };

  const handleLabelChange = (event) => {
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      label: event.target.value
    }));
  };

  const deleteCategory = (categoryId) => {
    fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      }
    })
      .then(() => {
        updateCategories();
      })
  };

  const editCategory = (category) => {
    const updatedCategory = {
      label: editedCategory.label
    };

    fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(updatedCategory)
    })
      .then(() => {
        updateCategories();
        setEditedCategory(null);
      });
  };

  useEffect(() => {
    updateCategories();
  }, []);

  const deleteButton = (categoryId) => {
    return (
      <button onClick={() => deleteCategory(categoryId)}>Delete</button>
    );
  };

  const editButton = (category) => {
    if (editedCategory && editedCategory.id === category.id) {
      return (
        <div>
          <input
            type="text"
            value={editedCategory.label}
            onChange={handleLabelChange}
            placeholder="New Label"
          />
          <button onClick={() => editCategory(category)}>Save</button>
          <button onClick={() => setEditedCategory(null)}>Cancel</button>
        </div>
      );
    } else {
      return (
        <button onClick={() => setEditedCategory(category)}>Edit</button>
      );
    }
  };

  return (
    <article className="is-flex is-justify-content-space-evenly">
      <section className="categories">
        <h2 className="categoryList title">List of Categories</h2>
        {categoryList
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((category) => (
            <section className="category" key={category.id}>
              <div className="categoryName">{category.label}</div>
              <footer>
                {deleteButton(category.id)}
                {editButton(category)}
              </footer>
            </section>
          ))}
      </section>
      <section className="createCategory">
        {showForm ? (
          <CreateCategory
            updateShowForm={updateShowForm}
            categoryList={categoryList}
            updateCategories={updateCategories}
          />
        ) : (
          <button
            className="showCreateCategory"
            onClick={() => updateShowForm(!showForm)}
          >
            Create New
          </button>
        )}
      </section>
    </article>
  );
};
