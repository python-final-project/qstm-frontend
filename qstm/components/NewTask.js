            // Description:
            //  Date created:
            // Class topic:
            // Priority:
            // Completed
            //  Date completed:


import React from 'react'
import axios from 'axios'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';

class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          student_id: props.student_id
        }
        this.tasksCreateHandler = this.tasksCreateHandler.bind(this);
    }

    async tasksCreateHandler(tasks) {

        const response = await axios.post(url, tasks);

        // decision: add the newly created to state or fetch brand new
        // let's go with option 1
        const savedTasks = response.data;

        const updatedTasks = this.state.tasks.concat(savedTasks);

        this.setState({
            tasks: updatedTasks
        })

        // Stretch: how can you make even snappier?
    }

    render() {
        return (
            <div className="container">             
                <h4>Add New task for this student {this.props.student_id} </h4>
                
                {/* <tasksForm ontasksCreate={this.tasksCreateHandler} /> */}
   
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

