// Sort array
// Keep only values that differ from the previous ones
// Build a balanced BST from the sorted array

import { Node } from "./node.js";
import { Queue } from "./queue.js";

export class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value, root = this.root) {
    if(root === null) { // base case
      return new Node(value);
    }

    else { // recursive step
      if(value < root.data) {
        let node = this.insert(value, root.left); 
        if(node) root.left = node;
      }

      if(value > root.data) {
        let node = this.insert(value, root.right);
        if(node) root.right = node;
      }

      return root;
    }
  }

  deleteItem(value) {
    let curr = this.root; 
    let parent = null;
    let leftChild = false;
    let rightChild = false;

    while(curr.data != value) {
      // Save the reference to the parent of the node we are removing
      parent = curr;

      // Ternary operator to update curr node
      curr = value < curr.data ? curr.left : curr.right;
      if(curr === null) throw new Error('Node does not exists in the BST!');
    }

    // Check if the node we are removing is the root node
    if(curr === this.root) {
      let tempNode = curr.right;
      while(tempNode.left != null) {
        tempNode = tempNode.left;
      }
      if(tempNode.right != null) {
        curr.right.left = tempNode.right;
      }
      tempNode.left = curr.left;
      tempNode.right = curr.right;
      this.root = tempNode;
      return 'Root removed';
    }

    // Determine whether curr is the left or right child of its parent
    if(parent.left === curr) {
      leftChild = true;
    } else {
      rightChild = true;
    }

    // Check if the node has no children | leaf node
    if(curr.left === null && curr.right === null) {
      if(curr.data < parent.data) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } 
    // Check if the node has two or more children
    else if(curr.left != null && curr.right != null) {
      let tempNode = curr.right;
      while(tempNode.left != null) {
        tempNode = tempNode.left;
      }

      if(leftChild) {
        tempNode.left = curr.left;
        parent.left = tempNode;
      }
      if(rightChild) { 
        tempNode.left = curr.left;
        parent.right = tempNode;
      }
    }
    // Check if the node has only one children
    else if(curr.left != null || curr.right != null) {
      let tempNode = null;
      if(curr.left != null) tempNode = curr.left;
      else tempNode = curr.right;
      
      if(leftChild) parent.left = tempNode;
      if(rightChild) parent.right = tempNode;
    }
  }

  find(value) {
    let currNode = this.root;
    while(currNode != null) {
      if(currNode.data === value) {
        return currNode;
      }
      currNode = value < currNode.data ? currNode.left : currNode.right;
    }

    return 'Node with that value was not found.'
  }

  levelOrderForEach(callback) {      
    let queue = new Queue();
    // Enqueue the root node
    queue.enqueue(this.root); 

    while(!queue.isEmpty()) {
      let currNode = queue.dequeue();
      if(!callback) throw new Error('Callback function was not provided!');
      callback(currNode);

      if(currNode.left != null) {
        queue.enqueue(currNode.left);
      }
      if (currNode.right != null) {
        queue.enqueue(currNode.right);
      }
    }
  }

  inOrderForEach(callback, root = this.root) {
    if(root === null) return;
    else {
      // left -> root -> right
      this.inOrderForEach(callback, root.left);
      callback(root);
      this.inOrderForEach(callback, root.right);
    }
  }

  preOrderForEach(callback, root = this.root) {
    if(root === null) return;
    else {
      callback(root);
      this.preOrderForEach(callback, root.left);
      this.preOrderForEach(callback, root.right);
    }
  }

  postOrderForEach(callback, root = this.root) {
    if(root === null) return;
    else {
      this.postOrderForEach(callback, root.left);
      this.postOrderForEach(callback, root.right);
      callback(root);
    }
  }

  height(value, node = this.find(value)) {
   if(node === null) {
    return -1;
   } else {
    let leftChild = this.height(value, node.left) + 1;
    let rightChild = this.height(value, node.right) + 1;

    return leftChild > rightChild ? leftChild : rightChild;
   }
  }

  depth(value) {
    let currNode = this.root;
    let depth = 0; 

    while(currNode != null) {
      if(currNode.data === value) {
        return depth;
      }

      currNode = value > currNode.data ? currNode.right : currNode.left;
      depth++;
    }

    return new Error('Node was not found in the BST.')
  }

  isBalanced() {
    let currNode = this.root;
    let queue = new Queue();

    queue.enqueue(currNode);
    while(!queue.isEmpty()) {
      let node = queue.dequeue();

      let left = node.left ? this.height(node.left.data) : 0;
      let right = node.right ? this.height(node.right.data) : 0;

      if(left > right + 1 || right > left + 1) {
        return false;
      }
      
      if(node.left) queue.enqueue(node.left);
      if(node.right) queue.enqueue(node.right);  
    }

    return true;
  }

  rebalance() {
    let arr = [];
    // Uses closures to collect nodes data
    this.levelOrderForEach(node => arr.push(node.data));
    this.root = buildTree(arr);
  }
}



class Data {
  constructor(node, start, end) {
    this.node = node;
    this.start = start;
    this.end = end;
  }
}

function buildTree(array) { 
  let sortedArr = mergeSort(array);  
  let finalArr = removeDuplicates(sortedArr);

  let length = finalArr.length; 
  let mid = Math.floor((length - 1) / 2);
  let root = new Node(finalArr[mid]); 
  let queue = new Queue();

  queue.enqueue(new Data(root, 0, length - 1)); 
  while(!queue.isEmpty()) {
    let data = queue.dequeue();
    let curr = data.node;
    let start = data.start, end = data.end;
    mid = Math.floor((start + end) / 2);

    if(start < mid) {
      let leftMid = Math.floor((start + mid - 1) / 2)
      let left = new Node(finalArr[leftMid]);
      curr.left = left;
      queue.enqueue(new Data(left, start, mid - 1));
    }

    if(end > mid) {
      let rightMid = Math.floor((mid + 1 + end) / 2);
      let right = new Node(finalArr[rightMid]);
      curr.right = right;
      queue.enqueue(new Data(right, mid + 1, end));
    }
  }

  return root;
}

function mergeSort(arr) {
  if(arr.length <= 1) { // base case
    return arr;
  } else { // recursive step
    let left = mergeSort(arr.slice(0, arr.length / 2)); 
    let right = mergeSort(arr.slice(arr.length / 2)); 

    let i = 0, l = 0, r = 0; 
    while(l < left.length && r < right.length) { 
      if(left[l] < right[r]) {                          
        arr[i] = left[l];
        l++;
      } else {
        arr[i] = right[r];
        r++;
      }
      i++;
    }

    if(l < left.length) {
      while(l < left.length) {
        arr[i] = left[l];
        l++, i++;
      }
    }

    if(r < right.length) {
      while(r < right.length) {
        arr[i] = right[r];
        r++, i++;
      }
    }
    return arr;
  }
}

function removeDuplicates(arr) {
  let finalArr = [];
  finalArr.push(arr[0]);
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] != finalArr[finalArr.length - 1]) {
      finalArr.push(arr[i]);
    }
  }

  return finalArr;
}
