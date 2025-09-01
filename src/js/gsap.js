import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

let splitSubtitle = new SplitText('.hero-title-box .subtitle', {
  type: 'words',
});
let splitTitle = new SplitText('.hero-title-box .title', {
  type: 'words',
});

gsap.fromTo(
  '.symbol',
  { rotate: 10 },
  { rotate: -10, duration: 2, repeat: -1, yoyo: true, ease: 'none' }
);

// получаем элемент прелоадера
const preloader = document.querySelector('.preloader-action');

// блокируем скролл сразу при загрузке
disableBodyScroll(preloader);

// качание конверта
let swingTl = gsap.to('.preloader-image', {
  rotation: 5,
  duration: 1,
  yoyo: true,
  repeat: -1,
  ease: 'power1.inOut',
  transformOrigin: '50% 50%',
});

// таймлайн закрытия прелоадера
const preloaderTl = gsap.timeline({ paused: true });

preloaderTl
  .to('.preloader-btn', {
    opacity: 0,
    y: 20,
    duration: 0.4,
    ease: 'power2.inOut',
  })
  .to('.preloader-image', {
    scale: 200,
    duration: 1.2,
    ease: 'power3.inOut',
  })
  .to(
    '.preloader-action',
    {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.style.display = 'none';

        // возвращаем скролл
        enableBodyScroll(preloader);

        if (typeof heroTl !== 'undefined') {
          heroTl.play();
        }
      },
    },
    '-=0.5'
  );

// клик по кнопке
document.querySelector('.preloader-btn').addEventListener('click', () => {
  swingTl.kill();
  preloaderTl.play();
});

let heroTl = gsap.timeline({ paused: true }); // Ставим на паузу, чтобы запустить после прелоадера

heroTl
  .from('.date-container', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out',
  })
  .from(
    '.hero-title-box',
    {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    },
    '<'
  )
  .from(splitSubtitle.words, {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
  })
  .from(
    splitTitle.words,
    {
      duration: 2,
      y: 100,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out',
    },
    '-=0.5'
  )
  .from(
    '.person-photo',
    {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.5'
  )
  .from(
    '.waiting-text',
    {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.5'
  );

// // основной таймлайн прелоадера
// const preloaderTl = gsap.timeline({ paused: true });

// // анимация текста и кнопки
// preloaderTl.to('.preloader-action', {
//   y: -100,
//   opacity: 0,
//   duration: 0.8,
//   ease: 'power3.inOut',
//   onComplete: () => {
//     const preloader = document.querySelector('.preloader-action');
//     preloader.style.display = 'none';
//     document.body.style.overflow = ''; // возвращаем скролл

//     // Запуск анимации главного блока
//     if (typeof heroTl !== 'undefined') {
//       heroTl.play();
//     }
//   },
// });

// // запуск по кнопке
// document.querySelector('.preloader-btn').addEventListener('click', () => {
//   preloaderTl.play();
// });

// ***

let aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-site',
    start: 'top 100%',
    end: 'bottom 50%',
    scrub: true, // плавная привязка к скроллу
    toggleActions: 'play none none reverse',
    // варианты: "onEnter onLeave onEnterBack onLeaveBack"
    markers: false, // включи true, если хочешь видеть отладочные маркеры
  },
});

let lockKeyTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.images-wrap',
    start: 'top 80%',
    end: 'bottom 80%',
    scrub: true, // плавная привязка к скроллу
    toggleActions: 'play none none reverse',
    // варианты: "onEnter onLeave onEnterBack onLeaveBack"
    markers: false, // включи true, если хочешь видеть отладочные маркеры
  },
});

// Заголовки
aboutTl
  .from('.about-site .title', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
  })

  // Тексты
  .from(
    '.about-site .text',
    {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    },
    '-=1'
  ); // запускаем чуть раньше

// Ключ
lockKeyTl
  .from(
    '.about-site-key',
    {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '-=0.3'
  )

  // Линия
  .from(
    '.about-site-line-path',
    {
      duration: 2,
      ease: 'power2.inOut',
      drawSVG: 0,
      onComplete() {
        gsap.set('.about-site-line-path', { strokeDasharray: '12 12' });
      },
    },
    '-=0.5'
  )

  // Замок
  .from(
    '.about-site-lock',
    {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '-=1'
  );

let meetPlace = gsap.timeline({
  scrollTrigger: {
    trigger: '.meet-place',
    start: 'top 80%',
    end: '90% 100%',
    scrub: true, // плавная привязка к скроллу
    toggleActions: 'play none none reverse',
    // варианты: "onEnter onLeave onEnterBack onLeaveBack"
    markers: false, // включи true, если хочешь видеть отладочные маркеры
  },
});

meetPlace
  .from('.meet-place .subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
  })
  .from(
    '.meet-place .title',
    {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    },
    '-=0.5'
  )
  .from('.meet-place-arrow path', {
    duration: 2,
    drawSVG: 0,
    ease: 'power2.inOut',
  });

let waitTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.wait-you',
    start: 'top 50%',
    end: 'bottom 100%',
    scrub: true, // плавная привязка к скроллу
    toggleActions: 'play none none reverse',
    // варианты: "onEnter onLeave onEnterBack onLeaveBack"
    markers: false, // включи true, если хочешь видеть отладочные маркеры
  },
});

// Заголовки
waitTl
  .from('.wait-you .title, .wait-you .subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
  })

  // Список расписания (каждый li)
  .from(
    '.wait-you .list-item',
    {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    },
    '-=0.5'
  )

  // Первая картинка
  .from(
    '.next-img-1',
    {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '-=0.4'
  )

  // Заголовок "А далі..."
  .from(
    '.next-title-box',
    {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '-=0.3'
  )

  // Вторая картинка
  .from(
    '.next-img-2',
    {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '-=0.5'
  )

  // Стрелка (рисуем path)
  .from(
    '.next-arrow path',
    {
      duration: 2,
      drawSVG: 0,
      ease: 'power2.inOut',
    },
    '-=0.5'
  )

  // Тексты второго дня
  .from(
    '.next-wrap p',
    {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    },
    '-=0.4'
  )

  // Третья картинка
  .from(
    '.next-img-3',
    {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    },
    '-=0.3'
  )

  // Вторая стрелка
  .from(
    '.close-arrow path',
    {
      duration: 2,
      drawSVG: 0,
      ease: 'power2.inOut',
    },
    '-=0.6'
  )

  // Текст барбекю
  .from(
    '.lunch-day-text',
    {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    },
    '-=0.5'
  );
