import React from 'react'
import axios from 'axios'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/users/';


export default class Login extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
          username:'',
          password :'',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.onLogin = this.onLogin.bind(this);
   }

  handleChange(event){
    if (event.target.name === "loginUserName"){
      const newValue = event.target.value;
      this.setState( {
          username : newValue
      })        
    }
  
    if (event.target.name === "loginPassword"){
      const newValue = event.target.value;
      this.setState( {
        password : newValue
      })        
    }  
  }
  

  handleSubmit(event) {
    event.preventDefault();    
    // console.log(this.state.username)
    // console.log(this.state.password)
    this.props.onLogin(this.state)
    const newUsername = ''
    const newPassword = ''
    this.setState({
      username: newUsername,
      password: newPassword,
    })


  }

  render(){
    return (
      <form onSubmit={this.handleSubmit }>
          <label> User: </label>
          <input 
            name="loginUserName" type="text" value={this.state.name}  onChange={this.handleChange}>  
          </input>              
          <label> Password: </label>
          <input 
            name="loginPassword" type="text" value={this.state.value}  onChange={this.handleChange}>  
          </input>  
          <button>Login!</button>
      </form>
    )
  }


}


export async function getServerSideProps() {
  const response = await fetch(url);
  const users = await response.json();
  // console.log('this is the length', users)
  return {
    props: {
      users: users,
    },
  }

}
