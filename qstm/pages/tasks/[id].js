import { useRouter } from 'next/router'
import axios from 'axios'


export default function TaskDetail(props) {
    // const url = 'https://ileal-summer-camp-api.herokuapp.com/api/v1/courses/';
    // const tasks_url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/tasks/';

    const router = useRouter();

    async function deleteHandler() {

        const response = await axios.delete(url + props.course.id)

        router.push('/');
    }

    return (
        <>
        <h1>I am a single task {props.task.description} </h1>
        {/* <button onClick={() => deleteHandler(props.course.id)}>Delete</button> */}
        </>
    )
}

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