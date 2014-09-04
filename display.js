	
	document.addEventListener('DOMContentLoaded',function(){
		var image = document.getElementById("eq_img");
		var textbox = document.getElementById("eq_text");
		image.src = localStorage["pso2_img"];
		textbox.innerHTML = localStorage["pso2_msg"];
	});