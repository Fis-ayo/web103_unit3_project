import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import { useParams } from 'react-router-dom'

const LocationEvents = () => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchLocation = async () => {
            const [response, eventsResponse] = await Promise.all([LocationsAPI.getLocationById(id), EventsAPI.getEventsByLocationId(id)])
            setLocation(response)
            setEvents(eventsResponse)
        }
        fetchLocation()
    }, [id])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents