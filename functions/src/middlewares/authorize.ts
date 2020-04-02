import * as express from 'express';
import database from '../services/database';

export interface IAuthorize {
  id: string;
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
}

export async function authorize(
  request: express.Request,
  response: express.Response,
  next: (empresa: IAuthorize) => Promise<express.Response<any>>
) {
  const id = request.headers.authorization as string;

  if (!id) {
    return response
      .status(401)
      .json({ errors: { authorization: 'authorization is required' } });
  }

  const ref = database.collection('empresa').doc(id);
  const doc = await ref.get();

  if (!doc.exists) {
    return response.status(400).json({
      errors: { authorization: 'authorization token not exist' }
    });
  }

  return await next({ id, doc, ref });
}
