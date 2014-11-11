var button={
	button:null,
	constant: {
		icon:'icons/fler_18.png',
		iconOff:'icons/fler_18-gray.png',
		badgeOff:'rgba(255,255,255,100)',
		badge:'rgba(0,0,255,1)',
		txtOff:'black',
		txt:'white'
	},
	init:function(){
		properties= {
			disabled: false,
			title: "Spouštím aplikaci…",
			icon: this.constant.iconOff,
			onclick: fler.user,
			badge: {
				display: "none",
				backgroundColor:this.constant.badgeOff,
				color: this.constant.txtOff,
				textContent:"…"
			}
		}
		this.button=opera.contexts.toolbar.createItem(properties),
		opera.contexts.toolbar.addItem(this.button);
	},
	changeState:function(state){
		state();
		this.update();
	},
	update:function(){
		this.onUpdate();
	},
	onUpdate:function(){},
	state:{
		loading:function(){
			button.button.badge.display="block";
			button.button.badge.backgroundColor =button.constant.badgeOff;
			button.button.badge.color = button.constant.txtOff;
			button.button.badge.textContent="…";
			button.button.title="Načítám informace…";
			button.onUpdate=function(){};
		},
		waiting:function(){
			button.button.badge.display="block";
			button.button.icon=button.constant.icon;
			button.button.badge.backgroundColor =button.constant.badge;
			button.button.badge.color = button.constant.txt;
			button.button.title="Další topnutí:\n\t"
				+time.getDateString()+" \n\t"
				+time.getTimeString();
			button.onUpdate=function(){
				button.button.badge.textContent=time.getLeftString();
			};
		},
		working:function(){
			button.button.badge.display="block";
			button.button.icon=button.constant.icon;
			button.button.badge.backgroundColor =button.constant.badgeOff;
			button.button.badge.color = button.constant.txtOff;
			button.button.badge.textContent="top";
			button.button.title="Topuju…";
			button.onUpdate=function(){};
		},
		offline:function(){
			button.button.badge.display="none";
			button.button.icon=button.constant.iconOff;
			button.button.title="Nepodařilo se připojit k serveru!";
			button.onUpdate=function(){};
		},
	},
};