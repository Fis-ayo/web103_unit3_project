import './dotenv.js';
import { pool } from './database.js';

const resetDatabase = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME WITHOUT TIME ZONE NOT NULL,
            image VARCHAR(255) NOT NULL,
            locationID INT NOT NULL,
            FOREIGN KEY (locationID) REFERENCES locations(id)
        );
    `;

    try {
        await pool.query(createTablesQuery);
        console.log('Database reset successfully');
    } catch(err) {
        console.error('Error resetting database:', err);
    }
}

resetDatabase();