
window.onload = function init(){
	if(localStorage["pso2_ship"] != undefined){
		$('#' + localStorage["pso2_ship"]).attr("checked",true).checkboxradio("refresh");
	}else{
		localStorage["pso2_ship"] = "Ship01";
		$('#Ship01').attr("checked",true).checkboxradio("refresh");
	}
	
	$('#flip-1').val(localStorage["pso2_note"]).slider('refresh');
	
	document.getElementById("save").addEventListener('click', function(){
		var ship = $('input[name="radio-choice"]:checked').val();
		var note = $('#flip-1').val();
	
		localStorage["pso2_ship"] = ship;
		localStorage["pso2_note"] = note;
		document.getElementById("message").innerHTML = "Preferences saved. Settings will take effect next time you open Chrome.";
	});
}
