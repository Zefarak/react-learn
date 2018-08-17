import cookie from 'react-cookies'

function getData(endpoint, thisComp, key) {
    const lookupOptions = {
        method: 'GET',
        headers: {
            'ContentType': 'application/json'
        }
    };

    fetch(endpoint, lookupOptions)
        .then(function (response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                [key]: responseData
            })
    })
}

function postData(endpoint, thisComp, key, data) {
    const lookupOptions = {
        method: 'POST',
        headers: {
            'ContentType': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, lookupOptions)
        .then(function (response) {
            return response.json()
        }).then(function(responseData){
            let [my_state] = thisComp.state;
            thisComp.setState({
                [key]: my_state[key].concat(responseData)
            })
    })
}

export {
    getData,
    postData
}