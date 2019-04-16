import { Recipe, RecipeType } from './recipe';
import { RecipeRepository } from './recipe-repository';

describe('RecipeRepository', () => {

    let recipe1;
    let recipe2;
    let recipe3;

    beforeEach(() => {

        recipe1 = new Recipe(
            'Tiramisu',
            RecipeType.Dessert,
            [
                'biscuit',
                'chocolate',
                'coffee',
                'milk'
            ]
        );
        recipe2 = new Recipe(
            'Pizza',
            RecipeType.Main,
            [
                'cheese',
                'egg',
                'meat',
                'tomato'
            ]
        );
        recipe3 = new Recipe(
            'Magic Salad',
            RecipeType.Salad,
            [
                'cheese',
                'tomato'
            ]
        );

    });

    it('should add recipes', () => {

        const recipeRepository = new RecipeRepository();

        const emptyRecipeList = recipeRepository.getRecipeList();

        recipeRepository.addRecipe(recipe1);
        recipeRepository.addRecipe(recipe2);
        recipeRepository.addRecipe(recipe3);

        const recipeList = recipeRepository.getRecipeList();

        expect(emptyRecipeList).toEqual([]);

        expect(recipeList).toEqual([
            recipe1,
            recipe2,
            recipe3
        ]);

    });

    it('should remove recipes', () => {

        const recipeRepository = new RecipeRepository();

        recipeRepository.addRecipe(recipe1);
        recipeRepository.addRecipe(recipe2);
        recipeRepository.addRecipe(recipe3);

        recipeRepository.removeRecipe(recipe2);

        const recipeList = recipeRepository.getRecipeList();

        expect(recipeList).toEqual([
            recipe1,
            recipe3
        ]);

    });

    it.todo('should filter recipes');

});
