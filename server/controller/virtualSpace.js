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
            ORDER BY date ASC
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
                zip,
                image
            FROM locations
            ORDER BY name ASC
        `);

        res.status(200).json(locationsData.rows);
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}

const getLocation = async (req, res) => {
    const locationId = req.params.locationId;
    try{
        const locationsData = await pool.query(`
            SELECT
                id,
                name,
                address,
                city,
                state,
                zip,
                image
            FROM locations
            WHERE id = $1
        `, [locationId]);

        res.status(200).json(locationsData.rows[0]);

    }
    catch(err) {
        res.status(409).json({ error: err.message });
    }
}

const getEventsByLocationId = async (req, res) => {
    const locationId = req.params.locationId;
    try {
        const eventsData = await pool.query(`
            SELECT
                id,
                title,
                date,
                time,
                image,
                locationID
            FROM events
            WHERE locationID = $1
            ORDER BY date ASC
        `, [locationId])

        res.status(200).json(eventsData.rows)
    }
    catch(err) {
        res.status(409).json({ error: err.message });
    }
}

export default {
    getEvents,
    getLocations,
    getLocation,
    getEventsByLocationId
}