---
title: Redis数据类型选型手册
date: 2023-02-03 18:53:13
categories: 
    - 数据库
tags:
    - Redis
---
CSAPP 中的优化程序的性能章节中提到过，选择合适的算法和数据结构是优化程序的方向之一。Redis 官网中也明确提到，Redis 拥有突出的表现，不仅是因为它在内存中操作，还因为它的键值对都是按一定的数据结构来组织的，并最终对这些数据结构进行增删改查的操作。所以高效的数据结构是 Redis 拥有高性能的基石。

## Strings - 字符串
字符串类型，Redis 最基本的数据类型，代表一个字节序列。

字节序列，多字节数据的存放顺序。存放顺序分为大端字节序（big endian）和小端字节序（little endian），举个例子，一个数值变量 x 使用两个字节存储，地址为 0x1122，那么高位字节是 0x11，低位字节是 0x22。只有读取时需要连续读取超过一个字节数据时才需要考虑字节序问题。

- 大端字节序是人类读数值的顺序，低位字节在后，高位字节在前。
- 小端字节序则相反，低位字节在前，高位字节在后。


![BIG-ENDIAN.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/949cf16f7d3045f19196d7fa022f2059~tplv-k3u1fbpfcp-watermark.image?)
  
## Lists - 列表
Lists 是按插入顺序排序的字符串列表。

## Sets - 集合
Sets 是 String 类型的无序集合，它存储的集合成员具有唯一性，也就是说具有去重的特性。举个例子。

- 通过 Redis-Cli 操作 Redis-server，存储 user 1 喜欢的数据库

```shell
SADD user:1:like redis

(integer) 1

SADD user:1:like mysql

(integer) 1

SADD user:1:like mysql

(integer) 0
```

- 查看 user 1 喜欢的数据库，存储了两次 mysql，但只保存了一条

```shell
SMEMBERS user:1:like

1) "mysql"

2) "redis"
```

使用 sets 可以在 O(1) 时间添加、删除和测试数据是否存在。
  
## Hashes - 哈希
Hashes 是记录字段-值（key-value）的集合。Redis Hashes 类似 Go 的 map，Python 的 dictionaries，Java 的 HashMaps

## Sorted sets - 有序集合
Sorted sets 和 Sets 与一样，是 String 类型的无序集合，它存储的集合成员具有唯一性，区别顾名思义，它是有序的，通过每个字符串的分数来维持顺序。

## Streams - 流
Streams 的作用就像一个只附加消息的日志，Streams 按照事件发生的顺序进行记录，然后将其联合起来一起进行处理。网上大部分博客都把这个数据类型等价于实现消息队列。

## Geospatial indexes - 地理空间索引
Geospatial indexes 的地理位置索引对于在给定的经纬度或边界内寻找位置非常有用。

## Bitmaps - 位图
Bitmaps 是 String 类型的扩展，它把字符串当做一个位向量并允许对字符串进行位操作。位是计算机中最小的单位，使用它进行储存将非常节省空间，特别适合一些数据量大且使用二值统计的场景，例如签到。

## Bitfields - 位域

Bitfields 可以获取、增加、更新任何比特长度的整数值。Bitfields 支持原子读、写和增量操作，它是管理计数器的好选择。假如你开发了一款游戏，想要记录被杀的怪物数量和玩家的金币数量，你的游戏非常火爆，这两个计数器至少需要 32 位宽。此时我们可以用每个玩家的 Bitfields 来表示这些计数器。

- 新玩家默认有 1000 金币，计数器偏移量为 0 
```shell
> BITFIELD player:1:stats SET u32 #0 1000
1) (integer) 0
```

- 杀死囚禁茜灵的反派后，获得 50 金币，并更新被杀的怪物数量的计数器，即偏移 1。
```shell
> BITFIELD player:1:stats INCRBY u32 #0 50 INCRBY u32 #1 1
1) (integer) 1050
2) (integer) 1
```

谁是茜灵？她！这是我们公司游戏的女主角

![eh2p3-tuft5.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/592f0982a2a74b5e8d6b45f69f35f8ca~tplv-k3u1fbpfcp-watermark.image?)

- 付给铁匠 999 金币，购买一件治安臂装
```shell
> BITFIELD player:1:stats INCRBY u32 #0 -999
1) (integer) 51
```

- 查看玩家的数据
```shell
> BITFIELD player:1:stats GET u32 #0 GET u32 #1
1) (integer) 51
2) (integer) 1
```

## HyperLogLog - ???
HyperLogLog 是一种基数估计的概率数据结构，以几乎完美的准确性换取高效的空间利用。比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}， 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。