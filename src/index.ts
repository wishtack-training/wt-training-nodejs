
import * as express from 'express';
import { AddressInfo } from 'net';
const app = express();

/* Routing. */
app.get('/', (req, res) => res.send('Welcome to Wishtack!'));

/* Run server and listen on port 3000. */
const server = app.listen(3000, () => {

    /* @hack still have to figure out when `server.address()` returns a string. */
    const addressInfo = server.address() as AddressInfo;

    const host = addressInfo.address;
    const port = addressInfo.port;

    console.log(`App listening on http://${host}:${port}`);

});
