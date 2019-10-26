#include <stdio.h>

int removeFile(char filePath[]){
  if (remove(filePath) == 0)
    printf("remove file： %s \n", filePath);
  else
    perror("remove error");
}

int copyFile(char filePath[], char targetPath[]){
  char ch;
  FILE *pfr = fopen(filePath, "r");
  FILE *pfw = fopen(targetPath, "w");

  if (NULL == pfw) {
    perror("open pfw file error");
  }
  if (NULL == pfr) {
    perror("open pfr file error");
  }

  while ((ch = fgetc(pfr) != EOF)) {
    fputc(ch, pfw);
  }

  fclose(pfr);
  fclose(pfw);
  pfr = NULL;
  pfw = NULL;
  return 0;
}

// int moveFile(char oldPath[], char newPath[]){
//   int rename(*oldPath, *newPath);
// }

int main(){
  char filePath[] = "./out/test";
  char targetPath[] = "./out/test.test";
  copyFile(filePath, targetPath);

  // char filePath[] = "./out/test.json";
  // removeFile(filePath);
}