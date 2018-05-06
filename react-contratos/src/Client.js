
import io from 'socket.io-client';

export default class Client {
  constructor() {
    this.connection = io();
  }
}
