import { empty } from './helpers';
import *  as converter from './converter';
import { loadSavedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = './lectures.json';

    this.completedLectures = loadSavedLectures();

    this.htmlButton = document.querySelector('.buttons__HTML');
    this.htmlButton.addEventListener('click', this.infoButtonHandler.bind(this));

    this.cssButton = document.querySelector('.buttons__CSS');
    this.cssButton.addEventListener('click', this.infoButtonHandler.bind(this));

    this.jsButton = document.querySelector('.buttons__JS');
    this.jsButton.addEventListener('click', this.infoButtonHandler.bind(this));
  }

  //**nær í fyrirlestra skilar villu ef gögn eru í ólagi */
  
  loadLectures() {
    return fetch(this.url)
    .then((res)=> {
      if(!res.ok) {
        throw new Error('Ekki hægt að sækja fyrirlestra');
      }
      return res.json();
      });
  }

  renderData(data, info) {
    if (typeof info !== 'undefined' && info.length > 0) {
      for (let i = 0; i < info.length; i += 1) {
        for(let item of data.lectures){ 
          if (info[i] === item.category) {
            this.renderItem(item);
          }
        }
      }
    } else {
      for(let item of data.lectures){
        this.renderItem(item);
      }
    }
  }
 
  }

  renderItem(item) {

    const buttonsContainer = converter.buttonsContainer(item.category, item.slug);
    const imageElement = converter.buttonsImage(item.buttons);

    buttonsContainer.appendChild(imageElement);
    let titleElement;

    if (this.completedLectures.includes(item.slug)) {
      titleElement = converter.buttonsBottom(item.title, item.category, 'siteinfo__checkmark');
    } else {
      titleElement = converter.buttonsBottom(item.title, item.category);
    }
    buttonsContainer.appendChild(titleElement);
    this.container.appendChild(buttonsContainer);
  }

  load(info) {
    empty(this.container);
    this.loadLectures()
      .then((data) => {
        this.renderData(data, info);
      });
  }

  colorButton(target) {
    const parent = target.parentNode;
    const { children } = parent;
    for (let i = 0; i < children.length; i += 1) {
      if (children[i].classList.contains('buttons__selected')) {
        children[i].classList.remove('buttons__selected');
      }
      target.classList.add('buttons__selected');
    }
  }

  infoButtonHandler(e) {
    const { target } = e;
    const info = target.firstChild.nodeValue.toLowerCase();
    if (!target.classList.contains('buttons__selected')) {
      this.colorButton(target);
      this.load(info);
    } else {
      target.classList.remove('buttons__selected');
      this.load();
    }
  }
}
