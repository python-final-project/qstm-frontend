import React from 'react';
import axios from 'axios';

import SiteForm from '../../components/sites/SiteForm';
import SiteList from '../../components/sites/SiteList';
import StudentNav from '../../components/nav/StudentNav';
import { basicFetch } from '../../utils/basicFetch';
import { getSitesByStudentId } from '../../utils/studentSites';
import ApiUrl from '../../constants/url';


export default class StudentProfile extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            activeStudent: props.activeStudent,
            siteList: props.siteList,

            // activeParent: props.activeParent,

            showPassForm: false,
            showSiteForm: false,
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
        
        siteInfo.student_id = this.state.activeStudent.id

        const url = ApiUrl.BASE + ApiUrl.SITE

        await axios.post(url, siteInfo)
        
        let newSiteList = await getSitesByStudentId(this.state.activeStudent.id)
        
        this.setState({
            siteList: newSiteList,
            showSiteForm: false,
        })

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

        let newSiteList = await getSitesByStudentId(this.state.activeStudent.id)
        this.setState({
            siteList: newSiteList,
        })
    }

    render() {
        return (
            <>
                <StudentNav id={this.state.activeStudent.id}/>
                <h1>My Account Setting Page - Student View</h1>

                <hr/>

                <div>
                    <h3>
                        Welcome! {this.state.activeStudent.name}!!!
                    </h3>
                </div>

                <hr/>

                <h3>
                    Manage Site Information:
                </h3>
                    <SiteList sites={this.state.siteList} handleSiteUpdate={this.handleSiteUpdate}/>
                
                <hr/>

                <button onClick={() => this.setState({showSiteForm: !this.state.showSiteForm})}>
                        {this.state.showSiteForm ? 'Click to Close':'Add New Site' }
                </button>
                
                {this.state.showSiteForm ? this.showSiteForm() : null}
            </>
        )
    }
}

export async function getServerSideProps(context) {
    
    const studentUrl = ApiUrl.BASE + ApiUrl.STUDENT + `${context.params.id}`
    const sitesUrl = ApiUrl.BASE + ApiUrl.SITE + `?student_id=${context.params.id}`

    const newActiveStudent = await basicFetch(studentUrl)
    const newSiteList = await basicFetch(sitesUrl)
    

    return {
        props: {
            activeStudent: newActiveStudent,
            siteList: newSiteList,
        },
    }
}
