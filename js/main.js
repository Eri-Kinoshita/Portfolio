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
					$.getScript("js/common.js");
					$.getScript("js/index.js");
				}
				else if(newSection == "about"){
					initialaetLang();
					$.getScript("js/jquery.inview.min.js");
					$.getScript("http://d3js.org/d3.v3.min.js");
					$.getScript("js/common.js");
					$.getScript("js/about.js");
				}
				else if( newSection = "projects"){
					initialaetLang();
					$.getScript("js/common.js");
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
		            + '&delay=1',  // （デモ用に入力値をちょいと操作します）
		        timeout: 10000,  // 単位はミリ秒

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

});










