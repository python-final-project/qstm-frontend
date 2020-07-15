import React from 'react';
import SiteForm from '../../components/SiteForm';
import PassForm from '../../components/PassForm';
import SiteList from '../../components/SiteList';
import ParentNav from '../../components/ParentNav';
// import ManageSites from '../../components/ManageSites';
import { getSitesByStudentId } from '../../utils/studentSites';
import axios from 'axios';
import ApiUrl from '../../constants/url';


export default class ParentProfile extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            activeStudent: -1,
            activeParent: props.activeParent,
            showPassForm: false,
            showSiteForm: false,
            studentList: props.studentList,
            siteList: [],
        }

        this.handleStudentChange = this.handleStudentChange.bind(this)
        this.siteSubmitHandler = this.siteSubmitHandler.bind(this)
    }


    async handleStudentChange(event) {
        
        let studentId = event.target.value;

        let sites = []

        if (studentId != -1) {
            sites = await getSitesByStudentId(studentId)
        }
        


        this.setState({
            siteList: sites,
            activeStudent: studentId,
        })
    }


    async siteSubmitHandler(siteInfo) {
        
        siteInfo.student_id = this.state.activeStudent

        // const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/sites/' 

        const url = ApiUrl.BASE + ApiUrl.SITE

        await axios.post(url, siteInfo)
        
        let newSiteList = await getSitesByStudentId(this.state.activeStudent)
        
        this.setState({
            siteList: newSiteList,
            showSiteForm: false,
        })

    }


    showPassForm = () => {
        return (
            <PassForm />
        )
    }


    showSiteForm = () => {
        return (
            <SiteForm onSubmit={this.siteSubmitHandler} />
        )
    }


    showUpdateForm = () => {
        console.log('it works!')
    }


    render() {

        //for fun
        let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

        return (
            <>
                <ParentNav id={this.state.activeParent.id}/>
                <h1>My Account Setting Page</h1>

                <hr/>

                <div>
                    <h3 style={{color: randomColor}} >
                        Welcome! {this.state.activeParent.name}!!!
                    </h3>
                </div>

                <div> 
                    <h3>
                        Select Student
                        <select onChange={this.handleStudentChange}>
                            <option value="-1">SELECT STUDENT</option> 
                            {this.state.studentList.map(student => 
                            <option value={student.id} key={student.id}>{student.name}</option>
                            )}
                        </select>
                    </h3>
                </div>

                <hr/>

                <div style={this.state.activeStudent != -1 ? {} : {display:'none'}}>
                    
                    {/* <ManageSites sites={this.state.siteList} activeStudent={this.state.activeStudent} /> */}
                    <h3>
                        Manage Site Information:
                    </h3>
                        <SiteList sites={this.state.siteList} />
                    
                    <hr/>

                    <button onClick={() => this.setState({showSiteForm: !this.state.showSiteForm})}>
                            {this.state.showSiteForm ? 'Click to Close':'Add New Site' }
                    </button>
                    
                    {this.state.showSiteForm ? this.showSiteForm() : null}
                </div>
            </>
        )
    }
}


async function getData(url) {
    
    const response = await fetch(url);
    const data = await response.json()

    return data
}


export async function getServerSideProps(context) {
    
    const studentsUrl = ApiUrl.BASE + ApiUrl.STUDENT + `?parent_id=${context.params.id}`
    const parentUrl = ApiUrl.BASE + ApiUrl.PARENT + `${context.params.id}`
    const newStudentList = await getData(studentsUrl)
    const newActiveParent = await getData(parentUrl)

    return {
        props: {
            studentList: newStudentList,
            activeParent: newActiveParent,
        },
    }
}
