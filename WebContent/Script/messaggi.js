var session;

$(document).ready(function() {
	getMessaggi();
	session=$('#session').val();

});



function getMessaggi() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {

		if (xhr.status == 200 && xhr.readyState == 4) {

			let data = JSON.parse(xhr.responseText);
			console.log(data);
			
			container=$(".containerMessaggi");
			
			for (var i = 0; i < data.length; i++) {
				container.append("<div class='mess' onclick=showMessage("+data[i].codice+") id=messaggio"+data[i].codice+">Messaggio"+data[i].codice+
				"<a href='../MessaggiControl;jsessionid="+session+"?action=delMessaggio&codice="+data[i].codice+"'><i   class='messChecked check fas fa-check'></i></a></div>");
						
			}
			
			
			}
		}	
	xhr.open('GET', '../MessaggiControl;jsessionid='+session+'?action=getMessaggi', true);
		xhr.send();
		
	}

		
function showMessage(i)  {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {

		if (xhr.status == 200 && xhr.readyState == 4) {
			
			let data = JSON.parse(xhr.responseText);
			console.log(data);
			show=$(".viewerMessaggi");
			show.html("<h4>"+data.testo+"</h4>");
			
			
			
			}
		
		}
	xhr.open('GET', '../MessaggiControl;jsessionid='+session+'?action=showMessaggio&codice='+i, true);
	xhr.send();
	
	
	
}