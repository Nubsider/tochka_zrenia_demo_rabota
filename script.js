// Бегущая строка
const marquee = document.querySelector('.ticker');

function createMarquee() {
  if (!marquee) return;

  const track = document.createElement('div');
  const firstLine = document.createElement('div');
  track.className = 'ticker-track';
  firstLine.className = 'ticker-group';

  const topics = marquee.textContent.split('•');
  marquee.textContent = '';

  topics.forEach(function (topic) {
    const text = topic.replace(/\s+/g, ' ').trim();
    if (!text) return;

    const label = document.createElement('span');
    label.textContent = text;
    firstLine.appendChild(label);

    const separator = document.createElement('i');
    separator.textContent = '•';
    firstLine.appendChild(separator);
  });
  track.appendChild(firstLine);
  track.appendChild(firstLine.cloneNode(true));
  marquee.appendChild(track);
}

createMarquee();



// Данные для фильтров и карточек
const categories = [
  'Все посты', 'Моушен-дизайн и CG', 'UX/UI-дизайн',
  'Графический дизайн', 'Видео и кино', 'Иллюстрация',
  'Беседы', 'Истории студентов', 'Интервью', 'Инструкция',
  'Современное искусство', 'Абсолютные списки', 'Менеджмент'
];

const articles = [
  {
    image: 'portfolio',
    title: 'Как собрать сильное портфолио, если работ пока мало',
    description: 'Что показывать в портфолио, как оформить кейсы и чем заменить слабые работы, если опыта еще мало.',
    tags: ['Инструкции', 'Графический дизайн'],
    author: 'Мария Ковалева'
  },
  {
    image: 'references',
    title: 'Насмотренность без копирования: как правильно работать с референсами',
    description: 'Как анализировать чужие работы, находить сильные приемы и использовать референсы, не превращая дизайн в копирование.',
    tags: ['Инструкции', 'Графический дизайн'],
    author: 'Алексей Морозов'
  },
  {
    image: 'interface',
    title: 'Что отличает сильный интерфейс от посредственного',
    description: 'Иерархия, отступы, контраст и сценарии - основные вещи, которые делают интерфейс понятным и цельным.',
    tags: ['UX/UI-дизайн', 'Инструкции'],
    author: 'Ирина Соколова'
  },
  {
    image: 'three-d',
    title: 'Как начать в 3D и не утонуть в софте',
    description: 'С чего начать путь в 3D, какой софт выбрать первым и как не распыляться между Blender, Cinema 4D и Houdini.',
    tags: ['Инструкции', 'Моушен-дизайн и CG'],
    author: 'Дмитрий Орлов'
  }
];

const editorialCards = [
  [
    {
      image: 'identity',
      title: 'Как дизайнеру найти собственный визуальный язык',
      description: 'Разбираемся, как анализировать референсы, отбирать сильные приемы и постепенно формировать узнаваемый стиль.',
      category: 'Графический дизайн'
    },
    {
      image: 'system',
      title: 'От референсов к системе',
      description: 'Как превратить разрозненные идеи в цельную систему из цвета, типографики, композиции и визуальных приемов.',
      category: 'Инструкции'
    }
  ],
  [
    {
      image: 'decor',
      title: 'Почему сетка важнее декора',
      description: 'Сетка помогает выстроить иерархию, сохранить ритм и сделать интерфейс цельным еще до работы с деталями.',
      category: 'UX/UI-дизайн'
    },
    {
      image: 'motion',
      title: 'Как motion помогает понимать интерфейс',
      description: 'Анимация показывает связь элементов, смену состояний и направление действия без лишних подсказок.',
      category: 'Моушен-дизайн и CG'
    }
  ],
  [
    {
      image: 'type',
      title: '5 приемов сильной типографики',
      description: 'Контраст, масштаб, интервалы, ритм и длина строки делают текст выразительнее.',
      category: 'Абсолютные списки'
    },
    {
      image: 'defend',
      title: 'Как защищать дизайн-решения',
      description: 'Аргументы, цели и данные помогают обсуждать дизайн без споров на уровне «нравится - не нравится».',
      category: 'Менеджмент'
    }
  ]
];

const todayCards = [
  {
    image: 'ui',
    title: 'Интерфейс под пользователя',
    description: 'Generative UI меняет интерфейс под задачу и контекст.',
    category: 'UX/UI'
  },
  {
    image: 'motion-ui',
    title: 'Motion внутри интерфейса',
    description: 'Анимация становится частью компонентов и поведения интерфейса.',
    category: 'Моушен-дизайн и CG'
  },
  {
    image: 'variable',
    title: 'Variable fonts снова в фокусе',
    description: 'Один шрифт теперь может гибко менять вес, ширину и характер.',
    category: 'Графический дизайн'
  },
  {
    image: 'kinetic',
    title: 'Кинетическая типографика в кадре',
    description: 'Текст становится частью движения и визуального ритма.',
    category: 'Видео и кино'
  }
];


// Фильтры статей
const filters = document.querySelector('.filters');
const firstFilterRow = document.createElement('div');
const secondFilterRow = document.createElement('div');
firstFilterRow.className = 'filter-row';
secondFilterRow.className = 'filter-row';
filters.appendChild(firstFilterRow);
filters.appendChild(secondFilterRow);

function selectCategory(clickedButton, category) {
  const allButtons = filters.querySelectorAll('button');

  allButtons.forEach(function (button) {
    const isSelected = button === clickedButton;
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  showArticles(category);
}

categories.forEach(function (category, index) {
  const button = document.createElement('button');
  const isFirstButton = index === 0;
  button.className = isFirstButton ? 'chip selected' : 'chip';
  button.textContent = category;
  button.setAttribute('aria-pressed', String(isFirstButton));

  button.addEventListener('click', function () {
    selectCategory(button, category);
  });

  if (index < 6) {
    firstFilterRow.appendChild(button);
  } else {
    secondFilterRow.appendChild(button);
  }
});


// Большие карточки статей
const articlesContainer = document.querySelector('#articles');
const emptyMessage = document.querySelector('.empty');

function makeTags(tags) {
  return tags.map(function (tag) {
    return '<span class="tag">' + tag + '</span>';
  }).join('');
}

function createArticleCard(article) {
  const card = document.createElement('article');
  const button = document.createElement('button');
  card.className = 'article';
  button.className = 'article-link';
  button.innerHTML = `
    <span class="article-cover">
      <img class="article-image" src="assets/figma/${article.image}.png" alt="${article.title}" width="644" height="350">
    </span>
    <div class="metadata">
      <span class="tags">${makeTags(article.tags)}</span>
      <span class="author">${article.author}</span>
    </div>
    <h3>${article.title}</h3>
    <p>${article.description}</p>
  `;

  button.addEventListener('click', function () {
    openArticle(article);
  });

  card.appendChild(button);
  return card;
}

function showArticles(category) {
  let categoryForSearch = category;

  if (category === 'Инструкция') {
    categoryForSearch = 'Инструкции';
  }

  const visibleArticles = articles.filter(function (article) {
    return category === 'Все посты' || article.tags.includes(categoryForSearch);
  });

  articlesContainer.innerHTML = '';

  visibleArticles.forEach(function (article) {
    articlesContainer.appendChild(createArticleCard(article));
  });

  emptyMessage.hidden = visibleArticles.length > 0;
}


// Небольшие карточки
function createSmallCard(cardInfo) {
  const card = document.createElement('button');
  card.className = 'small-card';
  card.dataset.image = cardInfo.image;
  card.innerHTML = `
    <img src="assets/figma/${cardInfo.image}.png" alt="" loading="lazy">
    <span class="badge">${cardInfo.category}</span>
    <h3>${cardInfo.title}</h3>
    <p>${cardInfo.description}</p>
  `;

  card.addEventListener('click', function () {
    openArticle(cardInfo);
  });

  return card;
}

const editorGrid = document.querySelector('#editor-grid');

editorialCards.forEach(function (columnCards) {
  const column = document.createElement('div');
  column.className = 'editor-column';

  columnCards.forEach(function (cardInfo) {
    column.appendChild(createSmallCard(cardInfo));
  });

  editorGrid.appendChild(column);
});

const carousel = document.querySelector('#carousel');

todayCards.forEach(function (cardInfo) {
  carousel.appendChild(createSmallCard(cardInfo));
});

showArticles('Все посты');


// Всплывающее окно статьи
const articleDialog = document.querySelector('#article-dialog');
const articleDialogContent = document.querySelector('#dialog-content');
const articleDialogClose = articleDialog.querySelector('.dialog-close');

function openArticle(article) {
  const author = article.author ? '<p>' + article.author + '</p>' : '';
  articleDialogContent.innerHTML = `
    <img src="assets/figma/${article.image}.png" alt="">
    <h2>${article.title}</h2>
    <p>${article.description}</p>
    ${author}
    <p>Это анонс материала из макета. Полный текст статьи пока не добавлен.</p>
  `;
  articleDialog.showModal();
}

articleDialogClose.addEventListener('click', function () {
  articleDialog.close();
});

articleDialog.addEventListener('click', function (event) {
  if (event.target !== articleDialog) return;

  const dialogBox = articleDialog.getBoundingClientRect();
  const clickIsOutside =
    event.clientX < dialogBox.left ||
    event.clientX > dialogBox.right ||
    event.clientY < dialogBox.top ||
    event.clientY > dialogBox.bottom;

  if (clickIsOutside) {
    articleDialog.close();
  }
});


// Меню входа
const loginDialog = document.querySelector('#login-dialog');
const loginButton = document.querySelector('#open-login');
const loginForm = document.querySelector('#login-form');
const loginField = document.querySelector('#login-identity');
const loginStatus = document.querySelector('#login-status');
const forgotPasswordButton = document.querySelector('.forgot-password');

loginButton.addEventListener('click', function () {
  loginDialog.showModal();
  requestAnimationFrame(function () {
    loginField.focus();
  });
});

loginDialog.addEventListener('click', function (event) {
  if (event.target === loginDialog) {
    loginDialog.close();
  }
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  loginStatus.textContent = 'Форма готова к подключению авторизации.';
});

forgotPasswordButton.addEventListener('click', function () {
  showMessage('Восстановление пароля пока не подключено.');
});


// Кнопки карусели
function moveCarousel(direction) {
  const firstCard = carousel.querySelector('.small-card');
  const cardWidth = firstCard.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(carousel).gap);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  carousel.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: reduceMotion ? 'auto' : 'smooth'
  });
}

document.querySelector('#previous').addEventListener('click', function () {
  moveCarousel(-1);
});

document.querySelector('#next').addEventListener('click', function () {
  moveCarousel(1);
});

carousel.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    moveCarousel(-1);
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    moveCarousel(1);
  }
});


// Мобильное меню
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

menuButton.addEventListener('click', function () {
  const menuIsOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(menuIsOpen));
  menuButton.setAttribute('aria-label', menuIsOpen ? 'Закрыть меню' : 'Открыть меню');
});

navigation.addEventListener('click', function (event) {
  if (!event.target.closest('a')) return;

  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
});


// Небольшие сообщения внизу страницы
const toast = document.querySelector('.toast');
let toastTimer;

function showMessage(text) {
  toast.textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {
    toast.hidden = true;
  }, 5000);
}

const unavailableLinks = document.querySelectorAll('[data-unavailable]');

unavailableLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    showMessage('Этот раздел пока не подключён. Сейчас доступна страница журнала.');
  });
});


// Форма подписки
const subscribeForm = document.querySelector('#subscribe');
const subscribeStatus = document.querySelector('#subscribe-status');

subscribeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  subscribeStatus.textContent = 'Форма готова к подключению рассылки. Email не отправлен.';
});


// Раздел появляется один раз, когда до него прокрутили страницу.
function setupSectionReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    return;
  }

  const sections = document.querySelectorAll('main > section, footer');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  sections.forEach(function (section) {
    // Уже видимые разделы оставляем на месте, в том числе при обновлении страницы.
    if (section.getBoundingClientRect().top >= window.innerHeight) {
      observer.observe(section);
    }
  });
}

setupSectionReveal();


// Кнопка возвращения к началу страницы
const backToTop = document.querySelector('.back-to-top');
backToTop.hidden = false;

function updateBackToTop() {
  const isVisible = window.scrollY >= 500;
  backToTop.classList.toggle('is-visible', isVisible);
  backToTop.tabIndex = isVisible ? 0 : -1;
  backToTop.setAttribute('aria-hidden', String(!isVisible));
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener('click', function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector('.brand').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
});
