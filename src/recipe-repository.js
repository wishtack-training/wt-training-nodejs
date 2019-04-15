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

    /**
     * @deprecated WIP
     */
    removeRecipe(recipe) {
        throw new Error('😱 Not implemented yet!');
    }

}

module.exports = {
    RecipeRepository
};
