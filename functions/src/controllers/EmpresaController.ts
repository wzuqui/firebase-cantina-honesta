import * as express from 'express';
import database from '../services/database';

export default {
  async create(request: express.Request, response: express.Response) {
    const { nome, email } = request.body as AdicionarEmpresaRequest;

    const ref = await database.collection('empresa').add({
      nome,
      email
    });

    return response.json({
      id: ref.id, // ZcLFyNU4mF2QSjJQuAQq
      nome,
      email
    });
  },

  async index(request: express.Request, response: express.Response) {
    const snapshot = await database.collection('empresa').get();

    return response.json(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    );
  }
};
