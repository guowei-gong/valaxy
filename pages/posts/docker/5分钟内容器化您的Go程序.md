---
title: 多阶段构建优化您的 Go 程序镜像
date: 2022-08-19 14:34:56
tags: 
    - Go
    - Docker
categories: 云原生
---
使用多阶段构建的方式创建紧凑的 Docker 镜像，探究如何显著缩小 Docker 镜像的大小。

多阶段构建方式，是在 `Dockerfile` 中使用多个 `FROM` 指令，每个 `FORM` 指令都是一个新的构建阶段，并且可以方便地复制之前阶段的构件。让我们来看一个简单的 `Go` 程序。代码如下。点击[此处](https://go.dev/play/p/I8Fk3DHcPcP)您可以获取代码。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fec055b0ee544f1198ae23036fb74ec2~tplv-k3u1fbpfcp-watermark.image?)

让我们来为它构建 `Docker` 镜像，`Dockerfile` 文件内容如下。

```Dockerfile
FROM golang:1.19-alpine
WORKDIR /build
COPY go.mod .
RUN go mod download
COPY . .
RUN go build -o /main main.go
ENTRYPOINT ["/main"]
```

完成后，我们得到了一个 359 MB大小的镜像。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bba86afc8eb5404ca7ca15b0e5bda2ea~tplv-k3u1fbpfcp-watermark.image?)

现在让我们构建相同的程序，但使用**多阶段构建**：
```Dockerfile
FROM golang:1.19-alpine as builder
WORKDIR /build
COPY go.mod .
RUN go mod download
COPY . .
RUN go build -o /main main.go

FROM alpine:3
COPY --from=builder main /bin/main
ENTRYPOINT ["/bin/main"]
```

完成后，我们居然得到了一个只有 12 MB 大小的 `Docker` 镜像。还不错，我们把镜像大小减少了约 30 倍。我们是如何完成的呢？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0bc87e9888946cea329fb64671189a9~tplv-k3u1fbpfcp-watermark.image?)

在第一种情况，使用单阶段构建，`Docker` 镜像中包含了以下内容。
- golang:1.19-alpine -- 345.93 MB
- source size -- 11.1 KB
- 编译后的应用程序大小 -- 6.5 MB

在第二种情况，我们先编译并构建了应用程序，然后将已经编译的结果复制到最后一个阶段。
- alpine size:3 -- 5.54 MB
- 编译后的应用程序大小 -- 6.5 MB

**是否可以再减小 Docker 镜像的大小？**

答案是：能。但为此我们需要使用 [`Docker Scratch`](https://hub.docker.com/_/scratch) -- 它是一个 0 MB 的 `Docker` 镜像。
```Dockerfile
FROM golang:1.19-alpine as builder

WORKDIR /build
COPY go.mod .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /main main.go

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder main /bin/main
ENTRYPOINT ["/bin/main"]
```

完成后，我们的镜像大小为 6.66 MB。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26cddcf7cf5549adb8cb6ceddc0122f6~tplv-k3u1fbpfcp-watermark.image?)
