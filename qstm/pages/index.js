import React from 'react'
import axios from 'axios'
import Login from '../components/LoginForm'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/users/';


class App extends React.Component {
  render(){      
    return <div>
      <main>
        <Login />      
      </main>      
      </div>
  }
}

export default App;
