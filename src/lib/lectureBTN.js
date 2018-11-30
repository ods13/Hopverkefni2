import { savedLectures, lectureCompleted } from '/.storage';
import * as converter from './converter';


export default class Lecture {
    constructor() {
        this.container = document.querySelector('.lecture');
        this.url = './lectures.json';

        this completeBtn = this.prepareCompleteBtn();
    }

    get slug() {
        return (new URLSearchParams(window.location.search)).get('slug');
    }

    checkButton(btn) {
        if (!lectureCompleted(this.getSlug())) {
            const text = document.createTextNode('Klára fyrirlestur');
            btn.replaceChild(text, btn.firstChild);
        } else {
            const text = document.createTextNode('Afmerkja fyrirlestur');
            btn.replaceChild(text, btn.firstChild);
        }
        
    }

    completeButtonHandler(e) {
        const slug = (this.getSlug());
        savedLectures(slug);
        this.checkButton(e.target);
    }

    prepareCompleteBtn() {
        const btn = document.querySelector('.complete--button');
        btn.addEventListener('click', this.completeButtonHandler.bind(this));
        this.checkButton(btn);
        return btn;
    }
}

