#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define STANDARD_HASH_SIZE 100000

struct Node {
  char *key;
  struct Node *next;
};

struct HashMap {
  size_t size;
  struct Node **map;
};

struct Position {
  int x;
  int y;
};

struct HashMap *createHashMap(void) {
  struct HashMap *hm = malloc(sizeof(struct HashMap));
  hm->size = 0;
  hm->map = malloc(sizeof(struct Node *) * STANDARD_HASH_SIZE);
  return hm;
}

size_t stringToInt(char *str) {
  size_t len = strlen(str);
  size_t value = 0;
  for (int i = 0; i < len; i++) {
    value += str[i];
  }
  return value;
}

size_t hash_function(size_t value) { return value % STANDARD_HASH_SIZE; }

void hashMapSet(struct HashMap *hashMap, size_t hash, struct Node *node) {
  struct Node *hashBucket = hashMap->map[hash];
  node->next = hashBucket;
  hashMap->map[hash] = node;
  hashMap->size += 1;
}

struct Node *hashMapGet(struct HashMap *hashMap, size_t hash, char *key) {
  struct Node *hashBucket = hashMap->map[hash];
  while (hashBucket != NULL) {
    if (strcmp(hashBucket->key, key) == 0) {
      return hashBucket;
    }
    hashBucket = hashBucket->next;
  }
  return NULL;
}

struct Node *createNode(char *key) {
  struct Node *node = malloc(sizeof(struct Node));
  node->key = key;
  node->next = NULL;
  return node;
}

char *produceKey(struct Position position) {
  size_t bufferSize = 100;
  char *tmpBuffer = calloc(bufferSize, sizeof(char));
  snprintf(tmpBuffer, bufferSize, "%dx%d", position.x, position.y);
  return tmpBuffer;
}

struct Position positionDelta(char instruction) {
  struct Position p = {0, 0};

  switch (instruction) {
  case '^': {
    p.y = 1;
    return p;
  }
  case '>': {
    p.x = 1;
    return p;
  }
  case 'v': {
    p.y = -1;
    return p;
  }
  case '<': {
    p.x = -1;
    return p;
  }
  default: {
    return p;
  }
  }
}

void processInstruction(struct HashMap *hm, struct Position *p,
                        char instruction) {
  struct Position deltaPosition = positionDelta(instruction);
  p->x += deltaPosition.x;
  p->y += deltaPosition.y;
  char *key = produceKey(*p);
  size_t keyToInt = stringToInt(key);
  size_t hash = hash_function(keyToInt);
  struct Node *house = hashMapGet(hm, hash, key);
  if (house)
    return;
  struct Node *node = createNode(key);
  hashMapSet(hm, hash, node);
}

void processInstructionWithBot(size_t *round, struct HashMap *hm,
                               struct HashMap *hmb, struct Position *p,
                               struct Position *pb, char instruction) {
  struct Position deltaPosition = positionDelta(instruction);
  if (*round % 2 == 0) {
    p->x += deltaPosition.x;
    p->y += deltaPosition.y;
    char *key = produceKey(*p);
    size_t keyToInt = stringToInt(key);
    size_t hash = hash_function(keyToInt);
    struct Node *houseSanta = hashMapGet(hm, hash, key);
    struct Node *houseSantaBot = hashMapGet(hmb, hash, key);
    if (!houseSanta && !houseSantaBot) {
      struct Node *node = createNode(key);
      hashMapSet(hm, hash, node);
    }
  } else {
    pb->x += deltaPosition.x;
    pb->y += deltaPosition.y;
    char *key = produceKey(*pb);
    size_t keyToInt = stringToInt(key);
    size_t hash = hash_function(keyToInt);
    struct Node *houseSanta = hashMapGet(hm, hash, key);
    struct Node *houseSantaBot = hashMapGet(hmb, hash, key);
    if (!houseSanta && !houseSantaBot) {
      struct Node *node = createNode(key);
      hashMapSet(hmb, hash, node);
    }
  }
  *round += 1;
}

int main(void) {
  struct HashMap *santaMap = createHashMap();
  struct Position santaPosition = {0, 0};
  processInstruction(santaMap, &santaPosition, '\0');

  struct HashMap *santaMap2 = createHashMap();
  struct Position santaPosition2 = {0, 0};
  struct HashMap *santaBotMap = createHashMap();
  struct Position santaBotPosition = {0, 0};
  processInstruction(santaMap2, &santaPosition2, '\0');
  processInstruction(santaBotMap, &santaBotPosition, '\0');
  size_t round = 0;

  FILE *f = fopen("input.txt", "r");
  for (char instruction = fgetc(f); instruction != EOF;
       instruction = fgetc(f)) {
    processInstruction(santaMap, &santaPosition, instruction);
    processInstructionWithBot(&round, santaMap2, santaBotMap, &santaPosition2,
                              &santaBotPosition, instruction);
  }
  fclose(f);

  printf("The number of unique houses was: %lu\n", santaMap->size);
  printf("The number of unique houses with bot was: %lu\n",
         santaMap2->size + santaBotMap->size - 1);
}
