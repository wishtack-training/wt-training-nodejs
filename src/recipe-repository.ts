import { Recipe } from './recipe';

export class RecipeRepository {

    private _recipeList: Recipe[];

    constructor() {
        this._recipeList = [];
    }

    addRecipe(recipe) {
        this._recipeList = [...this._recipeList, recipe]
    }

    getRecipeList() {
        return this._recipeList;
    }

    removeRecipe(recipe) {
        this._recipeList = this._recipeList
            .filter(_recipe => _recipe !== recipe);
    }

}
