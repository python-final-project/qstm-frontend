import React from 'react';


export default class SiteForm extends React.Component {
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

          <label>Site URL:</label>
          <input type="text"></input>
          <br></br>

          <label>Description:</label>
          <input type="text"></input>
          <br></br>

          <label>Site Username:</label>
          <input type="text"></input>
          <br></br>

          <label>Site Password:</label>
          <input type="text"></input>
          <br></br>

          <label>Class Teacher:</label>
          <input type="text"></input>
          <br></br>

          <button type="submit"> Add Site </button>
        </form>
      )
    }
  } 

  {/* <input type="text" value={this.state.name} onChange={this.handleChange}>
            </input>     */}