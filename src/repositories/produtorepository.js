import connection from'../../database/db.js';

export default class ProdutoRepository {
    async find(id){
        try {
            if (isNaN(parseInt(id))) {
                if (typeof id === "undefined") {
                    const query = "SELECT * FROM produtos"; 
                    const [results, fields] = await connection.query(query);
                    return results;
                }else{
                    throw new Error("O ID da requisição é inválido!")
                }
            }else{
                const query = "SELECT * FROM produtos WHERE id = ?"; 
                const [results, fields] = await connection.query(query, [id]);
                return results;
            }
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const query = "INSERT INTO produtos (id, nome, descricao, preco, qtd_estoque) VALUES (?, ?, ?, ?, ?)"; 
    
            const result = await connection.query(query, [
                data.id,
                data.nome,
                data.descricao,
                data.preco,
                data.qtd_estoque
            ]);
    
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async edit(id, data) {
        if (isNaN(parseInt(id))) {
            throw new Error("O ID da requisição é inválido!")
        }
        try {
            const queryGet = "SELECT * FROM produtos WHERE id = ?"; 
            const [resultGet, fields] = await connection.query(queryGet, [id]);
            
            const query = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, qtd_estoque = ? WHERE id = ?"; 
    
            const result = await connection.query(query, [
                data.nome || resultGet[0].nome,
                data.descricao || resultGet[0].descricao,
                data.preco || resultGet[0].preco,
                data.qtd_estoque || resultGet[0].qtd_estoque,
                id
            ]);
    
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id){
        try {
            if (isNaN(parseInt(id))) {
                throw new Error("O ID da requisição é inválido!")
            }
            const query = "DELETE FROM produtos WHERE id = ?"; 
            const [results, fields] = await connection.query(query, [id]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}