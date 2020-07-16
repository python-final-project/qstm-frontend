import Link from 'next/link'
import Router from 'next/router'



export default function Task(props) {
    return (
      <>
        <li key={props.task.id}>      

            <Link href="../tasks/[id]" as={`../tasks/${props.task.id}`}>
                <a>                   
                  {props.task.description}
                </a>
            </Link>


            <ul>
              <li> <b> Class topic: </b>  {props.task.class_topic} </li>  
              <li> <b> Date created: </b>  {props.task.date_created} </li>  
              <li> <b> Due date: </b>  {props.task.due_date} </li>  
              <li> <b> Priority: </b>  {props.task.priority} </li>  
              <li> <b> Completed: </b> { String( props.task.completed)} </li>  
              <li> <b> Date completed: </b>  {props.task.date_completed} </li>  
          
            </ul> 
        </li>
      </>
    )
}

