class MinHeap<T extends { dist: number }> {
  private heap: T[] = [];

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private siftUp(): void {
    let currentIndex = this.heap.length - 1;

    while (
      currentIndex > 0 &&
      this.heap[currentIndex].dist <
        this.heap[this.getParentIndex(currentIndex)].dist
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  private siftDown(): void {
    let currentIndex = 0;

    while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      let smallerChildIndex = leftChildIndex;

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].dist < this.heap[leftChildIndex].dist
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[currentIndex].dist < this.heap[smallerChildIndex].dist) {
        break;
      }

      this.swap(currentIndex, smallerChildIndex);
      currentIndex = smallerChildIndex;
    }
  }

  heappush(value: T): void {
    this.heap.push(value);
    this.siftUp();
  }

  heappop(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const poppedValue = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.siftDown();
    return poppedValue;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }
}
export default MinHeap;
