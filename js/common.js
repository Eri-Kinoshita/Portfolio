/**********************   Loading  **********************/
  var $window = $(window);
  var wHeight = $window.height();
  var wWidth = $window.width();
  function typeCoder(id, ele, ele_len, typeStrings){
    var typeArr = new Array();

    textInMatrix(typeStrings, typeArr);
    var flag = 0;
    var Timer = setTimeout(function(){ typeCoder(id, ele, ele_len, typeStrings);　}, 100);
    if( ele == typeStrings.length ){
      ele=0;
    }
    if( ele_len == typeArr[ele].length ){
      setTimeout(function(){ sliceCoder(id,typeArr[ele],ele,ele_len,flag,typeStrings);　}, 1600);
      clearTimeout(Timer);
    }else{
      id.innerHTML += typeArr[ele][ele_len];
      ele_len++;
    }
  };

  function textInMatrix(typeStrings, typeArr){

    for(var i=0; i < typeStrings.length; i++){
      typeArr[i] = new Array();
      var typeString = typeStrings[i];
      for(var j=0; j<typeString.length; j++){
        typeArr[i][j] = typeString.charAt(j);
      }
    }
  }

  function sliceCoder(id,string,ele,ele_len,flag,typeStrings){
    var SliceTimer = setTimeout( function(){ sliceCoder(id,string,ele,ele_len,flag,typeStrings); }, 25);
    if(flag == 0){
      var string = string.join('');
      flag = 1;
    }
    if( ele_len <= 0){
      // spaceId.empty();
      setTimeout(function(){ typeCoder(id,ele+1,0,typeStrings);　}, 250);
      clearTimeout(SliceTimer);
    }else{
      id.innerHTML = string.slice(0,ele_len-1);
      ele_len--;
    }
  }

  function getscrollTopinfo(){
    return{
      sc_top: document.documentElement.scrollTop || document.body.scrollTop
    };
  }

$(function() {
  var $navOpen = $('.nav');
  $(window).scroll(function() {
      if ($(window).scrollTop() > 200) {
          $navOpen.addClass('fixed');
          // $logo.addClass('logo-toggle');
      } else {
          $navOpen.removeClass('fixed');
          // $logo.removeClass('logo-toggle');
      }
  });
  // Nav Toggle Button
  $('#navToggle').click(function(){
      $navOpen.toggleClass('open');
  });
});


/*----------------------------------
    language switch
------------------------------------*/
  var nav = $('#primeNav');
  initialaetLang();
  function initialaetLang(){
    var langBtn = ["en_on","jp_on"];
    for( var i=0; i < langBtn.length; i++ ){
      var lang_on = $('.lang__btn').hasClass(langBtn[i]);
      if(lang_on){
        showLang(langBtn[i].split('_')[0]);
      }
    }
  }
  function showLang(lang){
   var langArr = ["en","jp"];
   for( var i=0; i < langArr.length; i++ ){
     if( lang == langArr[i] ){
       $('.' + langArr[i]).addClass('visible');
       $('.lang__btn').addClass(langArr[i]+'_on');
     }else{
       $('.' + langArr[i]).removeClass('visible');
       $('.lang__btn').removeClass(langArr[i]+'_on');
     }
   }
  }
  nav.on("click",".lang__btn--jp", function() {
    showLang('jp');
  });
  nav.on("click",".lang__btn--en",function() {
    showLang('en');
  });