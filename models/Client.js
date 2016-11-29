'use strict';

let Status = require('../models/Status');

class Client {

  constructor(id, strDeviceType, socketid){
    this.id = id;
    this.socketid = socketid;
    this.refcode = '';
    this.passcode = '';
    this.pairedid = '';
    this.pairedref = '';
    this.devicename = `${strDeviceType}_${this.id}`;
    this.type = strDeviceType;
    this.status = Status.not_ready;
    this.foundCodexes = [false, false, false, false, false, false];
    this.solvedCodexes = [false, false, false, false, false, false];
  }

}

module.exports = Client;
