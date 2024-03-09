import { randomUUID } from "node:crypto";

export class clienteEntity {
    constructor({nome, endereco, email, telefone}) {
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
    }
}