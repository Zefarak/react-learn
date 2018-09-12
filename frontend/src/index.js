import React from 'react';
import ReactDOM from 'react-dom';

import ChatApp from './Redux/ChatInter/app.js'


class App extends React.Component {

    render() {
        return (
            <div>
             <ChatApp />
            </div>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

