---
title: 0秒改struct性能直接提升15%，产品姐姐都夸我好棒
date: 2022-08-17 21:08:09
tags: 
    - Go
categories: 
    - 更好的编程
---

如果您以前写过 `Golang` ，那您很可能见过或者写过 `Struct` 结构体。但是，您可能不知道，通过简单地重新排序结构体中的字段，您可以极大地提高 Go 程序的速度和内存使用率！

难以置信吗？那让我们直接进入正题吧！让我们来看一个例子。如下。

```golang
type BadStruct struct {
    age          uint8
    IdCardNumber uint64
    DateOfBirth  uint16
}

type GoodStruct struct {
    age          uint8
    DateOfBirth  uint16
    IdCardNumber uint64
}
```

在上面的例子中，我们定义了两个具有相同字段的结构体。接下来让我们编写一个简单的程序来输出他们的内存使用情况。点击[此处](https://go.dev/play/p/DekLCtTGo6v)您可以获取测试代码。

```
Bad struct is 24 bytes long
Good struct is 16 bytes long
```

如您所见，它们占用的内存不同。

到底发生了什么，导致两个字段相同的结构体消耗不同的字节？

答案是数据在操作系统中的内存排列方式。换句话说，数据结构对齐。

`CPU` 以字长的方式读取数据，而不是通过字节大小。64 位操作系统中一个字长为 8 个字节，而 32 位操作系统中一个字长为 4 个字节。换句话说，`CPU` 以字长的倍数读取地址。


![ype JadStruct struct.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9840bcfcb35a47d3ab23bcbe490029de~tplv-k3u1fbpfcp-watermark.image?)

在 64 位操作系统中，为了获取变量 `IdCardNumber`，我们的 `CPU` 需要两个周期来访问数据，而不是一个周期。

第一个周期将获取到 0 到 7 的内存，其余周期获取其余部分。

把它想象成一个笔记本，每页只能存储一个字大小的数据，此时是 8 个字节。如果 `IdCardNumber` 分散在两个页面上，则需要翻页两次才能检索完整的数据。

**这是低效的。**

因此我们需要对齐数据结构 -- 将数据存储在一个地址等于数据大小的倍数的位置。

例如，一个 2 字节的数据可以存储在内存 0、2 或 4 中，而一个 4 字节的数据可以存储在内存 0、4 或 8 中。

![ype BadStruct struct〈.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60278604334e42acaf35c7d0b64f8276~tplv-k3u1fbpfcp-watermark.image?)

通过简单的对齐数据，确保 `IdCardNumber` 可以在同一个 `CPU` 周期内检索到变量。

填充是实现数据对齐的关键。操作系统在数据结构之间用额外的字节填充数据以对齐它们。这就是额外内存的来源！

让我们再来看一看 `BadStruct` 和 `GoodStruct`。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4401122ccd54e6aa504e6b753e8080b~tplv-k3u1fbpfcp-watermark.image?)

`GoodStruct` 消耗更少的内存，仅仅是因为它比 `BadStruct` 有更好的结构体字段顺序。

由于填充，两个数据结构分别变成了 16 字节和 24 字节。

所以，您只需重新排序结构体中的字段，就可以节省额外的内存！

最后，让我们来做一个简单你的基准测试来证明它在速度和内存的区别，结果如下。点击[此处](https://go.dev/play/p/i6F3VRFY61n)您可以获取可运行的代码。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/916a18960f7f484696e99ad608b1f9f5~tplv-k3u1fbpfcp-watermark.image?)

从结果您可以看出，遍历 `GoodStruct` 花费的时间确实更少。重新排序结构体字段可以提高程序的内存使用率和速度。

## 总结

本篇博客带您了解了简单的数据对齐技术，**重新排序结构体中你的字段吧！** 数据结构的深思熟虑的对齐真的得到了回报。