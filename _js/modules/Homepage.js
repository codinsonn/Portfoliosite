'use strict';

import {} from '../helpers/util';

export default class Homepage {

  constructor(){

    // -- Class Variables -------------
    this.currentProject = 1;
    this.lastProject = 6;

    // -- Element Variables ----------
    this.$btnPrev = document.querySelector('.prev');
    this.$btnNext = document.querySelector('.next');
    this.$projects = document.querySelector('.projects-overview');

    // -- Event Handlers -------------
    this.$btnPrev.addEventListener('click', () => this.navigateProject(-1));
    this.$btnNext.addEventListener('click', () => this.navigateProject(1));

  }

  init(){

    console.log('[Homepage] Intialising homepage');

  }

  /* --- Navigate Projects ------------------------------------------------- */

  navigateProject(direction){

    if(direction === -1 && this.currentProject > 1){
      this.currentProject += direction;
    }else if(direction === 1 && this.currentProject < this.lastProject){
      this.currentProject += direction;
    }

    console.log('current project: ', this.currentProject);

    if(this.currentProject === 1){
      console.log('start', this.currentProject);
      this.$btnPrev.className = 'prev hidden';
    }else if(this.currentProject === this.lastProject){
      console.log('end', this.currentProject);
      this.$btnNext.className = 'next hidden';
    }else{
      console.log('middle', this.currentProject);
      this.$btnPrev.className = 'prev';
      this.$btnNext.className = 'next';
    }

    let margin = (this.currentProject - 1) * 100;
    let strMargin = `-${margin}%`;

    this.$projects.style.marginLeft = strMargin;

  }

}
