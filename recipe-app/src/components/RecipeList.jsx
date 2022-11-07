import 'react-toastify/dist/ReactToastify.css';
import RecipeItem from "./RecipeItem";

const RecipeList = (props) => {

    return ( 
        <ul className="recipe-list">
            {
                props.recipes && props.recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} getAllRecipes={props.getAllRecipes}/>
                ))
            }
        </ul>

     );
}
 
export default RecipeList;