import { join, dirname } from "node:path";
import { parse, fileURLToPath } from 'node:url';
import { routes } from './routes/apiRoute.js';

const apiRoute = routes()

const allRoutes = {
    ...apiRoute,
    default: (request, response) => {
        response.writeHead(404, {'content-type': 'application/json'})
        response.write('error');
        response.end()
    }
}

function handler(request, response) {
    const {
        url,
        method
    } = request;

    const {
        pathname, 
        query
    } = parse(url, true);


    const key = `${pathname}:${method.toLowerCase()}`;

    const chosen = allRoutes[key] || allRoutes.default;
    if (method.toLowerCase() === "post") {
        return Promise.resolve(chosen(request, response)).catch(handlerError(response));
    }else{
        return Promise.resolve(chosen(request, response, query.id)).catch(handlerError(response));
    }
}

function handlerError(response) {
    return error => {
        response.writeHead(500, {'content-type': 'application/json'});
        response.write(JSON.stringify("Erro ao fazer a requisição!"));
        return response.end();
    }
}

export default handler;