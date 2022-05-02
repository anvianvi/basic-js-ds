const { NotImplementedError, ListNode } = require("../extensions/index.js");

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
    let last = this.tail;
    let current = null;

    while (last.next) {
      current = last;
    }

    return current;
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.next = node;
      this.head = node;
    }
  }

  dequeue() {
    const i = 0;

    const x = this.tail;

    this.tail = this.tail.next;

    return x.value;
  }
}

module.exports = {
  Queue,
};
