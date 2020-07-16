import React from 'react';

import SiteItem from './SiteItem';

export default class SiteList extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <>
                <h4>Site List</h4>
                <ul>
                    {this.props.sites.map(item => 
                        <SiteItem list={item} key={item.id}
                         handleSiteUpdate={this.props.handleSiteUpdate} />
                        )}
                </ul>
                <style jsx>{`
                    ul {
                        color: orange;
                    }
                    li {
                        color: orange;
                    }
                    label {
                        color: orange;
                    }
                `}</style>
             
            </>
        )
    }
}
