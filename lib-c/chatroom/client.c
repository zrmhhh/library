#include <stdlib.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <pthread.h>

#define MAXLINE 100;
void *threadsend(void *vargp);
void *threadrecv(void *vargp);

int main()
{

    int *clientfdp;
    clientfdp = (int *)malloc(sizeof(int));
    *clientfdp = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in serveraddr;
    struct hostent *hp;
    bzero((char *)&serveraddr, sizeof(serveraddr));
    serveraddr.sin_family = AF_INET;
    serveraddr.sin_port = htons(15636);
    serveraddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    if (connect(*clientfdp, (struct sockaddr *)&serveraddr, sizeof(serveraddr)) < 0)
    {
        printf("connect error\n");
        exit(1);
    }
    pthread_t tid1, tid2;
    printf("connected\n");
    while (1)
    {
        pthread_create(&tid1, NULL, threadsend, clientfdp);
        pthread_create(&tid2, NULL, threadrecv, clientfdp);
    }
    return EXIT_SUCCESS;
}
void *threadsend(void *vargp)
{
    //pthread_t tid2;
    int connfd = *((int *)vargp);
    int idata;
    char temp[100];
    while (1)
    {
        //printf("me: \n ");
        fgets(temp, 100, stdin);
        send(connfd, temp, 100, 0);
        printf("          client send OK\n");
    }
    printf("client send\n");
    return NULL;
}
void *threadrecv(void *vargp)
{
    char temp[100];
    int connfd = *((int *)vargp);
    while (1)
    {
        int idata = 0;
        idata = recv(connfd, temp, 100, 0);
        if (idata > 0)
        {
            printf("server :\n%s\n", temp);
        }
    }

    return NULL;
}