
$(function() {

  /**********************  Display a Random Image **********************/
  var $window = $(window);
  var wWidth = $window.width();
  var wHeight = $window.height();
  var windowSm = 480;
  if (wWidth <= windowSm) {
      //横幅640px以下のとき（つまりスマホ時）に行う処理を書く
  }
  else {
    //横幅640px超のとき（タブレット、PC）に行う処理を書く
    var num = 1;
    var images = ['pic01.png','pic02.png','pic03.png','pic04.png'];
    var imageBg = $('.about-left');
    imageBg.css('background-image', 'url(img/instagram/pic01.png)');
    setInterval(function(){
        // imageBg.fadeOut(100, function () {
            imageBg.css('background-image', 'url(img/instagram/' + images[num++] +')');
            // imageBg.fadeIn(100);
        // });
        if(num== images.length) num = 0;
    }, 4200);
  }
  // /**********************  check symbol **********************/
  var viewArr = ['whoami', 'webdesign','programming','ec','analysis'];

  for( var i=0; i<viewArr.length; i++){
    inviewFunc(viewArr[i]);
    inviewFuncfortxt(viewArr[i]);
  }
  function inviewFunc(value){
    $('.'+value).on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      var thisClass = $(this).attr('class').split(' ')[0];
      if (isInView) {
        $('.'+thisClass+'--current').addClass('subtitle__current');
        $('.'+thisClass+' .article-list__title' ).addClass('fadeInDown');
      } else {
        $('.'+thisClass+'--current').removeClass('subtitle__current');
        // $('.'+thisClass+' .article-list__title' ).removeClass('fadeInDown');
      }
    });
  }
  function inviewFuncfortxt(value){
    $('.'+value+' .article-list__txt').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        $(this).addClass('fadeInDown');
      } else {
        // $(this).removeClass('fadeInDown');
      }
    });
  }

 /************************ Scroll effect ************************/
  var offsetY = -10;
  var time = 500;

  $('.toLink').on('click',function() {
    var target = $(this.hash);
    if (!target.length) return ;
    var targetY = target.offset().top+offsetY;
    $('html,body').animate({scrollTop: targetY}, time, 'swing');
    window.history.pushState(null, null, this.hash);
    return false;
  });
  /**********************  Get scroll top **********************/
  function getscrollTopinfo(){
    return{
      sc_top: document.documentElement.scrollTop || document.body.scrollTop
      };
  }

  /************************   Skiill Bar Graph ************************/
  var flag_chart = true;
  var pieChartFunc = function(){
    var data = [ {name: "one", value: 65},
                 {name: "two", value: 35}];
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
        width = 200 - margin.left - margin.right;
        height = width - margin.top - margin.bottom;
    var chart = d3.select("#skillLeftPie")
                  .append('svg')
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")");
    var radius = Math.min(width, height) / 2;
    var color = d3.scale.ordinal().range(["rgba(222, 70, 60, 1)", "rgba(255,255,255,0)"]);
    var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - 25);
    var pie = d3.layout.pie().sort(null)
                .startAngle(1.1*Math.PI)
                .endAngle(3.1*Math.PI)
                .value(function(d) { return d.value; });
    var g = chart.selectAll(".arc")
                 .data(pie(data))
                 .enter().append("g")
                 .attr("opacity",".25")
                 .attr("class", "arc");
        g.append("path")
         .style("fill", function(d) { return color(d.data.name); })
         .transition().delay(function(d, i) { return i * 500; }).duration(800)
         .attrTween('d', function(d) {
            var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
            return function(t) {
              d.endAngle = i(t);
              return arc(d);
            }
         });


    var data = [ {name: "one", value: 85},
                 {name: "two", value: 15}];

    var chart = d3.select("#skillMidPie")
                  .append('svg')
                  .attr("class","svg-ps")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("opacity",".25")
                  .attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")");

    var g = chart.selectAll(".arc")
                 .data(pie(data))
                 .enter().append("g")
                 .attr("class", "arc");

    g.append("path")
      .style("fill", function(d) { return color(d.data.name); })
      .transition().delay(function(d, i) { return i * 500; }).duration(800)
      .attrTween('d', function(d) {
           var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
           return function(t) {
               d.endAngle = i(t);
             return arc(d);
           }
      });

    var data = [ {name: "one", value: 39},
                 {name: "two", value:  61}];

    var chart = d3.select("#skillRightPie")
                  .append('svg')
                  .attr("class","svg-sk")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("opacity",".25")
                  .attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")");
    var g = chart.selectAll(".arc")
                 .data(pie(data))
                 .enter().append("g")
                 .attr("class", "arc");

    g.append("path")
      .style("fill", function(d) { return color(d.data.name); })
      .transition().delay(function(d, i) { return i * 500; }).duration(800)
      .attrTween('d', function(d) {
           var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
           return function(t) {
              d.endAngle = i(t);
             return arc(d);
           }
      });
  }; // end of skillPieChart

  var flag_bar = true;
  var barGraphFunc = function(){
    var distances = [ {name: "HTML5( BEM )", value: 100},
                      {name: "CSS3 ( Saas )", value: 95},
                      {name: "Javascrip", value: 80},
                      {name: "PHP", value: 77},
                      {name: "Java", value: 70},
                      {name: "XML", value: 65},
                      {name: "MySQL", value: 60}
                    ];
    d3.select('#skillLangBar').selectAll('div')
      .data(distances)
      .enter()
      .append('div')
      .style('width', '10px')
      .style('opacity', 0)
      .transition()
      .delay(function(d, i) { return i * 300 })
      .duration(300)
      .style('width', function(d) { return (d.value) + '%'; })
      .style('opacity', 1)
      .text(function(d) { return d.name; });

    var distances = [ {name: "jQuery", value: 97},
                    {name: "vue.js", value: 65},
                    {name: "React.js", value: 50},
                    {name: "d3.js", value: 60},
                    {name: "three.js", value: 50},
                    {name: "Gulp", value: 75}
                  ];
    d3.select('#skillToolBar').selectAll('div')
      .data(distances)
      .enter()
      .append('div')
      .style('width', '10px')
      .style('opacity', 0)
      .transition()
      .delay(function(d, i) { return i * 300 })
      .duration(300)
      .style('width', function(d) { return (d.value) + '%'; })
      .style('opacity', 1)
      .text(function(d) { return d.name; });
  };

  /************************ Locked ************************/
  $('#myLocked').click(function(){
  var UserInput = prompt("Enter the password : ","");

    if( /W+/g.test(UserInput) ) {
      alert("Please type using half-width characters.");
    }else if( UserInput !=null ) {
      location.href = "UserInput" + ".pdf";
    }
  });

  /*----------------------------------
          onLoad and reize
  ------------------------------------*/
  var tileSize = function(width, height){
    var tileW = width/2.7;
    var tileH = height/1.2;
    $('.title__back--top').css('width',tileW);
    $('.title__back--top').css('height',tileH);
  };

  var timer = false;
  $(window).resize(function() {
    var wHeight = $window.height();
    var wWidth = $window.width();
    tileSize(wWidth, wHeight);
  });
  tileSize(wWidth, wHeight);

  /*----------------------------------
          Scroll Func
  ------------------------------------*/
  var charTop = $('#skillLeftPie').offset().top;
  var barTop = $('#skillLangBar').offset().top;
  var charHeight = 160;
  var barHeight = 180;

  $window.scroll(function(){
    var top = getscrollTopinfo().sc_top;
    if( top > charTop - wHeight + charHeight ){
      if(flag_chart) {
        flag_chart = false;
        pieChartFunc();
      }
    }
    if( top > barTop - wHeight + barHeight ){
      if(flag_bar) {
        flag_bar = false;
        barGraphFunc();
      }
    }
  }); // end of scroll func
});
