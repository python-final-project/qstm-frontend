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
      console.log("now on newtask, this are the values to save:", tasks)
        // const response = await axios.post(url, tasks);

        // decision: add the newly created to state or fetch brand new
        // let's go with option 1
        // const savedTask = response.data;

        // const updatedTask = this.state.tasks.concat(savedTask);

        // this.setState({
        //     // tasks: updatedTasks
        // })

    }

    render() {
        return (
            <div className="container">             
                <h4>Add New task for this student {this.props.student_id} </h4>
                
                <TaskForm onTaskCreate={this.taskCreateHandler} student_id = { this.props.student_id} />
   
            </div>
        )
    }
}

export default NewTask

// // export async function getStaticProps() {
// export async function getServerSideProps() {

//     // const response = await fetch(url);
//     // const tasks = await response.json();

//     return {
//         props: {
//             // tasks: tasks,
//         },
//     }
// }

