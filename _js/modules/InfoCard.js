'use strict';

import {} from '../helpers/util';

export default class InfoCard{

  constructor(cardJSON, socket, xPos, familyTree){

    // -- Class Variable -------------
    this.socket = socket;
    this.id = cardJSON.card_id;
    this.year = cardJSON.year;
    this.title = cardJSON.title;
    this.type = cardJSON.type;
    this.json = cardJSON;
    this.xPos = xPos;

    // -- Audio Variables ------------
    this.familyTreeAudiofile = cardJSON.dialogues[familyTree].audio_file;
    /*this.audio = new Howl({
      urls: [`../audio/${this.familyTreeAudiofile}`],
      preload: true,
      buffer: true,
      autoplay: false
    });*/

    // -- Element Variables ----------
    this.$el = document.createElement('div');
    this.$year = document.createElement('h2');
    this.$title = document.createElement('h3');
    this.$img = document.createElement('img');
    //this.$audio = document.createElement('audio');

    // -- Hammerjs Variables ---------
    this.hm = new Hammer(this.$el, { direction: Hammer.DIRECTION_VERTICAL });

    // -- Event Handlers -------------
    this.hm.on('swipeup', (evt) => this.swipeUpHandler(evt));

    this.init();

  }

  init(){

    //this.$el.className = `card ${this.assignBgClass()} ${this.assignBorderClass()}`;
    this.$el.className = 'card';
    this.$el.style.left = `${this.xPos}px`;

    this.$year.innerText = this.year;
    this.$el.appendChild(this.$year);

    this.$title.innerText = this.title;
    this.$el.appendChild(this.$title);

    this.$img.setAttribute('src', `/img/${this.json.bg_img_file}`);
    this.$el.appendChild(this.$img);

    this.hm.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  }

  /* --- Hammer Gesture Handling ------------------------------------------------- */

  swipeUpHandler(evt){

    console.log('Swiped: ', evt.type);

    document.querySelector('.meta').innerText = `${this.year} | ${this.title}`;

    //this.$el.className = `card ${this.assignBgClass()} ${this.assignBorderClass()} swipedUp`;
    this.$el.className = `card swipedUp`;

    //this.playAudio();

    this.json.familyTreeAudiofile = this.familyTreeAudiofile;
    this.socket.emit('swipedCard', this.json);
  }

  returnCard(){
    //this.$el.className = `card ${this.assignBgClass()} ${this.assignBorderClass()}`;
    this.$el.className = `card`;
    //this.stopAudio();
  }

  /* --- Audio ------------------------------------------------------------------ */

  /*playAudio(){

    if(this.familyTreeAudiofile === 'none'){
      console.log('[InfoCard] No audio provided yet');
    }else{
      this.audio.play();
      //this.socket.emit('log', this.audio);
    }

  }

  stopAudio(){

    if(this.familyTreeAudiofile === 'none'){
      console.log('[InfoCard] No audio provided yet');
    }else{
      this.audio.stop();
    }

  }

  audioEndHandler(){

    this.socket.emit('audioEnd');

  }*/

  /* --- Helpers ------------------------------------------------------------------ */

  /*assignBgClass(){

    let cardBgClass = '';
    switch(this.type){
    case 'conflict':
      cardBgClass = 'bgRed';
      break;
    case 'economical':
      cardBgClass = 'bgYellow';
      break;
    case 'political':
      cardBgClass = 'bgPurple';
      break;
    case '':
    default:
      cardBgClass = 'bgDark';
      break;
    }
    cardBgClass = 'bgGrey';
    return cardBgClass;

  }

  assignBorderClass(){

    let cardBorderClass = '';
    switch(this.type){
    case 'conflict':
      cardBorderClass = 'borderRed';
      break;
    case 'economical':
      cardBorderClass = 'borderYellow';
      break;
    case 'political':
      cardBorderClass = 'borderPurple';
      break;
    case '':
    default:
      cardBorderClass = 'borderDark';
      break;
    }
    //cardBorderClass = 'borderGrey';
    return cardBorderClass;

  }*/

}
