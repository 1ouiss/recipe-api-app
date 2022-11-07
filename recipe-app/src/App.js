import FormRecipe from "./components/FormRecipe";
import RecipeList from "./components/RecipeList";
import { useState, useEffect } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [recipes, setRecipes] = useState();

  const getAllRecipes = () => {
    fetch(`${process.env.REACT_APP_URL_API}/recipes`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data)
      });
  }
  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <FormRecipe getAllRecipes={getAllRecipes} recipes={recipes} setRecipes={setRecipes}/>
      <RecipeList getAllRecipes={getAllRecipes} recipes={recipes}/>
      <ToastContainer />
    </div>
  );
}

export default App;
