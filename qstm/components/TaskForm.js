import React from 'react'

export default class TaskForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        student_id : props.student_id,
        description : '',
        class_topic : '',
        due_date: '', 
        priority: 'N',
      }
        console.log("nnow in TaskForm", this.props.student_id);
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
      // console.log('retrive_student_id in handle change', retrive_student_id)
      // student_id : retrive_student_id,
      this.setState({
        student_id : retrive_student_id,
      });

    }


    handleSubmit(event) {      
        event.preventDefault();        

        // const retrive_student_id = document.getElementById("student_id").value;
        // console.log('retrive_student_id in submit', retrive_student_id)
        // // student_id : retrive_student_id,
        // this.setState({
        //   student_id : 'iris',
        // });

        // console.log('state to upload:', this.state)
        this.props.onTaskCreate(this.state);
        this.setState({
          // student_id : this.props.student_id,
          // student_id : this.state.student_id,
          description:'',
          class_topic:'',
          due_date: '',
          priority: 'N',
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> The student that TaskForm is receiving is <b> {this.props.student_id} </b> </label><br></br> <br></br>
                <input
                    name="student_id" id="student_id" type="text"  value={this.props.student_id} >
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