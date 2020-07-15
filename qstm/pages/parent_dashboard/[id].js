import React from 'react'
import axios from 'axios'
import Task from '../../components/Task'
import NewTask from '../../components/NewTask'


const parents_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/parents/';
const students_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/'
const tasks_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/'


export default class ParentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students : props.students,
      currentStudent : props.students[0],
      tasks : props.tasks, 
      currentStudent_id :props.students[0].id,
      currentStudent_name :props.students[0].name,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCreateTask = this.handleCreateTask.bind(this)
   
  }

  async handleChange(event) {
    const selectedStudentId = event.target.value
 
    // TODO: ADD completed=false to the query
    const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${event.target.value}&completed=false`);    
    const tasks = await response.json();  
    
    this.setState({
        currentStudent_id : selectedStudentId,
        tasks : tasks,
    }  )

  }

  handleCreateTask(task){
    // this function is called by the child (Componets/NewTask) and is sending the new data that was store 
    // the child can call it BS is send as a prop in <NewTask....
    // in DB. We need to added (concat) to the state.tasks so we can call a setState an re render.

    const newTasks = this.state.tasks.concat(task)
    this.setState({
      tasks : newTasks,
    })

  }


  render(){      
    return <div>
      <link rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
      <h1>Parent's Dashboard </h1>

      <label> View tasks for :   </label>

      <select onChange={this.handleChange}>
      {this.state.students.map(student =>         
        <option key={student.id} value={student.id} > {student.name} </option>
      )}         
      </select>
      
        <p> There are {this.state.tasks.length} tasks for this student</p>
   
        <ol>
            {this.state.tasks.map(task => <Task key={task.id} task={task} />)}
        </ol>
        <NewTask student_id={ this.state.currentStudent_id} onCreateTask={this.handleCreateTask}  />

        <style jsx>{`
        div {
          height: auto;
          width: auto;
          margin: auto;
          background-color: #4d597a;
          
        }
        h1 {
          align: center;
          text-align: center;
          // color: #33a7c9;
        }
        // li {
        //   float: left;
        // }
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
      `}</style>  
      </div>
  }
}

export async function getServerSideProps(context) {
 
  // console.log('context is: ', context)
  const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/?parent_id=${context.params.id}`);
  const students = await response.json();  
  console.log('students', students)
  // console.log("test", students[0].id)

  const responseTasks = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${students[0].id}`);
  const tasks = await responseTasks.json();  
  // console.log('tasks', tasks)

  return {
      props: {
        students : students,
        tasks : tasks,
      }
  }
}


