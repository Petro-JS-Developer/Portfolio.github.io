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
            } else if(position <= (introH - 100)) {
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
  
    modalCall.on("click", function(event) {
      event.preventDefault();
  
      let $this = $(this);
      let modalId = $this.data("modal");
  
      $(modalId).addClass("show");
      $("body").addClass("no-scroll")
  
      setTimeout(function() {
        $(modalId).find(".modal__dialog").css({transform: "scale(1)"});
      }, 200);
      
      workSlider.slick('setPosition');
    });
  
    modalClose.on("click", function(event) {
      event.preventDefault();
  
      let $this = $(this);
      let modalParent = $this.parents(".modal");
  
      modalParent.find(".modal__dialog").css({transform: "scale(0)"});
  
      setTimeout(function() {
        modalParent.removeClass("show");
        $("body").removeClass("no-scroll"); 
      }, 200);
    });
  
  
    $(".modal").on("click", function(event) {
      let $this = $(this);
      $this.find(".modal__dialog").css({transform: "scale(0)"});
  
      setTimeout(function() {
        $this.removeClass("show");
        $("body").removeClass("no-scroll"); 
      }, 200);
    });
  
    $(".modal__dialog").on("click", function(event) {
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
  
    navToggle.on("click", function(event) {
      event.preventDefault();
      
      nav.toggleClass("show"); /* Показувати  меню при кліку на бургер */
    });
  
  
  
    /* Form */
  
    document.getElementById('ajax-contact-form').addEventListener('submit', function(evt){
      var http = new XMLHttpRequest(), f = this;
      var th = $(this);
      evt.preventDefault();
      http.open("POST", "mail.php", true);
      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
          if (http.responseText.indexOf(f.input_email.value) == 0) { 
            th.trigger("reset");
          }
        }
      }
      http.onerror = function() {
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
  