---
title: 移除链表中的元素为何需要一个 head 的副本
date: 2022-11-14 12:10:30
tags: 
    - 算法
    - Leetcode
categories: 算法虐我千百遍，我待算法如初恋
---

> Problem: [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/description/)

使用 cur 后，实现了遍历 head ，并且不会修改 head 的元素。

# 思路
单链表的删除，是修改指针，骗用户视角的“魔术”，用户以为它被删除了，实际上，它还在内存中存在。在 `Go` 中，链表元素真正被删除取决于 `GC` 垃圾回收机制。

如果一个链表的元素与传入的 `val` 值相同，该元素被删除，即原本指向该元素的链表元素，不指向即将被删除的元素，而是指向被删除元素的下一个元素。

例如：
- 链表元素`A`，`val`: 1
- 链表元素`B`，`val`: 2
- 链表元素`C`，`val`: 3
假设，此时它们的顺序关系为：`A` -> `B` -> `C`，传入的 `val` 为 `2`，那此时 `A` 将不指向 `B`，而是指向 `C`，`B`元素就被删除了。也就是说，**删除操作，是在即将被删除的链表元素的上一个元素发生的。**


# 解题方法
声明一个虚拟头结点 `dummyHead`，目的是将所有的移除链表元素逻辑相同。假如不使用虚拟头结点的方法解题，传入的 `val` （希望删除的 `val`）是传入的 `head` 的头结点的值，那么我们删除后，需要额外代码处理 `head`，代码如下：
```Go
func removeElements(head *ListNode, val int) *ListNode {
    // 当头结点存在并且头结点的值等于val时，需要额外的逻辑来处理
	for head != nil && head.Val == val {
		head = head.Next
	}
	cur := head
	for cur != nil && cur.Next != nil {
		if cur.Val == val {
			cur.Next = cur.Next.Next
		} else {
			cur = cur.Next
		}
	}
	return head
}
```
为了避免额外的逻辑来处理头结点，让代码更加整洁，我们可以使用虚拟头结点，即创建一个节点指向 `head`，这个节点是空的，目的是让特殊情况：头结点的值等于 `val` 时，处理逻辑与不是头结点但是需要删除的元素，逻辑一致。
> 前面思路模块已经说明了，**常规删除元素**是什么样的逻辑 :-)

还有一个问题，**为什么需要一个 cur 变量？**
因为 `cur` 变量是用来遍历链表的！看一下使用虚拟头结点的解答代码核心逻辑（不是上面不使用虚拟头结点的代码喔，代码在最下面，使我们的最终版），如下：
```Go
for cur != nil && cur.Next != nil { // 循环终止条件
	if cur.Next.Val == val {
		cur.Next = cur.Next.Next // 修改元素
	} else {
		cur = cur.Next // 移动指针
	}
}
```
我们遍历链表的模板如下：
```
for 终止条件 {
    // 自己的逻辑
    ...
    // 移动元素
}
```
在这个题中，自己的逻辑就是删除与传入值 `val` 一致的链表元素。`删除元素`，实际上**也是`移动元素`**。（就像时光不能倒流，它永远在向前走~ 我们每次 `for` 循环，都在移动元素）。

假设不使用 `cur` 来复制链表，移动指针。那么我们每次移动指针，都会修改链表中的元素，尽管这个链表元素并不满足我们的逻辑。

使用了 `cur` 后，它是传入的 `head` 的副本，每次移动指针的操作，修改的都是 `cur`，但因为它是 `head` 的副本，所以它移动指针从理论上来说，与 `head` 移动指针是保持一致的，我们可以认为，`cur` 满足终止条件，遍历结束后，`head` 也被遍历结束了。**此时，我们能够知道，使用 `cur` 后，实现了遍历 `head` ，并且不会修改 `head` 的元素。**

遍历的问题解决后，就是根据题意删除元素了，我们现在删除元素是删除的 `cur`。链表，是通过指针连接的，而指针是一个内存的地址值，`cur` 和 `head` 的指针一致，因此修改 `cur` 任意链表元素的 `val`，也会修改 `head` 对应的链表元素。


# 复杂度
- 时间复杂度: 
$O(n)$，`n` 是链表的长度，需要遍历一次链表。

- 空间复杂度: 
$O(1)$

# Code
```Go []

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeElements(head *ListNode, val int) *ListNode {
	dummyHead := &ListNode{
		Next: head,
	}
	cur := dummyHead
	for cur != nil && cur.Next != nil {
		if cur.Next.Val == val {
			cur.Next = cur.Next.Next
		} else {
			cur = cur.Next
		}
	}
	return dummyHead.Next
}
```
