import React from 'react'
import axios from 'axios'
import TaskForm from './TaskForm'



const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';

class NewTask extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
          student_id    : props.student_id,
          student_name  : props.student_name,
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
                <h4 style={{textAlign:'center', align:'center'}}>Add New task for {this.props.student_name} </h4>
                
                <TaskForm onTaskCreate={this.taskCreateHandler} student_id = { this.props.student_id}  />
            
            <style jsx>{`
                container {
                    
                }
                html {
                    background-color: #4d597a;
                }
            `}
            </style>
            </div>
        )
    }
}

export default NewTask

