import React from 'react';
import {getData, postData} from './help'
import {newTimer, renderElapsedString} from './helpers'



class TimersDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            timers: []
        }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        const endpoint = '/api/timers/';
        const thisComp = this;
        const key = 'timers';
        getData(endpoint, thisComp, key)
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    handleEditFormSumbit = (attrs) =>{
        this.updateTimer(attrs)
    };

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId)
    };

    createTimer = (timer) => {
        const endpoint = '/api/timers/';
        const new_timer = newTimer(timer);
        const thisComp  = this;
        postData(endpoint, thisComp, 'timers', new_timer)

    };

    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer)=>{
                if(timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project:attrs.project
                    });
                } else {
                    return timer
                }
            })
        })
    };

    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t =>t.id !== timerId)
        })
    };

    startTimer = (timerId) => {
        const now = Date.now();

        this.setState({
            timers: this.state.timers.map((timer)=>{
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince: now
                    })
                } else {
                    return timer
                }
            })
        });

        client.startTimer({
            start: now
        })
    };

    stopTimer = (timerId) => {
        const now = Date.now();

        this.setState({
            timers: this.state.timers.map((timer)=>{
                if(timer.id === timerId) {
                    const lastElapsed = now - timer.runningSince;
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null
                    })
                } else {
                    return timer
                }
            })
        });

        client.stopTimer(
            {id: timerId,
            stop: now
            }
        )
    };

    handleStartClick =(timerId) => {
        this.startTimer(timerId)
    };

    handleStopClick = (timerId) => {
        this.stopTimer(timerId)
    };

    render(){
        return(
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList
                        timers={this.state.timers}
                        onFormSubmit={this.handleEditFormSumbit}
                        onTrashSubmit={this.handleTrashClick}
                        onStartClck={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                    />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                        isOpen={true}
                    />
                </div>
            </div>
            )

    }
}


class EditableTimerList extends React.Component{

    render() {
        const timers = this.props.timers.map((timer)=>{
            return(
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                    onFormSubmit={this.props.onFormSubmit}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            )
        });
        return (
            <div id="timers">
                {timers}
            </div>
        )
    }
}

class EditableTimer extends React.Component{

    state = {
        editFormOpen: false
    };

    handleEditClick = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm()
    };

    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.closeForm()
    };

    closeForm = () => {
        this.setState({editFormOpen: false})
    };

    openForm = () => {
        this.setState({editFormOpen: true})
    };

    render(){
        if(this.state.editFormOpen) {
            return(
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                />
            )
        } else {
            return (
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                />
            )
        }
    }
}


class TimerForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: this.props.title || '',
            project: this.props.project || ''
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        })
    };

    render() {
        const submitText = this.props.tile ? 'Update': 'Create';
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input type="text"
                                   value={this.state.title}
                                   onChange={this.handleChange}

                            />
                        </div>
                        <div className="field">
                            <label>Project</label>
                            <input type="text"
                                   value={this.state.project}
                                   onChange={this.handleChange}
                            />
                        </div>
                        <div className="ui two bottom attached buttons">
                            <button
                                className="ui basic blue button"
                                onClick={this.handleChange}
                            >
                                {submitText}
                            </button>
                            <button
                                className="ui basic red button"
                                onClick={this.props.onFormClose}
                            >
                                Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ToggleableTimerForm extends React.Component{

    constructor(props) {
        super(props);
        this.handleFormOpen = this.handleFormOpen.bind(this);
    }

    state = {
        isOpen: false
    };

    handleFormClose = () => {
        this.setState({isOpen: false})
    };

    handleFormOpen = () => {
        this.setState({ isOpen: true});
    };

    handleFormSubmit = (timer) => {
      this.props.onFormSubmit(timer);
      this.setState({isOpen: false})
    };

    render(){
        if(this.state.isOpen){
            return(
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            )
        } else {
            return (
                <div className="ui basic content center aligned segment">
                    <button onClick={this.handleFormOpen} className="ui basic button icon">
                        <i className="plus icon" />
                    </button>
                </div>
            )
        }
    }
}

class Timer extends React.Component{

    componentDidMount() {
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50)
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval);
    }

    handleStartClick = () => {
        this.props.onStartClick(this.props.id)
    };

    handleStopClick = () => {
        this.pros.onStopClick(this.props.id)
    };

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id)
    };

    render(){
        const elapsedString = renderElapsedString(
            this.props.elapsed, this.props.runningSince
        );

        return(
            <div className="ui centered card">
                <div className="content">
                    <div className="header">
                    {this.props.title}
                    </div>
                    <div className="meta">
                    {this.props.project}
                    </div>
                    <div className="center aligned description">
                    {elapsedString}
                    </div>
                    <div className="extra content">
                        <span className="right floated trash icon" onClick={this.handleTrashClick}>
                        <i className="trash icon" />
                        </span>
                    </div>
                </div>
                <div className="ui bottom attached blue basic button">
                    Start
                </div>
                <TimerActionButton
                    timerIsRunning={this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />


            </div>
        )
    }
}


class TimerActionButton extends React.Component {

    render(){

        if (this.props.timerIsRunning) {
            return (
            <div
                className="ui bottom attached red basic button"
                onClick={this.props.onStopClick}
            >
                Stop
            </div>
        )
        } else {
            return (
            <div
                className="ui bottom attached green basic button"
                onClick={this.props.onStartClick}
            >
                Start
            </div>
        )
        }
    }
}




export default TimersDashboard;