
import * as supertest from 'supertest';
import { app } from '../app';


describe('recipes', () => {

    it('should add recipe', async() => {

        const response = await supertest(app).get('/recipes');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            data: []
        });

    });

});
