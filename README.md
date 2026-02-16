# fortune



📋 概要
 fortune は、高性能な多言語対応占い特化サイトです。トップページには大きめのアニメーションを配置し、占いサイトっぽくしています。また、多言語スイッチボタンを配置して簡単に言語を変えれるようにしています。1ページのみの構成ではなく、将来的に占いに関する記事コンテンツを追加したいので、グローバルナビを配置して、トップページから他のページへ飛べるように適切なリンクを配置しています。



✨ 機能

* アニメーション付きホームページ
* 複数のセクションを用意し、高ユーザーインプリメントを実現
* 多言語支持（日本語、英語、タイ語）
* 言語スイッチボタンを配置して簡単に言語を変えれるように
* グローバルナビを配置して、トップページから他のページへ飛べるように



🚀 使い方

### インストール

1. Node.js をインストールする
2. fortune プロジェクトをclone する
3. npm install を実行する



### 実行方法

1. node_modules 配下の依存関係を更新する
2. fortune アプリケーションを起動する
3. ブラウザーで http://localhost:3000 にアクセスする



📁 ファイル構成

* `src/`
	+ `pages/`: ホームページコンポーネントのソースコード (`Homepage.js`)
	+ `utils/`: 言語スイッチャー機能を提供するユーティリティ (`language-switcher.js`)
	+ `components/`: 各セクションを表示するコンポーネント (`Section.js`)



🔧 技術詳細

* language: JavaScript (TypeScript)
* framework: Next.js
* libraries:
	+ React
	+ Redux
	+ Express
* database: MongoDB



📝 開発情報

* fortune プロジェクトは、マイクロサービスアーキテクチャを採用しています。
* 技術スタックは、JavaScript (TypeScript)、Next.js、React、Redux、Express、MongoDB です。



🎯 今後の改善案

* アニメーションの品質向上
* セクションの追加や記事コンテンツの追加
* ユーザーインプリメントを更に高めるために、新しい機能の追加



---

Note: This README is written in Japanese and includes Markdown formatting, images, and emojis to make it visually appealing.