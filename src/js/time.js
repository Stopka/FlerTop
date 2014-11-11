var time={
	time:null,
	isReady:function(){
		if(this.time===null){
			return false;
		}
		return true;
	},
	leadZeros:function(number){
		if(number<10){
			return "0"+number;
		}
		return number;
	},
	getDateString:function(){
		date=new Date(this.time);
		ret="";
		ret+=this.leadZeros(date.getDate());
		ret+=". ";
		ret+=this.leadZeros(date.getMonth()+1);
		ret+=". ";
		ret+=date.getFullYear();
		return ret;
	},
	getTimeString:function(){
		date=new Date(this.time);
		ret="";
		ret+=this.leadZeros(date.getHours());
		ret+=":";
		ret+=this.leadZeros(date.getMinutes());
		return ret;
	},
	getLeftString:function(labels){
		l=this.getLeftTime();
		if(l===null){
			return " ";
		}
		if(l[0]>0){
			return l[0]+labels[3];
		}
		if(l[1]>0){
			return l[1]+labels[2];
		}
		if(l[2]>0){
			return l[2]+labels[1];
		}
		return l[3]+labels[0];
	},
	set:function(time){
		if(time===null){
			this.time=null;
			return;
		}
		this.time=(new Date().getTime())+(new Date("January 1, 1970 "+time).getTime()+3660000);
	},
	getLeftTime:function(){ 
		timeLeft=this.getLeftMilsec();
		if(timeLeft<0){
			return null;
		}
		e_daysLeft = timeLeft /(24 * 60 * 60 * 1000); 
		daysLeft = Math.floor(e_daysLeft); 
		e_hrsLeft = (e_daysLeft - daysLeft)*24; 
		hrsLeft = Math.floor(e_hrsLeft); 
		minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60); 
		hrsLeft = hrsLeft; 
		e_minsLeft = (e_hrsLeft - hrsLeft)*60; 
		secLeft = Math.floor((e_minsLeft - minsLeft)*60); 
		return [daysLeft,hrsLeft,minsLeft,secLeft];
	},
	getLeftMilsec:function(){
		return (new Date(this.time).getTime())-( new Date().getTime());
	},
	isAfter:function(){
		if(this.getLeftMilsec()<=0){
			return true;
		}
		return false;
	}
};
