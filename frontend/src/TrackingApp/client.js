import cookie from 'react-cookies'

function startTimer(data) {
    return fetch('/api/timers/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.get('csrftoken')
        },
        body: JSON.stringify(data)
    }).then(checkStatus)
}

export default startTimer;