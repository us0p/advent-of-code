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

struct Position receiveInstruction(char instruction) {
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

int main(void) {
  struct HashMap *santaMap = createHashMap();
  struct Position santaPosition = {0, 0};
  char *startingKey = produceKey(santaPosition);
  struct Node *rootNode = createNode(startingKey);
  size_t keyIntRepresentation = stringToInt(startingKey);
  size_t rootHash = hash_function(keyIntRepresentation);
  hashMapSet(santaMap, rootHash, rootNode);

  FILE *f = fopen("input.txt", "r");
  for (char instruction = fgetc(f); instruction != EOF;
       instruction = fgetc(f)) {
    struct Position deltaPosition = receiveInstruction(instruction);
    santaPosition.x += deltaPosition.x;
    santaPosition.y += deltaPosition.y;
    char *key = produceKey(santaPosition);
    size_t keyToInt = stringToInt(key);
    size_t hash = hash_function(keyToInt);
    struct Node *house = hashMapGet(santaMap, hash, key);
    if (house)
      continue;
    struct Node *node = createNode(key);
    hashMapSet(santaMap, hash, node);
  }
  fclose(f);

  printf("The number of unique houses was: %lu\n", santaMap->size);
}
