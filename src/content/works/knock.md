---
title: Knock
summary: MacBookの側面を叩いて、ショートカットやmacOS操作を呼び出す。
cover: /images/works/knock/cover.svg
alt: MacBookの側面からタップの波紋が広がるコンセプトビジュアル。実際のアプリ画面ではありません。
category: MACOS / GESTURE
status: published
featured: false
order: 5
role: 企画・仕様整理・AI支援実装
technologies:
  - Swift
  - AppKit
  - CoreMotion
links:
  - label: GitHub リポジトリ
    url: https://github.com/yuuyuu86/Knock
  - label: 参考プロダクト（Shortap）
    url: https://shortap.app/
---

## MacBookを軽くノックして操作

Knockは、MacBook側面へのタップをジェスチャーとして読み取り、macOSの操作やAppleショートカットを実行するメニューバーアプリです。左右それぞれの1回・2回・3回タップにアクションを割り当てる構想を形にしました。

操作の着想を得るためShortapを参考にしています。参考元へのリンクを併記し、この試作の実装範囲を確認できるようにしました。

## 実装のポイント

内蔵センサーから得る動きを判定し、操作へつなげます。READMEには50以上の内蔵アクションが記載されています。

## 現在の状態

Appleシリコン搭載MacBook向けの個人制作です。利用可能な機種や環境差を含む動作範囲を確認しながら紹介しています。

> このページは作品紹介ページ（LP）です。メイン画像はコンセプトビジュアルで、実際の操作画面ではありません。実画面が確認できる画像は、追加ギャラリーに区別して掲載しています。
