var time = document.querySelector("#time");
var success = document.querySelector("#success");
var font = document.querySelector("#font");
var explain = document.querySelector("#explain");
var col = document.querySelector("#color");
var color = col.getElementsByTagName("div");
var main2 = document.querySelector("#main2");

var words = ["红","黄","蓝","绿","黑"];
var colors = ["red","yellow","blue","green","black"];
//循环
function rand(){
	var index = parseInt(Math.random()*(5));
	return index;
}
//颜色
function zy1(){
	var c = 0;
	var arr = [];
	for(var a = 0; arr.length < 5; a ++){
		var r = rand();
		for(var b = 0; b < arr.length; b ++){
			if(arr[b] == r){
				break;
			}
		}
		if(b == arr.length){
			color[c].style.color = colors[r];
			c ++;
			arr.push(r);
		}
	}
}
//文字
function zy2(){
	var e = 0;
	var arr = [];
	for(var d = 0; d < 9999; d ++){
		var r = rand();
		for(var f = 0; f < arr.length; f ++){
			if(arr[f] == r){
				break;
			}
		}
		if(f == arr.length){
			color[e].innerHTML = words[r];
			e ++;
			arr.push(r);
		}
	}
	var z = rand();
	font.innerHTML = words[z];
}
//行为
zy1();
zy2();
var t = 20;
var y = rand();
var timer = null;
var suc = 0;
font.style.color = colors[y];
for(var i = 0; i < color.length; i ++){

	color[i].onclick = function(){
		clearInterval(timer);
		var str = "红黄蓝绿黑";
		var judge = str.indexOf(this.innerHTML);


		if(judge == y){
			explain.style.opacity = "0";
			success.innerHTML = ++ suc;
			zy1();
			zy2();
			timer = setInterval(function(){
				t --;
				time.innerHTML = t;
				if(time.innerHTML == 0){
					clearInterval(timer);
					main2.style.display = "block";
				}
			},1000);
			
		}else{
			alert("错啦");
			zy1();
			zy2();
		}

		y = rand();
		font.style.color = colors[y];
		
	}
}



