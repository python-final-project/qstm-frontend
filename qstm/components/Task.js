import Link from 'next/link'

// props here is not receiveing the course.id
export default function Task(props) {
    return (
        <li key={props.task.id}>            
            {props.task.description}
        </li>
    )
}


{/* <li key={props.course.id}>
<Link href="/courses/[id]" as={`/courses/${props.course.id}`}>
    <a>
        {props.course.title}
    </a>
</Link>
</li> */}