import { Router } from 'express';
import { asyncHandler } from '../helpers/async-handler';
import { RecipeRepository } from './recipe-repository';


export const recipeRouter = Router();

export const recipeRepository = new RecipeRepository();

recipeRouter.get('/', asyncHandler(async (request, response) => {

    response.send({
        data: await recipeRepository.getRecipeList()
    });

}));
