// $(document).swipe({
// 	swipe:function(){
// 		// console.log(direction)
// 		var dir=arguments[1];
// 		console.log(dir)
// 	}
// })


$(function(){
	//游戏区域初始化
	common.$out.width(common.width*common.box);
	common.$out.height(common.height*common.box);

	//实例化蛇对象以及食物对象
	common.snake=new Snake();
	common.snake.create();

	common.food=new Food();
	common.food.create();

	common.timer=setInterval(function(){
		common.snake.move();
	},common.speed)

	$(document).swipe({
		swipe:function(){
			var direction=arguments[1];
			console.log(direction)
			

			var aa=common.snake;
			if(aa.dir=="right"&&direction=="left"||aa.dir=="left"&&direction=="right"){
					return false;
			}
			if(aa.dir=="up"&&direction=="down"||aa.dir=="down"&&direction=="up"){
				return false;
			}
			common.snake.dir=direction;
			common.snake.move();
		}
	})


})