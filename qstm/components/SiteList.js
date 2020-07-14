import React from 'react';

export default function SiteList(props) {
    console.log('props sitelist', props)
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

function SiteItem(props) {
    return (
        <li>
            {props.list.class_topic}
        </li>
    )
}