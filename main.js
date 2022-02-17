// /*
// *追従メニュー 
// */
// //基準点
var elemTop = [];

//現在地取得設定を関数でまとめる
function PositionCheck() {
  var headerH = $('#header').outerHeight(true);
  $('.scroll-point').each(function(i) {
    elemTop[i] = Math.round(parseInt($(this).offset().top - headerH - 10 ));
  });
}

//ナビゲーションに現在地のクラスをつけるための設定
function ScrollAnime() {
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $('#pc-nav li');

  $('#pc-nav li').removeClass('current');
  if(scroll >= elemTop[0] && scroll < elemTop[1]) {
    $(NavElem[0]).addClass('current');
  } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
    $(NavElem[1]).addClass('current');
  } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
    $(NavElem[2]).addClass('current');    
  } else if (scroll >= elemTop[3] && scroll < elemTop[4]) {
    $(NavElem[3]).addClass('current');
  } else if (scroll >= elemTop[4]) {
    $(NavElem[4]).addClass('current');
  }
}

//ナビゲーションをクリックした際のスムーススクロール
$('#pc-nav a, #g-nav a').click(function() {
  var elmHash = $(this).attr('href');
  var headerH = $('#header').outerHeight(true);
  var pos = Math.round($(elmHash).offset().top - headerH);
  $('body, html').animate({scrollTop: pos}, 500);
  return false;
});


// /*
// *クリック時に下から上に出現
// */
$('.openbtn').click(function() {
  $(this).toggleClass('active');
  $('#g-nav').toggleClass('panel');
});
$('#g-nav a').click(function() {
  $('.openbtn').removeClass('active');
  $('#g-nav').removeClass('panel');
});

// /*
// *スクロール時にエリアの高さに合わせて線が伸びる
// */
$('body').scrollgress({
  height: '5px',
  color: 'navy',
});

// /*
// *ページの指定の高さを超えたら出現
// */
// //スクロールした際の動きを関数にまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if(scroll >= 200) {
    $('#page-top').removeClass('RightMove');
    $('#page-top').addClass('LeftMove');
  } else {
    if($('#page-top').hasClass('LeftMove')) {
      $('#page-top').removeClass('LeftMove');
      $('#page-top').addClass('RightMove');
    }
  }
}

// //page-topをクリックした際の設定
$('#page-top').click(function() {
  $('body, html').animate({
    scrollTop: 0
  }, 500);
  return false;
});


// /*
// *アコーディオンメニュー
// */
$('.title').on('click', function() {
  $('.box').slideUp(500);
  
  let findElm = $(this).next('.box');
  if($(this).hasClass('close')) {
    $(this).removeClass('close');
  } else {
    $('.close').removeClass('close');
    $(this).addClass('close');
    $(findElm).slideDown(500);
  }
});

// /*
// *ニュースティッカー
// */
var slider;
var sliderFlag = false;
var breakpoint = 768;

function slideSet() {
  var windowWidth = window.innerWidth;
  if(windowWidth >= breakpoint && !sliderFlag) {
    slider = $('.slider').bxSlider ({
      mode: 'vertical',
      controls: false,
      auto: 'true',
      pager: false
    });
    sliderFlag = true;
  } else if (windowWidth < breakpoint && sliderFlag) {
    slider.destroySlider();
    sliderFlag = false;
  }
}


// /*
// *アニメーション
// */
function fadeAnime() {
  //左から
  $('.bgLRextendTrigger').each(function() {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if(scroll >= elemPos - windowHeight) {
      $(this).addClass('bgLRextend');
    } else {
      $(this).removeClass('bgLRextend');
    }
  });
  $('.bgappearTrigger').each(function() {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if(scroll >= elemPos - windowHeight) {
      $(this).addClass('bgappear');
    } else {
      $(this).removeClass('bgappear');
    }
  });

//   //フワッ
  $('.fadeUpTrigger').each(function() {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if(scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp');
    } else {
      $(this).removeClass('fadeUp');
    }
  });
  
//   //パタッ
  $('.flipLeftTrigger').each(function() {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if(scroll >= elemPos - windowHeight) {
      $(this).addClass('flipLeft');
    } else {
      $(this).removeClass('flipLeft');
    }
  });
}


// /*
// *関数をまとめる
// */
// //リサイズした時
$(window).on('resize', function() {
  sliderSet();
});

//画面をスクロールした時
$(window).scroll(function() {
  PageTopAnime();
  PositionCheck();
  ScrollAnime();
  fadeAnime();
})

//ロードした時
$(window).on('load', function() {
  $('#splash-logo').delay(1200).fadeOut('slow');

  //ローディング画面
  $('#splash').delay(1500).fadeOut('slow', function() {
    $('body').addClass('appear');
    slideSet();
    PositionCheck();
    ScrollAnime();
    PageTopAnime();
  });

  //アコーディオン
  $('.open').each(function(index, element) {
    var Title =$(element).children('.title');
    $(Title).addClass('close');
    var Box = $(element).children('.box');
    $(Box).slideDown(500);
  });

  //背景画面が伸びる
  $('.splashbg').on('animationend', function() {
    fadeAnime();
  });
});