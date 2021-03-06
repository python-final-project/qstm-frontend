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
    this.onEnter = this.onEnter.bind(this);

  }

  onEnter(event) {
    if (event.key === 'Enter') {
      this.onClick()
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async onClick() {

    if (this.state.username == '' || this.state.password == '') {
      return
    }

    let url = ApiUrl.ROOT
    
    let userInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    
    try {
      const response = await axios.post(url, userInfo)
      window.localStorage.clear();
      window.localStorage.setItem('token', response.data);


      url = ApiUrl.BASE + ApiUrl.USER + `?username=${this.state.username}`

      const userResponse = await axios.get(url);

      

      if (userResponse.data.length != 1){
        throw "Not unique user"
      }

      const activeUser = userResponse.data[0]
    
      window.localStorage.setItem('isParent', activeUser.is_parent)


      if (activeUser.is_parent) {
        const parentUrl = ApiUrl.BASE + ApiUrl.PARENT + `?email=${activeUser.email}`
        const newParent = await basicFetch(parentUrl)

        window.localStorage.setItem('dashboard', `/parent_dashboard/${newParent[0].id}`)
 
        Router.push(`/parent_dashboard/${newParent[0].id}`);

      } else {

        const studentUrl = ApiUrl.BASE + ApiUrl.STUDENT + `?user_id=${activeUser.id}`
        const newStudent = await basicFetch(studentUrl)

        window.localStorage.setItem('dashboard', `/student_dashboard/${newStudent[0].id}`)

        Router.push(`/student_dashboard/${newStudent[0].id}`);
      }
      

      
    } catch(error) {
      if (error.response.status == 401) {
        alert('Invalid Username or Password. Please try again.')
        this.setState({
          username: '',
          password: '',
        })
      }
    }

  }

  render() {      
    return (
      
      <html style={{backgroundColor:'#4d597a'}}>        

      <div>
        <br></br> <br></br> <br></br> 
        <label className='qstm'> QSTM </label>
        <br></br> <br></br> <br></br> 
        <label className='qstmWords'> Quarantine Student Task Manager </label>        
        <br></br> <br></br> <br></br> 
        <style jsx>{`
          .qstm {
            align: center;
            text-align: center;
            align-content: center;
            color: white;
            font-size: 100px;
            width: 100%;
            font-family: OCR A Std, monospace;
          }
          .qstmWords {
            align: center;
            text-align: center;
            align-content: center;
            color: white;
            font-size: 40px;
            width: 100%;
            font-family: OCR A Std, monospace; 
          }
          `}</style>
      </div>



      <div>
        <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
        <h1 style={{color:'#ff8a01'}}>Login Page</h1>
        {/* <label>
          Username: 
        </label> */}
        <input type="text" name="username" placeholder = 'username' value={this.state.username} onKeyDown={this.onEnter} onChange={this.onChange}></input><br></br>

        {/* <label>
          Password: 
        </label> */}
        <input type="password" name="password" placeholder='password' value={this.state.password} onKeyDown={this.onEnter} onChange={this.onChange}></input><br></br>

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
            margin-left: 45%;
          }
        `}</style>

      </div>

      
      <br></br>

      </html>
    )
  }
}
