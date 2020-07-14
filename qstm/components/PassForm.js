import React from 'react';

export default class PassForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name : '',
        }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
    }
  
    handleChange(event) {
      const newName = event.target.value
      this.setState({
        name: newName
      })
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.props.onThingCreate(this.state);
    }
  
    render() {
      return (
        <form id="site-form" onSubmit="">

          <label>New Password:</label>
          <input type="text"></input>
          <br></br>

          <button type="submit"> Update </button>
        </form>
      )
    }
  } 
