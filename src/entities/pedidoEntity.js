import { randomUUID } from "node:crypto";

export class pedidoEntity {
    constructor({produto_id, cliente_id, data, qtd_solicitada}) {
        this.cliente_id = cliente_id;
        this.produto_id = produto_id;
        this.data = data;
        this.qtd_solicitada = qtd_solicitada;
    }
}