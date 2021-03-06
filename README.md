# 京大保健所の存続を求める会ウェブサイト

nuxt で書いた web サイトを heroku でホスト

@nuxt/content というパッケージを利用している

この `README.md` を読むと誰でもウェブサイトを編集できるようになります．

## 自動公開

main ブランチへ push すると，Heroku で自動で公開されます

## どうすれば push できるの？

### 方法 1) ローカルから push する

1. Github のアカウントを作成する
2. Github デスクトップをダウンロードする
3. ローカルでファイルを編集&保存
4. 左側，更新したいファイルにチェックを入れて，何を変更したのかメッセージを入れてコミット(=自分の PC 上での編集履歴に保存)
5. main ブランチに push (=共有の編集履歴に対して変更を伝える)

### 方法 2) ブラウザから push する

変更量少ないときはこちらでも OK

1. 同じ
2. PC から GitHub にブラウザ上でアクセス，編集してコミット

### 方法 3) 山村に変更したい内容を伝える

どうぞ

## このサイトをローカルで編集する方法

1. node をインストール
2. yarn をインストール
3. `$cd ku-clinic-sonzoku` 移動
4. `$ yarn`　パッケージインストール
5. `$ yarn dev`
6. localhost:3000 にブラウザでアクセス
7. ブラウザで編集したいところをクリックすると編集できる

## @nuxt/content

@nuxt/content とは，Markdown ファイルを綺麗に表示してくれるパッケージ

詳細は[こちら](https://content.nuxtjs.org/ja/themes-docs/#content-1)に

- `content/ja/` に記事編集者が書いた markdown ファイルをおき，`static/` に添付画像などを置く
- `content/ja/*.md` ファイルを作成するとファイル名に基づき，自動でルーティングが行われる
- `content/ja/*.md` ファイル上部には title, description, position, category, version, fullscreen を記入する
- Markdown 部分では普通の記法の他，@nuxt/content 専用拡張機能が利用可能

## 多言語対応

日本語と英語に対応
(現在英語対応は off)

- content/ja
- content/en

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
$ yarn start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
