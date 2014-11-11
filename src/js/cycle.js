var cycle={
	onTimer:function(){},
	interval:5,
	stop:function(){
		clearInterval(this.IDInterval);
	},
	start:function(){
		this.IDInterval=setInterval(this.onTimer, 1000*this.interval);
	},
	restart:function(){
		this.stop();
		this.start();
	}
};