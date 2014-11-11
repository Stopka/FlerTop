var server={
	getTimeLeft:function(){
		text=data.getItemsGrid(data.parameter.goods(1,this.getSidList()));
		if(text===null){
			return null;
		}
		timelist=text.match(/\d{2}:\d{2}:\d{2}/g);
		if(timelist===null){
			return null;
		}
		return timelist[0];
	},
	getAllGoods:function(){
		count=this.getPageCount();
		ids=Array();
		for(page=1;page<=count;page++){
			id=this.getGoods(page);
			for(i=0;i<id.length;i++){
				ids[ids.length]=id[i];
			}
		}
		return ids;
	},
	setTop:function(id){
		data.getMyGoods(data.parameter.top(id));
	},
	getPageCount:function(){
		text=data.getItemsGrid(data.parameter.goods(1,this.getSidList()));
		if(text===null){
			return 0;
		}
		count=text.match(/stránka 1\/(\d+) /);
		if(count===null){
			return 0;
		}
		return count[1];
	},
	getGoods:function(page){
		text=data.getItemsGrid(data.parameter.goods(page,this.getSidList()));
		if(text===null){
			return Array();
		}
		idlist=text.match(/moje-zbozi\?id=(\d+)&a=delete/g);
		if(idlist===null){
			return Array();
		}
		for(i=0;i<idlist.length;i++){
			idlist[i]=idlist[i].match(/(\d+)/g)[0];
		}
		return idlist;
	},
	clearCache:function(){
		data.clearCache();
	},
	isReady:function(){
		text=data.getItemsGrid(data.parameter.goods(1,this.getSidList()));
		if(text===null){
			return false;
		}
		top=text.match(/ title="Topovat">/);
		if(top===null){
			return false;
		}
		return true;
	},
	getSidList:function(){
		text=data.getMyGoods(data.parameter.sid());
		if(text===null){
			return null;
		}
		ret=Array();
		temp=Array();
		temp[0]=text.match(/this\.params\._sid = "(\w+)";/);
		temp[1]=text.match(/this\.params\._uid = "(\w+)";/);
		temp[2]=text.match(/this\.params\._checksum  = '(\w+)'/);
		if(temp[0]===null || temp[1]===null || temp[2]===null){
			return null;
		}
		return [temp[0][1],temp[1][1],temp[2][1]];
	}
};
