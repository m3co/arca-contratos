
import io from 'socket.io-client';

export default class Client {
  constructor() {
    var connection = io();
    connection.on('connect', () => {

      connection.emit('data', {
        query: 'subscribe',
        module: 'Contractors'
      });

    });

    connection.on('response', (data) => {
      if (data.row) {
        console.log(data.row);
      }
    });
  }
}
