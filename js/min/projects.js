$(function(){function e(){$("#category").toggleClass("scDmove"),$(".arrow").toggleClass("arrow-up")}function t(){return{sc_top:document.documentElement.scrollTop||document.body.scrollTop}}function o(e){$(".projects__item .conL").each(function(t){var o=$(this).offset().top;e>o-c?$(this).addClass("scLmove"):$(this).removeClass("scLmove")}),$(".projects__item .conR").each(function(t){var o=$(this).offset().top;e>o-c?$(this).addClass("scRmove"):$(this).removeClass("scRmove")})}var s=$(window),c=s.height(),n=["design","html","php","wp","ec"],l=["li"],i=$("#all");$("#filter").on("click",function(){e()}),i.click(function(){$(".sort").prop("checked",!1),i.prop("checked",!0)}),$("#select label input").click(function(){$(this).parent().toggleClass("selected"),$.each(n,function(){$("#"+this).is(":checked")?($("#result "+l+":not(."+this+")").addClass("hidden-not-"+this),i.prop("checked",!1).parent().removeClass("selected")):$("#"+this).not(":checked")&&$("#result "+l+":not(."+this+")").removeClass("hidden-not-"+this)}),0==$(".sort:checked").length&&(i.prop("checked",!0).parent().addClass("selected"),$(".sort").parent().removeClass("selected"))});var r=null;s.on("scroll",function(){clearTimeout(r),r=setTimeout(function(){var e=t().sc_top;o(e)},20)})});