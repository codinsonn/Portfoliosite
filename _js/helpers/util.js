'use strict';

import 'array.from';

export const html = (strings, ...values) => {

  let str = '';

  if(Array.isArray(strings)){
    for(let i = 0; i < strings.length; i++){
      if(strings[i]) str += strings[i];
      if(values[i]) str += values[i];
    }
  }else{
    str = strings;
  }

  let doc = new DOMParser().parseFromString(str.trim(), 'text/html');

  return doc.body.firstChild;

};

export const prepend = ($parent, $element) => {

  let $first = $parent.children[0];
  $parent.insertBefore($element, $first);

};

export const removeByClassName = selector => {

  let $element = document.querySelector(selector);
  $element.parentNode.removeChild($element);

};

export const mobileCheck = () => {

  var check = false;

  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent||navigator.vendor||window.opera);

  //console.log(check);

  //return true;
  return check;

};

export const mobileAndTabletCheck = () => {

  var check = false;

  (function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent||navigator.vendor||window.opera);

  return check;

};

export const hideAdressBar = () =>{

  if(document.height < window.outerHeight){
    document.body.style.height = `${(window.outerHeight + 50)}px`;
  }

  setTimeout( () => {
    window.scrollTo(0, 1);
  }, 10);

};

export const checkUrlPath = keyword =>{

  let hashes = [];
  let check = false;

  hashes = window.location.pathname.split('/');
  if(hashes.indexOf(keyword) > -1){
    check = true;
  }

  return check;

};

export const getUrlPaths = (customUrl='') =>{

  let checkurl;
  if(customUrl === ''){
    checkurl = window.location.href;
  }else{
    checkurl = customUrl;
  }

  return checkurl.split('/');

};

export const getUrlVars = (customUrl='') =>{

  let checkurl;
  if(customUrl === ''){
    checkurl = window.location.href;
  }else{
    checkurl = customUrl;
  }

  let vars = [], hash;
  let hashes = checkurl.slice(checkurl.indexOf('?') + 1).split('&');
  for(let i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;

};

export const redirectToPage = path => {

  let index, baseUrl, redirectUrl;

  if(checkUrlPath('connect')){
    index = window.location.href.indexOf('/connect');
  }else if(checkUrlPath('m')){
    index = window.location.href.indexOf('/m');
  }else if(checkUrlPath('d')){
    index = window.location.href.indexOf('/d');
  }else{
    index = window.location.href.indexOf('/');
  }

  baseUrl = window.location.href.substr(0, index);
  redirectUrl = `${baseUrl}/${path}`;

  window.location = redirectUrl;

};

export const numbersFromString = checkString => {

  let nums = checkString.match(/\d/g);
  return nums.join('');

};

export const replaceCharAt = (str, index, character) => {

  return str.substr(0, index) + character + str.substr(index+character.length);

};

export const createId = (idLength, noNums=false) => {

  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqid = '';

  if(noNums === true){
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  }

  for(let i = 0; i < idLength; i++){
    uniqid += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return uniqid;

};

export const httpGet = (theUrl) => {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( 'GET', theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;

};

export const httpGetAsync = (theUrl, callback) => {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {

    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
      callback(xmlHttp.responseText);
    }

  };

  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);

};

export const rgbToHex = (r, g, b) => {

  if(r > 255 || g > 255 || b > 255){
    throw 'Invalid color component';
  }
  return ((r << 16) | (g << 8) | b).toString(16);

};

export const $ = selector => {

  let result;

  if(selector === 'body'){
    return document.body;
  }else if(selector === 'head'){
    return document.head;
  }else if(/^[\#.]?[\w-]+$/.test(selector)){

    if(selector[0] === '#'){
      return document.getElementById(selector.slice(1));
    }else if(selector[0] === '.'){
      result = document.getElementsByClassName(selector.slice(1));
    }else{
      result = document.getElementsByTagName(selector);
    }
  }else{
    result = document.querySelectorAll(selector);
  }

  let elements = [...result];
  if(elements.length === 1) return elements[0];
  return elements;

};
