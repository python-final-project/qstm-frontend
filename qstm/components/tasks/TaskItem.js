import Link from 'next/link'

export default function TaskItem(props) {
    return (
        <li key={props.task.id}>
            {/* <Link href="/tasks/[id]" as={`/tasks/${props.task.id}`}> */}
                <a>
                    {props.task.description} {props.task.due_date}
                </a>
                <button input='delete'>
                    Delete
                </button>
            {/* </Link> */}
        </li>
    )
}