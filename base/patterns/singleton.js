/**
 * 单例模式
 * 一个类只存在一个实例
 */

function Singleton(){
    if (typeof Singleton.instance === 'object') return Singleton.instance;
    Singleton.instance = this;

    // 内容
    this.name = 'singleton';
}

// test
let a = new Singleton();
let b = new Singleton();

a === b; // true

a.name = 'a';
b.name; // a
