#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct RectangularPrism {
	int h;
	int w;
	int l;
};

struct RectangularPrism* createPrism() {
	return (struct RectangularPrism*)malloc(sizeof(struct RectangularPrism));
}

void transformBuffer(
	struct RectangularPrism* rp,
	char* buffer,
	int buffPointer
	int iteration
) {
	int number = atoi(buffer);
	switch(iteration) {
		case 0: {
			rp->w = number;
			break;
		}
		case 1: {
			rp->h = number;
			break;
		}
		case 2: {
			rp->l = number;
			break;
		}
	}
	for(int j = 0; j < bufferPointer; j++) {
		buffer[j] = '\0';
	}
}

struct RectangularPrism* parseInstruction(
	char* instruction,
	int instructionLen
) {
	struct RectangularPrism* rp = createPrism();
	char* buffer = malloc(sizeof(char) * 3);
	int bufferPointer = 0;
	int iteration = 0;
	for(int i = 0; i < instructionLen; i++) {
		if (instruction[i] == 'x') {
			transformBuffer(
				rp,
				buffer,
				bufferPointer,
				iteration
			);
			bufferPointer = 0;
			iteration++;
			continue;
		}
		buffer[bufferPointer++] = instruction[i];
	}
	transformBuffer(
		rp,
		buffer,
		bufferPointer,
		iteration
	)
	return rp;
}

int main(void) {
	struct RectangularPrism* rp = parseInstruction("3x11x24", 7);

	printf("w: %d, h: %d, l: %d\n", rp->w, rp->h, rp->l);
}
