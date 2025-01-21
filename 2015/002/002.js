const fs = require("node:fs/promises");

class Prism {
  constructor(l, w, h) {
    this.l = l;
    this.w = w;
    this.h = h;
  }

  getSmallestPerimeter() {
    const perimeter1 = 2 * this.l + 2 * this.w;
    const perimeter2 = 2 * this.w + 2 * this.h;
    const perimeter3 = 2 * this.h + 2 * this.l;

    return Math.min(Math.min(perimeter1, perimeter2), perimeter3);
  }

  getSmallestArea() {
    const area1 = this.l * this.w;
    const area2 = this.w * this.h;
    const area3 = this.h * this.l;

    return Math.min(Math.min(area1, area2), area3);
  }

  getWrappingDimensions() {
    const topBottomArea = 2 * this.l * this.w;
    const frontBackArea = 2 * this.w * this.h;
    const leftRightArea = 2 * this.h * this.l;
    const totalSurfaceArea = topBottomArea + frontBackArea + leftRightArea;
    const slack = this.getSmallestArea();
    return totalSurfaceArea + slack;
  }

  getRibbonLength() {
    const ribbonForBow = this.l * this.w * this.h;
    const ribbonWrapPresent = this.getSmallestPerimeter();
    return ribbonForBow + ribbonWrapPresent;
  }
}

async function getPrismsFromInputFile(inputFile) {
  const file = await fs.open(inputFile, "r");
  const prisms = [];
  for await (const line of file.readLines()) {
    const [l, w, h] = line.split("x");
    prisms.push(new Prism(parseInt(l), parseInt(w), parseInt(h)));
  }
  await file.close();
  return prisms;
}

async function runner() {
  let totalWrappingPaper = 0;
  let totalRibbon = 0;
  const prisms = await getPrismsFromInputFile("input.txt");
  for (const prism of prisms) {
    totalWrappingPaper += prism.getWrappingDimensions();
    totalRibbon += prism.getRibbonLength();
  }

  console.log(
    "The total amount of sware feet of wrapping paper needed is:",
    totalWrappingPaper,
  );

  console.log("The total amount of ribbon needed is:", totalRibbon);
}

runner();

module.exports = {
  Prism,
  getPrismsFromInputFile,
};
