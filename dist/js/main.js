// БУРГЕР МЕНЮ
let burger = document.querySelector('.navbar__burger');
let closeMenu = document.querySelector('.navbar__menu-close');
let menu = document.querySelector('.navbar__menu');
let i;

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

document.addEventListener('touchstart', function(e) {
  let target = e.target;
  let itsMenu = target == menu || menu.contains(target);
  let itsBurger = target == burger;
  let menuIsActive = menu.classList.contains('_active');

  if (!itsMenu && !itsBurger && menuIsActive) {
    menuToggle();
  }
});
// document.addEventListener('click', function() {
//   conditionMenuToggle();
// });

// СКРЫТИЕ И ПОЯВЛЕНИЕ ФОРМЫ В HEADER ПРИ НАЖАТИИ НА ТАБЫ
let tabOrdinary = document.querySelector('.header__form__tab-ordinary');
let tabGroup = document.querySelector('.header__form__tab-group');
let lineActive = document.querySelector('.header__form-line_active');
let formTabs = document.querySelector('.header__form__tabs');

tabOrdinary.addEventListener('click', function() {
  this.classList.add('_active');
  tabGroup.classList.remove('_active');
  formTabs.classList.add('ordinary_active');
  formTabs.classList.remove('group_active');
  document.querySelector('.header__booking').style.display = 'block';
  document.querySelector('.header__application').style.display = 'none';
});
tabGroup.addEventListener('click', function() {
  this.classList.add('_active');
  tabOrdinary.classList.remove('_active');
  formTabs.classList.add('group_active');
  formTabs.classList.remove('ordinary_active'); 
  document.querySelector('.header__application').style.display = 'block';
  document.querySelector('.header__booking').style.display = 'none';
});

// ИЗМЕНЕНИЕ ПОЛОЖЕНИЯ ЛИНИИ ПОД ТАБАМИ (В ЗАВИСИМОСТИ ОТ ВЫБРАННОГО ТАБА)

// АВТОМАТИЧЕСКОЕ ПРОСТАВЛЕНИЕ СЕГОДНЯШНЕЙ И ЗАВТРАШНЕЙ ДАТЫ В ПОЛЯХ "ЗАЕЗД" И "ВЫЕЗД"
let checkIn = document.querySelectorAll('.checkInDate');
let checkOut = document.querySelectorAll('.checkOutDate');

let d = new Date();
let today = d.getDate();
let tomorrow = d.getDate() + 1;
let month = d.getMonth() + 1;
let yearIn = d.getFullYear();

let dateToday = yearIn + '-' + month + '-' + today;
let dateTomorrow = yearIn + '-' + month + '-' + tomorrow;

let checkInDateModule = document.querySelector('#checkInDateModule');
let checkOutDateModule = document.querySelector('#checkOutDateModule');

for(i=0; i < checkIn.length; i++) {
  checkIn[i].setAttribute('min', dateToday);
  checkIn[i].setAttribute('value', dateToday);
  checkIn[i].addEventListener('change', function() {
    this.setAttribute('value', this.value);
  });
}
for(i=0; i < checkOut.length; i++) {
  checkOut[i].setAttribute('min', dateTomorrow);
  checkOut[i].setAttribute('value', dateTomorrow);
  checkOut[i].addEventListener('change', function() {
    this.setAttribute('value', this.value);
  });
}

// ОТКРЫТИЕ МОДУЛЯ БРОНИРОВАНИЕ НА ОСНОВАНИИ УКАЗАННЫХ ДАТ

let btnOpenModuleBooking = document.querySelector('.header-buttonAvailability');
let uidModule = 'a7012a46-0c22-4353-92b9-f6169736cc29';
let langModule = 'ru';

btnOpenModuleBooking.addEventListener('click', function() {
  let checkInModule = document.querySelector('#checkInDateModule').value;
  let checkOutModule = document.querySelector('#checkOutDateModule').value;
  
  let yearCheckInModule = checkInModule.substring(0, 4);
  let monthCheckInModule = checkInModule.substring(5, 7);
  let dayCheckInModule = checkInModule.substring(8, 10);
  let dateCheckInModule = dayCheckInModule + '-' + monthCheckInModule + '-' + yearCheckInModule;
  
  let yearCheckOutModule = checkOutModule.substring(0, 4);
  let monthCheckOutModule = checkOutModule.substring(5, 7);
  let dayCheckOutModule = checkOutModule.substring(8, 10);
  let dateCheckOutModule = dayCheckOutModule + '-' + monthCheckOutModule + '-' + yearCheckOutModule;

  window.open('https://reservationsteps.ru/rooms/index/' + uidModule + '?&dfrom=' + dateCheckInModule + '&dto=' + dateCheckOutModule + '&lang=' + langModule, 'reservation steps', 'width=840, height=840, scrollbars=yes, toolbar=yes, location=1, resizable=1');
  console.log(checkInModule);
  console.log(checkOutModule);
});


// for(i=0; i < checkIn.length; i++) {
//   checkIn[i].setAttribute('min', dateToday);
//   checkIn[i].setAttribute('value', dateToday);
//   checkIn[i].addEventListener('change', function(e) {
//     if (Date.parse(this.value) >= Date.parse(checkOut[i].value)) {
//       this.setAttribute('value', this.value.setDate(this.getDate() + 1)) 
//     } else {
//       this.setAttribute('value', this.value);
//     }
//   });
// }

// ПРИ ВЫБОРЕ ДНЯ ЗАЕЗДА, ПОЗЖЕ ЧЕМ ВЫЕЗД, ДЕНЬ ВЫЕЗДА АВТОМАТИЧЕСКИ ПЕРЕНОСИТСЯ С РАЗНИЦОЙ В ОТ ЗАЕЗДА В 1 ДЕНЬ
// let checkInOne = document.querySelector('.checkInDate');
// let checkOutOne = document.querySelector('.checkOutDate');
// // for(i=0;i>checkIn.length;i++) {
//   checkInOne.addEventListener('change', function() {
//     let checkInValue = document.querySelector('#checkInDateModule').value;
//     let checkOutValue = document.querySelector('#checkOutDateModule').value;
//     // console.log(tomorrow)
//     let yearTod = checkInModule.substring(0, 4);
//     let monthTod = checkInModule.substring(5, 7);
//     let dayTod = checkInModule.substring(8, 10);
//     dayTod = parseInt(dayTod) + 1;
//     let dateTod = yearTod + '-' + monthTod + '-' + dayTod;

//     if (Date.parse(checkInValue) >= Date.parse(checkOutValue)) {
//       console.log('yes');
//       // this.setAttribute('value', d.setDate(d.getDate() + 1)) 
//       // today++;
//       // let dateTod = yearIn + '-' + month + '-' + today;
      
//       checkOutOne.setAttribute('value', checkInValue.setDate(checkInValue.getDate() + 1));
//     } else {
//       console.log('no');
//     }
//     console.log(checkInValue)
//   })
// }



// let dateTod = yearIn + '-' + month + '-' + today;
// let dateTom = yearIn + '-' + month + '-' + tomorrow;
// console.log(Date.parse(checkInValue));
// console.log(checkOutValue);


// СЛАЙДЕР НА ГЛАВНОЙ СТРАНИЦЕ (В HEADER)
$(document).ready(function(){
  $('.header__slider__list').slick({
    dots: true,
    infinite: true,
    fade: true,
    prevArrow: '.header__slider__arrow-prev',
    nextArrow: '.header__slider__arrow-next',
    dotsClass: 'header__slick-dots',
  });
})