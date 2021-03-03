import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) { //A constructor, that initializes the default state
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() { // callAPI()  will fetch the data from the API and store the response on this.state.apiResponse.
    fetch("http://localhost:9000/home")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() { // A react lifecycle method called componentDidMount(), that will execute the callAPI() method after the component mounts
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to DENEPS!</h1>
          <p className= "App-intro">
            {this.state.apiResponse}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
