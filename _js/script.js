'use strict';

//import {checkUrlPath, createId, getUrlPaths} from './helpers/util';

//import DeviceTypes from '../models/DeviceTypes';

//import InfoScreen from './modules/InfoScreen';
//import MobileVisitor from './modules/MobileVisitor';
import Homepage from './modules/Homepage';

//let socket;
//let clientDetails;

//let infoscreen, mobilevisitor;
let homepage;

/*const initSocket = () => {

  // Must work with ip-adres on localhost to connect mobile
  //socket = io(`172.20.10.2:3000`); // wifi hotspot
  //socket = io(`172.20.10.3:3000`); // usb hotspot
  //socket = io(`172.30.22.14:3000`); // howestwirelessfast
  //socket = io(`172.30.22.23:3000`); // howestwireless
  //socket = io(`172.30.22.13:3000`); // howestwireless
  //socket = io(`192.168.0.178:3000`); // thuisnetwerk
  //socket = io(`192.168.0.177:3000`); // sam's kot
  //socket = io('https://thorrstevens.herokuapp.com/');

  /*if(checkUrlPath('sdamtp')){
    clientDetails = { deviceType: DeviceTypes.infoscreen };
    clientDetails.timeperiodId = getUrlPaths()[4];
    socket.on('screenConnect', initInfoScreen);
  }else{
    clientDetails = { deviceType: DeviceTypes.visitormobile };
    socket.on('clientConnect', initMobile);
  }

  createNewClient();*/

//};

/*const createNewClient = () => {

  console.log('[Script] Creating new client');

  clientDetails.passcode = 5818; //Math.floor((Math.random()*8999)+1000);
  clientDetails.refcode = `${createId(1, true)}${clientDetails.passcode}${createId(1, true)}`;
  clientDetails.familyTree = 0; //Math.floor(Math.random()*1);

  socket.emit('createClient', clientDetails);

};*/

/* --- MobileVisitor ------------------------------------------------- */

/*const initMobile = () => {

  mobilevisitor = new MobileVisitor(socket, clientDetails);
  mobilevisitor.init();

};*/

/* --- InfoScreen ---------------------------------------------------- */

/*const initInfoScreen = () => {

  infoscreen = new InfoScreen(socket, clientDetails);
  infoscreen.init();

};*/

/* --- Initcode ------------------------------------------------------ */

const init = () => {

  //initSocket();

  homepage = new Homepage();
  homepage.init();

};

init();
