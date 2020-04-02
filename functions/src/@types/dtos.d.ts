interface AdicionarCompraDto {
  data: Date;
  empresa: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  comprador: FirebaseFirestore.DocumentReference<
    FirebaseFirestore.DocumentData
  >;
  total: number;
  produtos: {
    id: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    empresa: FirebaseFirestore.DocumentReference<
      FirebaseFirestore.DocumentData
    >;
    nome: string;
    preco: number;
    quantidade: number;
    subTotal: number;
  }[];
}
