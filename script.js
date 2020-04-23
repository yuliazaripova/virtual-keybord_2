const lower = 'lower';
const upper = 'upper';

const container = document.createElement('div');
container.className = 'container';
document.body.append(container);

const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Virtual Keybord';
container.append(title);

const subtitleOS = document.createElement('p');
subtitleOS.className = 'subtitle';
subtitleOS.textContent = 'Клавиатура создана в операционной системе Windows';
container.append(subtitleOS);

const subtitleLang = document.createElement('p');
subtitleLang.className = 'subtitle';
subtitleLang.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
container.append(subtitleLang);

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
container.append(textarea);

const keyBord = document.createElement('div');
keyBord.className = 'keybord';
container.append(keyBord);

const keyLayout = {
  Backquote: '~`Ёё',
  Digit1: '!1!1',
  Digit2: '@2"2',
  Digit3: '#3№3',
  Digit4: '$4;4',
  Digit5: '%5%5',
  Digit6: '^6:6',
  Digit7: '&7?7',
  Digit8: '*8*8',
  Digit9: '(9(9',
  Digit0: ')0)0',
  Minus: '_-_-',
  Equal: '+=+=',
  Backspace: new Array(4).fill('Backspace'),
  Tab: new Array(4).fill('Tab'),
  KeyQ: 'QqЙй',
  KeyW: 'WwЦц',
  KeyE: 'EeУу',
  KeyR: 'RrКк',
  KeyT: 'TtЕе',
  KeyY: 'YyНн',
  KeyU: 'UuГг',
  KeyI: 'IiШш',
  KeyO: 'OoЩщ',
  KeyP: 'PpЗз',
  BracketLeft: '{[Хх',
  BracketRight: '}]Ъъ',
  Backslash: '|\\/\\',
  Delete: new Array(4).fill('Del'),
  CapsLock: new Array(4).fill('CapsLock'),
  KeyA: 'AaФф',
  KeyS: 'SsЫы',
  KeyD: 'DdВв',
  KeyF: 'FfАа',
  KeyG: 'GgПп',
  KeyH: 'HhРр',
  KeyJ: 'JjОо',
  KeyK: 'KkЛл',
  KeyL: 'LlДд',
  Semicolon: ':;Жж',
  Quote: '"\'Ээ',
  Enter: new Array(4).fill('Enter'),
  ShiftLeft: new Array(4).fill('Shift'),
  KeyZ: 'ZzЯя',
  KeyX: 'XxЧч',
  KeyC: 'CcСс',
  KeyV: 'VvМм',
  KeyB: 'BbИи',
  KeyN: 'NnТт',
  KeyM: 'MmЬь',
  Comma: '<,Бб',
  Period: '>.Юю',
  Slash: '?/,.',
  ArrowUp: new Array(4).fill('▲'),
  ShiftRight: new Array(4).fill('Shift'),
  ControlLeft: new Array(4).fill('Ctrl'),
  MetaLeft: new Array(4).fill('Win'),
  AltLeft: new Array(4).fill('Alt'),
  Space: new Array(4).fill(' '),
  AltRight: new Array(4).fill('Alt'),
  ArrowLeft: new Array(4).fill('◄'),
  ArrowDown: new Array(4).fill('▼'),
  ArrowRight: new Array(4).fill('►'),
  ControlRight: new Array(4).fill('Ctrl')
};


let capslock = false;
let shift = false;
let lang = '';


function setCase(lettercase) {
  if (lettercase === lower) {
    document.querySelectorAll('.down').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.up').forEach(el => el.classList.remove('hidden'));
  } else if (lettercase === upper) {
    document.querySelectorAll('.up').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.down').forEach(el => el.classList.remove('hidden'));
  }
}

Object.entries(keyLayout).forEach(([key, value]) => {
  let div = document.createElement('div');
  div.className = 'key';
  div.id = key;
  div.innerHTML = `<span class="en"><span class="down">${value[0]}</span><span class="up">${value[1]}</span></span><span class="ru"><span class="down">${value[2]}</span><span class="up">${value[3]}</span></span>`;
  document.querySelector('.keybord').append(div);
});


function checkLang() {
  if (lang === 'en') {
    document.querySelectorAll('.ru').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.ru > span').forEach(el => el.classList.add('hidden'));

    document.querySelectorAll('.en').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.en > span').forEach(el => el.classList.remove('hidden'));
  } else if (lang === 'ru') {
    document.querySelectorAll('.en').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.en > span').forEach(el => el.classList.add('hidden'));

    document.querySelectorAll('.ru').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.ru > span').forEach(el => el.classList.remove('hidden'));
  }
}

function checkCapslock() {
  if (!capslock) {
    setCase(lower);
    document.querySelector('#CapsLock').classList.remove('press-key');
  } else {
    setCase(upper);
    document.querySelector('#CapsLock').classList.add('press-key');
  }
}

let currentLang = localStorage.getItem('lang');
if (currentLang === null) {
  lang = 'en';
  checkLang();
  checkCapslock();
} else {
  lang = currentLang;
}

checkLang();
checkCapslock();

function changeLang() {
  if (lang === 'en') {
    lang = 'ru';
    localStorage.setItem('lang', 'ru');
  } else {
    lang = 'en';
    localStorage.setItem('lang', 'en');
  }

  checkLang();
  checkCapslock();
}

(() => {
  document.addEventListener('keydown', (e) => {
    if ((e.code === 'ControlLeft' && e.altKey) || (e.code === 'AltLeft' && e.ctrlKey)) {
      changeLang();
    }
  });
})();

document.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    setCase(upper);
    shift = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (capslock === false) {
      setCase(lower);
    }
    shift = false;
  }
});


document.querySelector('#ShiftLeft').addEventListener('mousedown', () => { setCase(upper); });
document.querySelector('#ShiftLeft').addEventListener('mouseup', () => {
  if (capslock === false) { setCase(lower); }
});

document.querySelector('#ShiftRight').addEventListener('mousedown', () => { setCase(upper); });
document.querySelector('#ShiftRight').addEventListener('mouseup', () => {
  if (capslock === false) { setCase(lower); }
});


let clickedButton = '';
let clickedShift = false;

document.addEventListener('mousedown', (event) => {
  clickedButton = event.target.closest('div').id;
  if (clickedButton === 'ShiftLeft' || clickedButton === 'ShiftRight') {
    clickedShift = true;
  }
});

document.addEventListener('mouseup', (event) => {
  clickedButton = event.target.closest('div').id;
  if (clickedButton === 'ShiftLeft' || clickedButton === 'ShiftRight') {
    clickedShift = false;
  }
});

function paste(key) {
  textarea.setRangeText(key, textarea.selectionStart, textarea.selectionEnd, 'end');
}

let curPos = 0;
function printKey(el) {
  switch (true) {
    case el.id === 'Backspace':
      if (textarea.selectionStart === textarea.selectionEnd) {
        curPos = textarea.selectionStart;
        textarea.value = textarea.value.slice(0, curPos - 1) + textarea.value.slice(curPos);
        textarea.selectionStart = curPos - 1;
        textarea.selectionEnd = curPos - 1;
        textarea.focus();
      } else {
        textarea.setRangeText('');
      }
      break;
    case el.id === 'Delete':
      if (textarea.selectionStart === textarea.selectionEnd) {
        curPos = textarea.selectionStart;
        textarea.value = textarea.value.slice(0, curPos) + textarea.value.slice(curPos + 1);
        textarea.selectionStart = curPos;
        textarea.selectionEnd = curPos;
        textarea.focus();
      } else {
        textarea.setRangeText('');
      }
      break;
    case el.id === 'Tab':
      paste('\t');
      break;
    case el.id === 'Enter':
      paste('\n');
      break;
    case el.id === 'CapsLock':
      capslock = !capslock;
      checkCapslock();
      break;
    case el.id === 'ControlLeft':
    case el.id === 'ControlRight':
    case el.id === 'MetaLeft':
    case el.id === 'AltLeft':
    case el.id === 'AltRight':
    case el.id === 'ShiftLeft':
    case el.id === 'ShiftRight':
      break;
    case lang === 'en' && capslock === true:
    case lang === 'en' && shift === true:
    case lang === 'en' && clickedShift === true:
      paste(el.textContent[0]);
      break;
    case lang === 'en' && capslock === false:
      paste(el.textContent[1]);
      break;
    case lang === 'ru' && capslock === true:
    case lang === 'ru' && shift === true:
    case lang === 'ru' && clickedShift === true:
      paste(el.textContent[2]);
      break;
    case lang === 'ru' && capslock === false:
      paste(el.textContent[3]);
      break;
    default:
      break;
  }
}

document.addEventListener('keydown', (event) => {
  if (document.getElementById(event.code) !== null) {
    event.preventDefault();
    document.getElementById(event.code).classList.add('press-key');
    printKey(document.getElementById(event.code));
  } else {
    event.preventDefault();
  }
});

document.addEventListener('keyup', (event) => {
  if (document.getElementById(event.code) !== null) {
    event.preventDefault();
    if (event.code !== 'CapsLock') {
      document.getElementById(event.code).classList.remove('press-key');
    }
  } else {
    event.preventDefault();
  }
});

keyBord.addEventListener('mousedown', (event) => {
  if (event.target.closest('div').classList.contains('key')) {
    event.target.closest('div').classList.add('press-key');
    printKey(event.target.closest('div'));
  }
});

keyBord.addEventListener('mouseup', (event) => {
  if (event.target.closest('div').id !== 'CapsLock') {
    event.target.closest('div').classList.remove('press-key');
  }
});
