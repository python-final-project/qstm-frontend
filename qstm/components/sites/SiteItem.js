import React from 'react';
import UpdateSiteForm from './UpdateSiteForm';
import PassForm from '../PassForm';

export default class SiteItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
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
                    <UpdateSiteForm site={this.props.list} handleSiteUpdate={this.props.handleSiteUpdate} />
                </div>

            </li>
        )
    }

}