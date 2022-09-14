class FirstFitInfiniteHeight {
  width: number;
  nextRowY: number;
  container: object; // defines the origin of the new rectangle, along with its width
  // and height

  constructor(width: number, height: number) {
    this.width = width;
    // this.height = height;
    this.nextRowY = 0;
    this.container = { x: 0, y: 0, width: this.width, nextRowY: this.nextRowY };
  }

  fit(blocks) {
    blocks.sort((a, b) => b.height - a.height || b.width - a.width);
    blocks.map((block) => {
      block.width <= this.container.width
        ? this.placeInCurrentRow(block, this.container)
        : this.placeInNewRow(block, this.container);
    });

    return blocks;
  }

  placeInCurrentRow(block, container) {
    if (container.x == 0 && container.y == 0) {
      this.nextRowY = block.height;
    }
    block.x = container.x;
    block.y = container.y;
    container.x = container.x + block.width;
    container.width = container.width - block.width;
    return block;
  }

  placeInNewRow(block, container) {
    container.y = this.nextRowY;
    this.nextRowY = this.nextRowY + block.height;
    container.width = this.width;
    block.x = 0;
    block.y = container.y;
    container.x = block.width;
    container.width = this.width - block.width;
    return block;
  }
}

export default FirstFitInfiniteHeight;
