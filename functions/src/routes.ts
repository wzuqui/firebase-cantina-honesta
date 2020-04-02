import * as express from 'express';

import EmpresaController from './controllers/EmpresaController';
import ProdutoController from './controllers/ProdutoController';
import CompradorController from './controllers/CompradorController';

const routes = express.Router();

// EmpresaController
routes.post('/empresas', EmpresaController.create);
routes.get('/empresas', EmpresaController.index);

// ProdutoController
routes.post('/produtos', ProdutoController.create);
routes.get('/produtos', ProdutoController.index);

// CompradorController
routes.post('/compradores', CompradorController.create);
routes.get('/compradores', CompradorController.index);
routes.post('/compradores/:id/compras', CompradorController.compras);

export default routes;
