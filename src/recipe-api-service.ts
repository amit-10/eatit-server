import axios from "axios";

export const getRecipesFromIngredients = async (ingredients: string[], recipeType: string) => {
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=684f85811dff457da94a2ea48b7d03af&includeIngredients=${ingredients.toString()}&type=${recipeType}&number=10`;
    const response = await axios.get(url);
    return response.data.results;
}

export const getRecipeInformation = async (recipeId: Number) => {
    let url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=684f85811dff457da94a2ea48b7d03af`;
    const response = await axios.get(url);
    return response.data;
}