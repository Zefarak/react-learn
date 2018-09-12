import React from 'react';
import Field from './FieldComponent';
import ClassSelect from './CourseSelect'


let apiClient;

class FinalMove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields:{
                name: '',
                email: '',
                course: null,
                department: null
            },
            fieldErrors: {},
            people: [],
            _loading: false,
            _saveStatus: 'READY'
        }
    }

    static displayName = 'FinalMove'

    componentWillMount() {
        this.setState({_loading: true});
        apiClient.loadPeople().then((people) => {
            this.setState({_loading: false, people:people})
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const person = this.state.fields;

        if (this.validate()) return ;
        const people = [...this.state.people, person]
        this.setState({_saveStatus: 'SAVING'});
        apiClient.savePeople(people)
        .then(() => {
            this.setState({
                people: people,
                fields: {
                    name: '',
                    email: '',
                    course: null, 
                    department: null
                },
                _saveStatus: 'SUCCESS'
            })
        }).catch((err) => {
            console.log(err);
            this.setState({_saveStatus: 'ERROR'})
        })

    }

    onInputChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        const fields = this.state.fields;
        fields[name] = value
        

    }


}
