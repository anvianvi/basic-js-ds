const { NotImplementedError, ListNode } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    return this.tail;
  }
  findFirst() {
    const out = null;

    let last = this.tail;
    let current = null;

    while (last.next) {
      current = last;
    }

    return current;
  }

  enqueue(value) {
    console.log('----enqueue----');
    
    const node = new ListNode(value);
    console.log(node);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      // this.
  
      // node.next = this.head;
      this.head.next = node;
      this.head = node;

      console.log('----LAST')
      // console.log(this.findFirst());
    }


    console.log('----this.tail----');
    console.log(this.tail);
    console.log(this.head);
  }

  dequeue() {
    // console.log('dequeue');
    const i = 0;


    const x = this.tail;

    this.tail = this.tail.next;
 
    return x.value;


    let last = this.tail;
    let prevToLast = null;

    while (last.next) {
      prevToLast = last;
      last = last.next;
    }

    // console.log(last);
    // console.log(prevToLast);

    prevToLast.next = null;

    return last.value;
  }
}

const queue = new Queue();

queue.enqueue(1); // adds the element to the queue
queue.enqueue(3); // adds the element to the queue
// queue.enqueue(5); // adds the element to the queue
// queue.enqueue(6); // adds the element to the queue
// queue.enqueue(7); // adds the element to the queue
// queue.dequeue();

console.log('!!!!!!!!')
console.log(queue.dequeue());
console.log(queue.getUnderlyingList());

module.exports = {
  Queue
};
