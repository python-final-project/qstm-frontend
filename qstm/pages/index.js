import React from 'react'
import axios from 'axios'

const url = 'http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/users/';



// class Home extends React.Component {

//   constructor(props) {
//       super(props);
//       this.state = {
//           users: props.users
//       }
      
//   }


//   render() {
//       return (
//           <div className="container">
//               <h1>users test</h1>
//               <ul>
//                   {this.users}
//               </ul>
//           </div>
//       )
//   }
// }

// export default Home


class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        thingList : [
          { name:'item 1',
            value :'uno',
          },
          { name:'item 2',
            value :'dos',
          }
        ]
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
      {/* <Header counter={this.state.thingList.length} /> */}
      <main>
        <ThingList things={this.state.thingList}  onThingCreate= {this.thingCreateHandler} />
      </main>
      {/* <Footer /> */}
      </div>
  }
}

function ThingList(props){
  return <>
    {/* <p>list {props.things.length}</p>
      <h3> Things in the List</h3>
      <ul>
          { props.things.map( thing => <Thing item={thing} key={thing.name} />) }
      </ul> */}
      <ThingsForm onThingCreate={props.onThingCreate} />
  </>
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

// function Thing(props){
// return <>
//   <li>  {props.item.name} : {props.item.value} </li>
// </>
// }

export default App;


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