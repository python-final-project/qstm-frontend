import React from 'react';

import UpdateSiteForm from './UpdateSiteForm';

export default class SiteItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
        }

        this.toggleForm = this.toggleForm.bind(this)
        this.handleForm = this.handleForm.bind(this)

    }
    
    toggleForm() {
        
        
        this.setState({
            showForm: !this.state.showForm,
        })
    }

    handleForm(siteInfo, id, isUpdate) {
        this.toggleForm()
        this.props.handleSiteUpdate(siteInfo, id, isUpdate)
    }

    render() {
        return (
            <li>
                {this.props.list.class_topic}
                <button value={this.props.indexOf} onClick={this.toggleForm}>View</button>

                <div style={this.state.showForm ? {} : {display: 'none'}}>
                    <UpdateSiteForm site={this.props.list} handleSiteUpdate={this.handleForm} />
                </div>

            </li>
        )
    }

}