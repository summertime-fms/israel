

//POLYFILLS
(function() {

  if (!Element.prototype.matches) {

    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }

})();

(function() {

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();


// POPUP_1
let body = document.querySelector('body');

let orderCallLink = document.querySelector('.page-header__order');
let modalCall = document.querySelector('.modal--call');
let modalClose = document.querySelectorAll('.modal__close');
let overlay = document.querySelector('.overlay');
let modalRecall = document.querySelector('.modal--recall');


let isStorageSupport = true;
let storage = '';

  try {
    storage = localStorage.getItem('login');
  } catch (err) {
    isStorageSupport = false;
  };



let onEscPress = function(evt) {
  if (evt.key === 'Escape') {
    closePopup(modalCall);
    closePopup(modalRecall);
    body.style.overflowY = 'visible';
    closeOverlay();
}}

let openPopup = function(popup) {
  popup.classList.add('modal--open');
  body.style.overflowY = 'hidden';
  if (storage) {
    userNameInput.value = storage;
  };
  userNameInput.focus();
  document.addEventListener('keydown', onEscPress);
}

let openOverlay = function() {
  overlay.classList.add('overlay--show');
  overlay.addEventListener('click', function() {
    closePopup(modalCall);
    closePopup(modalRecall);
    closeOverlay();
  });
};

let closePopup = function(popup) {
  popup.classList.remove('modal--open');

  if(popup.classList.contains('modal--recall')) {
    body.style.overflowY = 'visible';
  };
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
  let elementTop = 'calc(43% - ' + elementHeight / 2 + 'px)';
  let elementLeft = 'calc(50% - ' + elementWidth / 2 + 'px)';
  element.style.top = elementTop;
  element.style.left = elementLeft;
}

window.addEventListener('resize', function() {
  centerElement(modalCall)
})

orderCallLink.addEventListener('click', function() {
  openPopup(modalCall);
  centerElement(modalCall);
  openOverlay();
})

for (let i = 0; i < modalClose.length; i++) {

modalClose[i].addEventListener('click', function() {
  closePopup(modalCall);
  closePopup(modalRecall);
  closeOverlay();
});
};

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
  } else if (userNameInput.validity.patternMismatch) {
    userNameInput.setCustomValidity('Пожалуйста, используйте только буквы')
  } else {
    userNameInput.setCustomValidity('');
  };
});

//PHONE-NUMBER INPUT MASK

$('.form__input--phone').mask('8 (999) 999 99 99');

//POPUP_2


let modalRecallButton = modalRecall.querySelector('.modal__button');

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  localStorage.setItem('name', userNameInput.value);
  localStorage.setItem ('phoneNumber', userPhoneInput.value);
openPopup(modalRecall);
closePopup(modalCall);
centerElement(modalRecall);
});

modalRecallButton.addEventListener('click', function() {
  closePopup(modalRecall);
  closeOverlay();
});

//

let tabs = document.querySelectorAll('.programs__tab')

let descriptions = document.querySelectorAll('.programs__item');

let showDescription = function(index) {

 let descriptionsBlock = descriptions[index].parentNode;
 let activeDescription = descriptionsBlock.querySelector('.programs__item--active');
 activeDescription.classList.remove('programs__item--active');
 descriptions[index].classList.add('programs__item--active');
}

let toggleTab = function(tab, index) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('programs__tab--active');
  }
  tab.classList.toggle('programs__tab--active');

}

let operateTabs = function(tab, index) {
  tab.addEventListener('click', function() {
    toggleTab(tab, index);
    showDescription(index);
  })
}

for (let i = 0; i < tabs.length; i++) {
operateTabs(tabs[i], i)
}
// let tabsList = document.querySelector('.programs__tabs');
// let tabs = tabsList.querySelectorAll('.programs__tab');
// tabsList.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   let items = document.querySelectorAll('.programs__item');

//   let target = evt.target.closest('li');
//   if (!target) return;
//   for (let i = 0; i < tabs.length; i++) {
//     if (tabs[i].classList.contains('programs__tab--active')) {
//       tabs[i].classList.remove('programs__tab--active')
//     }
//   }
//   for (let i = 0; i < items.length; i++) {
//     if (items[i].classList.contains('programs__item--active')) {
//       items[i].classList.remove('programs__item--active')
//     }

//   }
//   target.classList.add('programs__tab--active');

//   if(target.classList.contains('programs__tab--common')) {
//     items[0].classList.add('programs__item--active');
//   }
//   if(target.classList.contains('programs__tab--academic')) {
//     items[1].classList.add('programs__item--active');
//   }
//   if(target.classList.contains('programs__tab--internship')) {
//     items[2].classList.add('programs__item--active');
//   }
//   if(target.classList.contains('programs__tab--volunteur')) {
//     items[3].classList.add('programs__item--active');
//   }
//   if(target.classList.contains('programs__tab--religion')) {
//     items[4].classList.add('programs__item--active');
//   }
// })

//AUTOSCROLL

let scrollButton = document.querySelector('.intro__scroll-tip');

let bodyClientRect = body.getBoundingClientRect();
let bodyHeight = bodyClientRect.height;

  scrollButton.addEventListener('click', function() {
    $('html, body').animate({
      scrollTop: bodyHeight,
    }, {
      duration: 770,
      easing: 'swing'
    });
})


//CALL BUTTON POPUP

let callMeForm = document.querySelector('.call__form');

callMeForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  openPopup(modalRecall);
  openOverlay();
  centerElement(modalRecall);
})


let screenWidth = screen.width;

if (window.matchMedia('(max-width: 767px)').matches) {
var mySwiper = new Swiper('.features__container', {
  loop: true,
  direction: 'horizontal',
  height: 400,
  pagination: {
    el: '.features__pagination',
  },
})};


// FAQ__TOGGLING

let questions = document.querySelectorAll('.faq__question');

let showAnswer = function(item) {

  let parent = item.parentNode;
  let answer = parent.lastElementChild;
answer.classList.toggle('faq__answer--opened');
item.classList.toggle('faq__question--active');
}


for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener('click', function() {
    showAnswer(questions[i]);
  })
}

// COMMENTS__SLIDER

var mySwiper1 = new Swiper('.comments__slider', {
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.comments__button--next',
    prevEl: '.comments__button--prev',
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  pagination: {
    el: '.comments__pagination',
    type: 'fraction',
},
simulateTouch: false,
breakpoints: {
  320: {
    simulateTouch: true,
  },
}
});

// DETAILS__BUTTON POPUP

let detailsForm = document.querySelector('.details__form');

detailsForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  openPopup(modalRecall);
  openOverlay();
  centerElement(modalRecall);
})


// ABORTING TAB WHILE MODAL IS OPENED

let firstFormElement = form.elements[0];
let lastFormElement = form.elements[form.elements.length - 1];

lastFormElement.onkeydown = function(evt) {
  if (evt.key == 'Tab' && !evt.shiftKey) {
    firstFormElement.focus();
    return false;
  }
}
firstFormElement.onkeydown = function(evt) {
  if (evt.key == 'Tab' && evt.shiftKey) {
    lastElem.focus();
    return false;
  }
};
