import React from 'react';
import axios from 'axios';

import SiteForm from '../../components/sites/SiteForm';
import PassForm from '../../components/PassForm';
import SiteList from '../../components/sites/SiteList';
import ParentNav from '../../components/nav/ParentNav';
import { basicFetch } from '../../utils/basicFetch';
import { getSitesByStudentId } from '../../utils/studentSites';
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
        this.handleSiteUpdate = this.handleSiteUpdate.bind(this)
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


    async handleSiteUpdate(siteInfo, id, isUpdate) {
        const url = ApiUrl.BASE + ApiUrl.SITE + id + '/'

        if (isUpdate) {
            await axios.put(url, siteInfo)
        } else {
            await axios.delete(url)
        }

        let newSiteList = await getSitesByStudentId(this.state.activeStudent)
        this.setState({
            siteList: newSiteList,
        })
    }


    render() {
        return (
            <>
                <html style={{backgroundColor: '#4d597a'}}>
                <body style={{backgroundColor: '#4d597a', height: '100%'}}>
                <link rel="stylesheet"
                href="https://bootswatch.com/4/cerulean/bootstrap.min.css" ></link>
                <ParentNav id={this.state.activeParent.id}/>
                <h1 style={{align:'center', textAlign:'center', color:'#ff8a01'}}>My Account Setting Page - Parent View</h1>

                <hr/>

                <div>
                    <h3>
                        Welcome! {this.state.activeParent.name}!!!
                    </h3>
                </div>

                <div> 
                    <h3>
                        Select Student
                        <select onChange={this.handleStudentChange}>
                            <option value="-1" style={{color:'orange'}}>SELECT STUDENT</option> 
                            {this.state.studentList.map(student => 
                            <option value={student.id} key={student.id}>{student.name}</option>
                            )}
                        </select>
                    </h3>
                </div>

                <hr/>

                <div style={this.state.activeStudent != -1 ? {} : {display:'none'}}>
                    
                    <h3>
                        Manage Site Information:
                    </h3>

                    <SiteList sites={this.state.siteList} handleSiteUpdate={this.handleSiteUpdate} />
                    
                    <hr/>

                    <button onClick={() => this.setState({showSiteForm: !this.state.showSiteForm})}>
                            {this.state.showSiteForm ? 'Click to Close':'Add New Site' }
                    </button>
                    
                    {this.state.showSiteForm ? this.showSiteForm() : null}
                </div>
                </body>
                
                </html>
            
            </>
        )
    }
}

export async function getServerSideProps(context) {
 
    const studentsUrl = ApiUrl.BASE + ApiUrl.STUDENT + `?parent_id=${context.params.id}`
    const parentUrl = ApiUrl.BASE + ApiUrl.PARENT + `${context.params.id}`
    const newStudentList = await basicFetch(studentsUrl)
    const newActiveParent = await basicFetch(parentUrl)

    return {
        props: {
            studentList: newStudentList,
            activeParent: newActiveParent,
        },
    }
}
