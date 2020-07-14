import React from 'react'
import axios from 'axios'

const parents_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/parents/';
const students_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/'
const tasks_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/'
// TODO:
// get parent id
// get students
// get task by student
// allows the parent to add / upd / del task
// show history of tasks
// show % of task done
// display Parent'a name in the h1

export default class ParentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parent_id : 1,
    }
  
  }

  render(){      
    return <div>
      <h1>Parent's Dashboard </h1>
      </div>
  }
}

// export async function getServerSideProps() {
//   const response = await fetch(url);
//   const users = await response.json();
//   console.log('this is the length', users)
//   return {
//     props: {
//       users: users,
//     },
//   }

// }