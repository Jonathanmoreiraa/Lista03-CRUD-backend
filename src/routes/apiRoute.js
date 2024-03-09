import {once} from 'node:events';
import { clienteEntity } from '../entities/clienteEntity.js';
import ClienteRepository from '../repositories/clientRepository.js';
import { produtoEntity } from '../entities/produtoEntity.js';
import ProdutoRepository from '../repositories/produtorepository.js';
import { pedidoEntity } from '../entities/pedidoEntity.js';
import PedidoRepository from '../repositories/pedidoRepository.js';

const clienteRepo = new ClienteRepository();
const produtoRepo = new ProdutoRepository();
const pedidoRepo = new PedidoRepository();

const routes = () => ({
    '/clientes:get': async (request, response, id) => {
        const clientes = await clienteRepo.find(id)
        response.writeHead(200, {'content-type': 'application/json'});
        response.write(JSON.stringify(clientes));
        response.end()
    },

    '/clientes:post': async (request, response) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data.toString());
        const newData = new clienteEntity(item);

        const id = await clienteRepo.create(newData);
        response.writeHead(201, {'content-type': 'application/json'});
        response.write(JSON.stringify('Cliente criado com sucesso!'));
        response.end()
    },

    '/clientes:put': async (request, response, id) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data.toString());

        const dataUpdated = await clienteRepo.edit(id, item);
        response.write(JSON.stringify('Cliente editado com sucesso!'));
        response.end()
    },

    '/clientes:delete': async (request, response, id) => {
        const clientes = await clienteRepo.delete(id)
        response.writeHead(200)
        response.write(JSON.stringify('Cliente apagado com sucesso!'));
        response.end()
    },

    '/produtos:get': async (request, response, id) => {
        const produtos = await produtoRepo.find(id)
        response.writeHead(200, {'content-type': 'application/json'});
        response.write(JSON.stringify(produtos));
        response.end()
    },

    '/produtos:post': async (request, response) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data.toString());
        const newData = new produtoEntity(item);

        const id = await produtoRepo.create(newData);
        response.writeHead(201, {'content-type': 'application/json'});
        response.write(JSON.stringify('Produto criado com sucesso!'));
        response.end()
    },

    '/produtos:put': async (request, response, id) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data.toString());

        const dataUpdated = await produtoRepo.edit(id, item);
        response.write(JSON.stringify('Produto editado com sucesso!'));
        response.end()
    },

    '/produtos:delete': async (request, response, id) => {
        const clientes = await produtoRepo.delete(id)
        response.writeHead(200)
        response.write(JSON.stringify('Produto apagado com sucesso!'));
        response.end()
    },

    '/pedidos:get': async (request, response, id) => {
        const pedidos = await pedidoRepo.find(id)
        response.writeHead(200, {'content-type': 'application/json'});
        response.write(JSON.stringify(pedidos));
        response.end()
    },

    '/pedidos:post': async (request, response) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data.toString());
        const newData = new pedidoEntity(item);

        const id = await pedidoRepo.create(newData);
        response.writeHead(201, {'content-type': 'application/json'});
        response.write(JSON.stringify('Pedido criado com sucesso!'));
        response.end()
    },

    '/pedidos:put': async (request, response, id) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data.toString());

        const dataUpdated = await pedidoRepo.edit(id, item);
        response.write(JSON.stringify('Pedido editado com sucesso!'));
        response.end()
    },

    '/pedidos:delete': async (request, response, id) => {
        const clientes = await pedidoRepo.delete(id)
        response.writeHead(200)
        response.write(JSON.stringify('Pedido apagado com sucesso!'));
        response.end()
    },
})

export {
    routes
}
