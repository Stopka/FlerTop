var data={
	cache:{
		response:[null,null],
		updated:[new Date(0),new Date(0)],
		update:function(slot,new_response){
			this.response[slot]=new_response
			this.updated[slot]=new Date();
		},
		isFresh:function(slot,time){
			return (new Date().getTime()-this.updated[slot].getTime())<(time*1000);
		},
		clear:function(){
			this.updated=[new Date(0),new Date(0)];
		}
	},
	getItemsGrid:function(params){
		if(params===null){
			return null;
		}
		if(params[0]==1 && this.cache.isFresh(0,20)){
			return this.cache.response[0];
		}
		response=http.request("http://www.fler.cz/aplikace/new1/zbozi/editace/list/gridsource.php",params[1]);
		if(params[0]==1){
			this.cache.update(0,response);
		}
		return response;
	},
	getMyGoods:function(params){
		if(params===null){
			return null;
		}
		if(params[0] && this.cache.isFresh(1,20)){
			return this.cache.response[1];
		}
		response=http.request("http://www.fler.cz/moje-zbozi?"+params[1]);
		if(params[0]){
			this.cache.update(1,response);
		}
		return response;
	},
	clearCache:function(){
		this.cache.clear();
	},
	parameter:{
		goods:function(page,sid){
			if(sid===null){
				return null;
			}
			return [page,"page="+page+"&type=visible&usercat=&fulltext=&sort=add&_sid="+sid[0]+"&_uid="+sid[1]+"&_checksum="+sid[2]+"&_dummy="+new Date().getTime()];
		},
		top:function(id){
			return [false,"id="+id+"&a=top"];
		},
		sid:function(){
			return [true,""];
		}
	}
};