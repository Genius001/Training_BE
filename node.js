const fs = require('fs');
const http = require('http');
const url = require('url');

function onRequest(request, response) {
    const data = fs.readFileSync('cars.json', 'utf-8');
    const query = url.parse(request.url, true).query;
    const dataParse = JSON.parse(data);

    const search = query.name ?
        dataParse.cars.find((el) =>
            el.name === query.name) : dataParse;

    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    response.write(JSON.stringify(search));
    response.end();
}

const server = http.createServer(onRequest);

server.listen(3000);