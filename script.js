let capslock = false;
let shift = false;
let lang = '';

function lowercaseLetter() {
    document.querySelectorAll('.down').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.up').forEach(el => el.classList.remove('hidden'));
}

function uppercaseLetter() {
    document.querySelectorAll('.up').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.down').forEach(el => el.classList.remove('hidden'));
}

let container = document.createElement('div');
container.className = 'container';
document.body.append(container);

let title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Virtual Keybord';
container.append(title);

let subtitleOS = document.createElement('p');
subtitleOS.className = 'subtitle';
subtitleOS.textContent = 'Клавиатура создана в операционной системе Windows';
container.append(subtitleOS);

let subtitleLang = document.createElement('p');
subtitleLang.className = 'subtitle';
subtitleLang.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
container.append(subtitleLang);

let textarea = document.createElement('textarea');
textarea.className = 'textarea';
container.append(textarea);

let keyBord = document.createElement('div');
keyBord.className = 'keybord';
container.append(keyBord);

const keyLayout = {
    "Backquote": '~`Ёё',
    "Digit1" : '!1!1', 
    "Digit2" : '@2"2', 
    "Digit3" : '#3№3', 
    "Digit4" : '$4;4', 
    "Digit5" : '%5%5', 
    "Digit6" : '^6:6', 
    "Digit7" : '&7?7', 
    "Digit8" : '*8*8', 
    "Digit9" : '(9(9', 
    "Digit0" : ')0)0',
    "Minus" : '_-_-', 
    "Equal" : '+=+=', 
    "Backspace" : new Array(4).fill('Backspace'), 
    "Tab": new Array(4).fill('Tab'),
    "KeyQ" : 'QqЙй', 
    "KeyW" : 'WwЦц', 
    "KeyE" : 'EeУу', 
    "KeyR" : 'RrКк', 
    "KeyT" : 'TtЕе', 
    "KeyY" : 'YyНн', 
    "KeyU" : 'UuГг', 
    "KeyI" : 'IiШш', 
    "KeyO" : 'OoЩщ', 
    "KeyP" : 'PpЗз',
    "BracketLeft" : '{[Хх',
    "BracketRight" : '}]Ъъ',
    "Backslash" : '|\\/\\',
    "Delete" : new Array(4).fill('Del'),
    "CapsLock" : new Array(4).fill('CapsLock'), 
    "KeyA" : 'AaФф', 
    "KeyS" : 'SsЫы', 
    "KeyD" : 'DdВв', 
    "KeyF" : 'FfАа', 
    "KeyG" : 'GgПп', 
    "KeyH" : 'HhРр', 
    "KeyJ" : 'JjОо', 
    "KeyK" : 'KkЛл', 
    "KeyL" : 'LlДд', 
    "Semicolon" : ':;Жж', 
    "Quote" : '"\'Ээ', 
    "Enter" : new Array(4).fill('Enter'),
    "ShiftLeft" : new Array(4).fill('Shift'),
    "KeyZ" : 'ZzЯя', 
    "KeyX" : 'XxЧч', 
    "KeyC" : 'CcСс', 
    "KeyV" : 'VvМм', 
    "KeyB" : 'BbИи', 
    "KeyN" : 'NnТт', 
    "KeyM" : 'MmЬь', 
    "Comma" : '<,Бб',
    "Period" : '>.Юю', 
    "Slash" : '?/,.',
    "ArrowUp" : new Array(4).fill('▲'),
    "ShiftRight" : new Array(4).fill('Shift'),
    "ControlLeft" : new Array(4).fill('Ctrl'),
    "MetaLeft" : new Array(4).fill('Win'),
    "AltLeft" : new Array(4).fill('Alt'),
    "Space" :  new Array(4).fill(' '),
    "AltRight" : new Array(4).fill('Alt'),
    "ArrowLeft" : new Array(4).fill('◄'),
    "ArrowDown" : new Array(4).fill('▼'),
    "ArrowRight" : new Array(4).fill('►'),
    "ControlRight" : new Array(4).fill('Ctrl'),
};

for (let key in keyLayout) {
    let div = document.createElement('div');
    div.className = 'key';
    div.id = key;
    div.innerHTML = `<span class="en"><span class="down">${keyLayout[key][0]}</span><span class="up">${keyLayout[key][1]}</span></span><span class="ru"><span class="down">${keyLayout[key][2]}</span><span class="up">${keyLayout[key][3]}</span></span>`;
    document.querySelector('.keybord').append(div);
}

if (localStorage.lang === undefined) {
    lang = 'en';
    checkLang();
    checkCapslock();
} else {
    lang = localStorage.lang;
}

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

checkLang();
checkCapslock();

function changeLang() {
    if (lang === 'en') {
        lang = 'ru';
        localStorage.lang = 'ru';
    } else {
        lang = 'en';
        localStorage.lang = 'en';
    }

    checkLang();
    checkCapslock();
}

function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();
      func();
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });
}

runOnKeys(
    changeLang,
    "ControlLeft",
    "AltLeft"
  );

function checkCapslock() {
    if (capslock == false) {
        lowercaseLetter();
        document.querySelector('#CapsLock').classList.remove('press-key');
    } else if (capslock == true) {
        uppercaseLetter();
        document.querySelector('#CapsLock').classList.add('press-key');
    }
}
checkCapslock();

document.addEventListener('keydown', function(event) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        uppercaseLetter();
        shift = true;
    } 
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if (capslock === false) {
            lowercaseLetter();
        }
        shift = false;
    }
});


document.querySelector('#ShiftLeft').addEventListener('mousedown', uppercaseLetter);
document.querySelector('#ShiftLeft').addEventListener('mouseup', () => {
    if (capslock === false) { lowercaseLetter(); }
});

document.querySelector('#ShiftRight').addEventListener('mousedown', uppercaseLetter);
document.querySelector('#ShiftRight').addEventListener('mouseup', () => {
    if (capslock === false) { lowercaseLetter(); }
});


document.addEventListener('keydown', function(event){ 
    if (document.getElementById(event.code) !== null) {
        event.preventDefault();
        document.getElementById(event.code).classList.add('press-key');
        printKey(document.getElementById(event.code));     
    } else {
        event.preventDefault();
    }   
});
document.addEventListener('keyup', function(event){
    if (document.getElementById(event.code) !== null) {
        event.preventDefault();
        if (event.code !== 'CapsLock') {
            document.getElementById(event.code).classList.remove('press-key');
        }  
    } else {
        event.preventDefault();
    }
});


keyBord.addEventListener('mousedown', function(event) {
    if (event.target.closest('div').classList.contains('key')) {
        event.target.closest('div').classList.add('press-key');    
        printKey(event.target.closest('div'));	
    }

});

keyBord.addEventListener('mouseup', function(event) {
    if (event.target.closest('div').id !== 'CapsLock') {
        event.target.closest('div').classList.remove('press-key');
    } 
});

function paste(key) {
    textarea.setRangeText(key, textarea.selectionStart, textarea.selectionEnd, "end");
}

let curPos = 0;
function printKey(el) {
    switch(true) {
        case el.id === 'Backspace':
            if (textarea.selectionStart === textarea.selectionEnd) {
                curPos =  textarea.selectionStart;
                textarea.value = textarea.value.slice(0,curPos-1) + textarea.value.slice(curPos);
                textarea.selectionStart = curPos-1;
                textarea.selectionEnd = curPos-1;
                textarea.focus();
            } else {
                textarea.setRangeText("");
            }
            break;
        case el.id === 'Delete':
                if (textarea.selectionStart === textarea.selectionEnd) {
                curPos =  textarea.selectionStart;
                textarea.value = textarea.value.slice(0,curPos) + textarea.value.slice(curPos+1);
                textarea.selectionStart = curPos;
                textarea.selectionEnd = curPos;
                textarea.focus();
            } else {
                textarea.setRangeText("");
            }
            break;
        case el.id === 'Tab':
            paste('\t');
            break;
        case el.id === 'Enter':
            paste('\n');
            break;
        case el.id === 'CapsLock':
            capslock = capslock === false ? true : false;
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
            paste(el.textContent[0]);
            break;
        case lang === 'en' && capslock === false:
            paste(el.textContent[1]);
            break;
        case lang === 'ru' && capslock === true:
        case lang === 'ru' && shift === true:
            paste(el.textContent[2]);
            break;
        case lang === 'ru' && capslock === false:
            paste(el.textContent[3]);
            break;    
    }
}
