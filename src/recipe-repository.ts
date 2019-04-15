import { Recipe } from './recipe';

export class RecipeRepository {
    recipeList: Recipe[] = [];

    addRecipe(recipe) {
        this.recipeList = [...this.recipeList, recipe]
    }

    getRecipeList() {
        return this.recipeList;
    }

    removeRecipe(recipe) {
        this.recipeList = this.recipeList
            .filter(_recipe => _recipe !== recipe);
    }

}
