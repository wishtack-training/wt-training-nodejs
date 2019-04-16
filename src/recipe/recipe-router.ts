import * as bodyParser from 'body-parser';
import { Router } from 'express';
import { asyncHandler } from '../helpers/async-handler';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository';


export const recipeRouter = Router();

export const recipeRepository = new RecipeRepository();

recipeRouter.use(bodyParser.json());

recipeRouter.post('/', asyncHandler(async (request, response) => {

    const recipe = new Recipe(request.body);

    await recipeRepository.addRecipe(recipe);

    response.status(201);
    response.send(recipe);

}));

recipeRouter.get('/', asyncHandler(async (request, response) => {

    response.send({
        data: await recipeRepository.getRecipeList()
    });

}));
