import * as express from 'express';
import { Express } from 'express';
import * as supertest from 'supertest';
import { recipeRouter } from './recipe-router';


describe('recipes', () => {

    let app: Express;

    beforeEach(() => {
        app = express();
        app.use(recipeRouter);
    });

    it('should add recipe', async () => {

        const response = await supertest(app).get('/');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            data: []
        });

    });

});
