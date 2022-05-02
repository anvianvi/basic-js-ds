const { NotImplementedError, ListNode } = require("../extensions/index.js");

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */

class SinglyLinkedList {
  constructor(v) {
    this.head = v;
    this.tail = v;
    this.length = 0;
  }

  pop() {
    if (!this.head) return undefined;
    var current = this.head;
    var newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return undefined;
    var currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  get(index) {
    console.log("get");
    console.log(index);
    // if (index < 0 || index >= this.length) return null;
    var counter = 0;
    var current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }

    console.log(current);
    return current;
  }

  remove(index) {
    var previousNode = this.get(index - 1);
    var removed = previousNode.next;
    previousNode.next = removed.next;
    this.length--;
    return removed;
  }
}

function removeKFromListPre(l, k) {
  // console.log(l.next.next.next);
  // const x = new SinglyLinkedList(l);
  // x.remove(k);
  // return x.head;

  var counter = 0;
  var toRemove = l;
  var notfFound = true;
  var endOfListReached = false;


  if (l.value === k) {
    l = l.next;
  

    return l;
  }

  // throw new Error('olo')


  while (notfFound && !endOfListReached) {
    toRemove = toRemove.next;

    if (!toRemove) {
      endOfListReached = true;
    }

    if (toRemove && toRemove.value === k) {
      notfFound = false;
    }
    
    counter++;
  }

  if (endOfListReached) {
    return null;
  }

  var counter2 = 0;
  var prevBeforeRemove = l;
  while (counter2 !== counter - 1) {
    prevBeforeRemove = prevBeforeRemove.next;
    counter2++;
  }


  prevBeforeRemove.next = toRemove.next;

  let leaf = l;
  while (leaf) {

    leaf = leaf.next;
  }

  return l
}

function removeKFromList(l, k) {

  let x = removeKFromListPre(l, k);
  let out = l;

  while (x) {
    x = removeKFromListPre(x, k);
    out = x || out;
  }

  return out;
}

function convertArrayToList(arr) {
  return arr.reverse().reduce((acc, cur) => {
    if (acc) {
      const node = new ListNode(cur);
      node.next = acc;
      return node;
    }

    return new ListNode(cur);
  }, null);
}

const initial = convertArrayToList([3, 1, 2, 3, 4, 5]);


module.exports = {
  removeKFromList,
};
