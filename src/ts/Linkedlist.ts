export interface ILinkedList<T> {
  append(value: T): T;
  get(index: number): T;
  remove(value: T): T;
  removeAt(index: number): T;
}

export default class LinkedList<T> implements ILinkedList<T>, Iterator<T> {
  private head: Node<T>;
  private size: number = 0;
  private curIteratorNode: Node<T> = null;

  constructor(...args: T[]) {
    if (!args) {
      this.head = null;
      return;
    }

    const [headValue] = args;
    this.head = this.createNode(headValue, null);

    let curNode = this.head;

    for (let i = 1; i < args.length; i++) {
      curNode.next = this.createNode(args[i]);
      curNode = curNode.next;
    }
  }

  public append(value: T): T {
    if (!this.head) {
      this.head = this.createNode(value);
      this.size++;
      return this.head.value;
    }

    const lastNode = this.getNodeAt(this.size - 1);
    lastNode.next = this.createNode(value);
    this.size++;
    return value;
  }

  public get(index: number): T {
    return (this.getNodeAt(index) || { value: null }).value;
  }

  public removeAt(index: number): T {
    if (index === 0) {
      const { value } = this.head;
      this.head = null;
      this.size--;
      return value;
    }

    const nodeBeforeTarget = this.getNodeAt(index - 1);

    if (!nodeBeforeTarget) {
      return null;
    }

    const removedValue = (nodeBeforeTarget.next || { value: null }).value;
    
    nodeBeforeTarget.next = (nodeBeforeTarget.next || { next: null }).next;
    this.size--;

    return removedValue;
  }

  public remove(targetValue: T): T {
    if (!this.head) {
      return null;
    }

    if (this.head.value === targetValue) {
      const { value: removedValue } = this.head;
      this.head = null;
      return removedValue;
    }

    let curNode = this.head;
    while (curNode.next && curNode.value !== targetValue) {
      curNode = curNode.next;
    }

    if (!curNode.next) { // did not find the targetValue
      return null;
    }

    const { value: removedValue } = 
    curNode.next = curNode.next.next;
    return removedValue;
  }

  // Iterator methods
  public next(): IteratorResult<T> {
    const nextNode = (this.curIteratorNode && this.curIteratorNode.next) || null;

    if (!nextNode) {
      return {
        done: true,
        value: null
      }
    }

    this.curIteratorNode = nextNode;
    return {
      done: !!nextNode.next,
      value: nextNode.value
    }
  }

  // PRIVATE FUNCTIONS
  private createNode(value: T, next?: Node<T>): Node<T> {
    return {
      value,
      next
    }
  }
  
  private getNodeAt(index: number) {
    if (this.size === 0 || index >= this.size) {
      return null;
    }

    let curNode = this.head;
    for (let i = 0; i < index && curNode; i++, curNode = curNode.next) {}

    return curNode;
  }
}

export type Node<T> = {
  value: T,
  next?: Node<T>
}