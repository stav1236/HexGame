import { BOARD_SIZE } from "./consts.js";
import { extractNumbersFromString } from "./main.js";

export class DisjointSet {
  constructor(elems) {
    this.parent = {};
    this.size = {};
    this.edges = {};

    for (let elem of elems) {
      this.makeSet(elem);
    }
  }

  //O(1)
  makeSet(x) {
    this.parent[x] = x;
    this.size[x] = 1;
    const [i, j] = extractNumbersFromString(x);
    this.edges[x] = {
      isTop: i == 0,
      isBottom: i == BOARD_SIZE - 1,
      isRight: j == BOARD_SIZE - 1,
      isLeft: j == 0,
    };
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
    }

    const xEdges = this.edges[rootX];
    const yEdges = this.edges[rootY];
    const newEdges = {
      isTop: xEdges.isTop || yEdges.isTop,
      isBottom: xEdges.isBottom || yEdges.isBottom,
      isRight: xEdges.isRight || yEdges.isRight,
      isLeft: xEdges.isLeft || yEdges.isLeft,
    };

    if (this.size[rootX] < this.size[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
      this.edges[rootY] = newEdges;
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
      this.edges[rootX] = newEdges;
    }
  }
}
