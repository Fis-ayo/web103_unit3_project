const getLocationById = async(locationId) => {
    try{
        const response = await fetch(`http://localhost:3000/api/location/${locationId}`);
        if(!response.ok) {
            throw new Error('Failed to fetch location by id')
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error fetching location by id", error);
    }
}

const getAllLocations = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/locations');
        if(!response.ok) {
            throw new Error('Failed to fetch all locations')
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error fetching locations", error);
    }
}
export default { getLocationById, getAllLocations }