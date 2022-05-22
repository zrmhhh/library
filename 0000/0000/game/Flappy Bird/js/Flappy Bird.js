//地面
var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var x = 0;

setInterval(function(){
	x ++;
	slider1.style.left = - x + "px";
	slider2.style.left = - x + 343 + "px";
	if(x == 343){
		x = 0;
	}
},10)

//障碍物
var pipe = document.querySelector("#pipe");
var pipes = document.querySelectorAll("#pipe ul");
var bol = true;
var h;
var pipeTime;
//循环上下障碍物的高度
function rand(max,min){
	return parseInt(Math.random() * (max - min + 1) + min);
}
//创建障碍物
for(var i = 0; i < pipes.length; i ++){
	for(var j = 0; j < 2; j ++){
		if(bol){
			h = rand(200,50);
			bol = false;
		}else{
			h = 480 - h - 200;
			bol = true;
		}
		var newLi = document.createElement("li");
		newLi.style.height = h + "px";
		pipes[i].appendChild(newLi);
	}
}
//障碍物主体
var score = 0;
var scores = document.getElementById("score");
var yz = document.getElementById("yz");
var fs = document.getElementById("fs");
function pip(){
	pipeTime = setInterval(function(){
		for(var i = 0; i < pipes.length; i ++){
			//创建新ul
			pipes = document.querySelectorAll("#pipe ul");
			pipes[i].style.left = pipes[i].offsetLeft - 1 + "px";
			//得分
			if(pipes[0].offsetLeft == 0){
				score ++;
				scores.innerHTML = score / 3;
			}
			if(pipes[0].offsetLeft <= - 62){
				//创建
				var newUl = document.createElement("ul");
				newUl.style.left = "453px";
				pipe.removeChild(pipes[0]);
				for(var j = 0; j < 2; j ++){
					var newLi = document.createElement("li");
					if(bol){
						h = rand(200,50);
						bol = false;
					}else{
						h = 423 - h - 150;
						bol = true;
					}
					newLi.style.height = h + "px";
					newUl.appendChild(newLi);
				}
				pipe.appendChild(newUl);
			}
			//碰撞
			if(pipes[0].offsetLeft <= 90 && pipes[0].offsetLeft >= 28){
				var firstC = pipes[0].firstElementChild;
				if(bird.offsetTop <= firstC.offsetHeight){
					clearInterval(pipeTime);
					clearInterval(down_bird);
					clearInterval(up_bird);
					clearInterval(play);
					yz.style.display = "block";
					fs.innerHTML = score / 3;
					gameover.play();
				}
				if(bird.offsetTop >= firstC.offsetHeight + 120){
					clearInterval(pipeTime);
					clearInterval(down_bird);
					clearInterval(up_bird);
					clearInterval(play);
					yz.style.display = "block";
					fs.innerHTML = score / 3;
					gameover.play();
				}
			}
			if(bird.offsetTop >= 385){
				clearInterval(pipeTime);
				clearInterval(down_bird);
				clearInterval(up_bird);
				clearInterval(play);	
				yz.style.display = "block";
				fs.innerHTML = score / 3;
				gameover.play();
			}
			//碰撞结束
		}
	},10);
}
//碰撞界面

//小鸟正常飞
var bird = document.getElementById("bird");
var y = 0;
var z = 3;
var play = setInterval(function(){
	
	bird.style.top = 250 + z +"px";
	if(z == 3){
		z = - 3;
	}else{
		z = 3;
	}
	
	
	bird.src = "img/bird" + y + ".png";
	if(y == 0){
		y = 1;
	}else{
		y = 0;
	}
},200);

//小鸟点击向上飞
var fly;
var up_bird;
var down_bird;
var start = true;
var ready = document.getElementById("ready");
var speed;
var main = document.getElementById("main");

main.onclick = function(){
	bullet.play();
	if(start){
		pip();
		ready.style.display = "none";
		start = false;
	}
	//清除定时器
	clearInterval(down_bird);
	clearInterval(up_bird);
	clearInterval(play);
	clearInterval(fly);
	
	speed = 10;
	//扇翅膀
	if(speed == 10){
		if(down_bird){
			clearInterval(down_bird);
		}
		up_b();
	}
	//向上下飞
	fly = setInterval(function(){
		bird.style.top = bird.offsetTop - speed + "px";
		speed --;
		//向下飞，扇翅膀
		if(speed == 0){
			clearInterval(up_bird);
			down_b();
		}
		if(bird.offsetTop >= 385){
			clearInterval(fly);
			clearInterval(down_bird);
		}
	},30);
}

//扇翅膀
function down_b(){
	down_bird = setInterval(function(){
			bird.src = "img/down_bird" + y + ".png";
			if(y == 0){
				y = 1;
			}else{
				y = 0;
			}
	},100);
}
function up_b(){
	up_bird = setInterval(function(){
		bird.src = "img/up_bird" + y + ".png";
		if(y == 0){
			y = 1;
		}else{
			y = 0;
		}
	},100);
}
//音乐
var bullet = document.getElementById("bullet");
var bg = document.getElementById("bg");
var gameover = document.getElementById("over");
bg.play();
