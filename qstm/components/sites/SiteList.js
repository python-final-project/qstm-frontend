import React from 'react';

export default function SiteList(props) {

    return (
        <>
        <h4>Site List</h4>
        <ul>
            {props.sites.map(item => 
                <SiteItem list={item} key={props.sites.indexOf(item)} />
                )}
        </ul>
        </>
    )
}

function showUpdateForm  () {
    console.log('it works!')
}

function SiteItem(props) {
    return (
        <li>
            {props.list.class_topic}
            <button onClick={showUpdateForm}>View</button>
        </li>
    )
}

// export default class SiteList extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             sites: props.sites
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


//     render() {
//         return (
//             <>
//          <h4>Site List</h4>
//          <ul>
//              {this.state.sites.map(item => 
//                 //  <SiteItem item={item} key={props.sites.indexOf(item)} />
//                 <li>
//                     {item.class_topic}
//                     <button>View</button>
//                 </li>
//                  )}
//          </ul>
//          </>
//         )
//     }
// }