import dates from '../utils/dates'
import '../css/Event.css'

const Event = (props) => {
    const formattedTime = props.time ? dates.formatTime(props.time) : ''
    const formattedDate = props.date ? dates.formatDate(props.date) : ''
    const remainingTime = dates.formatRemainingTime(props.date, props.time)

    return (
        <article className='event-information'>
            <img src={props.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {formattedDate} <br /> {formattedTime}</p>
                    {remainingTime === "Event has already passed" ? (
                        <p className='negative-time-remaining'>{remainingTime}</p>
                    ) : (
                        <p id={`remaining-${props.id}`}>{remainingTime}</p>
                    )}
                </div>
            </div>
        </article>
    )
}

export default Event