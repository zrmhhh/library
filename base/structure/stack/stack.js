/**
 * Stack（栈）先进先出
 * 
 * push: 向栈中压入数据
 * pop: 把数据从栈顶取出
 * getTop: 获取栈顶的数据
 */
class Stack {
    constructor (){
        this.element = [];
    }

    push(value){
        this.element.push(value);
    }

    pop(){
        return this.element.pop();
    }

    getTop(){
        if (this.element.length === 0) return undefined;
        return this.element[this.element.length - 1];
    }
}
