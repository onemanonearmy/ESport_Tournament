/**
 * 
 */

 function toggle(){
	
	if($('#user-img').val()!=="null"){
		if($('#check').prop('checked')){
			$('ul li').each(function(i){
				if(i===3){
					$(this).empty().html('<li><a href="">VAFFANCULO STRONZO</a></li>');
				}
			})
		} else{
			$('ul li').each(function(i){
				if(i===3){
					$(this).empty().html('<div class="div-profile-image"><a href=""><img src="'+$('#user-img').val()+'" class="source"></a></div>');
				}
			})
		}
	}
}
$(function() {
	var dropDownMenu = $(".avatar-dropdown-menu");

	dropDownMenu.click(function(e) {		
		e.stopPropagation();

		$(document).on("click", menuCloseListener);

		toggleMenu();
	});

	var toggleMenu = function() {
		dropDownMenu.toggleClass("open");
	}

	var menuCloseListener = function() {
		toggleMenu();

		$(document).off("click", menuCloseListener);
	}
});
