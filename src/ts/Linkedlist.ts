import { Http2Session } from "http2";

export interface ILinkedList<T> {
  append(value: T): T;
  get(index: number): T;
  remove(value: T): T;
  removeAt(index: number): T;
  size: number;
}

export default class LinkedList<T> implements ILinkedList<T>, Iterator<T> {
  private _head: Node<T>;
  private _size: number = 0;
  private _curIteratorNode: Node<T> = null;

  constructor(...args: T[]) {
    if (!args) {
      this._head = null;
      return;
    }

    for (let arg of args) {
      this.append(arg);
    }
  }

  public append(value: T): T {
    if (!this._head) {
      this._head = this.createNode(value);
      this._size++;
      return this._head.value;
    }

    const lastNode = this.getNodeAt(this.size - 1);
    lastNode.next = this.createNode(value);
    this._size++;
    return value;
  }

  public get(index: number): T {
    return (this.getNodeAt(index) || { value: null }).value;
  }

  public removeAt(index: number): T {
    if (index === 0) {
      const { value } = this._head;
      this._head = null;
      this._size--;
      return value;
    }

    const nodeBeforeTarget = this.getNodeAt(index - 1);

    if (!nodeBeforeTarget) {
      return null;
    }

    const removedValue = (nodeBeforeTarget.next || { value: null }).value;
    
    nodeBeforeTarget.next = (nodeBeforeTarget.next || { next: null }).next;
    this._size--;

    return removedValue;
  }

  public remove(targetValue: T): T {
    if (!this._head) {
      return null;
    }

    if (this._head.value === targetValue) {
      const { value: removedValue } = this._head;
      this._head = null;
      return removedValue;
    }

    let curNode = this._head;
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

  get size() {
    return this._size;
  }

  // Iterator methods
  public next(): IteratorResult<T> {
    const nextNode = (this._curIteratorNode && this._curIteratorNode.next) || null;

    if (!nextNode) {
      return {
        done: true,
        value: null
      }
    }

    this._curIteratorNode = nextNode;
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

    let curNode = this._head;
    for (let i = 0; i < index && curNode; i++, curNode = curNode.next) {}

    return curNode;
  }
}

export type Node<T> = {
  value: T,
  next?: Node<T>
}