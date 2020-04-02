import * as express from 'express';
import { authorize } from '../middlewares/authorize';
import { comprador } from '../middlewares/comprador';
import database from '../services/database';

export default {
  async create(request: express.Request, response: express.Response) {
    return await authorize(request, response, async _empresa => {
      const { nome, email } = request.body as AdicionarCompradorRequest;

      const ref = await database.collection('compradores').add({
        empresa: _empresa.ref,
        nome,
        email
      });

      return response.json({
        id: ref.id, // Willian Luis Zuqui = QxCub44zB7eIhQAk8YZU
        empresa: _empresa.id,
        nome,
        email
      });
    });
  },

  async index(request: express.Request, response: express.Response) {
    return await authorize(request, response, async _empresa => {
      const snapshot = await database
        .collection('compradores')
        .where('empresa', '==', _empresa.ref)
        .get();

      return response.json(
        snapshot.docs.map(doc => {
          const { nome, email } = doc.data();
          return {
            id: doc.id,
            empresa: _empresa.id,
            nome,
            email
          };
        })
      );
    });
  },

  async compras(request: express.Request, response: express.Response) {
    return await authorize(request, response, async _empresa => {
      return await comprador(request, response, async _comprador => {
        try {
          const compra = request.body as AdicionarCompraRequest;

          // Validações de model
          if (compra.produtos === undefined || compra.produtos.length === 0) {
            response.status(400).json({ errors: 'compra sem produtos' });
          }

          const dto = {
            data: compra.data,
            empresa: _empresa.ref,
            comprador: _comprador.ref,
            total: compra.total,
            produtos: await Promise.all(
              compra.produtos.map(async produto => {
                const _produtoRef = database
                  .collection('produtos')
                  .doc(produto.id);
                const _produtoDoc = await _produtoRef.get();
                const _produtoData = _produtoDoc.data();

                // Produto Existe
                if (!_produtoDoc.exists || _produtoData === undefined) {
                  throw new Error(`Produto ${produto.id} não existe`);
                }

                // Produto Tem Estoque
                if (produto.quantidade > _produtoData.quantidade) {
                  throw new Error(
                    `Produto ${produto.id} não possuí estoque suficiente`
                  );
                }

                // Produto Baixar Estoque
                _produtoData.quantidade -= produto.quantidade;

                await _produtoRef.set(_produtoData, { merge: true });

                return {
                  id: _produtoRef,
                  empresa: _empresa.ref,
                  nome: produto.nome,
                  preco: produto.preco,
                  quantidade: produto.quantidade,
                  subTotal: produto.subTotal
                };
              })
            )
          } as AdicionarCompraDto;

          // TODO Validar Total e SubTotais

          const ref = await database.collection('compras').add(dto);

          return response.json({
            id: ref.id,
            empresa: _empresa.id,
            comprador: _comprador.id,
            ...compra
          });
        } catch (error) {
          if (error instanceof Error) {
            return response.status(400).json({
              errors: error.message
            });
          }
          return response.status(400).json({
            errors: error
          });
        }
      });
    });
  }
};
