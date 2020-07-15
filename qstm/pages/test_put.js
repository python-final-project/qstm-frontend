import React from 'react'
import axios from 'axios'




const upd_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/13/';
const new_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        courses: props.tasks
    }
    // this.courseCreateHandler = this.courseCreateHandler.bind(this);
}
 

  // async courseCreateHandler(course) {

  //     const response = await axios.post(url, course);

  //     // decision: add the newly created to state or fetch brand new
  //     // let's go with option 1
  //     const savedCourse = response.data;

  //     const updatedtasks = this.state.tasks.concat(savedCourse);

  //     this.setState({
  //         tasks: updatedtasks
  //     })

  //     // Stretch: how can you make even snappier?
  // }

  render() {
      return (
          <div className="container">
              
              <h1>test_put</h1>              
                  {this.state.tasks}
              
            </div>
      )
  }
}

export default Home

// export async function getStaticProps() {
export async function getServerSideProps() {

  const upd_data = {
    "id": 13,
    "date_created": "2021-07-14",
    "due_date": "2021-07-17",
    "class_topic": "Language-new13",
    "description": "Something-new13",
    "priority": "U",
    "completed": true,
    "date_completed": "2001-07-15",
    "student_id": 1
  }

  const new_data = {   
    "date_created": "2020-07-14",
    "due_date": "2020-08-17",
    "class_topic": "Chemestry",
    "description": "Fun staff",
    "priority": "N",
    "completed": false,
    "date_completed": null,
    "student_id": 1
  }


  // const response = await fetch(url);
  // const tasks = await response.json();
  // console.log('new_data', new_data)
  // console.log('tasks', tasks)
  
  // update
  // const response = await axios.put(upd_url, upd_data);


  // // new
  // const response = await axios.post(new_url, new_data);
  // console.log('New data', response.data)

  // const updtasks = await response.json();
  // console.log('new_data', updtasks)


  return {
      props: {
          tasks: "tasks",
      },
  }
}