import React, { Component } from 'react';
import Client from './Client.js';
import './App.css';

let arca = new Client();

class Cell extends Component {
  handleClickSpan() {
    console.log(this);
    console.log('toggle the span with the input for redacting...');
  }

  render() {
    return (
      <div>
        <span onClick={this.handleClickSpan}>{this.props.entry[this.props.name]}</span>
      </div>
    );
  }
}


class Row extends Component {
  render() {
    return (
      <tr>
        <td><Cell entry={this.props.entry} name={'status'} /></td>
        <td><Cell entry={this.props.entry} name={'title'} /></td>
      </tr>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    arca.connection.on('connect', () => {
      arca.connection.emit('data', {
        query: 'subscribe',
        module: 'Contracts'
      });

      arca.connection.emit('data', {
        query: 'select',
        module: 'Contracts'
      });
    });

    arca.connection.on('response', (data) => {
      if (data.query === 'select') {
        this.setState({
          rows: this.state.rows.slice().concat(data.row)
        });
      }
    });

    this.state = {
      rows: []
    };
  }

  render() {
    let rows = this.state.rows.map(row =>
      <Row entry={row} key={row.id.toString()} />
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
