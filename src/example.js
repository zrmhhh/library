/**
 * 栈的使用：
 * 括号匹配
 */

let closeStr = '{{[(())]}}';
let openStr = '{{[(())}}';

function stackSymbol(str) {
  let stackArr = [];
  let arr = str.split('');

  arr.forEach(item => {
    if (item === ')' || item === ']' || item === '}') {
      let lasterItem = stackArr[stackArr.length - 1];
      let isTrue = (lasterItem === '(' && item === ')' || lasterItem === '[' && item === ']' || lasterItem === '{' && item === '}');
      if (isTrue) return stackArr.pop();
    }
    stackArr.push(item);
  })
  return stackArr.length === 0;
}

console.log(stackSymbol(openStr));
