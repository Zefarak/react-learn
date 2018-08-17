import React from 'react';
import TimersDashboard from '../TrackingApp/TimersDashboard';



class Index extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
          <div>
          <TimersDashboard />
          </div>
                

        )
    }


}

export default Index;