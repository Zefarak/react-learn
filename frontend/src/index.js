import React from 'react';
import ReactDOM from 'react-dom';

import ProductList from './voting_app/app';
import TimersDashboard from  './TrackingApp/app'
import classSelect from'./Forms/CourseSelect'




class App extends React.Component {

    render() {
        return (
            <div>
             <classSelect />
            </div>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));
