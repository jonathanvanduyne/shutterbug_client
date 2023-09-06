import { useEffect, useState } from "react";
import { getCategories} from "../../../managers/categories.js";
import { AuthorCreateCategory } from "./AuthorCreateCategory.js";

export const AuthorCategoryList = () => {
    const [categoryList, setList] = useState([]);
    const [showForm, updateShowForm] = useState(false);

    const updateCategories = () => {
        getCategories().then((categoryList) => {
            setList(categoryList);
        });
    };

    useEffect(() => {
        updateCategories();
    }, []);

    return (
        <article className="is-flex is-justify-content-space-evenly">
            <section className="categories">
                <h2 className="categoryList">List of Categories</h2>
                {categoryList
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((category) => (
                        <section className="category" key={category.id}>
                            <div className="categoryName">{category.label}</div>
                        </section>
                    ))}
            </section>
            <section className="createCategory">
                {showForm ? (
                    <AuthorCreateCategory
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
