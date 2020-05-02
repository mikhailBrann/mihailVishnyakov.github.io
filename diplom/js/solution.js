const WRAP = document.querySelector('.wrap'),
BODY = document.querySelector('body'),
MENU = document.querySelector('.menu'),
APP = document.querySelector('.app'),
MASK = document.querySelector('.mask'),
IMG = document.querySelector('.current-image'),
NEW_PIC = document.querySelector('.new'),
PIC_WRAP = document.querySelector('.picture');


document.addEventListener('DOMContentLoaded', function () {
  const imgID = getIdFromUrl('id');
  if (imgID) {
    window.imgID = imgID;
    wsConnect();
  };
});


function getIdFromUrl(name) {
  const imgHref = window.location.search.split('?id=')[1];
  return imgHref;
};

// Блок управления меню
MENU.setAttribute('draggable', true);
MENU.addEventListener('mousedown', event => {
  if (event.which != 1) {
    return;
  };
  let elem = event.target.closest('.drag');
  if (!elem) return;
  let coords = getCoords(MENU),
  shiftX = event.pageX - coords.left,
  shiftY = event.pageY - coords.top,
  limits = {
    top: WRAP.offsetTop + shiftY,
    right: WRAP.offsetWidth + WRAP.offsetLeft - MENU.offsetWidth + shiftX,
    bottom: WRAP.offsetHeight + WRAP.offsetTop - MENU.offsetHeight + shiftY,
    left: WRAP.offsetLeft + shiftX
  };

  function moveAt(event) {
    let newLocation = {
      x: limits.left,
      y: limits.top
    };
    if (event.pageX > limits.right) {
      newLocation.x = limits.right;
    } else if (event.pageX > limits.left) {
      newLocation.x = event.pageX;
    };
    if (event.pageY > limits.bottom) {
      newLocation.y = limits.bottom;
    } else if (event.pageY > limits.top) {
      newLocation.y = event.pageY;
    };
    MENU.style.left = newLocation.x - shiftX + 'px';
    MENU.style.top = newLocation.y - shiftY + 'px';
    MENU.style.marginRight = '-1px';
  };

  document.onmousemove = function (event) {
    moveAt(event);
  };

  MENU.onmouseup = function () {
    document.onmousemove = null;
    MENU.onmouseup = null;
  };

  MENU.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };
});

window.addEventListener("resize", windowResize, false);

function windowResize() {
  console.log('Resize event');
  resizePaintMask();
  relocationMenu();
};

function relocationMenu(position, value) {
  let limPos = WRAP.offsetLeft + WRAP.offsetWidth - MENU.offsetWidth - 1;
  if (parseInt(MENU.style.left) < 0) {
    MENU.style.left = '0px';
  } else {
    if (limPos === parseInt(MENU.style.left)) {
      MENU.style.left = (parseInt(MENU.style.left) - value) + 'px';
    } else if ((limPos - value) < parseInt(MENU.style.left)) {
      MENU.style.left = (position - value) + 'px';
    };
  };
};

//Переключатель режимов
function setMode(mode) {
  APP.className = "wrap";
  APP.classList.add('app', 'app_' + mode);
}

//Загрузка и проверка изображений
const LOAD_DATA = document.querySelector('input');
LOAD_DATA.addEventListener('change', function (event) {
  let inputFilesArr = Array.from(this.files),
  checkInput = inputFilesArr.forEach(function (elem) {
    if (elem.type == 'image/jpeg' || elem.type == 'image/png') {
      upload(inputFilesArr);
      ERROR_MESS.classList.add('hidden');
    } else {
      ERROR_MESS.classList.remove('hidden');
      ERROR_MESS.style.zIndex = 10;
    };
  });
});

const IMG_LOADER = document.querySelector('.image-loader');
DROP_FILE = document.querySelector('body'),
ERROR_MESS = document.querySelector('.error'),
REPEAT_DOWNLOAD = document.querySelector('.repeat-download');

DROP_FILE.addEventListener('drop', onFilesDrop);
DROP_FILE.addEventListener('dragover', event => event.preventDefault());
IMG.setAttribute('new', '');

function onFilesDrop(event) {
  event.preventDefault();
  let dropFilesArr = Array.from(event.dataTransfer.files),
  checkDrop = dropFilesArr.forEach(function (elem) {
    console.log(`Загружаемый тип изображения: ${elem.type}`);
    if (elem.type == 'image/jpeg' || elem.type == 'image/png') {
      if (IMG.hasAttribute('new')) {
        upload(dropFilesArr);
        ERROR_MESS.classList.add('hidden');
      } else {
        REPEAT_DOWNLOAD.classList.remove('hidden');
        REPEAT_DOWNLOAD.style.zIndex = 10;
      };
    } else {
      ERROR_MESS.classList.remove('hidden');
      ERROR_MESS.style.zIndex = 10;
    };
  });
};

function resetErrorMessage() {
  ERROR_MESS.classList.add('hidden');
  REPEAT_DOWNLOAD.classList.add('hidden');
};

//Первичная загрузка на сервер
const SERVER_ERR = document.querySelector('.server-error');

function upload(file) {
  let formData = new FormData();
  for (var i = 0, file; file = file[i]; ++i) {
    formData.append('title', file.name);
    formData.append('image', file);
  }

  IMG_LOADER.classList.remove('hidden');
  REPEAT_DOWNLOAD.classList.add('hidden');
  SERVER_ERR.classList.add('hidden');

  fetch('https://neto-api.herokuapp.com/pic', {
      method: 'POST',
      body: formData
  })
    .then(response => {
      if (200 <= response.status && response.status < 300) {
        console.log(response);
        return response;
      }
      throw new Error(response.statusText);
    })

    .then(response => response.json())
    .then(data => {
      console.log(data);
      MASK.src = '';
      MASK.classList.add('hidden');
      IMG.removeAttribute('new');
      SERVER_ERR.classList.add('hidden');
      window.imgID = data.id;
      IMG.classList.remove('hidden');
      wsConnect();
    })

    .catch(error => {
      IMG_LOADER.classList.add('hidden');
      SERVER_ERR.classList.remove('hidden');
    });
};

//Режим "Основное меню"
const BURGER = document.querySelector('.burger');
BURGER.addEventListener('click', burgerModeReplace);

function burgerModeReplace(event) {
  let burgerPos = WRAP.offsetLeft + WRAP.offsetWidth - MENU.offsetWidth - 1;
  if (getComputedStyle(COMMENTS).display === 'inline-block') {
    relocationMenu(burgerPos, 49);
  } else if (getComputedStyle(DRAW).display === 'inline-block') {
    relocationMenu(burgerPos, 67);
  };
  mainMenuMode();
};

function mainMenuMode() {
  setMode('menuMode');
  PAINT_MASK.classList.add('hidden');
  MASK.style.zindex = 1;
  createCommentClickCheck();
  resetErrorMessage();
}

// Режим "Поделится"
const MENU_URL = document.querySelector('.menu__url'),
MENU_COPY = document.querySelector('.menu_copy');

MENU_COPY.addEventListener('click', function () {
  MENU_URL.select();
  document.execCommand('copy');
});

const SHARE = document.querySelector('.share'),
SHARE_TOOLS = document.querySelector('.share-tools');

SHARE.addEventListener('click', startShareMode);

function startShareMode() {
  let sharePos = WRAP.offsetLeft + WRAP.offsetWidth - MENU.offsetWidth - 1;
  if (getComputedStyle(NEW_PIC).display === 'inline-block' && getComputedStyle(SHARE).display === 'none') {
    relocationMenu(sharePos, 567);
  } else {
    relocationMenu(sharePos, 189);
  };
  shareMode();
};

function shareMode() {
  setMode('shareMode');
  createCommentClickCheck();
  resetErrorMessage();
};

//Режим "Рисование"
const DRAW = document.querySelector('.draw'),
DRAW_TOOLS = document.querySelector('.draw-tools'),
MENU_ERASER = document.querySelector('.menu__eraser'),
PAINT_MASK = document.querySelector('.paint-mask');

DRAW.addEventListener('click', paintMode);

function paintMode() {
  setMode('drawMode');
  PAINT_MASK.style.zIndex = 4;
  PAINT_MASK.classList.remove('hidden');
  createCommentClickCheck();
  resetErrorMessage();
  resizePaintMask();

  let initMouse = {
    x: 0,
    y: 0
  },
  curMouse = {
    x: 0,
    y: 0
  },
  ctx = PAINT_MASK.getContext('2d');

  ctx.strokeStyle = 'green';
  ctx.lineWidth = 5;

  PAINT_MASK.onmousedown = function (event) {
    initMouse.x = event.offsetX;
    initMouse.y = event.offsetY;
    ctx.drawing = true;
  }

  PAINT_MASK.onmousemove = function (event) {
    curMouse.x = event.offsetX;
    curMouse.y = event.offsetY;
    if (ctx.drawing) {
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.moveTo(initMouse.x, initMouse.y);
      ctx.lineTo(curMouse.x, curMouse.y);
      ctx.closePath();
      ctx.stroke();
    }
    initMouse.x = curMouse.x;
    initMouse.y = curMouse.y;
  }

  PAINT_MASK.onmouseup = function (event) {
    ctx.drawing = false;
    sendPaintMask();
  }

  let menuColor = document.getElementsByClassName('menu__color')
  for (let i = 0; i < menuColor.length; i++) {
    menuColor[i].addEventListener('click', changeColor, false);
  };

  function changeColor(event) {
    ctx.strokeStyle = event.target.getAttribute('value');
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 5;
  }

  MENU_ERASER.addEventListener('click', eraser, false);

  function eraser() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 10;
  };
};

function resizePaintMask() {
  PAINT_MASK.width = MASK.width = document.querySelector('.current-image').width;
  PAINT_MASK.height = MASK.height = document.querySelector('.current-image').height;
};

function sendPaintMask() {
  console.log('Отправка рисунка');
  let imageData = PAINT_MASK.toDataURL('image/png'),
  byteArray = convertToBinary(imageData);
  websocket.send(byteArray.buffer);
};

//Преобразование paintMask в бинарный формат
function convertToBinary(data) {
  let marker = ';base64,';
  markerIndex = data.indexOf(marker) + marker.length,
  base64 = data.substring(markerIndex),
  raw = window.atob(base64),
  rawLength = raw.length,
  byteArray = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    byteArray[i] = raw.charCodeAt(i);
  };
  return byteArray;
};


//Режим "Комментирования"
const COMMENTS = document.querySelector('.comments'),
COMMENTS_TOOLS = document.querySelector('.comments-tools'),
MENU_TOG = document.querySelector('.menu__toggle'),
NEW_COMMENT = document.querySelector('.new_comment'),
COMMENT_LOADER = NEW_COMMENT.querySelector('.comment_loader');

COMMENTS.addEventListener('click', commentsMode);

function commentsMode() {
  setMode('commentsMode');
  MASK.style.zIndex = 3;
  resizePaintMask();
  resetErrorMessage();
  commentsToggle();
  COMMENTS_TOOLS.addEventListener('click', commentsToggle);
  if (MASK.classList.contains('hidden')) {
    IMG.addEventListener('click', commentAdd);
  } else {
    MASK.addEventListener('click', commentAdd);
  };
};

function createCommentClickCheck() {
  if (MASK.classList.contains('hidden')) {
    IMG.removeEventListener('click', commentAdd);
  } else {
    MASK.removeEventListener('click', commentAdd);
  };
};

function commentsToggle() {
  let commentsForm = document.querySelectorAll('[data-top]');
  for (let i = 0; i < commentsForm.length; i++) {
    if (document.querySelector('.menu__toggle').checked) {
      console.log('Комментарии показаны');
      commentsForm[i].classList.remove('hidden');
    } else {
      console.log('Комментарии скрыты');
      commentsForm[i].classList.add('hidden');
    };
  };
};

function commentAdd(event) {
  let initialFormMarker = NEW_COMMENT.querySelector('.comments__marker-checkbox');
  initialFormMarker.checked = true;

  let initialFormMessage = NEW_COMMENT.querySelector('.comments__input');
  initialFormMessage.focus();

  let initialFormCloseButton = NEW_COMMENT.querySelector('.comments__close');
  initialFormCloseButton.addEventListener('click', function () {
    NEW_COMMENT.classList.add('hidden');
  });

  COMMENT_LOADER.style.display = 'none';
  NEW_COMMENT.style.left = (event.offsetX) - 20 + 'px'
  NEW_COMMENT.style.top = (event.offsetY) - 16 + 'px';
  NEW_COMMENT.classList.remove('hidden');
  NEW_COMMENT.reset();
};

function commentsLoad(COMMENTS) {
  for (let comment in COMMENTS) {
    let loadedComment = {
      message: COMMENTS[comment].message,
      left: COMMENTS[comment].left,
      top: COMMENTS[comment].top
    };
    renderComment(loadedComment);
  };
};

function renderComment(loadedComment) {
  NEW_COMMENT.classList.add('hidden');
  let loadForm = document.querySelector(`.comments__form[data-left="${loadedComment.left}"][data-top="${loadedComment.top}"]`);
  if (loadForm) {
    let commentLoader = loadForm.querySelector('.comment_loader');
    commentLoader.style.display = 'none';
    renderCommentForm(loadForm, loadedComment);
  } else {
    createComment(loadedComment);
  };
};

function getMessageTime() {
  const date = new Date();
  const messageTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return messageTime;
};

function createComment(comment) {
  console.log('Создание комментария');

  let originCommentForm = NEW_COMMENT,
  commentForm = originCommentForm.cloneNode(true);

  commentForm.classList.remove('hidden');
  commentForm.classList.remove('new_comment');
  commentForm.querySelector('.comments__submit').classList.add('on_place');
  commentForm.style.top = (comment.top) + 'px';
  commentForm.style.left = (comment.left) + 'px';
  commentForm.dataset.top = comment.top;
  commentForm.dataset.left = comment.left;

  let commentLoader = commentForm.querySelector('.comment_loader');
  commentLoader.style.display = 'none';

  let marker = commentForm.querySelector('.comments__marker-checkbox');
  marker.checked = true;
  marker.disabled = false;

  marker.addEventListener('click', event => {
    let commentsForm = document.querySelectorAll('.comments__form');
    for (let i = 0; i < commentsForm.length; i++) {
      commentsForm[i].style.zIndex = '5';
    };
    event.currentTarget.parentNode.style.zIndex = '6';
  });

  let commentDateTime = commentForm.querySelector('.comment__time');
  commentDateTime.textContent = getMessageTime();

  let commentMessage = commentForm.querySelector('.comment__message');
  commentMessage.style.whiteSpace = 'pre';
  commentMessage.textContent = comment.message;

  let closeButton = commentForm.querySelector('.comments__close');
  closeButton.addEventListener('click', function () {
    commentForm.querySelector('.comments__marker-checkbox').checked = false
  }, false);
  PIC_WRAP.appendChild(commentForm);
  commentsToggle();
};

function renderCommentForm(loadForm, comment) {
  let loadFormCommentsBody = loadForm.querySelector('.comments__body'),
  originCommentForm = loadFormCommentsBody.querySelector('.comment'),
  commentForm = originCommentForm.cloneNode(true),
  loadFormLoader = loadForm.querySelector('.comment_loader'),
  commentDateTime = commentForm.querySelector('.comment__time');

  commentDateTime.textContent = getMessageTime();

  let commentMessage = commentForm.querySelector('.comment__message');
  commentMessage.style.whiteSpace = 'pre';
  commentMessage.textContent = comment.message;

  loadFormCommentsBody.insertBefore(commentForm, loadFormLoader);
  loadForm.reset();
  commentsToggle();
};

function resetComment() {
  let commentsArr = document.querySelectorAll('[data-top]');
  for (let i = 0; i < commentsArr.length; i++) {
    PIC_WRAP.removeChild(commentsArr[i]);
  };
};

//Отправка комментария
PIC_WRAP.addEventListener('submit', submitComment, false);

function submitComment(event) {
  event.preventDefault();
  NEW_COMMENT.classList.remove('hidden');
  COMMENT_LOADER.style.display = 'inline-block';

  let messageForm = event.target.querySelector('.comments__input'),
  commentData = {
    'message': messageForm.value,
    'left': parseInt(event.target.style.left),
    'top': parseInt(event.target.style.top)
  },
  marker = event.target.querySelector('.comments__marker-checkbox');

  marker.checked = true;
  marker.disabled = false;
  sendComment(commentData);

  let commentLoader = event.target.querySelector('.comment_loader');
  commentLoader.style.display = 'inline-block';
};

function sendComment(data) {
  console.log('Отправка комментария');
  NEW_COMMENT.reset();

  let commentBody = `message=${encodeURIComponent(data.message)}&left=${encodeURIComponent(data.left)}&top=${encodeURIComponent(data.top)}`;
  fetch('https://neto-api.herokuapp.com/pic/' + window.imgID + '/comments', {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: commentBody
    })
    .then(response => {
      if (200 <= response.status && response.status < 300) {
        console.log(response);
        return response;
      };
      throw new Error(response.statusText);
    })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
      alert('Ошибка при отправке комментария');
    });
};
//Инициализация вебсокет-соединения
let websocket;

function wsConnect() {
  websocket = new WebSocket('wss://neto-api.herokuapp.com/pic/' + window.imgID);

  websocket.addEventListener('open', () => {
    document.querySelector('.menu__url').value = window.location.protocol + '//' + window.location.host + window.location.pathname + '?id=' + window.imgID;
    IMG.classList.remove('hidden');
    startShareMode();
    console.log('Вебсокет-соединение открыто');
  });

  websocket.addEventListener('close', event => {
    alert('Соединение разорвано');
    IMG_LOADER.classList.add('hidden');
    console.log('Вебсокет-соединение закрыто');
    console.log(event);
  });

  websocket.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    switch (data.event) {
    case 'pic':
      IMG_LOADER.classList.add('hidden');
      IMG.src = data.pic.url;
      IMG.removeAttribute('new');
      resetComment();

      IMG.onload = function () {
        if (data.pic.mask) {
          MASK.src = data.pic.mask;
          MASK.classList.remove('hidden');
          resizePaintMask();
        };
        
        if (data.pic.COMMENTS) {
          commentsLoad(data.pic.comments);
        };
      };
      break;
    case 'comment':
      commentsToggle();
      renderComment(data.comment);
      break;
    case 'mask':
      MASK.src = data.url;
      MASK.classList.remove('hidden');
      break;
    };
    console.log(data);
  });
  websocket.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
  });
};

IMG.addEventListener('load', function () {
  PIC_WRAP.style.width = (IMG.width) + 'px';
  PIC_WRAP.style.height = (IMG.height) + 'px';
});
