//core module
const os = require('os');
const fs = require('fs');
//local module
const luasSegitiga = require('./luasSegitiga.js');

// membuat file menggunakan module fs
fs.writeFileSync('hello.txt', 'Hello World');

//membaca file menggunakan module fs
const data = fs.readFileSync('hello.txt', 'utf-8');
console.log(data);

console.log('Hello World');
console.log(os.hostname());
console.log(os.freemem());
console.log(os.networkInterfaces());
console.log(luasSegitiga(3, 4));
