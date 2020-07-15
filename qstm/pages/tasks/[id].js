import { useRouter } from 'next/router'
import axios from 'axios'


export default function CourseDetail(props) {
    const url = 'https://ileal-summer-camp-api.herokuapp.com/api/v1/courses/';
    

    const router = useRouter();

    async function deleteHandler() {

        const response = await axios.delete(url + props.course.id)

        router.push('/');
    }

    return (
        <>
        <h1>I am a single course </h1>
        {/* <button onClick={() => deleteHandler(props.course.id)}>Delete</button> */}
        </>
    )
}

export async function getServerSideProps(context) {
    console.log('entering getServerSideProps')
    // const response = await fetch(`https://ileal-summer-camp-api.herokuapp.com/api/v1/courses/${context.params.id}`);
    // const course = await response.json();
    // console.log('course',course)
    return {
        props: {
            course:'sdf',
        }
    }
}