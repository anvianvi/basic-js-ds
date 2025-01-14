const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTreeNode {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = null;
    this.data = key;
  }

  /**
   * @public
   * @param {number|string}
   * @returns {BinarySearchTreeNode}
   */
  setKey(key) {
    this._key = key;
    return this;
  }

  /**
   * @public
   * @return {number|string}
   */
  getKey() {
    return this._key;
  }

  /**
   * @public
   * @param {any} value
   * @returns {BinarySearchTreeNode}
   */
  setValue(value) {
    this._value = value;
    return this;
  }

  /**
   * @public
   * @return {any}
   */
  getValue() {
    return this._value;
  }

  /**
   * @public
   * @param {BinarySearchTreeNode|null} left
   * @returns {BinarySearchTreeNode}
   */
  setLeft(left) {
    if (left && !(left instanceof BinarySearchTreeNode)) {
      throw new Error("setLeft expects a BinarySearchTreeNode or null");
    }

    this._left = left || null;
    return this;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getLeft() {
    return this._left;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasLeft() {
    return this._left instanceof BinarySearchTreeNode;
  }

  /**
   * @public
   * @param {BinarySearchTreeNode|null} right
   * @returns {BinarySearchTreeNode}
   */
  setRight(right) {
    if (right && !(right instanceof BinarySearchTreeNode)) {
      throw new Error("setRight expects a BinarySearchTreeNode or null");
    }

    this._right = right || null;
    return this;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getRight() {
    return this._right;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasRight() {
    return this._right instanceof BinarySearchTreeNode;
  }

  /**
   * @public
   * @param {BinarySearchTreeNode} parent
   * @returns {BinarySearchTreeNode}
   */
  setParent(parent) {
    if (parent && !(parent instanceof BinarySearchTreeNode)) {
      throw new Error("setParent expects a BinarySearchTreeNode or null");
    }

    this._parent = parent || null;
    return this;
  }

  /**
   * @public
   * @return {BinarySearchTreeNode}
   */
  getParent() {
    return this._parent;
  }

  /**
   * @public
   * @return {boolean}
   */
  hasParent() {
    return this._parent instanceof BinarySearchTreeNode;
  }

  /**
   * @public
   * @return {boolean}
   */
  isRoot() {
    return this._parent === null;
  }

  /**
   * @public
   * @return {boolean}
   */
  isLeaf() {
    return !this.hasLeft() && !this.hasRight();
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
    this._count = 0;
  }

  /**
   * Inserts a node with a key/value into the tree
   * @public
   * @param {number|string} key
   * @param {any} value
   * @return {BinarySearchTree}
   */
  add(key, value) {
    const newNode = new BinarySearchTreeNode(key, value);
    const insertRecursive = (current) => {
      if (key < current.getKey()) {
        if (current.hasLeft()) {
          insertRecursive(current.getLeft());
        } else {
          current.setLeft(newNode.setParent(current));
          this._count += 1;
        }
      } else if (key > current.getKey()) {
        if (current.hasRight()) {
          insertRecursive(current.getRight());
        } else {
          current.setRight(newNode.setParent(current));
          this._count += 1;
        }
      } else {
        current.setValue(value);
      }
    };

    if (this._root === null) {
      this._root = newNode;
      this._count += 1;
    } else {
      insertRecursive(this._root);
    }

    return newNode;
  }

  /**
   * Checks if a value exists in the tree by its key
   * @public
   * @param {number|string} key
   * @return {boolean}
   */
  has(key) {
    const hasRecursive = (current) => {
      if (current === null) {
        return false;
      }

      if (key === current.getKey()) {
        return true;
      }

      if (key < current.getKey()) {
        return hasRecursive(current.getLeft());
      }

      return hasRecursive(current.getRight());
    };

    return hasRecursive(this._root);
  }

  /**
   * Finds a node by its key
   * @public
   * @param {number|string} key
   * @return {BinarySearchTreeNode}
   */
  find(key) {
    const findRecursive = (current) => {
      if (current === null) {
        return null;
      }

      if (key === current.getKey()) {
        return current;
      }

      if (key < current.getKey()) {
        return findRecursive(current.getLeft());
      }

      return findRecursive(current.getRight());
    };

    return findRecursive(this._root);
  }

  /**
   * Finds the node with max key (most right) in the tree
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
  max(current = this._root) {
    if (current === null) {
      return null;
    }

    if (current.hasRight()) {
      return this.max(current.getRight());
    }

    return current.data;
  }

  /**
   * Finds the node with min key (most left) in the tree
   * @public
   * @param {BinarySearchTreeNode} [current]
   * @return {BinarySearchTreeNode}
   */
  _min(current = this._root) {
    if (current === null) {
      return null;
    }

    if (current.hasLeft()) {
      return this._min(current.getLeft());
    }

    return current;
  }

  min() {
    return this._min() ? this._min().data : null;
  }

  /**
   * Returns the node with the biggest key less or equal to k
   * @public
   * @param {number|string} k
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  lowerBound(k, includeEqual = true) {
    let lowerBound = null;

    const lowerBoundRecursive = (current) => {
      if (current === null) {
        return lowerBound;
      }

      const currentKey = current.getKey();
      if (currentKey < k || (includeEqual && currentKey === k)) {
        if (lowerBound === null || lowerBound.getKey() <= currentKey) {
          lowerBound = current;
        }
        return lowerBoundRecursive(current.getRight());
      }

      return lowerBoundRecursive(current.getLeft());
    };

    return lowerBoundRecursive(this._root);
  }

  /**
   * delegate to lowerBound
   * @public
   * @param {number|string} k
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  floor(k, includeEqual = true) {
    return this.lowerBound(k, includeEqual);
  }

  /**
   * Returns the node with the smallest key bigger or equal k
   * @public
   * @param {number|string} k
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  upperBound(k, includeEqual = true) {
    let upperBound = null;

    const upperBoundRecursive = (current) => {
      if (current === null) {
        return upperBound;
      }

      const currentKey = current.getKey();
      if (currentKey > k || (includeEqual && currentKey === k)) {
        if (upperBound === null || upperBound.getKey() >= currentKey) {
          upperBound = current;
        }
        return upperBoundRecursive(current.getLeft());
      }

      return upperBoundRecursive(current.getRight());
    };

    return upperBoundRecursive(this._root);
  }

  /**
   * delegate to upperBound
   * @public
   * @param {number|string} k
   * @param {boolean} includeEqual
   * @return {BinarySearchTreeNode|null}
   */
  ceil(k, includeEqual = true) {
    return this.upperBound(k, includeEqual);
  }

  /**
   * Returns the root node
   * @public
   * @return {BinarySearchTreeNode}
   */
  root() {
    return this._root;
  }

  /**
   * Returns the nodes count
   * @public
   * @return {number}
   */
  count() {
    return this._count;
  }

  /**
   * Removes a node by its key
   * @public
   * @param {number|string} key
   * @return {boolean}
   */
  remove(key) {
    const removeRecursively = (k, current) => {
      if (current === null) {
        return false;
      }

      if (k < current.getKey()) {
        return removeRecursively(k, current.getLeft());
      }

      if (k > current.getKey()) {
        return removeRecursively(k, current.getRight());
      }

      // current node is the node to remove

      // case 1: node has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (k < current.getParent().getKey()) {
          current.getParent().setLeft(null);
        } else {
          current.getParent().setRight(null);
        }
        this._count -= 1;
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (k < current.getParent().getKey()) {
          current.getParent().setLeft(current.getLeft());
        } else {
          current.getParent().setRight(current.getLeft());
        }
        current.getLeft().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (k < current.getParent().getKey()) {
          current.getParent().setLeft(current.getRight());
        } else {
          current.getParent().setRight(current.getRight());
        }
        current.getRight().setParent(current.getParent());
        this._count -= 1;
        return true;
      }

      // case 4: node has left and right children
      const minRight = this._min(current.getRight());
      current.setKey(minRight.getKey()).setValue(minRight.getValue());
      return removeRecursively(minRight.getKey(), minRight);
    };

    return removeRecursively(key, this._root);
  }

  /**
   * Traverses the tree in-order (left-node-right)
   * @public
   * @param {function} cb
   */
  traverseInOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error(".traverseInOrder expects a callback function");
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      traverseRecursive(current.getLeft());
      cb(current);
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  /**
   * Traverses the tree pre-order (node-left-right)
   * @public
   * @param {function} cb
   */
  traversePreOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error(".traversePreOrder expects a callback function");
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      cb(current);
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
    };

    traverseRecursive(this._root);
  }

  /**
   * Traverses the tree post-order (left-right-node)
   * @public
   * @param {function} cb
   */
  traversePostOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error(".traversePostOrder expects a callback function");
    }

    const traverseRecursive = (current) => {
      if (current === null) return;
      traverseRecursive(current.getLeft());
      traverseRecursive(current.getRight());
      cb(current);
    };

    traverseRecursive(this._root);
  }

  /**
   * Clears the tree
   * @public
   */
  clear() {
    this._root = null;
    this._count = 0;
  }
}

module.exports = {
  BinarySearchTree,
};
