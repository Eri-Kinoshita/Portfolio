$(function(){

	var $window = $(window);
   var wHeight = $window.height();

   /*----------------------------------
      Filter
   ------------------------------------*/
   var $chkbxFilter_tags =['design','html','php','wp','ec'],
       $chkbxFilter_blocks = ['li'],
       $chkbxFilter_all = $('#all');
   function selectFunc(){
      $('#category').toggleClass('scDmove');
      $('.arrow').toggleClass('arrow-up');
   }
   $('#filter').on('click', function(){
      selectFunc();
   });

   $chkbxFilter_all.click(function() {
     $(".sort").prop('checked',false);
     $chkbxFilter_all.prop('checked',true);
   });

   //チェックボックスがクリックされた時の動作
   $("#select label input").click(function() {
     $(this).parent().toggleClass("selected");
     $.each($chkbxFilter_tags, function() {
       if($('#' + this).is(':checked')) {
        $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").addClass('hidden-not-' + this);
        $chkbxFilter_all.prop('checked',false).parent().removeClass("selected");
       }
       else if($('#' + this).not(':checked')) {
        $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").removeClass('hidden-not-' + this);
       }
     });
     if ($('.sort:checked').length == 0 ){
       $chkbxFilter_all.prop('checked',true).parent().addClass("selected");
       $(".sort").parent().removeClass("selected");
     };
   });
   /*----------------------------------
      Scroll effects
   ------------------------------------*/
   function getscrollTopinfo(){
      return{
        sc_top: document.documentElement.scrollTop || document.body.scrollTop
      };
   }
   function addClassAni(top){
      $('.projects__item .conL').each(function(i){
         var conLtop = $(this).offset().top;
         if( top > conLtop - wHeight ){
            $(this).addClass('scLmove');
         }else{
            $(this).removeClass('scLmove');
        }
      });

      $('.projects__item .conR').each(function(j){
      var conRtop = $(this).offset().top;
         if( top > conRtop - wHeight ){
            $(this).addClass('scRmove');
         }else{
            $(this).removeClass('scRmove');
         }
      });
   }
   var timer = null;
   $window.on('scroll',function() {
      clearTimeout( timer );
      timer = setTimeout(function() {
         var top = getscrollTopinfo().sc_top;
         addClassAni(top);
     }, 20);
   });
});


















