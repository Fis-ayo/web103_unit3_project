const getAllEvents = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/events');
        if(!response.ok) {
            throw new Error('Failed to fetch events')
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error('Error fetching events', error)
    }
}

const getEventsByLocationId = async(locationId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/location/${locationId}/events`)
        if(!response.ok) {
            throw new Error('Failed to fetch events by location id')
        }

        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error('Error fetching events by location Id')
    }
}

export default { getAllEvents, getEventsByLocationId }
