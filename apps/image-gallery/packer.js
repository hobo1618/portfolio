/******************************************************************************

This is a very simple binary tree based bin packing algorithm that is initialized
with a fixed width and height and will fit each block into the first node where
it fits and then split that node into 2 parts (down and right) to track the
remaining whitespace.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  width:       width of target rectangle
  height:      height of target rectangle
  blocks: array of any objects that have .width and .height attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { width: 100, height: 100 },
    { width: 100, height: 100 },
    { width:  80, height:  80 },
    { width:  80, height:  80 },
    etc
    etc
  ];

  var packer = new Packer(500, 500);
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.width, block.height);
    }
  }


******************************************************************************/

const Packer = function(width, height) {
  this.init(width, height);
};

Packer.prototype = {

  init: function(width, height) {
    this.root = { x: 0, y: 0, width: width, height: height };
  },

  fit: function(blocks) {
    var n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      node = this.findNode(this.root, block.width, block.height)
      if (node)
        block.fit = this.splitNode(node, block.width, block.height);
    }
  },

  findNode: function(root, width, height) {
    if (root.used)
      return this.findNode(root.right, width, height) || this.findNode(root.down, width, height);
    else if ((width <= root.width) && (height <= root.height))
      return root;
    else
      return null;
  },

  splitNode: function(node, width, height) {
    node.used = true;
    node.down  = { x: node.x,     y: node.y + height, width: node.width,     height: node.height - height };
    node.right = { x: node.x + width, y: node.y,     width: node.width - width, height: height          };
    return node;
  }

}

var blocks = [
  { width: 500, height: 400 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width:  80, height:  80 },
  { width:  80, height:  80 },
];


export default Packer