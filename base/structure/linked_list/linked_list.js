class Node {
  constructor (value) {
    this.element = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head');
  }

  append(value) {
    let currentNode = this.head;
    while(currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(value);
  }

  findByValue(value){
    let currentNode = this.head.next;
    while (currentNode.element !== value) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

// test
let list = new LinkedList();
list.append('test');
list.append('1111');
list.append('2222');
list.append('bbbb');
console.log(list.findByValue('2222').element);
