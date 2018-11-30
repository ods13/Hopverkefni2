import {createElement} from './helpers';

export function buttonsContainer(info, slug) {
  const link = createElement('a');
  link.href = `./fyrirlestur.html?slug=${slug}`;
  link.classList.add('siteinfo', 'grid__col-4', `${info}`);
  return link;
}
/** Býr til mynda element. */

export function buttonsImage(imagePath) {
  if (!imagePath) {
    const div = document.createElement('div');
    div.classList.add('siteinfo__empty');
    return div;
  }
  const imageElement = createElement('img');
  imageElement.src = `${imagePath}`;
  imageElement.classList.add('siteinfo__img');
  return imageElement;
}

 /**býr til element fyrir titil á forsíðu  */

export function buttonsTitle(title, info) {
  const div = document.createElement('div');
  div.classList.add('siteinfo__text');

  const infoElement = createElement('h4', info);
  infoElement.classList.add('siteinfo__info');

  const titleElement = createElement('h1', title);

  div.appendChild(infoElement);
  div.appendChild(titleElement);
  return div;
}

export function buttonsBottom(title, info, completed) {
  const bottom = createElement('div');
  bottom.classList.add('siteinfo__bottom');

function buttonsCheck(checked) {
    const mark = createElement('div', '✔');
    mark.classList.add('siteinfo__checkmark');
    if (checked) {
      mark.classList.add('siteinfo__checked');
    }
    return mark;
  }

  const textArea = buttonsTitle(title, info);
  const checkMark = buttonsCheck(completed);

  bottom.appendChild(textArea);
  bottom.appendChild(checkMark);
  return bottom;
}
