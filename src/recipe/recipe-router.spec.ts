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

        const addResponse = await supertest(app)
            .post('/')
            .send({
                title: 'test',
                type: 'dessert'
            })
            .set({'Content-Type': 'application/json'});

        expect(addResponse.status).toEqual(201);
        expect(addResponse.body).toEqual({
            title: 'test',
            type: 'dessert',
            ingredientList: []
        });

        const response = await supertest(app).get('/');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            data: [
                {
                    title: 'test',
                    type: 'dessert',
                    ingredientList: []
                }
            ]
        });

    });

});
