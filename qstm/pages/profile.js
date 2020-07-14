import SiteForm from '../components/SiteForm';
import PassForm from '../components/PassForm';

export default class About extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showPassForm: false,
            showSiteForm: false,
        }
    }

    showPassForm = () => {
        return (
            <PassForm />
        )
    }

    showSiteForm = () => {
        return (
            <SiteForm />
        )
    }

    render() {
        return (
            <>
                <h1>My Account Setting Page</h1>

                <hr></hr>
                
                <h3>
                    Change Account Password:
                    <button onClick={() => this.setState({showPassForm: true})}>
                        Add New Site
                    </button>
                </h3>
                {this.state.showPassForm ? this.showPassForm() : null}

                <hr></hr>

                <h3>
                    Manage Site Information:
                    <button onClick={() => this.setState({showSiteForm: true})}>
                        Add New Site
                    </button>
                </h3>
                {this.state.showSiteForm ? this.showSiteForm() : null}

                <hr></hr>
            </>
        )
    }
}