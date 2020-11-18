"use strict";

$(function () {
  const section = $('.pos'),
    header = $("#header"),
    introH = $("#intro").innerHeight(),
    headerH = $('.header'),
    navHeight = headerH.outerHeight(); // отримуємо висоту хедера

  // поворот екрану
  window.addEventListener('orientationchange', function () {
    navHeight = headerH.outerHeight();
  }, false);

  $(window).on('scroll', function () {
    const position = $(this).scrollTop();

    section.each(function () {
      const top = $(this).offset().top - navHeight - 140,
        bottom = top + $(this).outerHeight();

      if (position >= top && position <= bottom) {
        headerH.find('a').removeClass('active');
        section.removeClass('active');

        header.addClass("fixed");

        $(this).addClass('active');
        headerH.find('a[data-scroll="#' + $(this).attr('id') + '"]').addClass('active');
      } else if (position <= (introH - 100)) {
        header.removeClass("fixed");
      }
    });
  });


  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let $this = $(this),
      blockId = $this.data("scroll"),
      blockOffset = $(blockId).offset().top;

    $("#nav a").removeClass("active");
    $this.addClass("active");

    nav.removeClass("show");

    $("html, body").animate({
      scrollTop: blockOffset - 100
    }, 600);
  });


  const workSlider = $('[data-slider="slick"]');

  /* Filter =======
  ===================== */
  let filter = $("[data-filter]");

  filter.on("click", function (event) {
    event.preventDefault();

    let cat = $(this).data("filter");

console.log(cat);

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");
        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });


  /* Modal
  ===================== */
  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $this.data("modal");

    if (modalId === "#modal__Bootstrap__theming") {
      $(modalId).addClass("show--img");
    } else {
      $(modalId).addClass("show");
    }

    $("body").addClass("no-scroll")

    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({
        transform: "scale(1)"
      });
    }, 200);

    workSlider.slick('setPosition');
  });

  modalClose.on("click", function (event) {
    event.preventDefault();
    let $this = $(this);
    let modalParent = $this.parents(".modal");

    modalParent.find(".modal__dialog").css({
      transform: "scale(0)"
    });

    setTimeout(function () {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });


  let eventTarget = document.getElementById('modal_container');

  eventTarget.addEventListener('click', (event) => {
    let item = event.target;
    setTimeout(function () {
      if (item.classList.contains("show--img")) {
        item.classList.remove("show--img")
      } else {
        item.classList.remove("show")
      }

      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });



  /* Slider: https://kenwheeler.github.io/slick/
    ===================== */

  workSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider =
      $(this).parents('.modal').find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    let currentSlider =
      $(this).parents('.modal').find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });


  /* Burger */
  const nav = $("#nav");
  const navToggle = $("#navToggle");

  navToggle.on("click", function (event) {
    event.preventDefault();

    nav.toggleClass("show"); /* Показувати  меню при кліку на бургер */
  });



  /* Form */

  document.getElementById('ajax-contact-form').addEventListener('submit', function (evt) {
    var http = new XMLHttpRequest(),
      f = this;
    var th = $(this);
    evt.preventDefault();
    http.open("POST", "mail.php", true);
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        if (http.responseText.indexOf(f.input_email.value) == 0) {
          th.trigger("reset");
        }
      }
    }
    http.onerror = function () {
      alert('Error, try again');
    }
    http.send(new FormData(f));
  }, false);


  /* Send message */
  function printEl() {
    var body = $('body').html(),
      el = $('.print');
    $('body').html(el);
    window.print()
    $('body').html(body);
  }

  /* Language */
  $("[data-click]").on("click", function () {
    let $this = $(this)
    $("#nav a").removeClass("lang");
    $this.addClass("lang");
  });
});








/* Add new works ======
========================= */

let worksArrForUKR = [
  `<div class="portfolio__col" data-cat="website">
<div class="work" data-modal="#modal__project__1">
  <img class="work__img" src="imgs/P1/p1.png" alt="">
  <div class="work__content">
    <div class="work_cat">Категорія: Вебсайт</div>
    <div class="work_title">ACTIVE BOX
      <time datetime="2020-07-06 19.00" class="work_date">2020</time>
    </div>
  </div>
</div>
</div>`,

  `<div class="portfolio__col" data-cat="website">
    <div class="work" data-modal="#modal__project__2">
      <img class="work__img" src="imgs/P2/Previous_img.png" alt="">
      <div class="work__content">
        <div class="work_cat">Категорія: Вебсайт</div>
        <div class="work_title">MONGO
        <time datetime="2020-07-06 19.00" class="work_date">2020</time>
        </div>
      </div>
    </div>
  </div>`,

  `<div class="portfolio__col" data-cat="website">
<div class="work" data-modal="#modal__project__3">
  <img class="work__img" src="imgs/P3/PreviousPortfolio.jpeg" alt="">
  <div class="work__content">
    <div class="work_cat">Категорія: Вебсайт</div>
    <div class="work_title">My Portfolio
      <time datetime="2020-07-06 19.00" class="work_date">2020</time>
    </div>
  </div>
</div>
</div>`,

  `<div class="portfolio__col" data-cat="app">
<div class="work" data-modal="#modal__project__4">
  <img class="work__img" src="imgs/P4/2048.jpg" alt="">
  <div class="work__content">
    <div class="work_cat">Категорія: Додаток</div>
    <div class="work_title">2048
      <time datetime="2020-08-09 19.00" class="work_date">2020</time>
    </div>
  </div>
</div>
</div>`,

  `<div class="portfolio__col" data-cat="website">
<div class="work">
  <img class="work__img" src="https://via.placeholder.com/370x300?text=to+be+continued..." alt="">
  <div class="work__content">
    <div class="work_cat">Категорія: Вебсайт</div>
    <div class="work_title">Заголовок проекту
      <time datetime="2020-07-06 19.00" class="work_date">2020</time>
    </div>
  </div>
</div>
</div>`,

  `<div class="portfolio__col" data-cat="website">
<div class="work">
  <img class="work__img" src="https://via.placeholder.com/370x300?text=to+be+continued..." alt="">
  <div class="work__content">
    <div class="work_cat">Категорія: Вебсайт</div>
    <div class="work_title">Заголовок проекту
      <time datetime="2020-07-06 19.00" class="work_date">2020</time>
    </div>
  </div>
</div>
</div>`
];

let worksArrForEN = [
  `<div class="portfolio__col" data-cat="website">
    <div class="work" data-modal="#modal__project__1">
      <img class="work__img" src="imgs/P1/p1.png" alt="">
      <div class="work__content">
        <div class="work_cat">CATEGORY: Website</div>
        <div class="work_title">ACTIVE BOX
          <time datetime="2020-07-06 19.00" class="work_date">2020</time>
        </div>
      </div>
    </div>
  </div>`,

  `<div class="portfolio__col" data-cat="website">
    <div class="work" data-modal="#modal__project__2">
      <img class="work__img" src="imgs/P2/Previous_img.png" alt="">
      <div class="work__content">
        <div class="work_cat">CATEGORY: Website</div>
        <div class="work_title">MONGO
          <time datetime="2020-07-06 19.00" class="work_date">2020</time>
        </div>
      </div>
    </div>
  </div>`,

  `<div class="portfolio__col" data-cat="website">
    <div class="work" data-modal="#modal__project__3">
      <img class="work__img" src="imgs/P3/PreviousPortfolio.jpeg" alt="">
      <div class="work__content">
        <div class="work_cat">CATEGORY: Website</div>
        <div class="work_title">My Portfolio
          <time datetime="2020-07-06 19.00" class="work_date">2020</time>
        </div>
      </div>
    </div>
  </div>`,

  `<div class="portfolio__col" data-cat="app">
<div class="work" data-modal="#modal__project__4">
  <img class="work__img" src="imgs/P4/2048.jpg" alt="">
  <div class="work__content">
    <div class="work_cat">CATEGORY: App</div>
    <div class="work_title">2048
      <time datetime="2020-08-09 19.00" class="work_date">2020</time>
    </div>
  </div>
</div>
</div>`,

  `<div class="portfolio__col" data-cat="website">
    <div class="work">
      <img class="work__img" src="https://via.placeholder.com/370x300?text=to+be+continued..." alt="">
      <div class="work__content">
        <div class="work_cat">CATEGORY: Website</div>
        <div class="work_title">PROJECT TITLE
          <time datetime="2020-07-06 19.00" class="work_date">2020</time>
        </div>
      </div>
    </div>
  </div>`,

  `<div class="portfolio__col" data-cat="website">
    <div class="work">
      <img class="work__img" src="https://via.placeholder.com/370x300?text=to+be+continued..." alt="">
      <div class="work__content">
        <div class="work_cat">CATEGORY: Website</div>
        <div class="work_title">PROJECT TITLE
          <time datetime="2020-07-06 19.00" class="work_date">2020</time>
        </div>
      </div>
    </div>
  </div>`
]


let blockWorks = document.getElementById('portfolio');
let btnMoreWorks = document.getElementById('moreWorks');
let countElem = 3;
let startElement = 6;
let endElement = startElement + countElem;
let addNewWork;
createWorks(0, 6);

function createWorks(startElement, endElement) {
  if ( window.location.href === 'https://petro-js-developer.github.io/portfolio.github.io/page_en.html') {
    addNewWork = worksArrForEN.slice(startElement, endElement);
  } else {
    addNewWork = worksArrForUKR.slice(startElement, endElement);
  }


  for (let i = 0; i < addNewWork.length; i++) {

    blockWorks.insertAdjacentHTML('beforeend', addNewWork[i])
  }

}

btnMoreWorks.addEventListener('click', (event) => {
  event.preventDefault();

  createWorks(startElement, endElement);
  startElement += countElem;
  endElement += countElem;

  addNewWork = worksArrForUKR.slice(startElement, endElement);
  if (!addNewWork.length) {
    btnMoreWorks.innerText = 'End';
    btnMoreWorks.setAttribute("disabled", "true");
    btnMoreWorks.classList.add('messagesOfEndWorks')
  }
})




/* Add new articles ======
========================= */
let blocBlogUKR = [
`  <div class="articles__col">
  <div class="articles__item">
    <div class="articles__header">
      <time class="articles__date">10<br>червня
      </time>
      <a href="#" data-modal="#modal__Bootstrap__5"><img class="articles__photo" src="imgs/Bootstrap.jpg"
          alt=""></a>
    </div>
    <div class="articles__content">
      <div class="articles__title"><a href="" data-modal="#modal__Bootstrap__5">Що нового в Bootstrap 5</a>
      </div>
      <div class="articles__cat">WEB Development</div>
      <div class="articles__text">
        <p>
          Нижче наведені деякі з очікуваних змін в Bootstrap 5:
          <ul>
            <li>JQuery був видалений;</li>
            <li>Переключитися на Vanilla JavaScript;</li>
            <li>Адаптивні розміри шрифтів;</li>
            <li>Вимкнуть підтримку Internet Explorer 10 і 11;</li>
            <li>Зміна одиниці вимірювання ширини;</li>
            <li>Видалення Card Decks;</li>
            <li>Оптимізація Navbar;</li>
            <li>Бібліотека для користувача іконок SVG;</li>
            <li>Перехід від Jekyll до Hugo;</li>
          </ul>
        </p>
      </div>
    </div>
    <a href="" class="btn btn--sm" data-modal="#modal__Bootstrap__5">Читати більше</a>
  </div>
</div>`,

`<div class="articles__col">
  <div class="articles__item">
    <div class="articles__header">
      <time class="articles__date">12<br>червня
      </time>
      <a href="" data-modal="#modal__HTML5_CSS3"><img class="articles__photo" src="imgs/HTML.jpg" alt=""></a>
    </div>
    <div class="articles__content">
      <div class="articles__title"><a href="" data-modal="#modal__HTML5_CSS3">Що нового в HTML5 та CSS3</a>
      </div>
      <div class="articles__cat">WEB Development</div>
      <div class="articles__text">
        <p>Дві найголовніших відмінності HTML 5 від HTML 4:
          <ul>
            <li>З'явилося багато нових тегів (header, footer, section), завдяки чому структура документа стала
              простішою.</li>
            <li>Прибрано старі теги, які з появою CSS3 і HTML5 стають зовсім незатребуваними.</li>
          </ul>
        </p>
      </div>
    </div>
    <a href="" class="btn btn--sm" data-modal="#modal__HTML5_CSS3">Читати більше</a>
  </div>
</div>`,

`<div class="articles__col">
  <div class="articles__item">
    <div class="articles__header">
      <time class="articles__date">13<br>червня
      </time>
      <a href="#" data-modal="#modal__INNOVATION__JAVASCRIPT__ES2020"><img class="articles__photo"
          src="imgs/JS_.jpg" alt=""></a>
    </div>
    <div class="articles__content">
      <div class="articles__title"><a href="" data-modal="#modal__INNOVATION__JAVASCRIPT__ES2020">Нововведення
          JavaScript ES2020 з простими прикладами</a> </div>
      <div class="articles__cat">WEB Development</div>
      <div class="articles__text">
        <p>Нововведения JavaScript в ES2020:
          <ul>
            <li>метод String.prototype.matchAll;</li>
            <li>динамічний import();</li>
            <li>тип BigInt;</li>
            <li>метод Promise.allSettled;</li>
            <li>объект globalThis;</li>
            <li>механизм выполнения цикла for-in;</li>
            <li>оператор Optional Chaining;</li>
            <li>оператор Nullish Coalescing.</li>
          </ul>
        </p>
      </div>
    </div>
    <a href="" class="btn btn--sm" data-modal="#modal__INNOVATION__JAVASCRIPT__ES2020">Читати більше</a>
  </div>
  </div>`,
  `<div class="articles__col">
  <div class="articles__item">
    <div class="articles__header">
      <time class="articles__date">12<br>червня
      </time>
      <a href="" data-modal="#modal__HTML5_CSS3"><img class="articles__photo" src="imgs/HTML.jpg" alt=""></a>
    </div>
    <div class="articles__content">
      <div class="articles__title"><a href="" data-modal="#modal__HTML5_CSS3">Що нового в HTML5 та CSS3</a>
      </div>
      <div class="articles__cat">WEB Development</div>
      <div class="articles__text">
        <p>Дві найголовніших відмінності HTML 5 від HTML 4:
          <ul>
            <li>З'явилося багато нових тегів (header, footer, section), завдяки чому структура документа стала
              простішою.</li>
            <li>Прибрано старі теги, які з появою CSS3 і HTML5 стають зовсім незатребуваними.</li>
          </ul>
        </p>
      </div>
    </div>
    <a href="" class="btn btn--sm" data-modal="#modal__HTML5_CSS3">Читати більше</a>
  </div>
</div>`,
];

let blocBlogEN = [
`<div class="articles__col">
<div class="articles__item">
  <div class="articles__header">
    <time class="articles__date">10<br>june
    </time>
    <a href="#" data-modal="#modal__Bootstrap__5"><img class="articles__photo" src="imgs/Bootstrap.jpg" alt=""></a>
  </div>
  <div class="articles__content">
    <div class="articles__title"><a href="" data-modal="#modal__Bootstrap__5">What's new in Bootstrap 5 </a> </div>
    <div class="articles__cat">WEB Development</div>
    <div class="articles__text">
      <p>
        Here are some of the expected changes in Bootstrap 5:
        <ul>
          <li>JQuery has been removed;</li>
          <li>Switch to Vanilla JavaScript;</li>
          <li>Adaptive font sizes;</li>
          <li>Disable support for Internet Explorer 10 and 11;</li>
          <li>Changing the unit of width;</li>
          <li>Remote Card Decks;</li>
          <li>Navbar optimization;</li>
          <li>SVG icon user library;</li>
          <li>The transition from Jekyll to Hugo;</li>
        </ul>
      </p>
    </div>
  </div>
  <a href="" class="btn btn--sm" data-modal="#modal__Bootstrap__5">READ MORE</a>
</div>
</div>`,
`<div class="articles__col">
<div class="articles__item">
  <div class="articles__header">
    <time class="articles__date">12<br>june
    </time>
    <a href="#" data-modal="#modal__HTML5_CSS3"><img class="articles__photo" src="imgs/HTML.jpg" alt=""></a>
  </div>
  <div class="articles__content">
    <div class="articles__title"><a href="" data-modal="#modal__HTML5_CSS3">What's new in HTML5 and CSS3</a> </div>
    <div class="articles__cat">WEB Development</div>
    <div class="articles__text">
      <p>The two main differences between HTML 5 and HTML 4 are:
        <ul>
          <li>Many new tags (header, footer, section) appeared, which made the structure of the document simpler;++++</li>
          <li>Removed old tags, which with the advent of CSS3 and HTML5 become completely unclaimed.</li>
        </ul>
      </p>
    </div>
  </div>
  <a href="" class="btn btn--sm" data-modal="#modal__HTML5_CSS3">READ MORE</a>
</div>
</div>`,
`<div class="articles__col">
<div class="articles__item">
  <div class="articles__header">
    <time class="articles__date">13<br>june
    </time>
    <a href="#" data-modal="#modal__INNOVATION__JAVASCRIPT__ES2020"><img class="articles__photo" src="imgs/JS_.jpg" alt=""></a>
  </div>
  <div class="articles__content">
    <div class="articles__title"><a href="" data-modal="#modal__INNOVATION__JAVASCRIPT__ES2020">Innovation JavaScript ES2020 with simple examples</a> </div>
    <div class="articles__cat">WEB Development</div>
    <div class="articles__text">
      <p>JavaScript innovations in ES2020:
        <ul>
          <li>method String.prototype.matchAll;</li>
          <li>dynamic import ();</li>
          <li>BigInt type;</li>
          <li>method Promise.allSettled;</li>
          <li>globalThis object;</li>
          <li>for-in loop execution mechanism;</li>
          <li>Optional Chaining operator;</li>
          <li>operator Nullish Coalescing.</li>
        </ul>
      </p>
    </div>
  </div>
  <a href="" class="btn btn--sm" data-modal="#modal__INNOVATION__JAVASCRIPT__ES2020">READ MORE</a>
</div>
</div>`,
]

let blockArticles = document.getElementById('articlesBlock');
let btnMoreArticle = document.getElementById('moreArticles');
let countElemBlog = 3;
let startElementBlog = 3;
let endElementBlog = startElementBlog + countElem;
let addNewArticle;

createArticle(0, 3);

function createArticle(startElement, endElement) {
  if ( window.location.href === 'https://petro-js-developer.github.io/portfolio.github.io/page_en.html') {
    addNewArticle = blocBlogEN.slice(startElement, endElement);
  } else {
    addNewArticle = blocBlogUKR.slice(startElement, endElement);
  }

  for (let i = 0; i < addNewArticle.length; i++) {

    blockArticles.insertAdjacentHTML('beforeend', addNewArticle[i])
  }

}

btnMoreArticle.addEventListener('click', (event) => {
  event.preventDefault();
createArticle(startElementBlog, endElementBlog);
  startElementBlog += countElemBlog;
  endElementBlog += countElemBlog;

  addNewArticle = blocBlogUKR.slice(startElementBlog, endElementBlog);
  if (!addNewArticle.length) {
    btnMoreArticle.innerText = 'Це всі роботи';
    btnMoreArticle.setAttribute("disabled", "true");
    btnMoreArticle.classList.add('messagesOfArticle')
  }
})