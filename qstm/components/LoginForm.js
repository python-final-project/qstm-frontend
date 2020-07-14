import React from 'react'
import axios from 'axios'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/users/';


class Login extends React.Component {
  constructor(props){
      super(props);
      this.state = {        
        // thingList : [
        //   { name:'item 1',
        //     value :'uno',
        //   },
        //   { name:'item 2',
        //     value :'dos',
        //   }        
      }
    this.thingCreateHandler = this.thingCreateHandler.bind(this);
  }

  thingCreateHandler(thing) {
    // alert(thing.name);
    const updatedThings = this.state.thingList;      
    updatedThings.push({name:thing.name, value:thing.value })
    this.setState({
      thingList : updatedThings
    })
  }

  render(){      
    return <div>
      <main>
        <ThingsForm onThingCreate={this.onThingCreate} />
      </main>
      </div>
  }
}


class ThingsForm extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
          name:'',
          value :'',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    if (event.target.name === "thingName"){
      const newName = event.target.value;
      this.setState( {
          name : newName
      })        
    }
  
    if (event.target.name === "thingValue"){
      const newValue = event.target.value;
      this.setState( {
          value : newValue
      })        
    }
  
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert(event. .id)
    console.log(this.state.name)
    console.log(this.state.value)
    // alert(this.state)
    // this.props.onThingCreate(this.state);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit }>
          {/* <h4> Please add a element to the Thing List</h4> */}
          <label> User: </label>
          <input 
            name="thingName" type="text" value={this.state.name}  onChange={this.handleChange}>  
          </input>              
          <label> Password: </label>
          <input 
            name="thingValue" type="text" value={this.state.value}  onChange={this.handleChange}>  
          </input>  
          <button>Login!</button>
      </form>
    )
  }


}

export default Login;


export async function getServerSideProps() {
  const response = await fetch(url);
  const users = await response.json();
  console.log('this is the length', users)
  return {
    props: {
      users: users,
    },
  }

}