document.addEventListener('DOMContentLoaded', function(){
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

// СКРЫТИЕ И ПОЯВЛЕНИЕ ФОРМЫ В HEADER ПРИ НАЖАТИИ НА ТАБЫ
// ИЗМЕНЕНИЕ ПОЛОЖЕНИЯ ЛИНИИ ПОД ТАБАМИ (В ЗАВИСИМОСТИ ОТ ВЫБРАННОГО ТАБА)
  let tabOrdinary = document.querySelector('.header__form__tab-ordinary');
  let tabGroup = document.querySelector('.header__form__tab-group');
  let lineActive = document.querySelector('.header__form-line_active');
  let formTabs = document.querySelector('.header__form__tabs');

  tabOrdinary.addEventListener('click', function(e) {
    this.classList.add('_active');
    tabGroup.classList.remove('_active');
    formTabs.classList.add('ordinary_active');
    formTabs.classList.remove('group_active');
    document.querySelector('.header__booking').style.display = 'block';
    document.querySelector('.header__application').style.display = 'none';
    e.preventDefault();
  });
  tabGroup.addEventListener('click', function(e) {
    this.classList.add('_active');
    tabOrdinary.classList.remove('_active');
    formTabs.classList.add('group_active');
    formTabs.classList.remove('ordinary_active'); 
    document.querySelector('.header__application').style.display = 'block';
    document.querySelector('.header__booking').style.display = 'none';
    e.preventDefault();
  });


// АВТОМАТИЧЕСКОЕ ПРОСТАВЛЕНИЕ СЕГОДНЯШНЕЙ И ЗАВТРАШНЕЙ ДАТЫ В ПОЛЯХ "ЗАЕЗД" И "ВЫЕЗД"
  let checkInAll = document.querySelectorAll('.checkInDate');
  let checkOutAll = document.querySelectorAll('.checkOutDate');

  let d = new Date();
  let today = d.getDate();
  let tomorrow = d.getDate() + 1;
  let month = d.getMonth() + 1;
  let yearIn = d.getFullYear();

  let dateToday = yearIn + '-' + month + '-' + today;
  let dateTomorrow = yearIn + '-' + month + '-' + tomorrow;

  for(i=0; i < checkInAll.length; i++) {
    checkInAll[i].setAttribute('min', dateToday);
    checkInAll[i].setAttribute('value', dateToday);
    checkInAll[i].addEventListener('change', function() {
      this.setAttribute('value', this.value);
    });
  }
  for(i=0; i < checkOutAll.length; i++) {
    

    checkOutAll[i].setAttribute('min', dateTomorrow);
    checkOutAll[i].setAttribute('value', dateTomorrow);
    checkOutAll[i].addEventListener('change', function() {
      this.setAttribute('value', this.value);
    });
  }

// ОТКРЫТИЕ МОДУЛЯ БРОНИРОВАНИЕ НА ОСНОВАНИИ УКАЗАННЫХ ДАТ В ФОРМЕ БРОНИРОВАНИЯ НА ГЛАВНОМ ЭКРАНЕ
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

// ПРИ ВЫБОРЕ ДНЯ ЗАЕЗДА, ПОЗЖЕ ЧЕМ ВЫЕЗД, ДЕНЬ ВЫЕЗДА АВТОМАТИЧЕСКИ ПЕРЕНОСИТСЯ С РАЗНИЦОЙ В ОТ ЗАЕЗДА В 1 ДЕНЬ
  let checkInOne = document.querySelector('#checkInDateModule');
  let checkInDateApp = document.querySelector('#checkInDateApplication');

  checkInOne.addEventListener('change', function() {
    let checkInValue = document.querySelector('#checkInDateModule');
    let checkOutValue = document.querySelector('#checkOutDateModule');

    if (Date.parse(checkInValue.value) >= Date.parse(checkOutValue.value)) {
      let checkInValueMlsec = Date.parse(checkInValue.value);
      let checkOutValueMlsec = new Date(checkInValueMlsec + 86400000);
      let checkOutValueDay = checkOutValueMlsec.getDate();
      let checkOutValueMonth = checkOutValueMlsec.getMonth() + 1;
      let checkOutValueYear = checkOutValueMlsec.getFullYear();

      if (checkOutValueMonth >= 1 && checkOutValueMonth <= 9) {
        checkOutValueMonth = '0' + checkOutValueMonth;
      }
      if (checkOutValueDay >= 1 && checkOutValueDay <= 9) {
        checkOutValueDay = '0' + checkOutValueDay;
      }
      checkOutValue.setAttribute('value', checkOutValueYear + '-' + checkOutValueMonth + '-' + checkOutValueDay);
    }
  });

  checkInDateApp.addEventListener('change', function() {
  let checkInValueApp = document.querySelector('#checkInDateApplication');
  let checkOutValueApp = document.querySelector('#checkOutDateApplication');
  
  if (Date.parse(checkInValueApp.value) >= Date.parse(checkOutValueApp.value)) {
    let checkInValueMlsec = Date.parse(checkInValueApp.value);
    let checkOutValueMlsec = new Date(checkInValueMlsec + 86400000);
    let checkOutValueDay = checkOutValueMlsec.getDate();
    let checkOutValueMonth = checkOutValueMlsec.getMonth() + 1;
    let checkOutValueYear = checkOutValueMlsec.getFullYear();

    if (checkOutValueMonth >= 1 && checkOutValueMonth <= 9) {
      checkOutValueMonth = '0' + checkOutValueMonth;
    }
    if (checkOutValueDay >= 1 && checkOutValueDay <= 9) {
      checkOutValueDay = '0' + checkOutValueDay;
    }
    checkOutValueApp.setAttribute('value', checkOutValueYear + '-' + checkOutValueMonth + '-' + checkOutValueDay);
  }
  });

// СЛАЙДЕР НА ГЛАВНОЙ СТРАНИЦЕ (В HEADER)
  $('.header__slider__list').slick({
    dots: true,
    infinite: true,
    fade: true,
    prevArrow: '.header__slider__arrow-prev',
    nextArrow: '.header__slider__arrow-next',
    dotsClass: 'header__slick-dots',
  });

  // АКТИВАЦИЯ ТАБОВ В РАЗДЕЛЕ КОМНАТЫ И ОТКРЫТИЕ НУЖНОЙ КАРТОЧКИ ПРИ КЛИКЕ НА ТАБЫ
  let roomTabs = document.querySelectorAll('.rooms__tab');
  let roomCards = document.querySelectorAll('.rooms__card');

  for(i=0;i<roomTabs.length;i++) {
    roomTabs[i].addEventListener('click', function() {
      for(i=0;i<roomTabs.length;i++) {
        roomTabs[i].classList.remove('_active');
      }
      for(i=0;i<roomCards.length;i++) {
        roomCards[i].classList.remove('_active');
      }
      let roomCard = document.querySelector('.room-' + this.dataset.card);
      roomCard.classList.add('_active');
      this.classList.add('_active');
    });
  }

  let arrowSpace = document.querySelectorAll('.header__slider__arrows');
  let arrowIcons = document.querySelectorAll('.header__slider__arrows svg');
  // for (i = 0; i < arrowSpace.length; i++) {
  //   arrowSpace[i].addEventListener('mousedown', function() {
  //     for (i = 0; i < arrowSpace.length; i++) {
  //       arrowIcons[i].style.transform = 'translate(-10px,0)';
          
  //       }
  //   })
    
  // }


});