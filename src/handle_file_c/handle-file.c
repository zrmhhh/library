#include <stdio.h>

int removeFile(char path[]){
  char filename[80];
  printf("请输入要删除的文件名：");
  scanf("%s", &filename);
  if (remove(filename) == 0)
    printf("成功删除文件： %s \n", filename);
  else
    perror("删除文件报错");
}

bool copyFile(char filePath[], char targetPath[]){
  char ch;
  FILE *pfr = fopen(filePath, "r");
  FILE *pfw = fopen(targetPath, "w");

  if (NULL == pfw) {
    perror("open file %s", &filePath);
  }
  if (NULL == pfr) {
    perror("open file %s", &targetPath);
  }

  while ((ch = fgetc(pfr) != EOF)) {
    fputc(ch, pfw);
  }

  fclose(pfr);
  fclose(pfw);
  pfr = NULL;
  pfw = NULL;
  return true;
}

// int moveFile(char oldPath[], char newPath[]){
//   int rename(*oldPath, *newPath);
// }

int main(){
  // char filePath[80];
  // char targetPath[80];
  // printf("请输入文件名称：");
  // scanf("%s", &filePath);
  // printf("请输入目标名称：");
  // scanf("%s", &filePath);
  // copyFile(filePath, targetPath);
  // removeFile();
}