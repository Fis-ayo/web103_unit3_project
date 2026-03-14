const formatTime = (time) => {
    let timeArr = time.split(':')
    let hours = timeArr[0]
    let minutes = timeArr[1]

    if(hours >= 12) {
        hours = hours - 12
        return hours + ':' + minutes + ' PM'
    }
    else {
        return hours + ':' + minutes + ' AM'
    }

}

const formatRemainingTime = (date, time) => {
    const dateOnly = date.split('T')[0]
    const eventDate = new Date(`${dateOnly}T${time}`)
    const now = new Date()

    if(eventDate < now) {
        return "Event has already passed"
    }

    let yearsDiff = eventDate.getFullYear() - now.getFullYear()
    let monthsDiff = eventDate.getMonth() - now.getMonth()
    let daysDiff = eventDate.getDate() - now.getDate()

    if (daysDiff < 0) {
        monthsDiff = monthsDiff - 1
        const previousMonth = new Date(eventDate.getFullYear(), eventDate.getMonth(), 0)
        daysDiff = daysDiff + previousMonth.getDate()
    }
    if (monthsDiff < 0) {
        yearsDiff -= 1;
        monthsDiff += 12;
    }

    const totalMonths = (yearsDiff * 12) + monthsDiff;
    if (totalMonths > 0) {
        return `${totalMonths} months, ${daysDiff} days`;
    } else {
        return `${daysDiff} days`;
    }
}

const formatNegativeTimeRemaining = (time, id) => {

}

const formatDate = (date) => {
    const dateObj = new Date(date)

    return dateObj.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

}

export default {
    formatTime,
    formatRemainingTime,
    formatNegativeTimeRemaining,
    formatDate
}