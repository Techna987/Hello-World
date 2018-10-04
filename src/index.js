import React from "react";
import ReactDOM from "react-dom";

export default class Measure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      measures: [],
      time: 0
    }
    this.startTimer = this.startTimer.bind(this)
  }

  startTimer() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000)
    console.log("start")
  }

  componentDidMount() {
    //timer
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000)
    console.log("start" + time)

    //table
    let self = this;
    fetch('/measurments', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ measures: data });
    }).catch(err => {
      console.log('caught it!', err);
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> : null
    return (
      <div >
        <h3>timer: {this.state.time}</h3>
        <button onClick={this.startTimer}>start</button>
        <h1>Measurments</h1>
        <table style="width:100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Temperature</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.measures.map(member =>
              <tr key={member.unit_id}>
                <td>{member.unit_id} </td>
                <td>{member.temperature} </td>
                <td>{member.unix_timestamp}</td>
                <td><a>Edit</a>|<a>Delete</a></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measures: [],
      time: 0,
      avg: 0
    }
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.state.time % 60 == 0) {
      //table
      let self = this;
      fetch('/measurments', {
        method: 'GET'
      }).then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function (data) {
        self.setState({ measures: data });


      }).catch(err => {
        console.log('caught it!', err);
      })
    }

  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000)
    console.log("start")


    //table
    let self = this;
    fetch('/measurments', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ measures: data });
      self.setState({
        avg: findAvg(data)
      });


    }).catch(err => {
      console.log('caught it!', err);
    })




  }

  startTimer() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000)
    console.log("start")

    //table
    let self = this;
    fetch('/measurments', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ measures: data });
    }).catch(err => {
      console.log('caught it!', err);
    })
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> : null
    return (

      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.time}.</h2>
        <button onClick={this.startTimer}>start</button>
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Temperature</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.measures.map(member =>
              <tr key={member.unit_id}>
                <td>{member.unit_id} </td>
                <td>{member.temperature} </td>
                <td>{member.unix_timestamp}</td>
                <td><a>Edit</a>|<a>Delete</a></td>
              </tr>
            )}
          </tbody>
        </table>
        <h2>The average is: {this.state.avg}</h2>

      </div>
    );
  }
}

// const Index = () => {
//   return <div>Hello React!</div>;
// };

function x() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var employees = JSON.parse(xhr.responseText);
      for (var i = 0; i < employees.length; i++) {
        employee = employees[i];
        document.getElementById("demo").innerHTML += '<br>' + employee.name;

      }
    }
  }
}

function show(elmt) {

  return elmt;

}

function findAvg(elmt) {
  // var elmt;
  if (elmt == null)
    return 5;
  else {
    for (var i = 0; i < elmt.length; i++) {
      elmt[i] = parseFloat(elmt[i].temperature);
    }

    console.log(elmt);
    var sum = 0;
    for (var i = 0; i < elmt.length; i++) {
      sum += elmt[i]; //don't forget to add the base
    }

    var avg = sum / elmt.length;
    return avg;
  }
}

ReactDOM.render(<Clock />, document.getElementById("app"));


