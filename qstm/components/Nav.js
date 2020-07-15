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
                    <Link href="/">
                        {/* <a className={getStyle("home")}>Home</a> */}
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        {/* <a className={getStyle("about")}>About Us</a> */}
                        <a>About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/roster">
                        {/* <a className={getStyle("roster")}>Roster</a> */}
                        <a>Roster</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
