import { useState } from "react";
import { toast} from 'react-toastify';

const RecipeItem = ({recipe, getAllRecipes}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(recipe.title);

    const handleSubmit = (e, id) => {
        e.preventDefault();
        console.log(title);
        fetch(`${process.env.REACT_APP_URL_API}/recipes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title })
        })
            .then((res) => {
                setIsEditing(false)
                getAllRecipes()
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("On supprime vraiment ?")) {
            fetch(`${process.env.REACT_APP_URL_API}/recipes/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    getAllRecipes()
                    toast("Recipe deleted")  
                })
        }
    }

    return ( 
        <li>
            {isEditing ? (
                <div>
                    <form onSubmit={(e) => handleSubmit(e, recipe.id)}>
                        <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input type="submit" value="Valider" />
                    </form>
                </div>
            ) : (
                <h3>{recipe.title}</h3>
            )}
            {recipe.category}
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            <button onClick={() => setIsEditing(true)}>Update</button>
        </li>

     );
}
 
export default RecipeItem;