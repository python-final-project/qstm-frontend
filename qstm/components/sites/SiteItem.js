import React from 'react';
import UpdateSiteForm from './UpdateSiteForm';

export default class SiteItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        console.log('clicked!')
        this.setState({
            showForm: !this.state.showForm,
        })
    }

    render() {
        return (
            <li>
                {this.props.list.class_topic}
                <button value={this.props.indexOf} onClick={this.handleChange}>View</button>

                <div style={this.state.showForm ? {} : {display: 'none'}}>
                    <UpdateSiteForm />
                </div>

            </li>
        )
    }

}