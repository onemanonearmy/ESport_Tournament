var session;
$(document).ready(function(){
session=$('#session').val();
	creaSteps();
	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		
		if (xhr.status == 200 && xhr.readyState == 4) {
			let data = JSON.parse(xhr.responseText);
			var nazioni=$('#nazioni');
			for(var i = 0 ; i < data.length ; i++){
				var nome = data[i].replace(/\s/g, '');
				nome=nome.toUpperCase();
				nazioni.append('<div class="option"><input name="nazioni" value="'+nome+'" onclick="tendina(\''+nome+'\')" type="radio" class="radio" id="'+nome+'"> <label for="'+nome+'">'+nome+'</label></div>');
			}

		}
	}
	xhr.open('GET', '../Script/nation.json', true);
	xhr.send();

})

$(function(){
	$('#img-btn').click(function(){
		
		
	})
	
})

	function menu(k){
	
	$("#"+k).toggleClass("active");
		
	}


	function tendina(k){
		var selected=$('.selected.'+event.target.name);
		var optionsContainer = $("#"+event.target.name);
		selected.text($("label[for='"+k+"']").html());
	    optionsContainer.toggleClass("active");
	}


	function creaSteps() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {

		if (xhr.status == 200 && xhr.readyState == 4) {
		
			let data = JSON.parse(xhr.responseText);
			console.log(data);
			var multi=$(".multi-steps");
			var form=$("#the-form");
			
			for(var j=1;j<parseInt(data);j++){	//For per gli indicatori del multistep
				
				multi.append('<li id="'+j+'-step">Giocatore '+j+'</li>')
			
				form.append('<div class="page page-'+j+'">'+

				'<div class="field">'+

				'<label for="nickname-player-'+j+'" class="form-label">Nickname</label>'+
				'<input type="text" class="feedback-input nickname-player-'+j+'" placeholder="SuperMario64" name="nickname-player-'+j+'">'+
				'<span class="error nick"></span>'+
				'</div>'+
				
				'<div class="field">'+
				'<label for="nome-giocatore-'+j+'" class="form-label">Nome</label>'+
				'<input type="text" class="feedback-input nome-giocatore-'+j+'" placeholder="Mario" name="nome-giocatore-'+j+'">'+
				'<span class=" error nome"></span>'+
				'</div>'+
				
				'<div class="field">'+
				'<label for="cognome-giocatore-'+j+'" class="form-label">Cognome</label>'+
				'<input type="text" class="feedback-input cognome-giocatore-'+j+'" placeholder="Rossi" name="cognome-giocatore-'+j+'">'+
				'<span class=" error cognome"></span>'+
				'</div>'+
				
				'<div class="field">'+
				'<label for="ruolo-giocatore-'+j+'" class="form-label">Ruolo</label>'+
				'<input type="text" class="feedback-input ruolo-giocatore-'+j+'" placeholder="Jungler" name="ruolo-giocatore-'+j+'">'+
				'<span class=" error ruolo"></span>'+
				'</div>'+
				
				'<div class="field" class="form-label">'+
				'<label for="nascita-giocatore-'+j+'" class="form-label">Data di Nascita</label>'+
				'<input type="date" class="feedback-input nascita-giocatore-'+j+'" name="nascita-giocatore-'+j+'">'+
				'<span class="error nascita"></span>'+
				'</div>'+
				
				'<div class="field"><label for="images" class="form-label">Inserisci una immagine massimo 150x150</label>'+
				'<input type="file" name="image-'+j+'" onchange="checkImg('+j+')" id="images-'+j+'">>'+
				'<span class="error-img"></span>'+
				'</div>'+
				
				'<div class="field-btn">'+
				'<input type="button" class="button-blue prevBtn'+j+'" onclick="cambiaPagina()" value="Prev">'+
				'<input type="button" class="button-blue nextBtn'+j+'" onclick="validateCampi('+j+')" value="Next">'+
				'</div>'+
				'</div>');
			}
			
			multi.append('<li id="'+parseInt(data)+'-step">Giocatore '+parseInt(data)+'</li>')
			
			form.append('<div class="page page-'+parseInt(data)+'">'+

			'<div class="field">'+

			'<label for="nickname-player-'+parseInt(data)+'" class="form-label">Nickname</label>'+
			'<input type="text" class="feedback-input nickname-player-'+parseInt(data)+'" placeholder="SuperMario64" name="nickname-player-'+parseInt(data)+'">'+
			'<span class="error nick"></span>'+
			'</div>'+
			
			'<div class="field">'+
			'<label for="nome-giocatore-'+parseInt(data)+'" class="form-label">Nome</label>'+
			'<input type="text" class="feedback-input nome-giocatore-'+parseInt(data)+'" placeholder="Mario" name="nome-giocatore-'+parseInt(data)+'">'+
			'<span class=" error nome"></span>'+
			'</div>'+
			
			'<div class="field">'+
			'<label for="cognome-giocatore-'+parseInt(data)+'" class="form-label">Cognome</label>'+
			'<input type="text" class="feedback-input cognome-giocatore-'+parseInt(data)+'" placeholder="Rossi" name="cognome-giocatore-'+parseInt(data)+'">'+
			'<span class=" error cognome"></span>'+
			'</div>'+
			
			'<div class="field">'+
			'<label for="ruolo-giocatore-'+parseInt(data)+'" class="form-label">Ruolo</label>'+
			'<input type="text" class="feedback-input ruolo-giocatore-'+parseInt(data)+'" placeholder="Jungler" name="ruolo-giocatore-'+parseInt(data)+'">'+
			'<span class=" error ruolo"></span>'+
			'</div>'+
			
			'<div class="field" class="form-label">'+
			'<label for="nascita-giocatore-'+parseInt(data)+'" class="form-label">Data di Nascita</label>'+
			'<input type="date" class="feedback-input nascita-giocatore-'+parseInt(data)+'" name="nascita-giocatore-'+parseInt(data)+'">'+
			'<span class="error nascita"></span>'+
			'</div>'+
			
			'<div class="field"><label for="images" class="form-label">Inserisci una immagine massimo 150x150</label>'+
			'<input type="file" name="images" onchange="checkImg('+parseInt(data)+')" id="images-'+parseInt(data)+'">'+
			'<span class="error-img"></span>'+
			'</div>'+
			
			'<div class="field-btn">'+
			'<input type="button" class="button-blue prevBtn'+parseInt(data)+'" onclick="cambiaPagina()" value="Prev">'+
			'<input type="button" class="button-blue submitbtn'+parseInt(data)+'" onclick="submitForm()" value="Submit">'+
			'</div>'+
			'</div>');
			
			
			
			form.append('<input type="hidden" name="numeroPartecipanti" value="'+parseInt(data)+'">')
		}
	}
	
		xhr.open('GET', '../SquadreControl;jsessionid='+session+'?action=getGiocatori', true);
		xhr.send();
}




	function cambiaPagina(){
	
	var called = $(event.target).attr("class").replace(/\D/g,'');
	if($(event.target).val()=="Prev"){
		var tmp = (called-1)*18;
	
		
		$('#'+called+'-step').removeClass("is-active");
		$('#'+(called-1)+'-step').addClass("is-active");
		
		var change= '-'+tmp+'%';
		
		$('.slidepage').css("marginLeft",change);
		
		
	}
	else 
		if($(event.target).val()=="Next" ){
			
			var xhr = new XMLHttpRequest();
			if(called==0)
				xhr.open('GET', '../GiocatoreControl;jsessionid='+session+'?action=validateTeam&teamName='+$('.nome-squadra').val(), true);
			else
				xhr.open('GET', '../GiocatoreControl;jsessionid='+session+'?action=validatePlayer&nick='+$('.nickname-player-'+called).val()+'&numPlayer='+called, true);

			xhr.send();
			
			xhr.onreadystatechange = function() {

				if (xhr.status == 200 && xhr.readyState == 4) {
					let data = JSON.parse(xhr.responseText);
					console.log(data);
					if(data['0']!=="null"){
						if(called==0)
						$('.error-name-'+called).text(data['0']);
						else{
							$('.nickname-player-'+called).next().text(data['0']);
						}
					}
					else{
						if(called==0)
							$('.error-name-'+called).text("");
						else
							$('.nickname-player-'+called).next().text("");
							
						var tmp = (1+parseInt(called))*18;
						$('#'+called+'-step').removeClass("is-active");			
						$('#'+(1+parseInt(called))+'-step').addClass("is-active");
						var change= '-'+tmp+'%';
						$('.slidepage').css("marginLeft",change);
						//alert('no errore!');
					}
				
				}
			}
		}
}

	
	
	
	
	function submitForm(){
		var i = $(event.target).attr("class").replace(/\D/g,'');
		var xhr = new XMLHttpRequest();
		var nickname=$(".nickname-player-"+i);
		var nome=$(".nome-giocatore-"+i);
		var cognome=$(".cognome-giocatore-"+i);
		var ruolo=$('.ruolo-giocatore-'+i);
		var dataDiNascita=$('.nascita-giocatore-'+i);
		var birth= new Date(dataDiNascita.val());
		var today= Date.now();
	
			if(!nickname.val()){//Nickname non inserito

				var error=nickname.next();
				$('span').text("");
				error.text("Inserisci un nickname");
				console.log("nickname non inserito");
				return false;

			} else if(!nome.val()){

				var error=nome.next();
				$('span').text("");
				error.text("Inserisci un nome");
				console.log("nome non inserito");
				return false;

			} else if(!cognome.val()){

				var error=cognome.next();
				$('span').text("");
				error.text("Inserisci un cognome");
				console.log("cognome non inserito");
				return false;

			} else if(!ruolo.val()){

				var error=ruolo.next();
				$('span').text("");
				error.text("Inserisci un ruolo");
				console.log("ruolo non inserito");
				return false;

			}  else
				if(birth instanceof Date && !isNaN(birth)){
					if(Math.floor((today-birth)/(31557600000))<18){
						var error=dataDiNascita.next();
						$('span').text("");
						error.text("Non sei maggiorenne!");
						console.log("non sei maggiorenne");
						return false;
					}
				}
				else{
					var error=dataDiNascita.next();
					$('span').text("");
					error.text("Inserisci una data di nascita!");
					console.log("Inserisci una data di nascita");
					return false;
				}
		
		$('span').text("");

		xhr.open('GET', '../GiocatoreControl;jsessionid='+session+'?action=validatePlayer&nick='+$('.nickname-player-'+i).val()+'&numPlayer='+i, true);	
		xhr.send();
		
		xhr.onreadystatechange = function() {

			if (xhr.status == 200 && xhr.readyState == 4) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				if(data['0']!=="null"){
					$('.nickname-player-'+i).next().text(data['0']);
					//event.preventDefault();
					//return false;
				}
				else{
					alert('tutto bene faccio la submit');
					$('#the-form').submit();
				}
				}
			}
		}
	
	
	

	function validateCampi(i){
	var regGeneral=/^[a-zA-Z(!_\'\s\-)]{1,30}$/;
	var nameReg=/^[a-zA-Z(\s')]{1,30}$/;
	
	if(i==0){ //Se sto validando i campi dell'inserimento della squadra
		var nomesquadra=$('.nome-squadra');
		var naz=$('.selected.nazioni');
		if(!nomesquadra.val()){

			var error=nomesquadra.next();
			$('span').text("");
			error.text("Inserisci un nome alla squadra");
			console.log("Nome squadra non inserito");
			return false;

		}
		else if(!regGeneral.test(nomesquadra.val())){
			var error=nomesquadra.next();
			$('span').text("");
			error.text("Il nome della squadra deve essere al massimo di 30 caratteri e puo'contenere solamente i seguenti caratteri speciali:( _ , ! , '-' ,'spazio' ,)");
			console.log("Nome squadra inserita male");
			return false;
		}
		else if(naz.text()=="Nazioni"){

			var error=naz.next();
			$('span').text("");
			error.text("Inserisci una nazione");
			console.log("Nome squadra non inserito");
			return false;

		} 
		else{
			
			cambiaPagina();
		}

		
	} else{ //Se sto validando i campi dell'inserimento di un giocatore
	
	var nickname=$(".nickname-player-"+i);
	var nome=$(".nome-giocatore-"+i);
	var cognome=$(".cognome-giocatore-"+i);
	var ruolo=$('.ruolo-giocatore-'+i);
	var dataDiNascita=$('.nascita-giocatore-'+i);
	var birth= new Date(dataDiNascita.val());
	var today= Date.now();
	
	
		if(!nickname.val()){//Nickname non inserito

			var error=nickname.next();
			$('span').text("");
			error.text("Inserisci un nickname");
			console.log("nickname non inserito");
			return false;

		} else if(!regGeneral.test(nickname.val())){
			var error=nickname.next();
			$('span').text("");
			error.text("Inserisci un nickname di massimo 30 caratteri che puo' contenere solamente i seguenti caratteri speciali:( _ , ! , '-' ,'spazio' ,)");
			console.log("nickname inserito male");
			return false;
		}
		
		else if(!nome.val()){

			var error=nome.next();
			$('span').text("");
			error.text("Inserisci un nome");
			console.log("nome non inserito");
			return false;

		} 
		
		else if(!nameReg.test(nome.val())){

			var error=nome.next();
			$('span').text("");
			error.text("Inserisci un nome di massimo 30 caratteri");
			console.log("nome inserito male");
			return false;

		}
		
		else if(!cognome.val()){

			var error=cognome.next();
			$('span').text("");
			error.text("Inserisci un cognome");
			console.log("cognome non inserito");
			return false;

		} 
		
		else if(!nameReg.test(cognome.val())){

			var error=cognome.next();
			$('span').text("");
			error.text("Inserisci un cognome di massimo 30 caratteri");
			console.log("cognome inserito male");
			return false;

		}
		
		else if(!ruolo.val()){

			var error=ruolo.next();
			$('span').text("");
			error.text("Inserisci un ruolo");
			console.log("ruolo non inserito");
			return false;

		} 
		
		else if(!nameReg.test(ruolo.val())){

			var error=ruolo.next();
			$('span').text("");
			error.text("Inserisci un ruolo di massimo 30 caratteri");
			console.log("ruolo inserito male");
			return false;

		}
		
		else
			if(birth instanceof Date && !isNaN(birth)){
				if(Math.floor((today-birth)/(31557600000))<18){
					var error=dataDiNascita.next();
					$('span').text("");
					error.text("Non sei maggiorenne!");
					console.log("non sei maggiorenne");
					return false;
				}
			}
			else{
				var error=dataDiNascita.next();
				$('span').text("");
				error.text("Inserisci una data di nascita!");
				console.log("Inserisci una data di nascita");
				return false;
			}
		
			$('span').text("");
			cambiaPagina();
		
	}
}
	

	 //Test per l'immagine 150x150
	function checkImg(i) {
		
		var file = $(event.target)[0].files[0];
		var img = new Image();
		var imgwidth = 0;
		var imgheight = 0;
		var error=$(event.target).next();
		
		if(typeof file!==typeof undefined){
			img.src = URL.createObjectURL(file);
			img.onload=function(){
			
			imgwidth = this.width;
			imgheight = this.height;
			
			if(imgwidth > parseInt(150) && imgheight > parseInt(150)){
				error.text("Inserisci un'immagine di massimo 150x150"); 
				$(".nextBtn"+i).prop('disabled', true);
			}
			else{
				error.text(""); 
				$(".nextBtn"+i).prop('disabled', false);
			}
		}
		
		} else{
			error.text("");
			$(".nextBtn"+i).prop('disabled', false);
			return true;
		}
	} 
	
/*
$(function(){
	  $('#upload').change(function(){
		  
	    var input = this;
	    var url = $(this).val();
	    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
	    if (input.files && input.files[0]&& (ext == "jpeg" || ext == "jpg" || ext== "png" )) {
	    	
	        var reader = new FileReader();
		    reader.readAsDataURL(input.files[0]);

	        reader.onload = function (e) {
		                   
	        var image = new Image();

	        image.src = e.target.result;
	        
	        image.onload = function () {
	        	  var height = this.height;
	        	  var width = this.width;
	        	  if (height > 150 || width > 150) {
	        	    alert("La foto deve essere massimo di 150x150.");
	        	    return false;
	        	  }
	        	  $('#img').attr('src', e.target.result);
	        	  return true;
	        	};
	        
	        
	        }
	       }
	    else
	    {
	      $('#img').attr('src', 'img/default-image.png');  //quando non ci sono immagini
	    }
	  });

	});*/