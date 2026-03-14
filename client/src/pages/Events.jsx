import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locationFilter, setLocationFilter] = useState('')

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await EventsAPI.getAllEvents()
            setEvents(eventsData)
        }
        fetchEvents()
    }, [])

    const handleLocationChange = (locationId) => {
        setLocationFilter(locationId)
    }

    const filteredEvents = locationFilter 
        ? events.filter((event) => event.locationid === parseInt(locationFilter)) 
        : events;

    return (
        <div className='events'>
            <header>
                <select onChange={(e) => handleLocationChange(e.target.value)}>
                    <option value=''>See events at ...</option>
                    <option value='1'>Echo Arena</option>
                    <option value='2'>Neon Arcade</option>
                    <option value='3'>Starlight Pavilion</option>
                    <option value='4'>The Grand Library</option>
                </select>
                <button className='header-events-btn' onClick={() => handleLocationChange('')}>SHOW ALL EVENTS</button>
            </header>
            <main>
                {filteredEvents && filteredEvents.length > 0 ? filteredEvents.map((event) => (
                    <Event
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        date={event.date}
                        time={event.time}
                        image={event.image}
                    />
                )) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events available!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events
