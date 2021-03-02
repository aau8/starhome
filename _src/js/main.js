document.addEventListener('DOMContentLoaded', function(){
// БУРГЕР МЕНЮ
  let burger = document.querySelector('.navbar__burger');
  let closeMenu = document.querySelector('.navbar__menu-close');
  let menu = document.querySelector('.navbar__menu');
  let body = document.querySelector('body');
  let i;

  function menuToggle() {
    menu.classList.toggle('_active');
    body.classList.toggle('_lock');
  }

  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    menuToggle();
  });
  closeMenu.addEventListener('click', function() {
    menuToggle();
  }); 

  document.addEventListener('click', function(e) {
    let target = e.target;
    let itsMenu = target == menu || menu.contains(target);
    let itsBurger = target == burger;
    let menuIsActive = menu.classList.contains('_active');

    if (!itsMenu && !itsBurger && menuIsActive) {
      menuToggle();
    }
  });

// ОБРАТНЫЙ ЗВОНОК
  let callback = document.querySelector('.callback'),
      callbackModal = document.querySelector('.callback__body'),
      closeCallback = document.querySelector('.callback__close'),
      linkCallback = document.querySelector('.navbar__phone-callback'),
      linkMenuCallback = document.querySelector('.navbar__menu-callback');
      // linkCallbacks = [linkCallback,linkMenuCallback];

  function callbackToggle() {
    callback.classList.toggle('_show');
    body.classList.toggle('_lock');
  }
    
    linkCallback.addEventListener('click', function(e) {
      e.stopPropagation();
      callbackToggle();
    });
    
    linkMenuCallback.addEventListener('click', function(e) {
      e.stopPropagation();
      callbackToggle();
      menuToggle();
    });

    closeCallback.addEventListener('click', function() {
      callbackToggle();
    });
    
    
    document.addEventListener('click', function(e) {
      let target = e.target;
    let itsModalCallback = target == callbackModal || callbackModal.contains(target);
    let itsLinkCallback = target == linkCallback;
    let callbackShow = callback.classList.contains('_show');
    
    if (!itsModalCallback && !itsLinkCallback && callbackShow) {
      callbackToggle();
    }
  });
  
  // СКРЫТИЕ И ПОЯВЛЕНИЕ ФОРМЫ В HEADER ПРИ НАЖАТИИ НА ТАБЫ
  // ИЗМЕНЕНИЕ ПОЛОЖЕНИЯ ЛИНИИ ПОД ТАБАМИ (В ЗАВИСИМОСТИ ОТ ВЫБРАННОГО ТАБА)
  let tabOrdinary = document.querySelector('.header__form__tab-ordinary');
  let tabGroup = document.querySelector('.header__form__tab-group');
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

  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  
  if (today >= 1 && today <= 9) {
    today = '0' + today;
  }
  
  if (tomorrow >= 1 && tomorrow <= 9) {
    tomorrow = '0' + tomorrow;
  }
  
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
let btnOpenModuleVisa = document.querySelector('.header-visaSupport');
let uidModule = 'a7012a46-0c22-4353-92b9-f6169736cc29';
let langModule = 'ru';
let rsCard = document.querySelector('.rs');
let rsOnloadLoad = document.querySelector('.rs-onload-load');
let rsIframe = document.querySelector('#rsIframe');

btnOpenModuleBooking.addEventListener('click', function() {
  let checkInModule = document.querySelector('#checkInDateModule').value,
      checkOutModule = document.querySelector('#checkOutDateModule').value;
  
  let yearCheckInModule = checkInModule.substring(0, 4),
      monthCheckInModule = checkInModule.substring(5, 7),
      dayCheckInModule = checkInModule.substring(8, 10),
      dateCheckInModule = dayCheckInModule + '-' + monthCheckInModule + '-' + yearCheckInModule;
  
  let yearCheckOutModule = checkOutModule.substring(0, 4),
      monthCheckOutModule = checkOutModule.substring(5, 7),
      dayCheckOutModule = checkOutModule.substring(8, 10),
      dateCheckOutModule = dayCheckOutModule + '-' + monthCheckOutModule + '-' + yearCheckOutModule,
      rsOpenUrl = 'https://reservationsteps.ru/rooms/index/' + uidModule + '?&dfrom=' + dateCheckInModule + '&dto=' + dateCheckOutModule + '&lang=' + langModule;
      

  rsCard.classList.add('_show');
  body.classList.add('_lock');
  
  rsIframe.setAttribute('src', rsOpenUrl);
  rsIframe.onload = function() {
    rsOnloadLoad.classList.add('_hide');

    let rsOnloadDone = document.querySelector('.rs-onload-done');
    rsOnloadDone.classList.add('_show');
    setTimeout( () => {
      rsOnloadDone.classList.remove('_show');
    }, 2000);
  };

  rsIframe.onerror = function() {
    rsOnloadLoad.classList.add('_hide');

    let rsOnloadError = document.querySelector('.rs-onload-error');
    rsOnloadError.classList.add('_show');
    setTimeout( () => {
      rsOnloadError.classList.remove('_show');
    }, 2000);
  };
});

btnOpenModuleVisa.addEventListener('click', () => {
  rsCard.classList.add('_show');
  rsIframe.setAttribute('src', 'https://www.hotels-pro.ru/order/9916/lang/ru');
});

let rsClose = document.querySelector('.rs-close');

rsClose.addEventListener('click', (e) => {
  e.stopPropagation();
  rsCard.classList.remove('_show');
  body.classList.remove('_lock');

  setTimeout(() => {
    rsOnloadLoad.classList.remove('_hide');
  }, 100);
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
    dotsClass: 'header__slick-dots'
  });

  // СЛАЙДЕР В КАРТОЧКЕ КОМНАТЫ
  $('.rooms__info__slider__list').slick({
    dots: true,
    infinite: true,
    dotsClass: 'rooms__info__slick-dots'
  });

  // СЛАЙДЕР В ОТЗЫВЫ
  $('.reviews__slider__list').slick({
    dots: true,
    infinite: true,
    waitForAnimate: false,
    slideToShow: 3,
    centerMode: true,
    variableWidth: true,
    prevArrow: '.reviews__slider__arrow-prev',
    nextArrow: '.reviews__slider__arrow-next'
  });
  // АКТИВАЦИЯ ТАБОВ В РАЗДЕЛЕ КОМНАТЫ И ОТКРЫТИЕ НУЖНОЙ КАРТОЧКИ ПРИ КЛИКЕ НА ТАБЫ
  let roomTabs = document.querySelectorAll('.tab__room');
  let roomCards = document.querySelectorAll('.card__room');
  let comfortTabs = document.querySelectorAll('.tab__comfort');
  let comfortCards = document.querySelectorAll('.card__comfort');

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

  for(i=0;i<comfortTabs.length;i++) {
    comfortTabs[i].addEventListener('click', function() {
      for(i=0;i<comfortTabs.length;i++) {
        comfortTabs[i].classList.remove('_active');
      }
      for(i=0;i<comfortCards.length;i++) {
        comfortCards[i].classList.remove('_active');
      }
      let roomCard = document.querySelector('.room__comfort-' + this.dataset.card);

      roomCard.classList.add('_active');
      this.classList.add('_active');
    });
  }

  // ОТКРЫТИЕ КОНТЕНТА С КОМНАТАМИ ИЛИ УДОБСТВАМИ ПРИ КЛИКЕ ПО ТАБАМ В АККОРДЕОНЕ В РАЗДЕЛЕ КОМНАТЫ И УДОБСТВ
  let tabRooms = document.querySelector('.header__form__tab-rooms');
  let tabComfort = document.querySelector('.header__form__tab-comfort');
  let formTabsRooms = document.querySelector('.rooms__form__tabs');
  
  tabRooms.addEventListener('click', function(e) {
    this.classList.add('_active');
    tabComfort.classList.remove('_active');
    formTabsRooms.classList.add('rooms_active');
    formTabsRooms.classList.remove('comfort_active');
    document.querySelector('.rooms__tabs__rooms').classList.add('_active');
    document.querySelector('.rooms__tabs__rooms').classList.add('_showTabs');
    document.querySelector('.rooms__tabs__comfort').classList.remove('_active');
    document.querySelector('.rooms__tabs__comfort').classList.remove('_showTabs');
    document.querySelector('.rooms__cards__rooms').classList.add('_active');
    document.querySelector('.rooms__cards__comfort').classList.remove('_active');
   
    if (document.querySelector('.rooms__tabs__rooms').classList.contains('_active')) {
      setTimeout(function tabActiveOnloadWindow() {
        let roomsTab = document.querySelectorAll('.rooms__tab');
        for (let i = 0; i < roomsTab.length; i++) {
          roomsTab[0].classList.add('_active');
        }
      }, 200);
    }
  });
  tabComfort.addEventListener('click', function(e) {
    this.classList.add('_active');
    tabRooms.classList.remove('_active');
    formTabsRooms.classList.add('comfort_active');
    formTabsRooms.classList.remove('rooms_active');
    document.querySelector('.rooms__tabs__comfort').classList.add('_active');
    document.querySelector('.rooms__tabs__comfort').classList.add('_showTabs');
    document.querySelector('.rooms__tabs__rooms').classList.remove('_active');
    document.querySelector('.rooms__tabs__rooms').classList.remove('_showTabs');
    document.querySelector('.rooms__cards__comfort').classList.add('_active');
    document.querySelector('.rooms__cards__rooms').classList.remove('_active');
    
    if (document.querySelector('.rooms__tabs__comfort').classList.contains('_active')) {
      setTimeout(function tabActiveOnloadWindow() {
        let roomsTab = document.querySelectorAll('.rooms__tab');
        for (let i = 0; i < roomsTab.length; i++) {
          roomsTab[0].classList.add('_active');
        }
      }, 200);
    }
  });


  // ЗАКРЫТИЕ КАРТОЧКИ С ИНФОРМАЦИЕЙ О КОМНАТЕ
  let closeCardRoom = document.querySelectorAll('.rooms__info-close');
  let cardRoom = document.querySelectorAll('.rooms__info__card');
  let bgRoom = document.querySelector('.rooms__info-bg');
  let roomsBlock = document.querySelector('.rooms__info');
  let roomsInfo = document.querySelector('.rooms__info');

  for (i = 0; i < closeCardRoom.length; i++) {
    closeCardRoom[i].addEventListener('click', function() {
      for (i = 0; i < cardRoom.length; i++) {
        cardRoom[i].classList.remove('_active');
      }
      roomsBlock.style.pointerEvents = 'none';
      body.classList.remove('_lock');
      bgRoom.classList.remove('_active');
      roomsInfo.classList.remove('_overflow_auto');
    });
  }
  bgRoom.addEventListener('click', function() {
    for (i = 0; i < cardRoom.length; i++) {
      cardRoom[i].classList.remove('_active');
      body.classList.remove('_lock');
      roomsBlock.style.pointerEvents = 'none';
      roomsInfo.classList.remove('_overflow_auto');
    }
  });
  for(i=0;i<cardRoom.length;i++) {
    document.addEventListener('click', function(e) {
      let target = e.target;
      let itsCardRoom = target == cardRoom[i];
    });
  }

  // ПРИ КЛИКЕ ПО ВИДУ КОМНАТЫ БУДЕТ ОТКРЫВАТЬСЯ СООТВЕТСТВУЮЩАЯ КАРТОЧКА
  let roomsCardButtons = document.querySelectorAll('.rooms__card-button');

  for (i = 0; i < roomsCardButtons.length; i++) {
    roomsCardButtons[i].addEventListener('click', function() {
      // if(window.location.hash) {
      // }
      let roomsInfoCard = document.querySelector('.rooms__info__card-' + this.dataset.info);
      roomsInfo.style.pointerEvents = 'all';
      roomsInfoCard.classList.add('_active');
      body.classList.add('_lock');
      roomsInfo.classList.add('_overflow_auto');

      // function roomsInfoHash() {
      //   let hash = window.location.hash.substring(1);
      //   console.log(hash);
      // }
      // setTimeout(
      //   roomsInfoHash(), 1000)
      // $('.rooms__info__card-' + this.dataset.info > '.rooms__info__slider__list').slick('reinit');
    });
  }
  // ОТКРЫТИЕ СООТВЕТСТВУЮЩЕЙ КАРТОЧКИ ПО URL
  if(window.location.hash) {
    let hash = window.location.hash.substring(1);
    
  }


  // Аккордеоны
  let accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(accordionHeader => {
    let accordionBody = accordionHeader.nextElementSibling;

    accordionHeader.addEventListener('click', event => {
      accordionHeader.classList.toggle('_active');
      
      if (accordionHeader.classList.contains('_active')) {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
      } else {
        accordionBody.style.maxHeight = 0;
      }
    });
    if (accordionHeader.classList.contains('_active')) {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    } else {
      accordionBody.style.maxHeight = 0;
    }
  });

  // РАЗВЕРНУТЬ СПИСОК УСЛУГ
  const servicesMore = document.querySelector('.services__more');
  const servicesCards = document.querySelector('.services__cards');

  servicesMore.addEventListener('click', function() {
    servicesCards.classList.toggle('_show');
    this.classList.toggle('_active');
  });
  // ПЛАВНЫЙ СКРОЛЛ ДО ЯКОРЕЙ
  // $("body").on('click', '[href*="#"]', function(e){ 
  //   var fixedOffset = 100; 
  //   $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixedOffset }, 1000); // пользователя переведет на указанный в href якорь со скоростью 1000ms и с отступом 100px сверху
  //   menu.classList.remove('_active');
  //   body.classList.remove('_lock');
  //   e.preventDefault();
  // });
 
});