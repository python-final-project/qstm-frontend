import React from 'react'
import axios from 'axios'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/users/';



class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          users: props.users
      }
      
  }


  render() {
      return (
          <div className="container">
              <h1>users test</h1>
              <ul>
                  {this.users}
              </ul>
          </div>
      )
  }
}

export default Home


export async function getServerSideProps() {
  const response = await fetch(url);
  const users = await response.json();
  console.log('this is the length', users)
  return {
    props: {
      users: users,
    },
  }

}