import * as express from 'express';
import database from '../services/database';

interface IComprador {
  id: string;
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
}

export async function comprador(request: express.Request, response: express.Response, next: (empresa: IComprador) => Promise<express.Response<any>>) {
  const id = request.params.id;
  if (!id) {
    return response
      .status(401)
      .json({ errors: { authorization: 'id is required' } });
  }
  const ref = database.collection('compradores').doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    return response.status(400).json({
      errors: { authorization: 'comprador não existe' }
    });
  }
  return await next({ id, doc, ref });
}
