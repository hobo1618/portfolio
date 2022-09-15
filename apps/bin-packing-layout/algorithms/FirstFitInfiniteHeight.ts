class FFDInfiniteHeight {
  width: number;
  root: object;
  height: number;

  constructor(width: number) {
    this.height = 0;
    this.root = { x: 0, y: 0, width, height: 0 };
  }

  fit(blocks: []) {
    let node;
    blocks.sort((a, b) => b.height - a.height || b.width - a.width);
    blocks.map((block: object) => {
      // if we find a good root, then we set node = root
      // i.e. this is where we'll place our block

      // in the second iteration, this means that
      // node = origin-root.right effectively

      // when both node.down and node.right return null,
      // then node = null and we
      // continue with the next block, reinitializing the
      // search from this.root
      node = this.findNode(this.root, block.width, block.height);
      // assuming node != null, we process the block placement
      // by calling splitNode and assigning a "fit" property
      // to the block, which tells us where it should be placed in
      // the bin
      if (node) block.fit = this.splitNode(node, block.width, block.height);
    });
  }

  findNode(root: object, blockWidth: number, blockHeight: number) {
    if (root.used)
      return (
        // if root.right is undefined or root.down is undefined,

        // First we call findNode on root.right.
        // Let's say root.right.used is undefined
        // then we skip to the else if statement
        // where, say, we determine the block is too
        // wide to fit in root.right.
        this.findNode(root.right, blockWidth, blockHeight) ||
        // this.findNode(root.right)
        // therefore returns null and we pass to
        // this line of code where we test the same idea.
        this.findNode(root.down, blockWidth, blockHeight)
      );
    // if the root is unused and the block fits,
    // set node = root
    // on the first iteration, this means we place
    // the first block at the origin
    // on the second iteration, this means we place the second block
    // to the right, say, and then set
    // node = root, which is equivalent to node = root.right
    else if (blockWidth <= root.width && blockHeight <= root.height)
      return root;
    // if the block is unused but doesn't fit in the root, set node = null
    else if (blockWidth <= root.width && root.x == 0) {
      this.height = this.height + blockHeight;
      root.height = blockHeight;
      return root;
    }
    else return null
  }

  splitNode(node: object, width: number, height: number) {
    /* 
        this function:
        
        1. adds properties to the root: used, down, right
        By adding a property to the root, we are creating the
        tree structure that we will search recursively. On the
        second iteration, the function adds properties to root.right,
        creating root.right.right and root.right.down objects.
        etc.

        2. returns "node", which has this structure:
          {
            x: number,
            y: number,
            width: number,
            height: number
          }

        This object is assigned to block.fit
          block.fit = node
    */
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

export default FFDInfiniteHeight;
