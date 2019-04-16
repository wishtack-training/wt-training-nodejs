import { Recipe, RecipeType } from './recipe';
import { RecipeRepository } from './recipe-repository';

describe('RecipeRepository', () => {

    let recipe1: Recipe;
    let recipe2: Recipe;
    let recipe3: Recipe;

    beforeEach(() => {

        recipe1 = new Recipe({
            title: 'Tiramisu',
            type: RecipeType.Dessert
        });

        recipe2 = new Recipe({
            title: 'Pizza',
            type: RecipeType.Main
        });
        recipe3 = new Recipe({
            title: 'Magic Salad',
            type: RecipeType.Salad
        });

    });

    it('should add recipes', async () => {

        const recipeRepository = new RecipeRepository();

        const emptyRecipeList = await recipeRepository.getRecipeList();

        await recipeRepository.addRecipe(recipe1);
        await recipeRepository.addRecipe(recipe2);
        await recipeRepository.addRecipe(recipe3);

        const recipeList = await recipeRepository.getRecipeList();

        expect(emptyRecipeList).toEqual([]);

        expect(recipeList).toEqual([
            recipe1,
            recipe2,
            recipe3
        ]);

    });

    it.skip('should remove recipes', async () => {

        const recipeRepository = new RecipeRepository();

        await recipeRepository.addRecipe(recipe1);
        await recipeRepository.addRecipe(recipe2);
        await recipeRepository.addRecipe(recipe3);

        await recipeRepository.removeRecipe(recipe2);

        const recipeList = await recipeRepository.getRecipeList();

        expect(recipeList).toEqual([
            recipe1,
            recipe3
        ]);

    });

    it.todo('should filter recipes');

});
