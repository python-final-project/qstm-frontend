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
            <ul>
                <li>
                    <Link href="/parent_profile/1">
                        {/* <a className={getStyle("home")}>Home</a> */}
                        <a>My Account Settings</a>
                    </Link>
                </li>
                <li>
                    <Link href="/parent_dashboard/1">
                        {/* <a className={getStyle("about")}>About Us</a> */}
                        <a>DashBoard</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
