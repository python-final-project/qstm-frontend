import React from 'react'
import axios from 'axios'
import TaskItem from '../../components/TaskItem'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';
const students_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/'

export default class StudentDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        tasks: props.tasks,
        students: props.students,
    }
    // this.taskCreateHandler = this.taskCreateHandler.bind(this);
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

//   async taskCreateHandler(task){
//       const response = await axios.post(url, task);

//       const savedTask = response.data;

//       const updatedTasks = this.state.tasks.concat(savedTask);

//       this.setState({
//           tasks:updatedTasks
//       })
//   }

//   handleSubmit(event) {
//       event.preventDefault();
//       this.onTaskCreate(this.state)
//       this.setState({description:''})
//   }

  async handleChange(event) {
      const formUpdate = event.target.value;
      console.log('EVENT.TARGET.VALUE', event.target.value)
      const response = await fetch (`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=${event.target.value}`);
      const tasks = await response.json();
      this.setState({
          name: newName,
          tasks: tasks,
      })
      console.log('TASKSSSS', tasks)
  }


  


  render(){      
    return <div>
        <h1>Student Task Page</h1>
        <main>
   
        <h4>Student Tasks to be Completed</h4>
        {/* I want to display the tasks for the selected student from the log in page? Generally, I want the tasks for a single student, not all the tasks in our database which is what is currently being displayed */}
        {this.state.tasks.map(task => <TaskItem key={task.id} task={task} />)}

        <h4>Add New Task</h4>
        {/* I want to add a new task to a database. What does that include? id should autopop, student_id should also autopop based on current student_id, date_created should autopop based on current date, completed should autopop true or false, I don't think date_completed needs to be here because if it's here it's not completed  */}
        <form onSubmit = {this.handleSubmit}>
            <li><label>Task</label></li>
            {/* This input should fill the description in model */}
            <input name ='description' type='text' value={this.state.description} onChange={this.handleChange}></input>
            <li><label>Teacher/Class</label></li>
            {/* This input should fill the class_topic in model */}
            <input name = 'class_topic' type ='text' value = {this.state.class_topic}></input>
            <li><label>Priority</label></li>
            {/* The input type needs to be a drop down menu from the 4 options that we have whic are urgent, important, normal, and low. This input should fill the priority in model */}
            <input name = 'priority' type ='text' value={this.state.priority}></input>
            <li><label>Due Date</label></li>
            <input name = 'due_date' type='calendar' value={this.state.due_date}></input>
            <li><label>Click Button to Add to Database</label></li>
            <button type ='add'>Add</button>
        </form>

        <h4>Completed Tasks History</h4>
        {/* What is the thinking here? We have a 'completed' field in our model. If completed is True, it should populate below*/}
        <ul>
            <li>Completed Task Description</li>
        </ul>

        </main>      
        </div>
  }
}

// I don't think we need this on this page
// export default Home

// *********** DID STUFF BUT COMMENTED OUT FOR TESTING ***************
// export async function getServerSideProps() {
//     const response = await axios.get(url);
//     // const tasks = await response.json();
//     console.log(response.data[0].description)
//     return {
//         props: {
//             tasks: response.data,
//         },
//     }
// }

export async function getServerSideProps(context) {
    const response = await fetch (`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/students/?student_id=${context.params.id}`);
    const tasks = await response.json();
    console.log('TEST', context.params.id)
    console.log('tasks', tasks);

    return {
        props: {
            // students: students, 
            tasks: tasks,
        }
    }

    
}