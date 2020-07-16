import React from 'react';
import axios from 'axios';
import Link from 'next/link'

import Task from '../../components/tasks/Task'
import NewTask from '../../components/tasks/NewTask';


import ApiUrl from '../../constants/url';
import StudentNav from '../../components/nav/StudentNav';


export default class StudentDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        todayQuote          : props.todayQuote,
        activeStudent       : props.activeStudent,
        tasks               : props.tasks, 
        showAddTasksForm    : false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCreateTask = this.handleCreateTask.bind(this)
   
  }

  async handleChange(event) {
    const selectedStudentId = event.target.value
 
    const url = ApiUrl.BASE + ApiUrl.TASK + `?student_id=${event.target.value}&completed=false`
    const tasks = await getData(url)

    
    this.setState({
        currentStudent_id : selectedStudentId,
        tasks : tasks,
    }  )

  }

  handleCreateTask(task){
    // this function is called by the child (Componets/NewTask) and is sending the new data that was store 
    // the child can call it BS is send as a prop in <NewTask....
    // in DB. We need to added (concat) to the state.tasks so we can call a setState an re render.
    const newShowAddTasks = false
    const newTasks = this.state.tasks.concat(task)
    this.setState({
      tasks : newTasks,
      showAddTasksForm  : newShowAddTasks,
    })

  }

  toggleShowAddTasksForm =() => {
    const newShowAddTasks = !this.state.showAddTasksForm
    this.setState({
      showAddTasksForm    : newShowAddTasks,
    })
  }

  allDone()
  {
    window.alert("hi")
  }

  render(){      

    return (
    <>
        {/* {this.allDone()} */}

        <link rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
        <html style={{backgroundColor: '#4d597a'}}>
        <body>
        
        <StudentNav id={this.state.activeStudent.id} />
        <h1>Student's Dashboard </h1>

        <hr />

        <h3>
            Welcome {this.state.activeStudent.name}!!!
        </h3>

        <div class='quote' >
          <i>
            <label className='quote'> { this.state.todayQuote.quoteText } </label>
            <label className='quote'> { this.state.todayQuote.quoteAuthor } </label>
          </i>
        </div>
        

        <br></br>  <br></br>
            <Link href={`/task_history/${this.state.activeStudent.id}`}>
                <a>View {this.state.activeStudent.name}'s tasks history </a>
            </Link>

        <br></br>  <br></br>



        <button onClick={this.toggleShowAddTasksForm} style={{backgroundColor:'#152459', color:'#ff8a01'}}> 
            {this.state.showAddTasksForm ? 'Click to Close':'Add New Task' } 
        </button>
        <div>
          { this.state.showAddTasksForm && (
             <NewTask student_id={ this.state.activeStudent.id} 
                    onCreateTask={this.handleCreateTask}  />
          )}
        </div>


        <hr />
        <h3 style={{align: 'left', textAlign: 'left'}}>
            This is your Task List:
        </h3>
        <ol>
            {  this.state.tasks.filter(task => !task.completed).map(task => <Task key={task.id} task={task} />  )   }
        </ol>

        <hr />


      </body>
      </html>
      <style jsx>{`
         body {
          background-color: #4d597a;
        }
        h1 {
          align: center;
          text-align: center;
        }
        h3 {
          align: center;
          text-align: center;
          align-content: center;
        }
        .quote{
          align: center;
          text-align: center;
          align-content: center;
          color: white;
          font-size: 22px;
          width: 100%
        }
        ol {
          color: #ff8a01;
        }
        label {
          color: #ff8a01;
        }
        p {
          color: #ff8a01;
        }
        form {
          float: left;
        }
      `}</style>  
    </>
    )}
}

async function getData(url) {
    
    const response = await fetch(url);
    const data = await response.json()

    return data
}

export async function getServerSideProps(context) {
    const quoteURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"     
    const newTodayQuote = await getData(quoteURL)
    // x = JSON.parse(newTodayQuote)
    console.log('newTodayQuote', newTodayQuote)



    const tasksUrl = ApiUrl.BASE + ApiUrl.TASK + `?student_id=${context.params.id}`
    const studentUrl = ApiUrl.BASE + ApiUrl.STUDENT + `${context.params.id}`

    const tasks = await getData(tasksUrl)
    const activeStudent = await getData(studentUrl)

    
  return {
      props: {
        todayQuote    : newTodayQuote,
        tasks         : tasks,
        activeStudent : activeStudent,
      }
  }
}


