var Snake=classCompre.create(function(ele,cax,size,initLen,speed){
	this.ele=ele;
	this.cax=cax;
	this.x=size;
	this.y=size;
	this.size=size;
	this.len=initLen;
	this.speed=speed;
	this.map=[];
	this.dir=2;
	this.init();
},{
	init:function(){
		var me=this;
		document.addEventListener('touchstart',function(e){
			me.startX=e.touches[0].clientX;
			me.startY=e.touches[0].clientY;
		});
		document.addEventListener('touchend',function(e){
			me.endX=e.changedTouches[0].clientX;
			me.endY=e.changedTouches[0].clientY;
			var dY=me.endY-me.startY;
			var dX=me.endX-me.startX;
			if(Math.abs(dY)>Math.abs(dX)){
				if(dY>0){
					me.dir=3;
				}else{
					me.dir=1;
				}
			}else{
				if(dX>0){
					me.dir=2;
				}else{
					me.dir=4;
				}

			}
		});
		this.startGame();
	},
	startGame:function(){
		var me=this;
		console.log(me.size);
		this.suiji();
		this.timer=setInterval(function(){
			switch(me.dir){
				case 1:
					me.y-=me.size;
					break;
				case 2:
					me.x+=me.size;
					break;
				case 3:
					me.y+=me.size;
					break;
				case 4:
					me.x-=me.size;
					break;

			}
			me.cax.fillStyle='#f00';
			me.cax.fillRect(me.x,me.y,me.size,me.size);
			me.pz();
			me.map.push({x:me.x,y:me.y});
		},this.speed);
	},
	pz:function(){
		if(this.map.length>=this.len){
			var dele=this.map.shift();
			this.cax.clearRect(dele.x,dele.y,this.size,this.size);
		}
		if(this.food==this.x&&this.food==this.y){
			this.len++;
			this.suiji();
		}
		if(this.x<0||this.x>this.ele.width-this.size||this.y<0||this.y>this.ele.height-this.size){
			alert('sl');
			location.reload();
		}
		for(var i=0;i<this.map.length;i++){
			if(this.map[i].x==this.x&&this.map[i].y==this.y){
				alert('sl111');
				location.reload();
			}
		}

	},
	suiji:function(){
		this.food=Math.floor(Math.random()*this.ele.width/this.size)*this.size;
		this.cax.beginPath();
		this.cax.fillRect(this.food,this.food,this.size,this.size);
		this.cax.closePath();
	}

})