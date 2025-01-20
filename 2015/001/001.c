#include <stdio.h>
#include <stdlib.h>

int getDestinationFloor(char *instructions, int instructionsLen) {
  int destinationFloor = 0;
  for (int i = 0; i < instructionsLen; i++) {
    char instruction = instructions[i];
    if (instruction == '(')
      destinationFloor++;
    if (instruction == ')')
      destinationFloor--;
  }
  return destinationFloor;
}

int getStartOfBasementPosition(char *instructions, int instructionsLen) {
  int floor = 0;
  for (int i = 0; i < instructionsLen; i++) {
    if (instructions[i] == '(')
      floor++;
    if (instructions[i] == ')')
      floor--;
    if (floor == -1)
      return i + 1;
  }
  return floor + 1;
}

int main(void) {
  FILE *f = fopen("input.txt", "r");
  int allocated = sizeof(char) * 100;
  char *instructions = malloc(allocated);
  int characterCount = 0;

  for (int c = fgetc(f); c != EOF; c = fgetc(f)) {
    instructions[characterCount] = c;
    characterCount++;
    if (sizeof(char) * characterCount >= allocated) {
      allocated *= 2;
      instructions = realloc(instructions, allocated);
    }
  }

  instructions = realloc(instructions, sizeof(char) * characterCount);
  int destinationFloor = getDestinationFloor(instructions, characterCount);
  int startOfBasement =
      getStartOfBasementPosition(instructions, characterCount);

  fclose(f);

  printf("The destination floor is %d\n", destinationFloor);
  printf("The start of basement is at position: %d\n", startOfBasement);
}
