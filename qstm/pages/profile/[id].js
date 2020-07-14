import SiteForm from '../../components/SiteForm';
import PassForm from '../../components/PassForm';
import SiteList from '../../components/SiteList';
import axios from 'axios'

export default class About extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            showPassForm: false,
            showSiteForm: false,
            siteList: props.siteList,
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
                <SiteList sites={this.state.siteList} />
                <hr></hr>
            </>
        )
    }
}

export async function getServerSideProps(context) {
    // console.log(context)
    const url = `http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/sites/?student_id=${context.params.id}`

    const response = await fetch(url);
    const data = await response.json()
    console.log('my response: ', data)


    return {
        props: {
            siteList: data,
        },
    }
}