import React from 'react';
222
const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class FormTut extends React.Component {

    static displayName = "o1-basic-button";
    state = {names:[]};

    onFormSubmit = (evt) => {
        evt.preventDefault()
        const name = this.refs.name.value;
        const names = [...this.state.names, name]
        this.setState({
            names: names
        })
        this.refs.name.value ='';
    }

    render() {
        return (
          <div>
            <h1>Sign Up Sheet</h1>
    
            <form onSubmit={this.onFormSubmit}>
              <input
                placeholder='Name'
                ref='name'
              />
    
              <input type='submit' />
            </form>
    
            <div>
              <h3>Names</h3>
              <ul>
                { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
              </ul>
            </div>
          </div>
        );
      }

  
    
}

