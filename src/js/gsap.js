import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

let splitSubtitle = new SplitText('.hero-title-box .subtitle', {
  type: 'words',
});
let splitTitle = new SplitText('.hero-title-box .title', {
  type: 'words',
});

let heroTl = gsap.timeline();

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

let aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-site',
    start: 'top 60%',
    end: 'bottom 100%',
    scrub: true, // плавная привязка к скроллу
    toggleActions: 'play none none reverse',
    // варианты: "onEnter onLeave onEnterBack onLeaveBack"
    markers: false, // включи true, если хочешь видеть отладочные маркеры
  },
});

gsap.from('.just-bg', {
  scale: 0.5,
  opacity: 0,
  scrollTrigger: {
    trigger: '.just-bg',
    start: 'top 90%',
    end: 'bottom 100%',
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
    '-=0.5'
  ) // запускаем чуть раньше

  // Ключ
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
