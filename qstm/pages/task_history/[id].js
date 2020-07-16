import React from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'


import ParentNav from '../../components/nav/ParentNav';

import Task from '../../components/tasks/Task'





export default class ParentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students            : props.students,
      currentStudent      : props.students.id,
      tasks               : props.tasks, 
      currentStudent_id   : props.students.id,
      currentStudent_name : props.students.name,
      activeParent        : props.activeParent, 
       }
   }




  render(){      
    return <div>
      <link rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
      <html style={{backgroundColor: '#4d597a'}}>

        <ParentNav id={this.state.activeParent.id} />

        <h5> History of { this.state.currentStudent_name }'s tasks :   </h5>
        <br></br>  <br></br>
          <ol>
              {this.state.tasks.map(task => <Task key={task.id} task={task} />)}
          </ol>
          </html>
        <style jsx>{`
        div {
          height: auto;
          width: auto;
          margin: auto;
          background-color: #4d597a;
          display: grid;
          
        }
        h1 {
          align: center;
          text-align: center;
          // color: #33a7c9;
        }
        ol {
          color: #ff8a01;
        }
        label {
          color: #ff8a01;
        }
        p {
          color: #ff8a01;
        }
        form {
          // float: left;
        }
        html {
          background-color: #4d597a;
        }
        select {
          width: 100px;
        }
      `}</style>  

      </div>
  }
}

export async function getServerSideProps(context) { 

  
  const responseStudents = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/${context.params.id}/`);
  const students = await responseStudents.json();  
  console.log('students one', students)


  const responseTasks = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${context.params.id}`);
  const tasks = await responseTasks.json();  
  
  const responseParent = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/parents/${students.parent_id}/`);
  const activeParent = await responseParent.json();  
  console.log('activeParent',activeParent)

  return {
      props: {
        activeParent: activeParent,
        students : students,
        tasks : tasks,
      }
  }
}




{/* <span onClick={() => Router.push('/about')}>Click me</span> */}