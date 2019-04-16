import * as express from 'express';
import { Request, Response } from 'express';
import { readFile, readFileSync } from 'fs';
import { AddressInfo } from 'net';
import * as path from 'path';
import { promisify } from 'util';


const promisifiedReadFile = promisify(readFile);

const app = express();

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

/**
 * @todo use https://github.com/davidbanham/express-async-errors
 * @param callback
 */
const asyncHandler = (callback: (request: Request, response: Response) => void) => async (request: Request, response: Response) => {

    try {
        await callback(request, response)
    }
    catch (err) {
        response.status(500);
        response.send(err.toString());
    }

};

/* Routing. */
app.get('/', asyncHandler(async (request: Request, response: Response) => {

    const data = await getDataWithPromise();

    response.send(data);

}));

/* Run server and listen on port 3000. */
const server = app.listen(3000, () => {
    /* @hack still have to figure out when `server.address()` returns a string. */
    const addressInfo = server.address() as AddressInfo;

    const host = addressInfo.address;
    const port = addressInfo.port;

    console.log(`App listening on http://${host}:${port}`);
});
