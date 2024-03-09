import connection from'../../database/db.js';

export default class PedidoRepository {
    async find(id){
        try {
            if (isNaN(parseInt(id))) {
                if (typeof id === "undefined") {
                    const query = "SELECT * FROM pedidos"; 
                    const [results, fields] = await connection.query(query);
                    return results;
                }else{
                    throw new Error("O ID da requisição é inválido!")
                }
            }else{
                const query = "SELECT * FROM pedidos WHERE id = ?"; 
                const [results, fields] = await connection.query(query, [id]);
                return results;
            }
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const query = "INSERT INTO pedidos (id, cliente_id, produto_id, data, qtd_solicitada) VALUES (?, ?, ?, ?, ?)"; 
    
            const result = await connection.query(query, [
                data.id,
                data.cliente_id,
                data.produto_id,
                data.data,
                data.qtd_solicitada
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
            const queryGet = "SELECT * FROM pedidos WHERE id = ?"; 
            const [resultGet, fields] = await connection.query(queryGet, [id]);
            
            const query = "UPDATE pedidos SET cliente_id = ?, produto_id = ?, data = ?, qtd_solicitada = ? WHERE id = ?"; 
    
            const result = await connection.query(query, [
                data.cliente_id || resultGet[0].cliente_id,
                data.produto_id || resultGet[0].produto_id,
                data.data || resultGet[0].data,
                data.qtd_solicitada || resultGet[0].qtd_solicitada,
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
            const query = "DELETE FROM pedidos WHERE id = ?"; 
            const [results, fields] = await connection.query(query, [id]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}