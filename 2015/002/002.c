#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

struct RectangularPrism {
  int h;
  int w;
  int l;
};

struct RectangularPrism *createPrism() {
  return (struct RectangularPrism *)malloc(sizeof(struct RectangularPrism));
}

int getSmallestArea(struct RectangularPrism *rp) {
  int area1 = rp->l * rp->w;
  int area2 = rp->w * rp->h;
  int area3 = rp->h * rp->l;

  int minArea1 = area1 <= area2 ? area1 : area2;

  return minArea1 <= area3 ? minArea1 : area3;
}

int getSmallestPerimeter(struct RectangularPrism *rp) {
  int perimeter1 = rp->l * 2 + rp->w * 2;
  int perimeter2 = rp->w * 2 + rp->h * 2;
  int perimeter3 = rp->h * 2 + rp->l * 2;

  int minPerimeter1 = perimeter1 <= perimeter2 ? perimeter1 : perimeter2;

  return minPerimeter1 <= perimeter3 ? minPerimeter1 : perimeter3;
}

int getWrappingPaperDimensions(struct RectangularPrism *rp) {
  int wrappingPaper = 2 * rp->l * rp->w + 2 * rp->w * rp->h + 2 * rp->h * rp->l;
  int slack = getSmallestArea(rp);
  return wrappingPaper + slack;
}

int getRibbonLength(struct RectangularPrism *rp) {
  int presentWrappingRibbon = getSmallestPerimeter(rp);
  int ribbonBow = rp->l * rp->w * rp->h;
  return presentWrappingRibbon + ribbonBow;
}

void transformBuffer(struct RectangularPrism *rp, char *buffer, int buffPointer,
                     int iteration) {
  int number = atoi(buffer);
  switch (iteration) {
  case 0: {
    rp->l = number;
    break;
  }
  case 1: {
    rp->w = number;
    break;
  }
  case 2: {
    rp->h = number;
    break;
  }
  }
  for (int j = 0; j < buffPointer; j++) {
    buffer[j] = '\0';
  }
}

struct RectangularPrism *parseInstruction(char *instruction,
                                          int instructionLen) {
  struct RectangularPrism *rp = createPrism();
  char *buffer = malloc(sizeof(char) * 3);
  int bufferPointer = 0;
  int iteration = 0;
  for (int i = 0; i < instructionLen; i++) {
    if (instruction[i] == 'x') {
      transformBuffer(rp, buffer, bufferPointer, iteration);
      bufferPointer = 0;
      iteration++;
      continue;
    }
    buffer[bufferPointer++] = instruction[i];
  }
  transformBuffer(rp, buffer, bufferPointer, iteration);
  free(buffer);
  return rp;
}

struct RectangularPrism **getPrisms(int *allocated) {
  FILE *f = fopen("input.txt", "r");
  int size = 100;
  struct RectangularPrism **rps =
      malloc(sizeof(struct RectangularPrism *) * size);

  char *line = malloc(sizeof(char) * 8);
  int lineIdx = 0;
  for (char c = fgetc(f); c != EOF; c = fgetc(f)) {
    if (c == '\n') {
      if (*allocated >= size) {
        size *= 2;
        rps = realloc(rps, sizeof(struct RectangularPrism *) * size);
      }
      rps[*allocated] = parseInstruction(line, lineIdx);
      *allocated += 1;
      for (int i = 0; i < lineIdx; i++) {
        line[i] = '\0';
      }
      lineIdx = 0;
      continue;
    }
    line[lineIdx++] = c;
  }
  rps = realloc(rps, sizeof(struct RectangularPrism *) * (*allocated));
  fclose(f);
  free(line);
  return rps;
}

struct TestCase {
  struct RectangularPrism *rp;
  int expected;
};

int main(void) {
  int totalSqrFeet = 0;
  int totalRibbon = 0;
  int allocated = 0;
  struct RectangularPrism **rps = getPrisms(&allocated);
  for (int i = 0; i < allocated; i++) {
    struct RectangularPrism *rp = rps[i];
    totalSqrFeet += getWrappingPaperDimensions(rp);
    totalRibbon += getRibbonLength(rp);
  }
  printf("The total amount of sware feet of wrapping paper needed is: %d\n",
         totalSqrFeet);

  printf("The total amount of ribbon needed is: %d\n", totalRibbon);
}
