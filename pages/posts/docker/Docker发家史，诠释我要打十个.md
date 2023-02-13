---
title: Docker发家史，诠释我要打十个
date: 2022-07-11 13:25:20
tags: 
    - Go
    - Docker
categories: 云原生
---
容器本身没有意义，有意义的是容器编排。

我现在有一大批物理服务器，想要租借给别人使用，因此我搭建了一个物理集群，并向用户售卖，这就是 IaaS(基础设施即服务 Infrastructure as a Service)。

用户通过购买我的物理服务器，物理服务器上运行着我的虚拟机，用户在虚拟机上部署自己的应用。不过在使用过程中发现：

- 本地开发环境与购买的虚拟机之间环境不同，导致调试、部署困难
- 不同的应用可能在同一台虚拟机上，没有隔离
- 大规模的应用部署也比较麻烦。

为了解决上面的问题，出现了 PaaS(平台即服务 Platform as a service)，例如 Cloud Foundry(云计算)，它提供了：

- 大规模应用部署能力
- 提供了“沙盒”容器来隔离应用，让用户进程互不干扰

但是在使用过程中，用户发现“沙盒”用起来并不方便，打包过程还是一样很痛苦，需要用户来让本地应用于远端 PaaS 适配，此时出现了小鲸鱼 Docker。

[scode type="lblue"]没用的冷知识：Docker 项目在 2016 年已经改名为 Moby，Docker 仅仅是公司名称。[/scode]

![](https://s3.bmp.ovh/imgs/2021/10/648c430ed9d67275.png)

Docker 提出了镜像的概念，通过镜像实现本地环境与远端环境高度一致，解决了打包困难的问题，取代了 Cloud Foundry 这类 PaaS 项目中的“沙盒”，至此，Docker 开始崭露头角。

随着 Docker 被大范围使用，PaaS 的定义正逐渐变为一套以 Docker 容器技术为核心，全新的“容器化”思路。2014 年，Docker 公司也顺势发布了自己的 PaaS 项目 Swarm。

Swarm 项目的集群管理功能触碰了其他公司的利益分配，因此 CoreOS 推出了自己的 rkt 容器、Mesos 发布了 Marathon 与 Swarm 竞争、Google 公司宣告 Kubernetes 诞生。

[scode type="lblue"]没用的冷知识：CoreOS 曾是 Docker 项目开源后最积极、活跃的贡献者。[/scode]

Docker 公司为完善平台能力，收购了第一个提出“容器编排”概念的项目 Fig，并更名为 Compose。“容器编排”正式进入用户视野。

Docker 公司有了 Docker，Swarm，Compose 三张牌后，在容器生态具有很大的优势和发言权。为了竞争，Google、Redhat 等基础设施领域的玩家们成立了 CNCF（Cloud Native Computing Foundation）基金会，开始围绕 Kubernetes 打造生态。Kubernetes 很快将 Swarm 项目远远的甩在身后。

Docker 为了与 Kubernetes 竞争“容器编排”领域，Docker 公司甚至放弃了 Swarm 项目，但最终未能打败 Kubernetes，因为 Kubernetes 是 Google 内部沉淀多年的项目，包含了许多超前的设计，与 Docker 已不在一个出发点。

在 2017 年，Docer 在自己的主打产品 Docker 企业版中内置 Kubernetes 项目，这标志着“编排之争”落下帷幕。容器化社区以 Kuberentes 为核心愈加繁荣。

[scode type="lblue"]没用的冷知识：微软曾经以天价收购 Docker，接受微软的天价收购，在大多数人看来都是一个非常明智和实际的选择。可是 Solomon Hykes 却多少带有一些理想主义的影子，不甘于“寄人篱下”，选择带领 Docker 公司对抗整个产业的压力。[/scode]