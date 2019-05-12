let lazyLoadOnSections;
let shinkNavbar;

const isOnScreen = element => {
  const win = $(window);

  const screenTop = win.scrollTop();
  const screenBottom = screenTop + win.height();

  const elementTop = element.offset().top;
  const elementBottom = elementTop + element.height();

  return elementBottom > screenTop && elementTop < screenBottom;
};

const lazyLoad = elem => {
  if (isOnScreen(elem)) {
    elem.css('opacity', 1);
  }
};

$(document).ready(() => {
  // bootstrap scrollspy effect
  $('body').scrollspy({
    target: '#navbar',
    offset: 100
  });

  // smooth scroll
  $(
    'a[href="#about-me"], a[href="#contact"], a[href="#blog"], a[href="#skills"], a[href="#portfolio"]'
  ).click(function() {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top
          },
          1000
        );
        return false;
      }
    }
  });

  // shrink navbar effect
  (shinkNavbar = () => {
    const nav = $('nav');
    if ($(document).scrollTop() > 30) {
      nav.addClass('shrink');
      nav.addClass('shadow-bottom');
    } else {
      nav.removeClass('shrink');
      nav.removeClass('shadow-bottom');
    }
  })();

  // lazy-load effect
  (lazyLoadOnSections = () => {
    const section = ['about-me', 'skills', 'blog', 'portfolio', 'contact'];
    section.forEach(s => lazyLoad($(`.section-${s}`)));
  })();

  $(window).scroll(() => {
    shinkNavbar();
    lazyLoadOnSections();
  });
});
