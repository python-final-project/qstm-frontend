import Link from 'next/link'



export default function Task(props) {
    return (
      <>
        <li key={props.task.id}>      

            <Link href="/tasks/[id]" as={`/tasks/${props.task.id}`}>
                <a>                   
                  {props.task.description}
                </a>
            </Link>


            <ul>
              <li> <b> Class topic: </b>  {props.task.class_topic} </li>  
              <li> <b> Date created: </b>  {props.task.date_created} </li>  
              <li> <b> Priority: </b>  {props.task.priority} </li>  
              <li> <b> Completed: </b> { String( props.task.completed)} </li>  
              <li> <b> Date completed: </b>  {props.task.date_completed} </li>  
          
            </ul> 
        </li>
      </>
    )
}

// http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/?student_id=1

{/* <li key={props.course.id}>
<Link href="/courses/[id]" as={`/courses/${props.course.id}`}>
    <a>
        {props.course.title}
    </a>
</Link>
</li> */}