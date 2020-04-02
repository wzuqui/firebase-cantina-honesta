import * as express from 'express';
import database from '../services/database';
import { authorize } from '../middlewares/authorize';

export default {
  async create(request: express.Request, response: express.Response) {
    return await authorize(request, response, async empresa => {
      const {
        nome,
        quantidade,
        preco
      } = request.body as AdicionarProdutoRequest;

      const ref = await database.collection('produtos').add({
        empresa: empresa.ref,
        nome,
        quantidade,
        preco
      });

      return response.json({
        id: ref.id, // tPGb6QVsFQKZTyltjL1T
        empresa: empresa.id,
        nome,
        quantidade,
        preco
      });
    });
  },

  async index(request: express.Request, response: express.Response) {
    return await authorize(request, response, async empresa => {
      const snapshot = await database
        .collection('produtos')
        .where('empresa', '==', empresa.ref)
        .get();

      return response.json(
        snapshot.docs.map(doc => {
          const { nome, preco, quantidade } = doc.data();
          return {
            id: doc.id,
            empresa: empresa.id,
            nome,
            preco,
            quantidade
          };
        })
      );
    });
  }
};
