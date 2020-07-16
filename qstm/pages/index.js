import React from 'react'
import axios from 'axios'
import Router from 'next/router'
import { basicFetch } from '../utils/basicFetch'
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

    let url = ApiUrl.ROOT
    
    let userInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    
    try {
      const response = await axios.post(url, userInfo)
      // console.log(response)
      window.localStorage.clear();
      window.localStorage.setItem('token', response.data);


      url = ApiUrl.BASE + ApiUrl.USER + `?username=${this.state.username}`

      const userResponse = await axios.get(url);

      if (userResponse.data.length != 1){
        throw "Not unique user"
      }

      const activeUser = userResponse.data[0]
    
      // console.log(activeUser)

      if (activeUser.is_parent) {
        const parentUrl = ApiUrl.BASE + ApiUrl.PARENT + `?email=${activeUser.email}`
        const newParent = await basicFetch(parentUrl)

        // console.log('is parent!', newParent[0])
        Router.push(`/parent_dashboard/${newParent[0].id}`);

      } else {

        const studentUrl = ApiUrl.BASE + ApiUrl.STUDENT + `?user_id=${activeUser.id}`
        // console.log(studentUrl)
        const newStudent = await basicFetch(studentUrl)

        Router.push(`/student_dashboard/${newStudent[0].id}`);
      }
      

      
    } catch(error) {
      if (error.response.status == 401) {
        console.log('Invalid Credentials')
      }
    }

  }

  render() {      
    return (
      
      <html style={{backgroundColor:'#4d597a'}}>
      <div>
        <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
        <h1 style={{color:'#ff8a01'}}>Login Page</h1>
        {/* <label>
          Username: 
        </label> */}
        <input type="text" name="username" placeholder = 'username' value={this.state.username} onChange={this.onChange}></input><br></br>

        {/* <label>
          Password: 
        </label> */}
        <input type="password" name="password" placeholder='password' value={this.state.password} onChange={this.onChange}></input><br></br>

        <button style={{backgroundColor:'#152459', color:'#ff8a01'}}onClick={this.onClick}>Login</button>
        <style jsx>{`
          label {
            color: #ff8a01;
            margin-left:;
            width: 100px;
            
          }
          body {
            background-color: #4d597a;
          }
          h1 {
            color: #ff8a01;
          }
          div {
            background-color: #4d597a;
            margin-left: 40%;
          }
        `}</style>

      </div>
      </html>
    )
  }
}
