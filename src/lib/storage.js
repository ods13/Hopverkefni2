const LOCALSTORAGE_KEY1 = 'completed_lectures';
let lectureArray = [];
const LOCALSTORAGE_KEY2 = 'site_info';
let infoArray = [];

export function loadSavedLectures() {
  const savedLectures = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY1));

  if (savedLectures) {
    lectureArray = savedLectures;
    return lectureArray;
  }
  return [];
}

function removeSavedLecture(slug) {
  const lectures = loadSavedLectures();
  const index = lectures.indexOf(slug);

  if (index > -1) {
    lectures.splice(index, 1);
  }
  localStorage.setItem(LOCALSTORAGE_KEY1, JSON.stringify(lectures));
}

export function saveLectures(slug) {
  const lectures = loadSavedLectures();
  if (!lectures.includes(slug)) {
    lectures.push(slug);
    localStorage.setItem(LOCALSTORAGE_KEY1, JSON.stringify(lectures));
  } else {
    removeSavedLecture(slug);
  }
}
export function loadSavedInfo() {
  const setInfo = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY2));

  if (setInfo) {
    infoArray = setInfo;
    return infoArray;
  }
  return [];
}

export function savedInfo(info) {
  infoArray.push(info);
  localStorage.setItem(LOCALSTORAGE_KEY2, JSON.stringify(infoArray));
}

export function removeInfo(info) {
  const index = infoArray.indexOf(info);
  if (index > -1) {
    infoArray.splice(index, 1);
  }
  localStorage.setItem(LOCALSTORAGE_KEY2, JSON.stringify(infoArray));
}
