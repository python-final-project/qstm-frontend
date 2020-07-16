import React from 'react';

export default class UpdateSiteForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: this.props.site.url,
        account: this.props.site.account,
        password: this.props.site.password,
        class_topic: this.props.site.class_topic,
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    
    handleSubmit(event) {
      event.preventDefault();

      let id = this.props.site.id
      let isUpdate = (event.target.value == "Update")

      let siteInfo = {
        student_id: this.props.site.student_id,
        url: this.state.url,
        account: this.state.account,
        password: this.state.password,
        class_topic: this.state.class_topic,
      }

      this.props.handleSiteUpdate(siteInfo, id, isUpdate)
    }
    
    render() {
      return (
        
        <div>
          <label>Site URL:</label>
          <input type="text" name="url" value={this.state.url} onChange={this.handleChange}></input>
          <br></br>

          <label>Site Account Username:</label>
          <input type="text" name="account" value={this.state.account} onChange={this.handleChange}></input>
          <br></br>

          <label>Site Password:</label>
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <br></br>

          <label>Class Topic // Site Name:</label>
          <input type="text" name="class_topic" value={this.state.class_topic} onChange={this.handleChange}></input>
          <br></br>

          <button type="button" onClick={this.handleSubmit} value="Update"> Update </button>
          <button type="button" onClick={this.handleSubmit} value="Delete"> Delete </button>
        </div>
      )
    }
  } 
