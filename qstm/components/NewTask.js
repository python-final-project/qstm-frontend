import React from 'react'
import axios from 'axios'
import TaskForm from '../components/TaskForm'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';

class NewTask extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
          student_id: props.student_id,
        }
        this.taskCreateHandler = this.taskCreateHandler.bind(this);
       
    }

    async taskCreateHandler(tasks) {           
        // console.log("now on newtask, this are the values to save:", tasks)
        const response = await axios.post(url, tasks);
 
        const savedTask = response.data;

        // call my parent and send the new object I just created.
        // this function exists only in my parent, and I'm calling it, and I received as a prop  
        this.props.onCreateTask(savedTask)
    }


    render() {
        return (
            <div className="container">             
                <h4>Add New task for this student {this.props.student_id} </h4>
                
                <TaskForm onTaskCreate={this.taskCreateHandler} student_id = { this.props.student_id}  />
   
            </div>
        )
    }
}

export default NewTask

