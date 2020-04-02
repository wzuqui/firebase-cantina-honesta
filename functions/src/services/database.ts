import * as admin from 'firebase-admin';
const serviceAccount = require('../../serviceAccountKey.json');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cantina-honesta-3355a.firebaseio.com'
});

export default app.firestore();
