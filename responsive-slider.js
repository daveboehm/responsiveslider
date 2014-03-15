

jQuery(document).ready( function($) {

	var steps_array = [];
	var current_pos = 0;	
	var next_pos = 0;
	var prev_pos = 0;	
	var anim_delay = 300;
	var slide_width = 940;
	var slide_height = 525;			
	var slide_speed = 600;	
	var min_slide_pos = 0;		
	var current_step = 0;
	var is_moving = false;
	//var $ = jQuery;	
	var max_slide_pos;	
	var slide_to = 0;
	var slide_count = 0;
	var steps_built = false;

/*INITIAL SET UP*/

function build(){
	slide_count = 0;
	//fill image container arrays with the src value of each img in the DOM	
	$('div.viewer .slide').each( function(){
		slide_count++;
		//image_array.push(slide_count);
	});	//push img src into array
	
	//set the slide width to the css width of the viewer
	slide_width = $('div.viewer').width();
	slide_height = $('div.viewer').height();
	min_slide_pos = slide_width;
	
	//set container widths and lengths dynamically based on the number of slides				
	if ( $(window).width() > 767 ){
	var c_length = slide_count * slide_width;
		$('div.slide_container').css({'width' : c_length});
		//$('div.steps_container').css({'width' : slide_width});
	} else {
		$('div.slide_container').css({'width' : slide_width});
	}

	$('div.previous, div.next').css({'top' : slide_height*0.43});
	$('span.step_nums:eq('+current_step+')').addClass('active_step');
	max_slide_pos = -slide_width * slide_count;

	//add the active class to the step that is clicked
	$('span.step_nums:eq('+current_step+')').addClass('active_step');	
		
	//create a step icon for each image in the array. the first and last steps receive special icons
	if (!steps_built){
		for (i=0; i<slide_count; i++){	
			$('div.steps_container').append('<span class="step_nums"></span>');
			steps_array.push([i]);		
		}//for	
		steps_built = true;		
	}	
	
	//set the first index to active because we assume we're on the first when we load
	$('span.step_nums:eq(0)').addClass('active_step');
}	
/*END OF SET UP*/	

build();

$(window).resize(function(){
	build();
	console.log("resized");
	if ( $(window).width() < 1000 ) {
		console.log("triggered");
		animateSlide(0);
		slide_to = 0;
	}
});

	//function to control the active step highlighting in the steps container
	function stepActive(){
		$('span.step_nums:lt('+current_step+')').addClass('active_step');
		$('span.step_nums:gt('+current_step+')').removeClass('active_step');
		$('span.step_nums:eq('+current_step+')').addClass('active_step');
	}

	//function to control slide animations. global variable slide_to is calculated in each 'click' function
	function animateSlide(slide_to){
		$('div.slide_container').animate({left: slide_to}, slide_speed, function() {
			stepActive();
			is_moving = false;
		});
	} //animateSlide	
	
	
	//function that calls a repetitive group of functions
	function AnimateAndCheck(){
		is_moving = true;
		animateSlide(slide_to);	
		//checkArrows();
	} // do stuff			
		
	//FUNCTION - Next Arrow Button
	$('div.next').click( function() {
		if(is_moving) {
			return false;
		} else {
			slide_to -= slide_width;
			current_step++;
			AnimateAndCheck(slide_to);
		} // if else
	});//next arrow click function
	
	//FUNCTION - Previous Arrow Button
	$('div.previous').click( function() {
		if(is_moving) {
			return false;
		} else {
			slide_to += slide_width;
			current_step--;
			AnimateAndCheck(slide_to);	
		} //if else
	});//prev arrow function
		
	//FUNCTION - Steps
	$('span.step_nums').click( function() {	
		if(is_moving) {
			return false;
		} else {	
			current_step = $('span.step_nums').index(this);
			slide_to = (current_step*slide_width)*-1;
			AnimateAndCheck(slide_to);
		} // if else	
	});	// step click function

	
}); //doc ready