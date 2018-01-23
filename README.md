# MarkdownをHTMLに変換

## 概要

Markdownは楽だし自分用の資料を作るのに適しているなと思うが各markdownコンパイラにより使用範囲やスタイルに違いがある。ならば自分でカスタマイズできるようにしようと考えた結果こうなった。

- Windows 10で動作確認。Macは古くて使ってない。欲しい。

## 処理

- mdフォルダ内にある.mdファイルをhtmlに変換を行い、wwwフォルダにhtmlファイルとして保存。
- htmlファイルにHTML-header/footerなどを付ける。そのときにjs、cssのlink等も付与させる
- mdフォルダ内にある.mdファイル以外をwwwフォルダにコピー

## install & run

インストールとgulpの起動

```bash
npm install
npm start
```

index.htmlを表示する

```bash
npm run index
```

## カスタマイズした機能

### コード表示をhighlight.jsに変更

\```でコードを記述した場合は[highlight.js](https://highlightjs.org/)を使用するように変更

### 独自タグimg[]にてlightboxで表示する

```bash
img[パス]
```

## 独自にカスタマイズするには

### Styleの変更

template/css/styles.cssを変更する

### 他にjsなどを組み込みたい場合

- template配下にjsを配置する
- plugin/addHtmlTag.jsに読み込むjsリンクを記載する

### 楽したい

plugin/img2lightbox.jsでは文字置換を行っている。単純にimg[]の文字をlightbox形式に変更しているだけ。楽をしたい場合は独自にjsを作成し、gulpfile.jsのpipeに追加すると幸せになれる。

## License

MIT
