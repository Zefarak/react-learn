import React from 'react';
import ReactDOM from 'react-dom';

import App from './ChatSimple/App.js'


class App_ extends React.Component {

    render() {
        return (
            <div>
             <App />
            </div>
        )
    }
}


ReactDOM.render(<App_ />,document.getElementById('app'));
