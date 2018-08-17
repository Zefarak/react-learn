import React from 'react'
import PropTypes from 'prop-types';
https://github.com/Zefarak/book-fullstack-react/blob/master/forms/src/08-field-component-field.js
237

class Field extends React.Component {

    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
      };
    
      state = {
        value: this.props.value,
        error: false,
      };
    
      componentWillReceiveProps(update) {
        this.setState({ value: update.value });
      }
    
      onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;
    
        this.setState({ value, error });
    
        this.props.onChange({ name, value, error });
      };
    
      render() {
        return (
          <div>
            <input
              placeholder={this.props.placeholder}
              value={this.state.value}
              onChange={this.onChange}
            />
            <span style={{ color: 'red' }}>{ this.state.error }</span>
          </div>
        );
      }
}

class MyForm extends React.Component {

    static displayName = "08-field-component-form";

  state = {
    fields: {
      name: '',
      email: '',
    },
    fieldErrors: {},
    people: [],
  };

  onFormSubmit = (evt) => {
    const people = this.state.people;
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: '',
      },
    });
  };

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  };

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
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
            validate={(val) => (val ? false : 'Name Required')}
          />

          <br />

          <input type='submit' disabled={this.validate()} />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            { this.state.people.map(({ name, email }, i) =>
              <li key={i}>{name} ({email})</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}

export default MyForm;