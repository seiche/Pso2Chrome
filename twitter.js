	var ajax = new XMLHttpRequest();
	var tag;
	
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
				manageTwitter(ajax.responseText);
			}
	}
	
	/*---------------------------
	--	 Main Program Loop     -- 
	----------------------------*/
	function manageTwitter(data){
		var eq = JSON.parse(data);
				
		var date = new Date();
		var start = new Date(eq.from);
		var end = new Date(eq.until);
		
		localStorage["pso2_msg"] = tag + " " + start.toLocaleDateString() + " " + start.getHours() + ":";
		if(start.getMinutes() < 10){
			localStorage["pso2_msg"] += "0";
		}
		localStorage["pso2_msg"] += start.getMinutes() + "~" + end.getHours() + ":";
		if(end.getMinutes() < 10){
			localStorage["pso2_msg"] += "0";
		}
		localStorage["pso2_msg"] += end.getMinutes() + "<br>";
		
		var status;
		var timeout = 200000;
		if(date < start){
			status = 1;
			timeout = start - date + 5;
		}else if(date >= start && date <= end){
			status = 2;
			timeout = end - date + 5;
		}else{
			status = 0;
		}
		if(status && localStorage["pso2_note"] == 1){
			var notification = webkitNotifications.createNotification(eq.img,	'EQ Warning', eq.text);
			notification.show();
			setTimeout(function(){notification.cancel();},3500);
		}

		localStorage["pso2_img"] = eq.img;
		localStorage["pso2_msg"] += eq.text;
		
		chrome.browserAction.setIcon({path: "images/" + status + ".png"});
		setTimeout(sendRequest, timeout);
	}
	
	/*---------------------------
	--  Twitter ajax request   -- 
	----------------------------*/
	function sendRequest(){
		tag = localStorage["pso2_ship"];
		if(tag === undefined){
			tag = "Ship01";
		}
		var url  = "http://arks-layer.com/twitter/getEQ.php?ship="+tag;
		ajax.open("GET", url, false);
		ajax.send();
	}
	
	sendRequest();
