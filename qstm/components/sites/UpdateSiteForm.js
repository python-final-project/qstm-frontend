import React from 'react';

export default class UpdateSiteForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: '',
        account: '',
        password: '',
        class_topic: '',
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
    }
  
    handleChange(event) {
      // console.log(this.state['url'])
      // let newState = {}
      // newState[event.target.name] = event.target.value
      // this.setState(newState)
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    
    handleSubmit(event) {
      event.preventDefault();
      
      let siteInfo = {
        url: this.state.url,
        account: this.state.account,
        password: this.state.password,
        class_topic: this.state.class_topic,
      }

      this.props.onSubmit(siteInfo)
    }
    
    render() {
      return (
        <form id="site-form" onSubmit={this.handleSubmit}>

          <label>Site URL:</label>
          <input type="text" name="url" value={this.state.url} onChange={this.handleChange}></input>
          <br></br>

          <label>Site Account Username:</label>
          <input type="text" name="account" value={this.state.account} onChange={this.handleChange}></input>
          <br></br>

          <label>Site Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <br></br>

          <label>Class Topic // Site Name:</label>
          <input type="text" name="class_topic" value={this.state.class_topic} onChange={this.handleChange}></input>
          <br></br>

          <button type="submit"> Update </button>
        </form>
      )
    }
  } 
