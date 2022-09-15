class FirstFitInfiniteHeight {
  width: number;
  height: number;
  root: object; // defines the origin of the new rectangle, along with its width
                // and height

  constructor(width: number, height: number) {
    this.width = width;
    // this.height = height;
    this.height = 0;
    this.root = { x: 0, y: 0, width, height };
  }

  fit(blocks) {
    blocks.sort((a, b) => b.height - a.height || b.width - a.width )
    let node;
    blocks.map((block) => {
      this.root.height = this.root.height + block.height
      node = this.findNode(this.root, block.width, block.height);
      if (node) block.fit = this.splitNode(node, block.width, block.height);
    });
  }

  // recursively searches the tree for a free node.
  findNode(root, width, height) {
    // if the root has been used
    if (root.used) {
      return (
        // these set the new root equal to root.right or root.down and repeats
        this.findNode(root.right, width, height) ||
        this.findNode(root.down, width, height)
      );
    // } else if (width <= root.width) return root;
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

export default FirstFitInfiniteHeight;
