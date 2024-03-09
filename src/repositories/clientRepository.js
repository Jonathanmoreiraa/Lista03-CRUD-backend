import connection from'../../database/db.js';

export default class ClienteRepository {
    async find(id){
        try {
            if (isNaN(parseInt(id))) {
                if (typeof id === "undefined") {
                    const query = "SELECT * FROM clientes"; 
                    const [results, fields] = await connection.query(query);
                    return results;
                }else{
                    throw new Error("O ID da requisição é inválido!")
                }
            }else{
                const query = "SELECT * FROM clientes WHERE id = ?"; 
                const [results, fields] = await connection.query(query, [id]);
                return results;
            }
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const query = "INSERT INTO clientes (id, nome, endereco, email, telefone) VALUES (?, ?, ?, ?, ?)"; 
    
            const result = await connection.query(query, [
                data.id,
                data.nome,
                data.endereco,
                data.email,
                data.telefone
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
            const queryGet = "SELECT * FROM clientes WHERE id = ?"; 
            const [resultGet, fields] = await connection.query(queryGet, [id]);
            
            const query = "UPDATE clientes SET nome = ?, endereco = ?, email = ?, telefone = ? WHERE id = ?"; 
    
            const result = await connection.query(query, [
                data.nome || resultGet[0].nome,
                data.endereco || resultGet[0].endereco,
                data.email || resultGet[0].email,
                data.telefone || resultGet[0].telefone,
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
            const query = "DELETE FROM clientes WHERE id = ?"; 
            const [results, fields] = await connection.query(query, [id]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}