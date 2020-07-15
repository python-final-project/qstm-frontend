import React from 'react'
import axios from 'axios'
import Task from '../../components/Task'
import NewTask from '../../components/NewTask'


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
      students : props.students,
      currentStudent : props.students[0],
      tasks : props.tasks, 
      currentStudent_id :props.students[0].id,
      currentStudent_name :props.students[0].name,
    }
    this.handleChange = this.handleChange.bind(this)
   
  }

  async handleChange(event) {
    const selectedStudentId = event.target.value
 
    // TODO: ADD completed=false to the query
    const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${event.target.value}&completed=false`);    
    const tasks = await response.json();  
    // upd the current student

    this.setState({
        currentStudent_id : selectedStudentId,
        tasks : tasks,
    }  )

  }


    // when the user add a new task, reload the page???, how to stay  
  async onReRender() {
    alert("onReRender")
    // const selectedStudentId = event.target.value
 
    // const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${event.target.value}&completed=false`);    
    // const tasks = await response.json();  


    // this.setState({
    //     currentStudent_id : selectedStudentId,
    //     tasks : tasks,
    // }  )

  }


  render(){      
    return <div>
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
        <NewTask student_id={ this.state.currentStudent_id}  />
        
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


