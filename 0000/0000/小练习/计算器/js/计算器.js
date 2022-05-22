var show = document.getElementById("show");
var number = document.getElementById("num");
var num = number.getElementsByTagName("div");
var operators = document.getElementById("operators");
var oper = operators.getElementsByTagName("div");
var special = document.getElementById("special");
var spe = special.getElementsByTagName("div");

var num1 = "";
var num2 = "";
var z;
var y;

for(var i = 0; i < num.length; i ++){
	num[i].onclick = function(){
		if(z != "+" && z != "-" && z != "/" && z != "*"){
			Number(num1);
			num1 += this.innerHTML;
			show.innerHTML = num1;
		}

		if(z == "+" || z == "-" || z == "/" || z == "*"){
			Number(num2);
			num2 += this.innerHTML;
			show.innerHTML = num2;
		}

		if(z == "reset"){
			num2 += this.innerHTML;
			show.innerHTML = num2;
		}

		if(show.innerHTML > 999999999999999999){
			show.style.fontSize = "12px";
		}
	}
}

for(var a = 0; a < oper.length-1; a ++){
	oper[a].onclick = function(){
		z = this.innerHTML;
	}
}

oper[4].onclick = function(){
	switch(z){
				case "+":
					show.innerHTML = Number(num1)+Number(num2);
					break;
				case "-":
					show.innerHTML = Number(num1)-Number(num2);
					break;
				case "*":
					show.innerHTML = Number(num1)*Number(num2);
					break;
				case "/":
					show.innerHTML = Number(num1)/Number(num2);
					break;
				default:

			}
	if(show.innerHTML > 999999999999999999){
		show.style.fontSize = "12px";
	}
	z = "reset";
	num1 = show.innerHTML;
	num2 = "";
}