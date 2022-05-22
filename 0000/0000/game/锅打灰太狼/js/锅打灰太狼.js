var imgs = document.getElementsByTagName("img");
var score = document.getElementById("score");
var playGame = document.getElementById("playGame");
var play = document.getElementById("play");
var over = document.getElementById("over");
var reboot = document.getElementById("reboot");
var sco = document.getElementById("sco");
var retime = document.getElementById("time");

var oleft = 63;
var scores = 0;
var randoms;
var rand;
var randType;
var newTime;
var second;
var ti;

playGame.onclick = function(){
	play.style.display = "none";
	ti = setInterval(function(){
		orz();
		j ++;
	},2000);
}

function orz(){
	date();

	randoms = parseInt(Math.random() * (8 - 0 + 1) + 0);
	rand = parseInt(Math.random() * (100 - 0 + 1) + 0);
	if(rand < 20){
		randType = "x";
	}else{
		randType = "h";
	}

	imgs[randoms].index = 0;
	imgs[randoms].upTimer = setInterval(function(obj){
		obj.style.display = "block";
		obj.index ++;
		obj.src = "../source/" + randType + obj.index + ".png";
		
		if(obj.index >= 5){
			clearInterval(obj.upTimer);
			obj = imgs[randoms];
			obj.downFn();
		}
	},150,imgs[randoms]);

	imgs[randoms].downFn = function(){
		this.downTimer = setInterval(function(obj){
			obj.index --;
			if(obj.index <= 0){
				clearInterval(obj.downTimer);
				obj.style.display = "none";
			}
			obj.src = "../source/" + randType + obj.index + ".png";
		},150,this);
	}

	imgs[randoms].onclick = function(){
		date();
		clearInterval(this.upTimer);
		clearInterval(this.downTimer);
		clearInterval(this.zyTimer);
		clearInterval(ti);
		ti = setInterval(function(){
			orz();
			j ++;
		},2000);

		

		stop();

		this.index = 5;
		imgs[randoms].zyTimer = setInterval(function(obj){
			obj.style.display = "block";
			obj.index ++;
			obj.src = "../source/" + randType + obj.index + ".png";
			if(obj.index >= 9){
				clearInterval(obj.zyTimer);
				obj.style.display = "none";
				
				if(randType == "h"){
					scores += 10;
					score.innerHTML = scores;
				}else{
					scores -= 10;
					score.innerHTML = scores;
				}
				orz();
			}
		},150,imgs[randoms]);	
	}

	stop();
}

var time = 45;
var j = 0;
newTime = new Date();
seconds = newTime.getSeconds();

function date(){
	newTime = new Date();
	second = newTime.getSeconds();
	
	
	if(seconds == second + 2){
		over.style.display = "block";
		sco.innerHTML = scores;
	}

	if(seconds == second + 2){
		stop();
	}
}

function stop(){
	if(j >= time){
		clearInterval(ti);
		return;
	}else if(seconds == second + 2){
		clearInterval(ti);
		return;
	}
}










