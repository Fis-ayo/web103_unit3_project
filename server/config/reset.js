import './dotenv.js';
import { pool } from './database.js';
import virtualSpaceData from '../data/virtualSpace.js';

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
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
    await pool.query(createTablesQuery);
    console.log('Database tables created successfully');
}

const seedLocations = async () => {
    await Promise.all(virtualSpaceData.locationsData.map( async (location) => {
        await pool.query(`
            INSERT INTO locations (name, address, city, state, zip, image)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [location.name, location.address, location.city, location.state, location.zip, location.image])
    }));
    console.log('Locations seeded successfully');
}


const seedEvents = async () => {
    await Promise.all(virtualSpaceData.eventsData.map(async (event) => {
        await pool.query(`
            INSERT INTO events (title, date, time, image, locationID)
            VALUES ($1, $2, $3, $4, $5)
        `, [event.title, event.date, event.time, event.image, event.locationID]);
    }));
    console.log('Events seeded successfully');
}

const resetDatabase = async () => {
    try {
        await createTables();
        await seedLocations();
        await seedEvents();
        console.log('Database reset and seeded completely 🚀');
    } catch(err) {
        console.error('Error resetting database:', err);
    }
}

resetDatabase();