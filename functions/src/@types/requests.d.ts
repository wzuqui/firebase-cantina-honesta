interface AdicionarEmpresaRequest {
  nome: string;
  email: string;
}

interface AdicionarProdutoRequest {
  nome: string;
  quantidade: number;
  preco: number;
}

interface AdicionarCompradorRequest {
  nome: string;
  email: string;
}

interface AdicionarCompraProdutoRequest {
  id: string;
  empresa: string;
  nome: string;
  quantidade: number;
  preco: number;
  subTotal: number;
}

interface AdicionarCompraRequest {
  data: Date;
  total: number;
  produtos: AdicionarCompraProdutoRequest[];
}
