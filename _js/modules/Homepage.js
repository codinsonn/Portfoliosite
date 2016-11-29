'use strict';

//import SocketPage from './SocketPage';

import {} from '../helpers/util';

//export default class Homepage extends SocketPage{
export default class Homepage {

  //constructor(socket, clientDetails){
  constructor(){

    //super(socket);

    // -- Class Variable -------------
    /*this.clientDetails = clientDetails;
    this.socket = socket;
    this.timeperiodId = clientDetails.timeperiodId;
    this.currentYear = 1017;
    this.playing = false;
    this.lines = [];
    this.lineTimer = {};
    this.endTimer = {};
    this.familyTree = 0;*/

    // -- Element Variables ----------
    /*this.$pairOverlay = document.querySelector('.overlay');
    this.$meta = document.querySelector('.meta');
    this.$passcode = document.querySelector('.passcode');
    this.$qrcode = document.querySelector('.QRCode');
    this.$instructionInfo = document.querySelector('.instructionsScreen');
    this.$storyScreen = document.querySelector('.storyScreen');
    this.$storyStage = document.querySelector(`.s${this.currentYear}`);
    this.$subtitle = document.querySelector('.subtitles');
    this.$video = document.querySelector(`.s${this.currentYear} video`);*/

    // -- Event Handlers -------------
    /*this.socket.on('paired', (pairedref) => this.userConnectedHandler(pairedref));
    this.socket.on('swipedCard', (cardJSON) => this.loadStoryHandler(cardJSON));
    this.socket.on('returnedCard', (cardJSON) => this.showInfoScreen(cardJSON));
    this.socket.on('unpair', () => this.userDisconnectedHandler());*/

    // -- Loading --------------------
    //this.$videos = document.querySelectorAll('video');
    /*for(let i = 0; i < this.$videos.length(); i++){
      let $video = this.$videos[i];
      $video.load();
    }
    this.$video.load();
    this.$video.removeAttribute('controls');*/

  }

  init(){

    console.log('[Homepage] Intialising homepage');

    //this.initPairScreen();

  }

  /* --- Instructions / Info ------------------------------------------------- */

  /*showInfoScreen(){

    this.$pairOverlay.className = 'overlay hidden';
    this.$storyScreen.className = 'storyScreen hidden';
    this.$meta.innerText = `Awaiting card swipe...`;

    this.$instructionInfo.className = 'instructionsScreen';
    this.$storyStage.className = `storyStage s${this.currentYear} hidden`;

    console.log('Playing:', this.playing);
    if(this.playing){
      console.log('Playing 2:', this.playing);
      this.stopAudio();
      this.$video.pause();
      this.$video.currentTime = 0;
      clearTimeout(this.lineTimer);
      clearTimeout(this.endTimer);
      this.playing = false;
    }

  }*/

  /* --- Story Display ------------------------------------------------------ */

  /*loadStoryHandler(cardJSON){

    this.$meta.innerText = `${cardJSON.year} | ${cardJSON.title}`;
    this.$instructionInfo.className = 'instructionsScreen hidden';

    this.currentYear = cardJSON.year;
    this.$storyStage = document.querySelector(`.s${this.currentYear}`);
    this.$currentVideo = document.querySelector(`.s${this.currentYear} video`);

    this.audio = new Howl({ urls: [`../audio/${cardJSON.familyTreeAudiofile}`] });

    this.lines = cardJSON.dialogues[cardJSON.pairedFamilyTree].lines;

    this.displayStoryHandler();
    let sceneDuration = cardJSON.dialogues[cardJSON.pairedFamilyTree].duration * 1000 + 1000;
    this.endTimer = setTimeout(() => {
      this.showInfoScreen();
      this.socket.emit('sceneEnded');
    }, sceneDuration);

  }

  displayStoryHandler(){

    this.playing = true;
    this.playAudio();
    this.$storyScreen.className = 'storyScreen';
    setTimeout(() => {
      this.$video.play();
      this.$storyStage.className = `storyStage s${this.currentYear} startAnim`;
      this.displayNextLine(0);
    }, 50);

  }

  displayNextLine(lineId){

    this.$subtitle.className = 'subtitles hidden';
    if(typeof this.lines[lineId] !== 'undefined' && this.playing){

      this.$subtitle.innerText = this.lines[lineId].line;
      setTimeout(() => {
        this.$subtitle.className = 'subtitles';
      }, 500);

      let timeOnScreen = this.lines[lineId].secondsOfDuration * 1000 + 500;
      this.lineTimer = setTimeout(() => {
        this.displayNextLine(lineId + 1);
      }, timeOnScreen);

    }

  }*/

  /* --- Audio ------------------------------------------------------------------ */

  /*playAudio(){

    if(this.familyTreeAudiofile === 'none'){
      console.log('[InfoScreen] No audio provided yet');
    }else{
      console.log('[InfoScreen] Playing audio');
      this.audio.play();
    }

  }

  stopAudio(){

    if(this.familyTreeAudiofile === 'none'){
      console.log('[InfoScreen] No audio provided yet');
    }else if(this.playing === true){
      this.audio.stop();
    }

  }

  /*audioEndHandler(){

    if(this.playing){
      console.log('[InfoScreen] Audio ended');
      this.showInfoScreen();
    }

  }*/

  /* --- Pairing Logic ----------------------------------------------------- */

  /*initPairScreen(){

    this.$meta.innerText = `${this.clientDetails.refcode} | Pair with phone`;
    this.$instructionInfo.className = 'instructionsScreen hidden';
    this.$storyScreen.className = 'storyScreen hidden';

    this.$passcode.innerText = this.clientDetails.passcode;
    this.createQR();

    super.setStatus('waiting');

    this.$pairOverlay.className = 'overlay';

  }

  createQR(){

    console.log('[Info Screen] Creating QR Code');

    this.$qrcode.setAttribute('src', `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.clientDetails.passcode}`);

  }

  userConnectedHandler(pairedid){

    console.log('[Info Screen] Paired with Visitor\'s Smartphone');

    this.socket.emit('setPaired', pairedid);
    super.setStatus('paired');

    this.showInfoScreen();

  }

  userDisconnectedHandler(){

    console.log('[Info Screen] Unpaired with Visitor\'s, waiting for next one');

    this.socket.emit('unpair');

    this.initPairScreen();

  }*/

}
