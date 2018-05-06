import React, { Component } from 'react';
import Client from './Client.js';
import './App.css';

class Row extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.entry.a}</td>
        <td>{this.props.entry.b}</td>
        <td>{this.props.entry.c}</td>
      </tr>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new Client();
    this.state = {
      rows: [{
        a: 1,
        b: 2,
        c: 3
      }, {
        a: 4,
        b: 5,
        c: 6
      }, {
        a: 7,
        b: 8,
        c: 9
      }]
    };
  }

  render() {
    let rows = this.state.rows.map(row =>
      <Row entry={row}/>
    );
    return (
      <div className="App">
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
