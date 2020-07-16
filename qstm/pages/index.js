import React from 'react'
import axios from 'axios'

import ApiUrl from '../constants/url'




export default class Home extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onClick  = this.onClick.bind(this);

  }


  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async onClick() {

    const url = ApiUrl.ROOT
    
    let userInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    
    try {
      const response = await axios.post(url, userInfo)
      console.log(response)
      window.localStorage.clear();
      window.localStorage.setItem('token', response.data);

      
    } catch(error) {
      if (error.response.status == 401) {
        console.log('Invalid Credentials')
      }
    }

  }

  render() {      
    return (
      <div>
        <h1>Login Page</h1>
        <label>
          Username: 
        </label>
        <input type="text" name="username" value={this.state.username} onChange={this.onChange}></input>

        <label>
          Password: 
        </label>
        <input type="password" name="password" value={this.state.password} onChange={this.onChange}></input>

        <button onClick={this.onClick}>Login</button>

      </div>
    )
  }
}
