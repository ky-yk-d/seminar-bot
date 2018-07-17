# seminar-bot

セミナー情報等を各種サイトから取得し、Slackに通知するBot

## 環境

- 使用言語：JavaScript
- 実行環境：AWS Lambda(Node.js 8.1.0)

## 設定

### 設定ファイルに記載するもの

- 通知先のSlack
- 監視対象キーワード

### 設定ファイル以外で行うもの

- AWS側の設定
- 実行タイミング
  - Lambdaのトリガー依存
  - 基本はスケジュール実行

## 使い方

Lambdaにデプロイすればいいようにしたい

## 参考情報

[Connpass API](https://connpass.com/about/api/)