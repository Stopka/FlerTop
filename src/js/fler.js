var fler={
	init:function(){
		try{
			button.init();
			fler.load();
		}catch(e){
			return setTimeout(fler.init,5000);
		}
	},
	load:function(){
		button.changeState(button.state.loading);
		server.clearCache();
		time.set(server.getTimeLeft());
		if(time.isReady()){
			this.wait.init();
			return;
		}
		if(server.isReady()){
			this.top.init();
			return;
		}
		this.offline.init();
	},
	reload:function(){
		cycle.stop();
		fler.load();
	},
	offline:{
		init:function(){
			button.changeState(button.state.offline);
			cycle.onTimer=fler.reload
			cycle.interval=60*5;//5 minut
			cycle.start();
		}
	},
	top:{
		init:function(){
			button.changeState(button.state.working);
			goods=server.getAllGoods();
			server.setTop(this.chooseProduct(goods));
			cycle.onTimer=fler.reload;
			cycle.interval=5;
			cycle.start();
		},
		chooseProduct:function(goods){
			return goods[Math.floor(Math.random() * goods.length)];
		},
	},
	wait:{
		init:function(){
			button.changeState(button.state.waiting);
			cycle.onTimer=this.check;
			fler.wait.correctInterval();
			cycle.start();
		},
		check:function(){
			button.update();
			fler.wait.correctInterval();
			if(time.isAfter()){
				fler.wait.finish()
			}
		},
		correctInterval:function(){
			l=time.getLeftTime();
			if(l==null){
			    cycle.stop();
			    return;
			}
			if(l[0]>1){
				cycle.interval=60*60*24;//den
			}else if(l[1]>1){
				cycle.interval=60*60;//hodina
			}else if(l[2]>0){
				cycle.interval=60;//minuta
			}else{
				cycle.interval=1;//minuta
			}
			cycle.restart();
		},
		finish:function(){
			button.changeState(button.state.working);
			cycle.onTimer=fler.reload;
			cycle.interval=30;//time to top yourself in sec
			cycle.restart();
		}
	},
	user:function(){
		fler.reload();
	}
};

/////////////////////////////////////////////////////////////////
// INIT
/////////////////////////////////////////////////////////////////
fler.init()
