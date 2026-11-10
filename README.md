# YUTA Portfolio

Astro で作った静的ポートフォリオ。`main` に push すると GitHub Actions がテスト → ビルド → GitHub Pages に公開します。

- 公開URL: https://yuuyuu86.github.io/MyPortfolio/
- 仕様: [仕様書.md](仕様書.md)

## 開発

```bash
npm install
npm run dev        # http://localhost:4321/
npm test           # 並び順・作品データのチェック
npm run build      # dist/ に出力
```

## 作品の管理

作品は 1作品 = 1ファイル。管理画面はなく、ファイルを編集して push します。

| 置き場所 | 内容 |
| --- | --- |
| `src/content/works/<slug>.md` | 作品データ（先頭の `---` の間）と本文 |
| `public/images/works/<slug>/` | 画像（`cover.webp` など） |

### 追加する

```bash
npm run new:work -- store-canvas "StoreCanvas"
```

1. 作られた `src/content/works/store-canvas.md` を編集する
2. `public/images/works/store-canvas/cover.webp` を置く（横 1600px 程度、webp 推奨）
3. `npm run dev` で表示を確認する
4. 公開してよければ `status: published` にする
5. `npm test` が通ることを確認して push

### 項目

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| title / summary / category | ○ | 作品名・一覧用の1文・分類（例 `GAME / DEVELOPMENT`） |
| cover / alt | ○ | 代表画像のパスと代替テキスト |
| status | ○ | `draft`（非公開）か `published`（公開） |
| featured | | `true` でトップの Selected Works に載る（最大3件） |
| order | | 小さいほど先頭。未指定は後ろ → 制作時期が新しい順 → slug 順 |
| date / role / technologies | | 制作時期・担当・使用技術 |
| gallery / links | | 追加画像、関連リンク（未入力なら表示されない） |

### 非公開・削除

- 一時的に隠す: `status: draft`（サイトからは消えるが、**公開リポジトリなのでファイル自体は誰でも見られる**）
- 載せない情報は最初からリポジトリに入れない

### 自動チェック（`npm test`、push 時にも実行）

- slug の形式、必須項目、status の値、タイトル重複
- 公開作品の画像ファイルが存在するか
- 公開作品にテンプレートの仮文言が残っていないか

失敗すると公開されず、前の版のサイトが残ります。

## 連絡先・プロフィール

`src/data/site.ts` の `contact` にメール・GitHub・X の URL を入れると表示されます。空のままなら表示されません。
About の文章は `src/pages/index.astro` にあります。
