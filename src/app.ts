import * as express from 'express';
import { Request, Response } from 'express';
import { readFile } from "fs";
import * as path from "path";
import { promisify } from 'util';
import { asyncHandler } from './helpers/async-handler';
import { recipeRouter } from './recipe/recipe-router';

const promisifiedReadFile = promisify(readFile);

export const app = express();

interface NodemonConfig {
    exec: string;
}

function readFileAsString(filePath): Promise<string> {

    return promisifiedReadFile(filePath)
        .then(data => data.toString());

}

async function getDataWithPromise(): Promise<string> {

    const nodemonFilePath = path.join(__dirname, '..', 'nodemon.json');

    const nodemonString = await readFileAsString(nodemonFilePath);

    const nodemon = JSON.parse(nodemonString) as NodemonConfig;

    const indexPath = nodemon.exec.split(' ')[1];

    return readFileAsString(indexPath);

}

/* Routing. */
app.get('/demo', asyncHandler(async (request: Request, response: Response) => {

    const data = await getDataWithPromise();

    response.send(data);

}));

app.use('/recipes', recipeRouter);
