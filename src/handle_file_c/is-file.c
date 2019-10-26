#include <stdio.h>
#include <dirent.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>

int isFile(char path[]){
    // char const *path = argv[1];
    struct stat s_buf;

    /*获取文件信息，把信息放到s_buf中*/
    stat(path, &s_buf);

    /*判断输入的文件路径是否目录，若是目录，则往下执行，分析目录下的文件*/
    if (S_ISDIR(s_buf.st_mode))
    {
        printf("[%s] it is a dir\n", path);
        struct dirent *filename;
        DIR *dp = opendir(path);

        /*readdir()必须循环调用，要读完整个目录的文件，readdir才会返回NULL
		若未读完，就让他循环*/
        while (filename = readdir(dp))
        {
            /*判断一个文件是目录还是一个普通文件*/
            char file_path[200];
            bzero(file_path, 200);
            strcat(file_path, path);
            strcat(file_path, "/");
            strcat(file_path, filename->d_name);

            /*获取文件信息，把信息放到s_buf中*/
            stat(file_path, &s_buf);

            /*判断是否目录*/
            if (S_ISDIR(s_buf.st_mode))
            {
                printf("[%s] is a dir\n", file_path);
            }

            /*判断是否为普通文件*/
            if (S_ISREG(s_buf.st_mode))
            {
                printf("[%s] is a regular file\n", file_path);
            }
        }
    }

    /*若输入的文件路径是普通文件，则打印并退出程序*/
    else if (S_ISREG(s_buf.st_mode))
    {
        printf("[%s] is a regular file\n", path);
        return 0;
    }

    return 0;
}

int main(int argc, char const *argv[]){
    char path[] = "./out";
    isFile(path);
}