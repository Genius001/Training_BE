const express = require('express');
const http = require('http');
const pg = require('pg');
const { Client } = pg;
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'car_rental',
    password: 'Underworld01',
    port: 5432
})

client.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
})

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/about', (req, res) => {
    res.status(200).send('Page About');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.status(200).send('Register Succes');
    res.status(500).send('Register Failed');
    res.status(404).send('Not Found');
});

// app.get('/cars', (req, res) => {
//     client.query('SELECT * FROM cars', (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.status(200).json(result.rows);
//         }
//     })
// });

// app.get('/cars', async (req, res) => {
//     const data = await client.query('SELECT * FROM cars');
//     console.log(data);
//     res.status(200).json(data.rows);
// });

app.get('/cars2', (req, res) => {
    client.query('SELECT * FROM cars')
        .then((data) => {
            res.status(200).json(data.rows);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/cars', async (req, res) => {
    const {
        manufactur, type, licenseNumber, seat, baggage,
        transmission, year, name, description,
        isDriver, isAvailable, img, price,
        createdDt, updatedDt, createdBy, updatedBy
    } = req.body;

    try {
        const result = await client.query(
            `INSERT INTO cars (
                manufactur, type, "licenseNumber", seat, baggage,
                transmission, year, name, description,
                "isDriver", "isAvailable", img, price,
                "createdDt", "updatedDt", "createdBy", "updatedBy"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
            [
                manufactur, type, licenseNumber, seat, baggage,
                transmission, year, name, description,
                isDriver, isAvailable, img, price,
                createdDt, updatedDt, createdBy, updatedBy
            ]
        );

        res.status(201).json(result.rows[0]); // Send back the created car
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

app.put('/cars/update', async (req, res) => {
    const id = parseInt(req.body.id, 10);
    const { manufactur, type, licenseNumber, seat, baggage,
        transmission, year, name, description,
        isDriver, isAvailable, img, price,
        createdDt, updatedDt, createdBy, updatedBy
    } = req.body;

    try {
        const result = await client.query(
            `UPDATE cars SET
                manufactur = $1, type = $2, "licenseNumber" = $3, seat = $4, baggage = $5,
                transmission = $6, year = $7, name = $8, description = $9,
                "isDriver" = $10, "isAvailable" = $11, img = $12, price = $13,
                "createdDt" = $14, "updatedDt" = NOW(), "createdBy" = $15, "updatedBy" = $16
            WHERE id = $17 RETURNING *`,
            [
                manufactur, type, licenseNumber, seat, baggage,
                transmission, year, name, description,
                isDriver, isAvailable, img, price,
                createdDt, createdBy, updatedBy, id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})