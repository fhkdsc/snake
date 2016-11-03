var common={
	width:20,//游戏区域水平方向划分多少个小方格
	height:20,//游戏区域垂直方向划分多少个小方格
	box:15,//每个小方格的宽高
	speed:300,//控制贪吃蛇的速度
	timer:null,//计数器
	snake:null,//蛇对象
	food:null,//食物对象
	$out:$('#out')//游戏区域
}
//创建蛇对象
function Snake(){
	this.$head=null;//蛇头
	this.tails=[]; //蛇尾
	this.dir='right';//起始运动方向
	this.pos={x:0,y:0};//坐标
}

Snake.prototype={
	//创建方法
	create:function(){
		this.$head=$('<div id="snakehead"></div>');
		this.$head.css({
			width:common.box,
			height:common.box,
			top:this.pos.y,
			left:this.pos.x,

		})
		common.$out.append(this.$head)
	},
	//蛇吃食物
	eat:function(){
		this.addtail();
		common.food.updata();
	},
	//蛇头移动
	move:function(){
		var pos={x:this.pos.x,y:this.pos.y};
		switch(this.dir){
			case 'up':this.pos.y-=common.box;break;
			case 'down':this.pos.y+=common.box;break;
			case 'left':this.pos.x-=common.box;break;
			case 'right':this.pos.x+=common.box;break;
		}
		this.$head.css({
			top:this.pos.y,
			left:this.pos.x,
		})
		this.coil();
		this.tailmove(pos);
	},
	//添加蛇尾
	addtail:function(){
		var tail=$('<div class="snake"></div>');
		this.tails.push(tail);
		tail.css({
			width:common.box,
			height:common.box,
			// top:this.pos.y,
			// left:this.pos.x,
		})
		common.$out.append(tail);
	},
	//蛇尾移动
	tailmove:function(pos){
		if(this.tails.length){
			var las=this.tails.length-1;
			this.tails[las].css({
				left:pos.x,
				top:pos.y
			})
			this.tails.unshift(this.tails.pop())
		};
	},
	//碰撞监听
	coil:function(){
		if(this.pos.x<0 || this.pos.y<0 || this.pos.x>(common.width-1)*common.box||this.pos.y>(common.height-1)*common.box){
			this.over();
		};//这个是碰到边缘时的判断
		if(this.pos.x == common.food.pos.x && this.pos.y == common.food.pos.y){
			this.eat();//碰到食物食物消失
		};
		if(this.tails.length){
			for(var i=0;i<this.tails.length;i++){
				if(parseInt(this.tails[i].css('left'))==this.pos.x&&parseInt(this.tails[i].css('top'))==this.pos.y){
					this.over()
				}
			};
		};

	},
	//游戏结束
	over:function(){
		clearInterval(common.timer)
		alert('Game over!');
	}
}

//创建食物对象 不同的东西加到构造函数里
function Food(){//构造函数
	//属性  每个对象都不一样
	this.$el=null;//食物对象
	this.pos={x:0,y:0};//坐标
}

	//生成食物
	//方法  ：所有对象都一样
	//相同的东西都加到方法里
Food.prototype={
	create:function(){
		this.$el=$('<div id="food"></div>');
		this.createpos();
		this.$el.css({
			width:common.box,
			height:common.box,
			top:this.pos.y,
			left:this.pos.x,
		})
		common.$out.append(this.$el);
	},
	//更新食物坐标
	updata:function(){
		this.createpos();
		this.$el.css({
			top:this.pos.y,
			left:this.pos.x
		})
	},
	//随机生成食物坐标创建
	createpos:function(){
		var x=Math.floor(Math.random()*common.width)*common.box;
		var y=Math.floor(Math.random()*common.height)*common.box;
		this.pos={x:x,y:y};
	}
}


