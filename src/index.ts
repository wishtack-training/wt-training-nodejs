
import * as express from 'express';
const app = express();

/* Routing. */
app.get('/', (req, res) => res.send('Welcome to Wishtack!'));

/* Run server and listen on port 3000. */
const server = app.listen(3000, () => {

    const host = server.address().address;
    const port = server.address().port;

    console.log(`App listening on http://${host}:${port}`);

});
