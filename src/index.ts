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

function getDataSync() {
    const nodemonFilePath = path.join(__dirname, '..', 'nodemon.json');

    const nodemon: NodemonConfig = JSON.parse(
        readFileSync(nodemonFilePath).toString()
    );

    const indexPath = nodemon.exec.split(' ')[1];

    return readFileSync(indexPath).toString();
}

interface GetDataCallback {
    (err, data: string): void;
}

function readFileAsString(filePath): Promise<string> {

    return promisifiedReadFile(filePath)
        .then(data => data.toString());

    // return new Promise(((resolve, reject) => {
    //
    //     readFile(filePath, (err, data) => {
    //
    //         if (err) {
    //             reject(err);
    //             return;
    //         }
    //
    //         resolve(data.toString());
    //
    //     })
    //
    // }));

}

async function getDataWithPromise(): Promise<string> {

    const nodemonFilePath = path.join(__dirname, '..', 'nodemon.json');

    const nodemonString = await readFileAsString(nodemonFilePath);

    const nodemon = JSON.parse(nodemonString) as NodemonConfig;

    const indexPath = nodemon.exec.split(' ')[0];

    return readFileAsString(indexPath);

}

function getDataWithCallback(callback: GetDataCallback) {

    const nodemonFilePath = path.join(__dirname, '..', 'nodemon.json');

    readFile(nodemonFilePath, (err, data) => {
        if (err != null) {
            callback(err, null);
            return;
        }

        const nodemon: NodemonConfig = JSON.parse(data.toString());

        const indexPath = nodemon.exec.split(' ')[1];

        readFile(indexPath, (err, data) => {
            if (err != null) {
                callback(err, null);
                return;
            }

            callback(null, data.toString());
        });
    });
}

const asyncHandler = (callback: (request: Request, response: Response)) => async (request: Request, response: Response) => {

    try {
        await callback(request, response)
    }
    catch (err) {
        response.status(500);
        response.send(err);
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
