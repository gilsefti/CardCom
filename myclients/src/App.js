
import React, { useState } from 'react';


import axios from 'axios';
import logo from './logo.svg';
import './App.css';

var test = 0;

const testData = [{
  ID: 1,
  IDC: "324",
  Name: "gilad",
  Email: "gil@yaho.com",
  BirthDate: new Date(2018, 11, 24),
  Gender: "Male",
  Phone: "09234"
},
{
  ID: 2,
  IDC: "323444",
  Name: "or",
}]
const TableHeader = () => {
  return (

    <div class="tr">
      <span class="td">ID</span>
      <span class="td">Name</span>
      <span class="td">Email</span>
      <span class="td">BirthDate</span>
      <span class="td">Gender</span>
      <span class="td">Phone</span>
      <span class="td">Save</span>
      <span class="td">Delete</span>
    </div>
  )
}

class OneCient extends React.Component {
  state = { client: this.props.Client };
  errors = {};
  formErros = "";
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.OnSave = this.OnSave.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    console.log(props, "props");
    console.log(this.state, "state");
    console.log(this.state.client, "state1")
  };

  handleValidation() {
    var formErrors = "";
   
    if (!this.state.client["Name"]) {
      formErrors = "Name Required";
    }
    if (!this.state.client["IDC"]) {
      formErrors = "ID Required";
    }
    if (!this.state.client["BirthDate"]) {
      formErrors = "Birth Date Required";
    }
    var email = this.state.client["Email"];
    if (email) {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formErrors = "Email is not valid";
      }
    }
    var phone = this.state.client["Phone"];

    if (phone) {
      if (isNaN(phone))
        formErrors = "Phone only digits";

      var Idc = this.state.client["IDC"];
      if (Idc)
        if (isNaN(Idc))
          formErrors = "Id only digits";
    }
    return formErrors;
  }


  handleChange(evt) {
    const value = evt.target.value;
    const client = this.state.client;
    client[evt.target.name] = value;
    this.setState({ client: client });
  }
  //const [client, setClient] = useState(props.Client);
  OnSave = async (event) => {


    event.preventDefault();
    var formErrors = this.handleValidation();
    if (!formErrors) {
      console.log("Form submitted");
      alert("Form submitted");
    } else {
      console.log("Form error");
      alert(formErrors)
      return;
    }
    if (test == 0) {
      const resp = axios.post('http://localhost:58546/api/clients', { client: this.state.client });
    }
    console.log(this.state.client);
  }
    async handleDelete(event) {
    event.preventDefault();
    console.log("Delete");
    const resp = await axios.delete(`http://localhost:58546/api/clients/${this.state.client.ID}`); 
    getData( this.props.getData);
  }
  render() {
    return (
      <form class="tr" onSubmit={this.OnSave} >
        <span class="td">
          <input type="hidden" id="id" name="id" value={this.state.client.ID} />
          <input type="text" value={this.state.client.IDC}
            name="IDC"
            onChange={this.handleChange} 
          /></span>
        <span class="td"><input type="text" value={this.state.client.Name}
          onChange={this.handleChange}
          name="Name"
        /></span>
        <span class="td"><input type="email" value={this.state.client.Email}
          onChange={this.handleChange}
          name="Email"
        /></span>
        <span class="td"><input type="date" value={this.state.client.BirthDate}
          onChange={this.handleChange}
          name="BirthDate"
        /></span>
        <span class="td">
          <select name="Gender" value={this.state.client.Gender}
            onChange={this.handleChange}>
            <option value="NotSelected"> </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </span>
        <span class="td"><input type="text" value={this.state.client.Phone}
          onChange={this.handleChange}
          name="Phone"
        /></span>
        <span class="td"><input type="submit" value="Save" /></span>
        <span class="td"> <button onClick={this.handleDelete}>Delete</button></span> 
      </form>
    )
  }
}
const TableValues = (props) => {
  return (props.clients.map(client => <OneCient Client={client}  getData={props.getData}/>));
}
const AddClient = (props) => {
  return (
    <button
      onClick={() => props.addClient()}
    >Add</button>
  )
}
const getData = async (myGetData) => {
  var data;
  if (test == 1)
    data = testData;
  else {
    const resp = await axios.get(`http://localhost:58546/api/clients`);
    data = resp.data;
  }
  myGetData(data);
}
const GetClients = (props) => {
  return (

    <button
      onClick={() => getData(props.onClickClients)}
    >Get Clients</button>
  )
}


function App() {
  const [readClients, setReadClients] = useState([]);
  const onAddClient = () => { setReadClients(readClients.concat({})) }
  const onGetData = (clientsArray) => {
    console.log(clientsArray);
    setReadClients(clientsArray);
  }
  //getData(onGetData);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <GetClients onClickClients={onGetData} />
          <AddClient addClient={onAddClient} />
        </div>

        <div class="table">
          <TableHeader />
          <TableValues clients={readClients} getData={onGetData}/>
        </div>
      </header>
    </div>
  );
}
export default App;
