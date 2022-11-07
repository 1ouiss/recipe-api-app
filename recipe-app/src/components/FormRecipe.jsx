import { useState } from "react";


const FormRecipe = (props) => {
    const [credentials, setCredentials] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = { title: credentials.title, category: credentials.category };
        fetch(`${process.env.REACT_APP_URL_API}/recipes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe),
        })
            .then((res) => 
                props.getAllRecipes(),
                setCredentials({ title: "", category: "" })
            )
        
        
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(
            {
                ...credentials,
                [name]: value
            }
        )
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange}/>
            <input type="text" name="category" onChange={handleChange}/>
            <input type="submit" value="Envoyer" />
        </form>

     );
}
 
export default FormRecipe;