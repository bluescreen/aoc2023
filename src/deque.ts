class Deque<T> {
  constructor(public deque: T[]) {
    this.deque = deque;
  }

  append(element: T) {
    this.deque.push(element);
  }

  popLeft() {
    if (!this.isEmpty()) {
      return this.deque.shift();
    }
    return null;
  }

  isEmpty() {
    return this.deque.length === 0;
  }

  size() {
    return this.deque.length;
  }
}
export default Deque;
