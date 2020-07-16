import Link from 'next/link'


function Nav(props) {

    // function getStyle(page) {
    //     if (props.page == page) {
    //         return styles.active
    //     } else {
    //         return null;
    //     }
    // }

    return (
        // <nav className={styles.nav}>
        <nav>
            <br></br><br></br>
            <ul>
                <li>
                    <Link href={`/parent_profile/${props.id}`}>
                        {/* <a className={getStyle("home")}>Home</a> */}
                        <a>My Account Settings</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/parent_dashboard/${props.id}`}>
                        {/* <a className={getStyle("about")}>About Us</a> */}
                        <a>DashBoard</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/`}>                        
                        <a>Logout</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
