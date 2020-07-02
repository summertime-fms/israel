// POPUP_1

let orderCallLink = document.querySelector('.page-header__order');
let modalCall = document.querySelector('.modal--call');
let modalCallClose = modalCall.querySelector('.modal__close');
let overlay = document.querySelector('.overlay');

let onEscPress = function(evt) {
  if (evt.key === 'Escape') {
    closePopup();
}}

let openPopup = function(popup) {
  popup.classList.add('modal--open');
  overlay.classList.add('overlay--show');

  document.addEventListener('keydown', onEscPress);
  overlay.addEventListener('click', closePopup);
}

let closePopup = function(popup) {
  popup.classList.remove('modal--open');
  overlay.classList.remove('overlay--show');
  document.removeEventListener('keydown', onEscPress);
  overlay.removeEventListener('click', closePopup);
}


let centerElement = function(element) {
  let clientRect = element.getBoundingClientRect();
  let elementWidth = clientRect.width;
  let elementHeight = clientRect.height;
  let elementTop = 'calc(50% - ' + elementHeight / 2 + 'px)';
  let elementLeft = 'calc(50% - ' + elementWidth / 2 + 'px)';
  element.style.top = elementTop;
  element.style.left = elementLeft;
}

orderCallLink.addEventListener('click', function() {
  openPopup(modalCall);
  centerElement(modalCall);
})

modalCallClose.addEventListener('click', function(){
  closePopup(modalCall);
})

// ICON-CROSS HOVER&ACTIVE

let crossIcon = modalCallClose.querySelector('.modal__icon');
console.log(crossIcon);
let crossPath = crossIcon.querySelector('path');

let highlightCross = function() {
  crossPath.setAttribute('fill', 'url(#linear-hover)');
}

let lightoutCross = function() {
  crossPath.setAttribute('fill', 'url(#linear)');
}

crossIcon.addEventListener('mouseover', function() {
  highlightCross();
})

crossIcon.addEventListener('mouseout', function() {
  lightoutCross();
})


// VALIDATION

let form = document.querySelector('.form');
let userNameInput = form.querySelector('.form__input--name');

userNameInput.addEventListener('invalid', function(evt) {
  if (userNameInput.validity.tooShort) {
userNameInput.setCustomValidity('Имя минимум из 2 символов');
  }
  else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не может превышать 25 символов')
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле')
  } else {
    userNameInput.setCustomValidity('');
  }
})

//PHONE-NUMBER INPUT MASK

$(".form__input--phone").mask("8 (999) 999 99 99");

//POPUP_2

let modalRecall = document.querySelector('.modal--recall');
let modalRecallButton = modalRecall.querySelector('.modal__button');

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
openPopup(modalRecall);
closePopup(modalCall);
centerElement(modalRecall);
})

modalRecallButton.addEventListener('click', function() {
  closePopup(modalRecall)
})
