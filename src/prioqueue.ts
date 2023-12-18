class PriorityQueue<T> {
  private nodes: { node: T; priority: number }[] = [];

  enqueue(node: T, priority: number): void {
    this.nodes.push({ node, priority });
    this.sort();
  }

  dequeue(): T | undefined {
    return this.nodes.shift()?.node;
  }

  sort(): void {
    this.nodes.sort((a, b) => a.priority - b.priority);
  }

  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  get size() {
    return this.nodes.length;
  }
}
export default PriorityQueue;
