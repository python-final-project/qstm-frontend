import React from 'react'
import axios from 'axios'
import TaskItem from '../components/TaskItem'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        tasks: props.tasks
    }
    this.taskCreateHandler = this.taskCreateHandler.bind(this);
  }

  async taskCreateHandler(task){
      const response = await axios.post(url, task);

      const savedTask = response.data;

      const updatedTasks = this.state.tasks.concat(savedTask);

      this.setState({
          tasks:updatedTasks
      })

  }


  render(){      
    return <div>
        <h1>Student Task Page</h1>
        <main>
        {/* ???? use a loop to loop through our Task class' due_date*/}
        {/* <p>{this.state.tasks.description}</p>
        <p>TESTING {this.state.tasks.class_topic}</p> */}
        
        {/* <label> Student's Tasks For </label>
        <select> 
            <option> Date 1 </option>
            <option> Date 2 </option>
            <option> Date 3 </option>
        </select> */}
        <h4>Student Tasks to be Completed</h4>
        {this.state.tasks.map(task => <TaskItem key={task.id} task={task} />)}
        {/* ???? sum the completed(False) length to give us an integer and we divide that number by length of the completed(True) field. Issues with this might be it keeps a running tally of everything */}
        {/* <label> % Complete {this.state.tasks.completed}</label> */}
        {/* Task # priority due date delete_button */}

        <h4>Add New Task</h4>
        {/* I want to add a new task to a database. What does that include? id should autopop, student_id should also autopop based on current student_id, date_created should autopop based on current date,  */}
        <ul>
            <li>Task</li>
            <input type ='text'></input>
            <li>Teacher/Class</li>
            <input type ='text'></input>
            <li>Priority</li>
            {/* The input type needs to be a drop down menu from the 4 options that we have whic are urgent, important, normal, and low */}
            <input type ='text'></input>
            <li>Click Button to Add to Database</li>
            <button type ='add'>Add</button>
        </ul>

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

export async function getServerSideProps() {
    const response = await axios.get(url);
    // const tasks = await response.json();
    console.log(response.data[0].description)
    return {
        props: {
            tasks: response.data,
        },
    }
}