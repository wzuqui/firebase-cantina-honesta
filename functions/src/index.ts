import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export const api = functions.https.onRequest(app);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });
