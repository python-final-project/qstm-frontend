import Router from 'next/router'
import axios from 'axios'
import React from 'react'




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
      this.handleDelete = this.handleDelete.bind(this);


      
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

    
    if (event.target.name === "completed"){    
      const newCompleted = ! this.state.completed
      let newDate_completed = this.state.date_completed
      console.log('newDate_completed', newDate_completed)  

      if ((newCompleted == true) && (newDate_completed == null)) {
          newDate_completed = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      }


      if (newCompleted == false){
        newDate_completed = null
      }

      this.setState({
        completed       : newCompleted,
        date_completed  : newDate_completed,
      })
    }

    // force to update the student_id
    const retrive_student_id = document.getElementById("student_id").value;
    this.setState({
      student_id : retrive_student_id,
    });

  }


  async handleSubmit(event) {
    console.log('on handleSubmit', event)
    event.preventDefault(); 
        
    const upd_url = `http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/${this.state.id}/`;
    const response = await axios.put(upd_url, this.state);
    Router.push('/parent_dashboard/1');
    
  }
  
  async handleDelete(event) {
    console.log('on handleSubmit', event)
    event.preventDefault(); 
    
   
    const url = `http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/${this.state.id}/`;
    const response = await axios.delete(url)
    Router.push('/parent_dashboard/1');

  }
  

  render() {
      return (

        <html style={{backgroundColor: '#4d597a'}}>
        <body style={{backgroundColor: '#4d597a', height: '100%'}}>
          <link rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
          <h1 style={{align: 'center', textAlign: 'center'}} >Task</h1>
        <div>
          <form onSubmit={this.handleSubmit}>              
              <label> Date Created  </label>  <label> <b> {this.state.date_created} </b> </label>
              <br></br><br></br>



              <label>  Description  </label>   <br></br>
              <input name="description" type="text" required value={this.state.description} onChange={this.handleChange}>
              </input> <br></br> <br></br>

              <label>  Class topic  </label>   <br></br>
              <input name="class_topic" type="text" required value={this.state.class_topic} onChange={this.handleChange}>
              </input> <br></br> <br></br>

              <label>  Due date  </label>   <br></br>
              <input name="due_date" type="date" value={this.state.due_date} onChange={this.handleChange}>
              </input> <br></br> <br></br>


              <label>  Priority  </label>   <br></br>
                <select name="priority" id="priority"  onChange={this.handleChange}>
                    <option value="U">Urgent</option>
                    <option value="I">Important</option>
                    <option value="N" selected>Normal</option>
                    <option value="L">Low</option>
                </select> <br></br> <br></br>

             
              <input type="checkbox" id="completed" name="completed" 
              checked={this.state.completed}  onChange={this.handleChange} />
              <label for="completed"> Completed</label>  
              <br></br> <br></br>

              <label>  Date Completed  </label>  <label> <b> {this.state.date_completed} </b> </label>
              <br></br><br></br>


              <input  
                name="id" id="id" value={this.state.id} type="hidden">  
              </input>
              <input 
              name="student_id" id="student_id" value={this.state.student_id} type="hidden"> 
              </input> 

              <br></br>
              <button>Update</button>

              <style jsx> {`
                h1 {
                  align: center;
                  text-align: center;
                }
                form {
                  background-color: #4d597a;
                  height: auto;
                  width: auto;
                  margin: auto;
                }
                label {
                  color: #ff8a01;
                }
                body {
                  background-color:#4d597a;
                  height: 100%;
                  width: auto;
                  margin: auto;

                }
                html {
                  height: 100%;
                  background-color:#4d597a;
                }
              `}
              </style>
          </form>
          

          <form onSubmit={this.handleDelete}>
              <button>Delete</button>
          </form>
          
          </div>

          </body>
          
          </html>

      )
  }
}


{/* <span onClick={() => Router.push('/about')}>Click me</span> */}



export async function getServerSideProps(context) {
    // console.log('entering getServerSideProps....:',context.params.id)
    const response = await fetch(`http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/${context.params.id}`);
    const task = await response.json();
    // console.log('task',task)
    return {
        props: {
          task: task,
        }
    }
}