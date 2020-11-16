document.addEventListener('DOMContentLoaded', function(){
// БУРГЕР МЕНЮ
  let burger = document.querySelector('.navbar__burger');
  let closeMenu = document.querySelector('.navbar__menu-close');
  let menu = document.querySelector('.navbar__menu');
  // let body = document.querySelector('body');
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
    dotsClass: 'header__slick-dots'
  });

  // СЛАЙДЕР В КАРТОЧКЕ КОМНАТЫ
  $('.rooms__info__slider__list').slick({
    dots: true,
    infinite: true,
    fade: true,
    prevArrow: '.rooms__info__slider__arrow-prev',
    nextArrow: '.rooms__info__slider__arrow-next',
    dotsClass: 'rooms__info__slick-dots'
  });

  // СЛАЙДЕР В ОТЗЫВЫ
  $('.reviews__slider__list').slick({
    dots: true,
    infinite: true,
    // slidesToScroll: 3,
    waitForAnimate: false,
    slideToShow: 3,
    centerMode: true,
    variableWidth: true,
    prevArrow: '.reviews__slider__arrow-prev',
    nextArrow: '.reviews__slider__arrow-next',

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
      // console.log(roomCard);
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

  // ЗАКРЫТИЕ КАРТОЧКИ С ИНФОРМАЦИЕЙ О КОМНАТЕ
  let closeCardRoom = document.querySelectorAll('.rooms__info-close');
  let cardRoom = document.querySelectorAll('.rooms__info__card');
  let bgRoom = document.querySelector('.rooms__info-bg');
  let roomsBlock = document.querySelector('.rooms__info');

  for (i = 0; i < closeCardRoom.length; i++) {
    closeCardRoom[i].addEventListener('click', function() {
      for (i = 0; i < cardRoom.length; i++) {
        cardRoom[i].classList.remove('_active');
      }
      roomsBlock.style.display = 'none';
      body.classList.remove('_lock');
      bgRoom.classList.remove('_active');
    });
  }
  bgRoom.addEventListener('click', function() {
    // roomsBlock.style.display = 'none';
    // this.classList.remove('_active');
    for (i = 0; i < cardRoom.length; i++) {
      // closeCardRoom.classList.contains('_active').remove('_active');
      closeCardRoom[i].classList.remove('_active');
      body.classList.remove('_lock');
      
    }
  });
  for(i=0;i<cardRoom.length;i++) {
    document.addEventListener('click', function(e) {
      let target = e.target;
      let itsCardRoom = target == cardRoom[i];
  // let cardRoomIsActive = cardRoom[i].classList.contains('_active');
    });
  }

  // При клике по виду комнаты будет открываться соответствующая карточка
  let roomsCardButtons = document.querySelectorAll('.rooms__card-button');

  // roomsCardButtons.forEach(roomsCardButton => {
  //   roomsCardButton.addEventListener('click', event => {
  //     let roomsInfoCard = document.querySelector('.rooms__info__card' + roomsCardButton.dataset.info);
  //     roomsInfoCard.classList.add('_active');

  //   });
  // });
  // let roomsInfoCard = document.querySelector('.rooms__info__card-men');
  // console.log(roomsInfoCard);
  for (i = 0; i < roomsCardButtons.length; i++) {
    roomsCardButtons[i].addEventListener('click', function() {
      let roomsInfoCard = document.querySelector('.rooms__info__card-' + this.dataset.info);
      // let roomsInfoCard = document.querySelector('.rooms__info__card');
      // console.log(this.dataset.info);
      roomsInfoCard.classList.add('_active');
      console.log(roomsInfoCard);
    });
  }

  // Аккордеоны
  let accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(accordionHeader => {
    accordionHeader.addEventListener('click', event => {
      accordionHeader.classList.toggle('_active');

      let accordionBody = accordionHeader.nextElementSibling;
      // console.log(accordionBody);
      if (accordionHeader.classList.contains('_active')) {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
      } else {
        accordionBody.style.maxHeight = 0;
      }
    });
  });

  // РАЗВЕРНУТЬ СПИСОК УСЛУГ
  const servicesMore = document.querySelector('.services__more');
  const servicesCards = document.querySelector('.services__cards');
  const servicesMoreText = document.querySelector('.services__more-text');

  servicesMore.addEventListener('click', function() {
    servicesCards.classList.toggle('_show');
    this.classList.toggle('_active');
    // servicesMoreText.textContent = 'Свернуть';
  });
});