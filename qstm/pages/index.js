import React from 'react'
import axios from 'axios'
import Login from '../components/LoginForm'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/users/';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.LoginHandler = this.LoginHandler.bind(this);    
  }


  async LoginHandler(info) {
      console.log(info.username)
      console.log(info.password == '')
      // const response = await axios.get(url, info);
      const query = url +  '?account_name=' + info.username + '&password=' + info.password
      console.log(query)
      const response = await axios.get(query)
      // console.log(url + query)
      console.log(response)
      // console.log(url, info)
      // console.log(response.config.url)
  }






  render(){      
    return <div>
      <main>
        <Login onLogin={this.LoginHandler}/>      
      </main>      
      </div>
  }
}
