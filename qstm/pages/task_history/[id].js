import React from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'

import ApiUrl from '../../constants/url';
import ParentNav from '../../components/nav/ParentNav';
import StudentNav from '../../components/nav/StudentNav';
import Task from '../../components/tasks/Task'





export default class TaskHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students            : props.students,
      currentStudent      : props.students.id,
      tasks               : props.tasks, 
      currentStudent_id   : props.students.id,
      currentStudent_name : props.students.name,
      activeParent        : props.activeParent, 
      isParent            : false,
      dashboard                : '',
       }
   }

   componentDidMount() {

    let isParent = localStorage.getItem('isParent')
    let dashboard = localStorage.getItem('dashboard')
    
    if (isParent == 'true'){
      isParent = true
    } else {
      isParent = false
    }

     this.setState({
       isParent: isParent,
       dashboard: dashboard,
     })
   }


   isParent() {
    if (this.state.isParent) {
      return (
        <ParentNav id={this.state.activeParent.id} />
      )
    } else {
      return (
        <StudentNav id={this.state.currentStudent}/>
      )
    }
   }


  getDashboard()
  {
    // return "lkdjflld"
  }

  render(){      
    return <div>
      <link rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
      <html style={{backgroundColor: '#4d597a'}}>


        {this.isParent()}
        

        <h5> History of { this.state.currentStudent_name }'s tasks :   </h5>
        <br></br>  <br></br>

        <Link href={this.state.dashboard}>
          <a>Return</a>
        </Link>
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


async function getData(url) {    
  const response = await fetch(url);
  const data = await response.json()

  return data
}

export async function getServerSideProps(context) { 

  const studentsUrl = ApiUrl.BASE + ApiUrl.STUDENT + `${context.params.id}/`
  const newStudentList = await getData(studentsUrl)

  const tasksUrl = ApiUrl.BASE + ApiUrl.TASK + `?student_id=${context.params.id}`
  const newTasksList = await getData(tasksUrl)

  const parentUrl = ApiUrl.BASE + ApiUrl.PARENT + `${newStudentList.parent_id}/`
  const newActiveParent = await getData(parentUrl)

  
  return {
      props: {
        activeParent: newActiveParent,
        students    : newStudentList,
        tasks       : newTasksList,
      }
  }
}

