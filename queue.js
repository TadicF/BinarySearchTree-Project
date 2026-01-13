export class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.items[this.tail] = value;
    this.tail++;
  }

  dequeue() {
    if(this.isEmpty()) return null;
    const value = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return value;
  }

  isEmpty() {
    if(this.head === this.tail) {
      return true;
    }
    return false;
  }

  peek() {
    return this.items[this.head]
  }
}