import { randomUUID } from "node:crypto";

export class produtoEntity {
    constructor({nome, descricao, preco, qtd_estoque}) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.qtd_estoque = qtd_estoque;
    }
}