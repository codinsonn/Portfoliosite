'use strict';

module.exports.register = (server, options, next) => {

  let io = require('socket.io')(server.listener);
  let Client = require('../models/Client');
  let DeviceTypes = require('../models/DeviceTypes.js');

  let clients = [];
  let infoScreens = [];

  io.on('connection', socket => {

    /* --- Connecting ------------------------------------------------------- */

    //console.log(`[Server] New client (${socket.id})`);

    let maxID = 0;
    if(assocLength(clients) > 0){
      for(let key in clients){
        let client = clients[key];
        if(client.id > maxID){
          maxID = client.id;
        }
      }
    }
    let newClient = new Client(maxID + 1, 'Unknown', socket.id);

    socket.on('createClient', clientInfo => {

      console.log(`[Server] New client (${clientInfo.refcode} / ${socket.id})`);

      newClient = new Client(maxID + 1, 'Unknown', socket.id);

      newClient.socketid = socket.id;
      newClient.type = clientInfo.deviceType;
      newClient.refcode = clientInfo.refcode;

      if(newClient.type === DeviceTypes.infoscreen){
        newClient.passcode = clientInfo.passcode;
        newClient.timeperiodId = clientInfo.timeperiodId;
        infoScreens[clientInfo.refcode] = newClient;
        socket.emit('screenConnect');
      }else{
        newClient.familyTree = clientInfo.familyTree;
        clients[clientInfo.refcode] = newClient;
        socket.emit('clientConnect');
      }

    });

    socket.on('log', str => {
      console.log('[Console]', str);
    });

    /* --- Infocards ----------------------------------------------------- */

    socket.on('swipedCard', cardJSON => {

      console.log('[Server] Selected infocard: ', cardJSON.card_id);

      cardJSON.pairedFamilyTree = newClient.familyTree;

      socket.emit('swipedCard', cardJSON);
      io.to(newClient.pairedid).emit('swipedCard', cardJSON);

    });

    socket.on('returnedCard', () => {

      console.log('[Server] Returning card...');

      io.to(newClient.pairedid).emit('returnedCard');

    });


    socket.on('sceneEnded', () => {

      console.log('[Server] The scene has ended... *drops mic*', newClient.pairedid);

      io.to(clients[newClient.pairedid].socketid).emit('sceneEnded');

    });

    /* --- Pairing ------------------------------------------------------- */

    socket.on('checkCode', passcode => {

      console.log(`[Server] checking code ${passcode}`);

      for(let key in infoScreens){

        let infoScreen = infoScreens[key];
        console.log(`[Server] checking code ${passcode} with InfoScreen (${infoScreen.refcode}|${infoScreen.passcode})`);

        if(infoScreen.passcode === passcode){
          console.log(`[Server] Right code ${passcode}`);

          newClient.pairedid = infoScreen.socketid;
          infoScreens[key].pairedid = newClient.socketid;
          newClient.pairedref = infoScreen.refcode;

          io.to(newClient.pairedid).emit('paired', newClient.refcode);
          socket.emit('paired', infoScreen.timeperiodId);

          console.log(`[Server] InfoScreen {${infoScreen.refcode} / ${infoScreen.socketid} / ${infoScreen.passcode}} is being viewed by {${newClient.refcode} / ${newClient.socketid}}`);
        }
      }
    });

    socket.on('setPaired', pairedId => {

      for(let key in clients){
        let client = clients[key];
        if(client.socketid === pairedId){
          newClient.pairedref = client.refcode;
        }
      }
      newClient.pairedid = pairedId;

    });

    socket.on('disconnect', () => {

      console.log(`[Server] Client (${newClient.refcode} / ${newClient.socketid}) has left...`);

      // Notify the info screen the user has left & reinitiate pairing screen
      io.to(newClient.pairedid).emit('unpair');

      delete clients[newClient.refcode];

    });

    socket.on('unpair', () => {

      console.log(`[Server] Unpairing Info Screen... (${newClient.refcode} / ${newClient.socketid})`);

      newClient.pairedref = '';
      newClient.pairedid = '';

    });

  });

  /* --- Other ------------------------------------------------------- */

  const assocLength = arr => {

    let arrLength = 0;
    for(let key in arr){
      key = key;
      arrLength++;
    }
    return arrLength;

  };

  next();

};

module.exports.register.attributes = {
  name: 'qrcodepairing',
  version: '0.1.0'
};
