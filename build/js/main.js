// POPUP_1
let body = document.querySelector("body");

let orderCallLink = document.querySelector('.page-header__order');
let modalCall = document.querySelector('.modal--call');
let modalClose = document.querySelectorAll('.modal__close');
let overlay = document.querySelector('.overlay');
let modalRecall = document.querySelector('.modal--recall');


let isStorageSupport = true;
let storage = "";

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }



let onEscPress = function(evt) {
  if (evt.key === 'Escape') {
    closePopup(modalCall);
    closePopup(modalRecall)
    body.style.overflowY = 'visible';
    closeOverlay();
}}

let openPopup = function(popup) {
  popup.classList.add('modal--open');
  body.style.overflowY = "hidden"
  if (storage) {
    userNameInput.value = storage;
  }
  userNameInput.focus();
  document.addEventListener('keydown', onEscPress);
}

let openOverlay = function() {
  overlay.classList.add('overlay--show');
  overlay.addEventListener('click', function() {
    closePopup(modalCall)
    closePopup(modalRecall)
    closeOverlay();
  });
}

let closePopup = function(popup) {
  popup.classList.remove('modal--open');

  if(popup.classList.contains('modal--recall')) {
    body.style.overflowY = 'visible';
  }
  document.removeEventListener('keydown', onEscPress);
}

let closeOverlay  = function() {
  overlay.classList.remove('overlay--show');
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
  openOverlay();
})

for (let i = 0; i < modalClose.length; i++) {

modalClose[i].addEventListener('click', function() {
  closePopup(modalCall);
  closePopup(modalRecall)
  closeOverlay();
})
}

// VALIDATION

let form = document.querySelector('.form');
let userNameInput = form.querySelector('.form__input--name');
let userPhoneInput = form.querySelector('.form__input--phone');
console.log(userPhoneInput);


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


let modalRecallButton = modalRecall.querySelector('.modal__button');

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  localStorage.setItem('name', userNameInput.value);
  localStorage.setItem ('phoneNumber', userPhoneInput.value);
openPopup(modalRecall);
closePopup(modalCall);
centerElement(modalRecall);
})

modalRecallButton.addEventListener('click', function() {
  closePopup(modalRecall)
  closeOverlay()
})

// TABS

let tabs = document.querySelectorAll('.programs__tab');
let items = document.querySelectorAll('.programs__item');

let highlightTab = function(tab) {
  for (let i = 0; i < tabs.length; i++) {
    if(tabs[i].classList.contains('programs__tab--active')) {
      tabs[i].classList.remove('programs__tab--active')
    }
  }
  tab.classList.add('programs__tab--active')
}
let showItem = function(item) {
for (let i = 0; i < items.length; i++) {
  if(items[i].classList.contains('programs__item--active')) {
    items[i].classList.remove('programs__item--active');
  }
}
item.classList.add('programs__item--active')

}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function() {
    showItem(items[i]);
    highlightTab(tabs[i]);
  })
}


//CALL BUTTON POPUP

let callMeForm = document.querySelector('.call__form');

callMeForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  openPopup(modalRecall)
  openOverlay();
  centerElement(modalRecall);
})

let screenWidth = screen.width;

if (screenWidth < 767)
var mySwiper1 = new Swiper('.features__container', {
  loop: true,
  direction: 'horizontal',
  height: 400,
  pagination: {
    el: '.features__pagination',
  },
});


let faqList = document.querySelector('.faq__list');

faqList.addEventListener('click', function(evt) {
  let target = evt.target;
  if (target.classList.contains('faq__button')) {
    target.classList.toggle('faq__button--opened')
    let faqItem = target.parentNode;
    let answer = faqItem.lastElementChild;

    answer.classList.toggle('faq__answer--opened')

  }
})


