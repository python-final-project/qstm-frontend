import React from 'react'
import axios from 'axios'

const tasks_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/'



export default class StudentTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // student_id : this.props.student_id,
      tasks : [],
    }
  
  }

  render(){      
    return <div>
      <h4>Tasks for {this.props.student.name} </h4>
      </div>
  }
}

export async function getServerSideProps(context) {
  console.log(context)

  const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=1${this.props.student.id}`);

  const tasks = await response.json();
  console.log(tasks)
  return {
      props: {
        tasks : "tasks",
      }
  }
}


