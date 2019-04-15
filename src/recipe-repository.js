class RecipeRepository {

    constructor() {
        this.recipeList = [];
    }


    addRecipe(recipe) {
        this.recipeList.push(recipe);
    }

    getRecipeList() {
        return this.recipeList;
    }

    removeRecipe(recipe) {
        this.recipeList = this.recipeList
            .filter(_recipe => _recipe !== recipe);
    }

}

module.exports = {
    RecipeRepository
};
