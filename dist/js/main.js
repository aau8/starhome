// БУРГЕР МЕНЮ
let burger = document.querySelector('.navbar__burger');
let closeMenu = document.querySelector('.navbar__menu-close');
let menu = document.querySelector('.navbar__menu');

function menuToggle() {
  menu.classList.toggle('_active');
  document.querySelector('body').classList.toggle('_lock');
}

burger.addEventListener('click', function(e) {
  e.stopPropagation();
  menuToggle();
});
closeMenu.addEventListener('click', function() {
  menuToggle();
}); 

document.addEventListener('mouseup', function(e) {
  let target = e.target;
  let itsMenu = target == menu || menu.contains(target);
  let itsBurger = target == burger;
  let menuIsActive = menu.classList.contains('_active');

  if (!itsMenu && !itsBurger && menuIsActive) {
    menuToggle();
  }
});

// ФОРМА В HEADER
let tabOrdinary = document.querySelector('.header__form__tab-ordinary');
let tabGroup = document.querySelector('.header__form__tab-group');

tabOrdinary.addEventListener('click', function() {
  this.classList.add('_active');
  tabGroup.classList.remove('_active');
  document.querySelector('.header__booking').style.display = 'block';
  document.querySelector('.header__application').style.display = 'none';
});
tabGroup.addEventListener('click', function() {
  this.classList.add('_active');
  tabOrdinary.classList.remove('_active');
  document.querySelector('.header__application').style.display = 'block';
  document.querySelector('.header__booking').style.display = 'none';
});