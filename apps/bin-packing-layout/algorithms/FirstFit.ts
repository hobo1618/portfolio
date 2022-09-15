class FirstFit {
  width: number;
  height: number;
  root: object;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.root = { x: 0, y: 0, width, height };
  }

  fit(blocks) {
    let node;
    blocks.sort((a, b) => b.height - a.height || b.width - a.width);
    blocks.map((block) => {
      node = this.findNode(this.root, block.width, block.height);
      if (node) block.fit = this.splitNode(node, block.width, block.height);
    });
    console.log(this.root);
    
  }

  findNode(root, width, height) {
    if (root.used) {
      return (
        this.findNode(root.right, width, height) ||
        this.findNode(root.down, width, height)
      );
    } else if (width <= root.width && height <= root.height) return root;
    else return null;
  }

  splitNode(node, width, height) {
    node.used = true;
    node.down = {
      x: node.x,
      y: node.y + height,
      width: node.width,
      height: node.height - height,
    };
    node.right = {
      x: node.x + width,
      y: node.y,
      width: node.width - width,
      height: height,
    };
    return node;
  }
}

export default FirstFit;
