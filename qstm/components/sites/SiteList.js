import React from 'react';
import UpdateSiteForm from '../sites/UpdateSiteForm';
import { render } from 'react-dom';
import SiteItem from './SiteItem';

export default class SiteList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sites: props.sites,
        }

    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({ sites: nextProps.sites });  
    // }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.sites !== prevProps.sites) {
            this.setState({
                sites: this.props.sites
            })
        }
    }
    
    render() {
        return (
            <>
                <h4>Site List</h4>
                <ul>
                    {this.state.sites.map(item => 
                        <SiteItem list={item} key={this.state.sites.indexOf(item)} handleSiteUpdate={this.props.handleSiteUpdate} />
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


// export default function SiteList(props) {

//     return (
//         <>
//         <h4>Site List</h4>
//         <ul>
//             {props.sites.map(item => 
//                 <SiteItem list={item} key={props.sites.indexOf(item)} />
//                 )}
//         </ul>
//         </>
//     )
// }

// function showUpdateForm  () {
//     console.log('it works!')
// }

// function SiteItem(props) {
//     return (
//         <li>
//             {props.list.class_topic}
//             <button onClick={showUpdateForm}>View</button>
//         </li>
//     )
// }

// export default class SiteList extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             sites: props.sites,
//             showForm: false,
//             showList: true,
//             showUpdateForm: false,
//         }
//     }


//     SiteItem(props) {
//         return (
//             <li>
//                 {props.item.class_topic}
//                 <button>View</button>
//             </li>      
//         )
//     }

//     onClick(event) {
//         console.log("Clicked!")
//         console.log(event.target.value)

//     //     this.setState({
//     //         showList: !this.state.showList,
//     //         showUpdateForm: !this.state.showForm,
//     //     })
//     }

//     onSubmit = (siteInfo) => {
//         console.log("I am site info!!!!",siteInfo)
//     }

//     showUpdateForm = () => {
//         return (
//             <UpdateSiteForm onSubmit={this.onSubmit} />
//         )
//     }

//     render() {
//         return (
//         <>
//          <h4>Site List</h4>
//          <div style={this.state.showList ? {} : {display:'none'}}>
//             <ul>
//                 {this.state.sites.map(item => 
        
//                     <li key={item.id}>
//                         {item.class_topic}

//                         <button onClick={
//                             this.setState({
//                                 showList: !this.state.showList, 
//                                 showUpdateForm: !this.state.showForm,
//                              })}>

//                             {this.state.showForm ? 'Click to Close':'View Site' }

//                         </button>
//                     </li>

//                 )}
//             </ul>
//          </div>

//          {this.state.showUpdateForm ? this.showUpdateForm() : null}
//          </>
//         )
//     }
// }
