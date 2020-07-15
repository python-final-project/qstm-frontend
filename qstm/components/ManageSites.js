// Not in use but hopefully will get it to work. This is a manage site component that would be used on the parent and student profile/settings page. 

import React from 'react';
import SiteList from './SiteList';
import SiteForm from './SiteForm';
import axios from 'axios';
import ApiUrl from '../constants/url';

export default class ManageSites extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStudent: props.activeStudent,
            siteList: props.sites,
            showSiteForm: false,
        }
    }

    async siteSubmitHandler(siteInfo) {
        
        siteInfo.student_id = this.state.activeStudent

        const url = ApiUrl.BASE + ApiUrl.SITE

        await axios.post(url, siteInfo)
        
        let newSiteList = await getSitesByStudentId(this.state.activeStudent)
        
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


    render() {
        console.log(this.state)
        return (
            <>
            <h3>
                Manage Site Information:
            </h3>
                <SiteList sites={this.state.siteList} />
            <hr/>

            <button onClick={() => this.setState({showSiteForm: !this.state.showSiteForm})}>
                    {this.state.showSiteForm ? 'Click to Close':'Add New Site' }
            </button>
            
            {this.state.showSiteForm ? this.showSiteForm() : null}
            </>
        )
    }

} 