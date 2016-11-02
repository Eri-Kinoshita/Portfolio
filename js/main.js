	var $window = $(window);
	var wHeight = $window.height();
	var wWidth = $window.width();

/*----------------------------------
		First Loading
------------------------------------*/
	var loadbarAni = $('.loader__screen'),
		 loadiconAni = $('.loader__contects');

	function loadingBarAnimation() {
		loadbarAni.addClass('visible');
		loadiconAni.css('display','block');
	}
	function stopload() {
		loadbarAni.removeClass('visible');
		loadiconAni.css('display','none');
	}
	loadingBarAnimation();
	setTimeout('stopload()',5000);

	window.addEventListener("load", function(){
		$('html,body').animate({ scrollTop: 0 }, '1');
		stopload();
	}, false);

/*----------------------------------
		Type corder
------------------------------------*/
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



//画像などを除いて、HTML=DOMの読み込みが終わったら実行
jQuery(document).ready(function($){
	var isAnimating = false,
		 firstLoad = false,
		 newLeftlocate = 0,
		 imglaodFlg = false;
	//cache DOM elements
	var body = $('#body'),
		 nav = $('#primeNav, #main'),
		 mainContent = $('#main'),
		 loadbarAni = $('.loader__screen'),
		 loadiconAni = $('.loader__contects');

	//select a new section
	nav.on('click','.nav-link', function(event){
		event.preventDefault();
		var target = $(this),
			//detect which section user has chosen
		sectionTarget = target.data('menu');
		if( !target.hasClass('selected') && !isAnimating ) {
			triggerAnimation(sectionTarget, true);
			navColchange(sectionTarget);
		}
		firstLoad = true;
	});

	//detect the 'popstate' event - e.g. user clicking the back button
	$(window).on('popstate', function() {
	  	if( firstLoad ) {
	    	var newPageArray = location.pathname.split('/'),
	      //this is the url of the page to be loaded
	      newPage = newPageArray[newPageArray.length - 1].replace('.html', ''),
	      hash = location.hash;
	      newPage = ( newPage == '' ) ? 'index' : newPage;
	    	if( !isAnimating && (hash == "") )
	  		{
	  			triggerAnimation(newPage, false);
	  			navColchange(newPage);
	  		}
	  	}
	});

	//start animation
	function triggerAnimation(newSection, bool) {
		isAnimating =  true;
		// newSectionが空欄の場合indexを代入
		newSection = ( newSection == '' ) ? 'index' : newSection;

		//update Navigation siblings()で兄弟要素を探索
		nav.find('*[data-menu="'+newSection+'"]').addClass('selected').parent('li').siblings('li').children('.selected').removeClass('selected');

		//load new content
		loadNewContent(newSection, bool);
	}

	function loadNewContent(newSection, bool) {
		loadingBarAnimation();
		setTimeout(function(){
			var section = $('<div class="main__wrap overflow-hidden '+newSection+'"></div>').appendTo(mainContent);
			// //load the new content from the proper html file
			section.load(newSection+'.html .main__wrap > *', function(event){
				section.prev('.visible').removeClass('visible');
				section.addClass('visible');

				resetAfterAnimation(newSection);
				if($('.no-csstransitions').length > 0){
					resetAfterAnimation(section);
				}

				if(newSection == "index"){
					initialaetLang();
					$(function() {
						var TopTypingTxt = document.getElementById('corderTop');
						var typeStrings = [" thinking.","simple designs.","programming ideas."];
						typeCoder(TopTypingTxt,0,0,typeStrings);

						});
					}
				else if(newSection == "about"){
					initialaetLang();
					$.getScript("js/jquery.inview.min.js");
					$.getScript("http://d3js.org/d3.v3.min.js");
					$.getScript("js/about.js");
				}
				else if( newSection = "projects"){
					initialaetLang();
					$.getScript("js/projects.js");
				}

				var url = newSection;
				// var url = newSection+'.html'; 拡張子あり

				if(url!=window.location && bool){
		      window.history.pushState({path: url},'',url);
		      firstLoad = true;
		    }
				loadImg();
			});
		}, 500);
	}

	function loadImg(){
		var allImage = $("img");
		var allImageCount = allImage.length;
		var completeImageCount = 0;
		for(var i = 0; i < allImageCount; i++){
			$(allImage[i]).bind("load", function(){
			  completeImageCount ++;
			  if (allImageCount == completeImageCount){
			  	$('html,body').animate({ scrollTop: 0 }, '1');
					loadbarAni.removeClass('visible');
					loadiconAni.css('display','none');
			  }
			});
		}
	}

	function resetAfterAnimation(newSection) {
		$('.main__wrap.'+newSection).removeClass('overflow-hidden').prev('.main__wrap').remove();
		isAnimating =  false;
	}


	function navColchange(sectionTarget){
		body.hasClass(sectionTarget);
		body.removeClass();
		body.addClass(sectionTarget);
	}
	/*----------------------
		Modal window
	----------------------*/
	modalOpen =$('.modalOpen');
	modalOpen.click(function(){
		$('.contact').append('<div id="contact" class="contact__bg"></div>');
		modalResize();
		$('.contact').fadeIn('slow');

		$('.contact__bg').click(function(){
            $(".contact").fadeOut('slow',function(){
          //挿入した<div id="modal-bg"></div>を削除
                $('.contact__bg').remove();
                $('.main__wrap').css( {
			    height: '100%',
			    overflow: ''
			} );
            });
        });
        // $(window).resize(modalResize);
        function modalResize(){
            var w = $(window).width();
            var h = $(window).height();
            var cw = $('.contact__wrap').outerWidth();
            var ch = $('.contact__wrap').outerHeight();
            $('.contact__wrap').css({
                "left": ((w - cw)/2) + "px",
                "top": ((h - ch)/2) + "px"
            });
            $('.main__wrap').css( {
			    height: '100vh',
			    overflow: 'hidden'
			} );
        }
	});

	$('#contactForm').submit(function(event) {
	    event.preventDefault();
	    var $form = $('#contactForm');
	    var $button = $form.find('button');

	 	if( $("#name").val() && $("#email").val() && $("#comments").val() ){
	    // if(!$("#email").val().match("^[0-9A-Za-z._\-]+@[0-9A-Za-z.\-]+$")){
	    //   return false;
	    // }
	    	$('.result__loading').css('display','block');
		    // 送信
		    $.ajax({
		        url: $form.attr('action'),
		        type: $form.attr('method'),
		        data: $form.serialize()
		            + '&delay=1',
		        timeout: 10000,

		        // 送信前
		        beforeSend: function(xhr, settings) {
		            // ボタンを無効化し、二重送信を防止
		            $button.attr('disabled', true);
		        },
		        // 応答後
		        complete: function(xhr, textStatus) {
		            // ボタンを有効化し、再送信を許可
		            $button.attr('disabled', false);
		        },

		        // 通信成功時の処理
		        success: function(result, textStatus, xhr) {
		            // 入力値を初期化
		            $form[0].reset();
		            $('#error').empty();
		            $('.result__msg').css('display','block');
		            $('.contact__form').css('display','none');
		        },

		        // 通信失敗時の処理
		        error: function(xhr, textStatus, error) {}
		    });
		} else {
			$('#error').html('Please fill the required field.');
		}
	});


	// Nav Toggle Button
	var $navOpen = $('.nav');
		$('#navToggle').on('click',function(){
		$navOpen.toggleClass('open');
	});
		$('.nav__global').on('click',function(){
		$navOpen.removeClass('open');
	});
});










