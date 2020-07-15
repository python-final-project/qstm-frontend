import { useRouter } from 'next/router'
import axios from 'axios'

import React from 'react'
// const url = 'https://ileal-summer-camp-api.herokuapp.com/api/v1/courses/';
// const tasks_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';

// export default function TaskDetail(props) {
  
//     const router = useRouter();

//     async function deleteHandler() {
//         const response = await axios.delete(url + props.course.id)
//         router.push('/');
//     }

//     return (
//         <>
//         <h1>I am a single task {props.task.description} </h1>
//         {/* <button onClick={() => deleteHandler(props.course.id)}>Delete</button> */}
//         </>
//     )
// }

// start
export default class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id              : this.props.task.id ,
      date_created    : this.props.task.date_created ,
      due_date        : this.props.task.due_date ,
      class_topic     : this.props.task.class_topic ,
      description     : this.props.task.description ,
      priority        : this.props.task.priority ,
      completed       : this.props.task.completed ,
      date_completed  : this.props.task.date_completed ,
      student_id      : this.props.task.student_id,
    }


      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "description"){
      const newDescription = event.target.value;
      this.setState({
        description: newDescription,
      })
    }

    if (event.target.name === "class_topic"){
      const newClass_topic = event.target.value;
      this.setState({
        class_topic: newClass_topic,
      })
    }

    if (event.target.name === "due_date"){
      const newDue_date = event.target.value;
      this.setState({
        due_date: newDue_date,
      })
    }
    
    if (event.target.name === "priority"){
      const newpPriority = event.target.value;
      this.setState({
        priority: newpPriority,
      })
    }

    // force to update the student_id
    const retrive_student_id = document.getElementById("student_id").value;
    this.setState({
      student_id : retrive_student_id,
    });

  }


  handleSubmit(event) {      
      event.preventDefault();        
      this.props.onTaskCreate(this.state);
      this.setState({
        description:'',
        class_topic:'',
        due_date: '',
      });
  }


  render() {
      return (
          <form onSubmit={this.handleSubmit}>
              <label> The student that TaskForm is receiving is <b> {this.props.student_id} </b> </label><br></br> <br></br>
              <input
                  name="student_id" id="student_id" value={this.props.student_id} >
              </input> <br></br>

              <label>  Description  </label>   <br></br>
              <input
                  name="description" type="text" required value={this.state.description} onChange={this.handleChange}>
              </input> <br></br>
              <label>  Class topic  </label>   <br></br>
              <input
                  name="class_topic" type="text" required value={this.state.class_topic} onChange={this.handleChange}>
              </input> <br></br>

              <label>  Due date  </label>   <br></br>
              <input
                  name="due_date" type="date" value={this.state.due_date} onChange={this.handleChange}>
              </input> <br></br>
              
              <label>  Priority  </label>   <br></br>
                <select name="priority" id="priority"  onChange={this.handleChange}>
                    <option value="U">Urgent</option>
                    <option value="I">Important</option>
                    <option value="N" selected>Normal</option>
                    <option value="L">Low</option>
                </select>
              
              <br></br>
              <br></br>
              <button>Add</button>
          </form>
      )
  }
}


// end




export async function getServerSideProps(context) {
    // console.log('entering getServerSideProps....:',context.params.id)
    const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/${context.params.id}`);
    const task = await response.json();
    console.log('task',task)
    return {
        props: {
          task: task,
        }
    }
}