import React from 'react'

export default class Home extends React.Component{
    render () {
        return (
            <html style={{backgroundColor:'#4d597a'}}>
            <div>
                <h1>Problem Domain</h1>
                <ul>
                    <li>
                        Create an application that helps manage their children's tasks
                    </li>
                    <li>
                        Prevents the embarrassment of having to ask teachers for the student's login information when they eventually forget it
                    </li>
                    <li>
                        Parents and students can add tasks for the students to complete
                    </li>
                    <li>
                        Parents and students can keep track of the task and its associated website, username, password, and due date
                    </li>
                </ul>
                <style jsx>{`
                    div {
                        font-family: Arial, Helvetica, sans-serif;
                    }
                    h1 {
                        color: #ff8a01
                    }
                    ul {
                        font-family: Arial, Helvetica, sans-serif;
                        color: #ff8a01;
                    }
                `}</style>
            </div>
            </html>
        )
    }
}