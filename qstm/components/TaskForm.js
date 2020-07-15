import React from 'react'

export default class TaskForm extends React.Component {
    constructor(props) {
      const due_date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()

      super(props)

      this.state = {
        student_id : props.student_id,
        description : '',
        class_topic : '',
        due_date: due_date, 
        priority: 'N',
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
          // priority: 'N',
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> The student that TaskForm is receiving is <b> {this.props.student_id} </b> </label><br></br> <br></br>
                <input
                    name="student_id" id="student_id" type="hidden"  value={this.props.student_id} >
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