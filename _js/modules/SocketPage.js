'use strict';

export default class SocketPage{

  constructor(socket){

    this.socket = socket;

  }

  setStatus(status){

    this.socket.emit('setStatus', status);

  }

}
