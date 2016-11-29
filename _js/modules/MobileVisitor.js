'use strict';

import SocketPage from './SocketPage';
import InfoCard from './InfoCard';

import {httpGetAsync, numbersFromString, replaceCharAt} from '../helpers/util';

export default class MobileVisitor extends SocketPage{

  constructor(socket, clientDetails){

    super(socket);

    // -- Class Variable -------------
    this.clientDetails = clientDetails;
    this.socket = socket;
    this.qr = new QCodeDecoder();
    this.codexpass = 'XXXX';
    this.timeperiodId = 0;
    this.familyTree = clientDetails.familyTree;
    this.infocards = [];
    this.deckWidth = 0;
    this.selectedCardId = 0;

    // -- Element Variables ----------
    this.$captureOption = document.querySelector('.captureOption');
    this.$captureButton = document.querySelector('.captureButton');
    this.$camCapture = document.querySelector('.camCapture');
    this.$capturedImage = document.querySelector('.capturedImage');
    this.$passcodex = document.querySelector('#PassCodex');
    this.$cardsScreen = document.querySelector('.cardsScreen');
    this.$meta = document.querySelector('.meta');
    this.$cardContainer = document.querySelector('.cardsContainer');
    this.$cardDeck = document.querySelector('.cardDeck');
    this.$progressWrapper = document.querySelector('.progressWrapper');
    this.$timePlayed = document.querySelector('.timePlayedMask');
    this.$closeButton = document.querySelector('.closeButton');

    // -- Hammerjs Variables ---------
    this.hm = new Hammer(this.$cardContainer);

    // -- Event Handlers -------------
    this.$captureButton.addEventListener('click', () => { this.$camCapture.click(); });
    this.$camCapture.addEventListener('change', (e) => this.camCapturedHandler(e));
    this.socket.on('paired', (pairedid) => this.pairedHandler(pairedid));
    this.socket.on('swipedCard', (cardJSON) => this.selectedCardHandler(cardJSON));
    this.socket.on('sceneEnded', () => this.showCards());
    this.$closeButton.addEventListener('click', () => this.closeButtonTappedHandler());
    for(let i = 0; i < 4; i++){
      document.getElementsByClassName('upButton')[i].addEventListener('click', evt => {
        this.changePassValue(evt, 1);
      });
      document.getElementsByClassName('downButton')[i].addEventListener('click', evt => {
        this.changePassValue(evt, -1);
      });
    }

  }

  init(){

    this.initPairScreen();
    console.log('timeperiod', this.timeperiodId);

  }

  /* --- Pairing Screen --------------------------------------------------- */

  initPairScreen(){

    this.$meta.innerText = `${this.clientDetails.refcode} | Scan to Pair`;
    this.$passcodex.className = 'showCodex';
    this.$cardsScreen.className = 'cardsScreen hidden';
    this.$progressWrapper.className = 'progressWrapper hidden';

  }

  camCapturedHandler(evt){

    if(
      evt.target.files.length === 1 &&
      evt.target.files[0].type.indexOf('image/') === 0
    ){
      this.$capturedImage.setAttribute('src', URL.createObjectURL(event.target.files[0]));
      this.qr.decodeFromImage(this.$capturedImage, (err, result) => {

        if(err || result === 'null'){
          this.$captureButton.className = 'captureButton unrecognized';
          setTimeout(() => { this.$captureButton.className = 'captureButton'; }, 700);
        }else{
          this.socket.emit('checkCode', Number(result));
        }

      }, true);

    }

  }

  changePassValue(evt, direction){

    let $codexTicker = evt.target.parentNode;
    let index = Number(numbersFromString($codexTicker.getAttribute('id'))) -1;

    let $rowValue = document.getElementsByClassName('rowValue')[index];
    let value = $rowValue.innerHTML;

    if(value === 'X'){
      value = 0;
    }else{
      value = Number(value);
    }

    let newValue;
    if(direction < 0 && value <= 0){
      newValue = 9;
    }else if(direction > 0 && value >= 9){
      newValue = 0;
    }else{
      newValue = value + direction;
    }

    $rowValue.innerText = newValue;

    this.codexpass = replaceCharAt(String(this.codexpass), index, String(newValue));

    if(numbersFromString(this.codexpass).length === 4){
      this.socket.emit('checkCode', Number(this.codexpass));
    }

  }

  pairedHandler(timeperiodId){

    this.timeperiodId = timeperiodId;
    this.$passcodex.className = 'hideCodex';
    this.$captureOption.className = 'captureOption hidden';

    this.initCardsScreen();

  }

  /* --- Swipeable Info Cards -------------------------------------------------- */

  initCardsScreen(){

    httpGetAsync(`${window.location.href.substr(0, window.location.href.indexOf('/m'))}/api/periods/${this.timeperiodId}`, (cardsJSON) => this.createCards(cardsJSON));

  }

  createCards(jsonData){

    this.hm.on('pan', (evt) => this.panHandler(evt));
    let cardsJSON = JSON.parse(jsonData);
    for(let i = 0; i < cardsJSON.cards.length; i++){

      let card = new InfoCard(cardsJSON.cards[i], this.socket, this.deckWidth, this.familyTree);
      this.$cardDeck.appendChild(card.$el);
      this.infocards[card.id] = card;

      this.deckWidth += 140;

    }
    this.$cardDeck.style.width = `${this.deckWidth}px`;

    this.showCards();

  }

  panHandler(evt){

    let leftoverWidth = this.deckWidth - window.innerWidth + 30;
    let left = Number(this.$cardDeck.style.marginLeft.slice(0, -2));

    if(leftoverWidth > 0){

      if(evt.deltaX > 0 && left < 30){
        left += 10;
      }

      if(evt.deltaX < 0 && left > (-leftoverWidth)){
        left -= 10;
      }

      this.$cardDeck.style.marginLeft = `${left}px`;

    }

  }

  closeButtonTappedHandler(){

    this.socket.emit('returnedCard');
    this.showCards();

  }

  showCards(){

    this.$meta.innerText = `Choose a card`;

    this.$closeButton.className = 'closeButton hideButton';
    this.$progressWrapper.className = 'progressWrapper hidden';
    this.$timePlayed.className = 'timePlayedMask';
    this.$cardsScreen.className = 'cardsScreen';

    this.infocards[this.selectedCardId].returnCard();

  }

  selectedCardHandler(cardJSON){

    this.selectedCardId = cardJSON.card_id;
    /*this.audio = new Howl({
      urls: [`../audio/${cardJSON.familyTreeAudiofile}`],
      preload: true,
      buffer: true
    });*/

    setTimeout(() => {
      this.$cardsScreen.className = 'cardsScreen hidden';
      this.$progressWrapper.className = 'progressWrapper';
      this.$timePlayed.className = 'timePlayedMask progressAnim';
      this.$closeButton.className = 'closeButton showButton';
    }, 300);

  }

}
