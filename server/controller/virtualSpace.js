import { pool } from '../config/database.js';

const getEvents = async (req, res) => {
    try{
        const eventsData = await pool.query(`
            SELECT
                id,
                title,
                date,
                time,
                image,
                locationID
            FROM events
            ORDER BY date ASC;
        `);

        res.status(200).json(eventsData.rows);
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }

}

const getLocations = async (req, res) => {
    try{
        const locationsData = await pool.query(`
            SELECT
                id,
                name,
                address,
                city,
                state,
                zip
            FROM locations;
        `);

        res.status(200).json(locationsData.rows);

    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    getEvents,
    getLocations
}