var http={
	request:function(address,post){
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open("POST",address,false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(post);
		return xmlhttp.responseText;
	}
};