const pool = require('../../config/db.js');
class Cars {
    async getCars(req, res) {
        try {
            const cars = await pool.query('SELECT id, name, year, type, manufactur, price, img FROM cars');
            res.status(200).json(cars.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
    async getCarById(req, res) {
        const { id } = req.params;
        try {
            const car = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
            res.status(200).json(car.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async createCar(req, res) {
        const { name, year, type, manufactur, price, img,
            licenseNumber, seat, baggage, transmission, description,
            isDriver, isAvailable } = req.body;
        try {
            const car = await pool.
                query(`INSERT INTO cars
                    (name, year, type, manufactur, price, img,
                    "licenseNumber", seat, baggage, transmission,
                    description, "isDriver", "isAvailable")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,
                    $10, $11, $12, $13) RETURNING *`,
                    [name, year, type, manufactur,
                        price, img, licenseNumber, seat, baggage,
                        transmission, description, isDriver, isAvailable]);
            res.status(200).json(car.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
    async updateCar(req, res) {
        const { id } = req.params;
        const { name, year, type, manufactur, price, img,
            licenseNumber, seat, baggage, transmission, description,
            isDriver, isAvailable } = req.body;
        try {
            const car = await pool.
                query(`UPDATE cars SET name = $1, year = $2, type = $3, manufactur = $4,
                    price = $5, img = $6, "licenseNumber" = $7, seat = $8, baggage = $9,
                    transmission = $10, description = $11, "isDriver" = $12, "isAvailable" = $13
                    WHERE id = $14 RETURNING *`,
                    [name, year, type, manufactur,
                        price, img, licenseNumber, seat, baggage,
                        transmission, description, isDriver, isAvailable, id]);
            res.status(200).json(car.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
    async deleteCar(req, res) {
        const { id } = req.params;
        try {
            const car = await pool.query('DELETE FROM cars WHERE id = $1', [id]);
            if (car.rowCount === 0) {
                return res.status(404).send('Car not found');
            }
            res.status(200).json('Car deleted successfully');
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}


module.exports = new Cars()