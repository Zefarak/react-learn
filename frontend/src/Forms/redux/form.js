import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
    static displayName = 'Redux Form';

    static propTypes = {
        people: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        saveStatus: PropTypes.string.isRequired,
        fields: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    };

    state = {
        fields: this.props.fields || {
            name: '',
            email: '',
            course: null,
            derpartment: null
        },
        fieldsErrors: {}
    }

    componentWillReceiveProps(update) {
        console.log('this.props.fields', this.props.fields)
        this.setState({fields: update.fields})
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const person = this.state.fields;
        if (this.validate()) return ;
        this.props.onSubmit([...this.props.people, person]);

    }

    onChangeInput = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        const fields = this.state.fields;
        const fieldsErrors = this.state.fieldsErrors;
        fields[name] = value
        fieldsErrors[name] = event.target.error;
        this.setState({ fields, fieldsErrors})
    }

    validate = () => {
        const person = this.state.fields;
        const fieldsErrors = this.state.fieldsErrors;
        const errMessages = Object.keys(fieldsErrors).filter((k) => fieldsErrors[k])

        if (!person.name) return true;
        if (!person.email) return true;
        if (!person.course) return true;
        if (!person.department) return true;
        if (errMessages.length) return true;

        return false;
    }

    render() {
        if (this.props.isLoading) {
          return <img alt='loading' src='/img/loading.gif' />;
        }
    
        const dirty = Object.keys(this.state.fields).length;
        let status = this.props.saveStatus;
        if (status === 'SUCCESS' && dirty) status = 'READY';
    
        return (
          <div>
            <h1>Sign Up Sheet</h1>
    
            <form onSubmit={this.onFormSubmit}>
    
              <Field
                placeholder='Name'
                name='name'
                value={this.state.fields.name}
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Name Required')}
              />
    
              <br />
    
              <Field
                placeholder='Email'
                name='email'
                value={this.state.fields.email}
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Email Required')}
              />
    
              <br />
    
              <CourseSelect
                department={this.state.fields.department}
                course={this.state.fields.course}
                onChange={this.onInputChange}
              />
    
              <br />
    
              {{
                SAVING: <input value='Saving...' type='submit' disabled />,
                SUCCESS: <input value='Saved!' type='submit' disabled />,
                ERROR: <input
                  value='Save Failed - Retry?'
                  type='submit'
                  disabled={this.validate()}
                />,
                READY: <input
                  value='Submit'
                  type='submit'
                  disabled={this.validate()}
                />,
              }[status]}
    
            </form>
    
            <div>
              <h3>People</h3>
              <ul>
                {this.props.people.map(({ name, email, department, course }, i) =>
                  <li key={i}>{[ name, email, department, course ].join(' - ')}</li>
                ) }
              </ul>
            </div>
          </div>
        );
      }
}

export default Form;