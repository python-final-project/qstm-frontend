import React from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'

import ParentNav from '../../components/nav/ParentNav';
import ApiUrl from '../../constants/url';

import Task from '../../components/tasks/Task'
import NewTask from '../../components/tasks/NewTask'



// const parents_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/parents/';
// const students_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/'
// const tasks_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/'


export default class ParentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students            : props.students,
      currentStudent      : props.students[0],
      tasks               : props.tasks, 
      currentStudent_id   : props.students[0].id,
      currentStudent_name : props.students[0].name,
      activeParent        : props.activeParent, 
      showAddTasksForm    : false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCreateTask = this.handleCreateTask.bind(this)
   
  }

  async handleChange(event) {
    const selectedStudentId = event.target.value

    
    let newCurrentStudent_name = ''
    for (let i = 0; i < this.state.students.length; i++) {    
      if (this.state.students[i].id == selectedStudentId) {
        newCurrentStudent_name = this.state.students[i].name
      }
    }

    const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${event.target.value}`);    
    const tasks = await response.json();  
    
    this.setState({
        currentStudent_id   : selectedStudentId,
        currentStudent_name : newCurrentStudent_name,
        tasks               : tasks,
    }  )

  }

  handleCreateTask(task){
    // this function is called by the child (Componets/NewTask) and is sending the new data that was store 
    // the child can call it BS is send as a prop in <NewTask....
    // in DB. We need to added (concat) to the state.tasks so we can call a setState an re render.
    const newTasks = this.state.tasks.concat(task)
    const newShowAddTasks = false
    this.setState({
      tasks             : newTasks,
      showAddTasksForm  : newShowAddTasks,
    })
    
  }

 
  toggleShowAddTasksForm =() => {
    const newShowAddTasks = !this.state.showAddTasksForm
    this.setState({
      showAddTasksForm    : newShowAddTasks,
    })
  }

  render(){      
    return <div>
      <link rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
      <html style={{backgroundColor: '#4d597a'}}>

      <ParentNav id={this.state.activeParent.id} />

      <h1>{this.state.activeParent.name}'s Dashboard </h1>

      <label> View tasks for :   </label>

      <select onChange={this.handleChange}>
      {this.state.students.map(student =>         
        <option key={student.id} value={student.id} > {student.name} </option>
      )}         
      </select>
      <br></br>  <br></br>
   
      <Link href={`/task_history/${this.state.currentStudent_id}`}>
          <a>View {this.state.currentStudent_name}'s tasks history </a>
      </Link>

      <br></br>  <br></br>
      <p> Uncompleted tasks for {this.state.currentStudent_name}</p>

        <ol>
          {  this.state.tasks.filter(task => !task.completed).map(task => <Task key={task.id} task={task} />  )   }
            {/* {this.state.tasks.map(task => <Task key={task.id} task={task} />)} */}
        </ol>

        <button onClick={this.toggleShowAddTasksForm}>Add task</button>

        <div>
          { this.state.showAddTasksForm && (
             <NewTask student_id={ this.state.currentStudent_id} 
              student_name ={this.state.currentStudent_name}
              onCreateTask={this.handleCreateTask}  />
          )}
        </div>

       
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
  const parentUrl = ApiUrl.BASE + ApiUrl.PARENT + `${context.params.id}`
  const newActiveParent = await getData(parentUrl)

  const studentsUrl = ApiUrl.BASE + ApiUrl.STUDENT + `?parent_id=${context.params.id}`
  const newStudentList = await getData(studentsUrl)

  const tasksUrl = ApiUrl.BASE + ApiUrl.TASK + `?student_id=${newStudentList[0].id}`
  const newTasksList = await getData(tasksUrl)

  return {
      props: {
        activeParent: newActiveParent,
        students : newStudentList,
        tasks : newTasksList,
      }
  }
}


