// let form = document.querySelector('.form');
// let input = form.querySelectorAll('.form__input')

// let inputWrappers = form.querySelectorAll('.form__input-wrapper');

// for (let i = 0; i < input.length; i++) {
//   input[i].addEventListener('focus', function() {
//     inputWrappers[i].style.display = "block";
//   })
// }

let orderCallLink = document.querySelector('.page-header__order');
let modalCall = document.querySelector('.modal-call');
let modalCallClose = modalCall.querySelector('.modal-call__close');
let overlay = document.querySelector('.overlay');

orderCallLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalCall.classList.add('modal-call--open');
  overlay.classList.add('overlay--show');
  let clientRect = modalCall.getBoundingClientRect();
  let modalCallWidth = clientRect.width;
  let modalCallHeight = clientRect.height;
  let modalTop = 'calc(50% - ' + modalCallHeight / 2 + 'px)';
  let modalLeft = 'calc(50% - ' + modalCallWidth / 2 + 'px)';
  modalCall.style.left = modalLeft;

  modalCall.style.top = modalTop;

})

modalCallClose.addEventListener('click', function(){
  modalCall.classList.remove('modal-call--open');
})
