$( document ).ready(function() {


	(function () {
		var wH = $(window).height();
		if(wH > 800){
			$('.ei-slider').css({'height':'600px'});
		}
	})();

	$(function() {
        $('#ei-slider').eislideshow({
            easing      : 'easeOutExpo',
            titleeasing : 'easeOutExpo',
            titlespeed  : 1200
        });
    });


	$('#menu a[href^="."]').click(function () {
	    var el = $(this).attr('href');
	    $('body').animate({
	        scrollTop: $(el).offset().top-118}, 2000);
	    return false;
	});



});