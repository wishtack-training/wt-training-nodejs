/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

const { RecipeRepository } = require('./recipe-repository');
const { Recipe } = require('./recipe');

describe('RecipeRepository', () => {

    let recipe1;
    let recipe2;
    let recipe3;

    beforeEach(() => {

        recipe1 = new Recipe(
            'Tiramisu',
            'dessert',
            [
                'biscuit',
                'chocolate',
                'coffee',
                'milk'
            ]
        );
        recipe2 = new Recipe(
            'Pizza',
            'meal',
            [
                'cheese',
                'egg',
                'meat',
                'tomato'
            ]
        );
        recipe3 = new Recipe(
            'Magic Salad',
            'salad',
            [
                'cheese',
                'tomato'
            ]
        );

    });

    it('should add recipes', () => {

        const recipeRepository = new RecipeRepository();

        recipeRepository.addRecipe(recipe1);
        recipeRepository.addRecipe(recipe2);
        recipeRepository.addRecipe(recipe3);

        const recipeList = recipeRepository.getRecipeList();

        expect(recipeList).toEqual([
            recipe1,
            recipe2,
            recipe3
        ]);

    });

    it.skip('should remove recipes', () => {

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
