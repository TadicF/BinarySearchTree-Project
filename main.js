import { Tree } from "./binarySearchTree.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function randomArr(num) {
  const MAX = 100;
  let arr = [];

  for(let i = 0; i < num; i++) {
    let random = Math.floor(Math.random() * MAX);
    arr.push(random);
  }

  return arr;
}

// Driver script
const bst = new Tree(randomArr(15));
console.log(`Is tree balanced: ${bst.isBalanced()}`);
console.log(`Level Order:`);
bst.levelOrderForEach(node => console.log(node.data));
console.log(`Inorder:`);
bst.inOrderForEach(node => console.log(node.data));
console.log(`Preorder:`);
bst.preOrderForEach(node => console.log(node.data));
console.log(`Postorder:`);
bst.postOrderForEach(node => console.log(node.data));
bst.insert(141);
bst.insert(193);
bst.insert(231);
bst.insert(115);
bst.insert(182);
console.log(`Is tree balanced: ${bst.isBalanced()}`);
bst.rebalance();
console.log(`Is tree balanced: ${bst.isBalanced()}`);
console.log(`Level Order:`);
bst.levelOrderForEach(node => console.log(node.data));
console.log(`Inorder:`);
bst.inOrderForEach(node => console.log(node.data));
console.log(`Preorder:`);
bst.preOrderForEach(node => console.log(node.data));
console.log(`Postorder:`);
bst.postOrderForEach(node => console.log(node.data));