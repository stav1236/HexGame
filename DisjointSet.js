class DisjointSet {
  constructor(elems) {
    this.elems = elems;
    this.parent = {};
    this.size = {};
    for (let elem of elems) {
      this.makeSet(elem);
    }
  }

  //O(1)
  makeSet(x) {
    this.parent[x] = x;
    this.size[x] = 1;
  }

  //O(log(n))
  find(x) {
    if (this.parent[x] === x) {
      return x;
    } else {
      this.parent[x] = this.find(this.parent[x]);
      return this.parent[x];
    }
  }

  //O(log(n))
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) {
      return;
    } else if (this.size[rootX] < this.size[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }
  }
}
