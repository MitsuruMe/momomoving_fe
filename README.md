# ももとお引っ越し フロントエンド

引越しをサポートするWebアプリケーションのフロントエンド部分です。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: Radix UI
- **フォーム管理**: React Hook Form + Zod
- **状態管理**: React Context API

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成してください：

```bash
cp .env.example .env.local
```

環境変数の設定：

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://momomoving-be.onrender.com

# 開発時にローカルAPIを使用する場合
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Environment
NODE_ENV=production

# App Configuration
NEXT_PUBLIC_APP_NAME=ももとお引っ越し
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**注意**: APIエンドポイントは自動的に `/api/v1` が付与されます。
例：`https://momomoving-be.onrender.com` → `https://momomoving-be.onrender.com/api/v1/auth/login`

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 機能

### 実装済み機能

- **認証システム**
  - 新規ユーザー登録
  - ログイン・ログアウト
  - JWT トークン管理
  - Protected Routes

- **ユーザーインターフェース**
  - レスポンシブデザイン
  - ホーム画面
  - タスク一覧表示
  - 物件検索画面

### 今後実装予定

- タスク管理（API統合）
- 物件検索・詳細表示（API統合）
- ユーザー情報管理
- AI機能統合

## プロジェクト構造

```
frontend/
├── app/                  # Next.js App Router
│   ├── login/           # ログインページ
│   ├── signup/          # 新規登録ページ
│   └── page.tsx         # ホームページ
├── components/          # UIコンポーネント
│   ├── ui/             # Radix UI コンポーネント
│   └── ProtectedRoute.tsx
├── context/            # React Context
│   └── AuthContext.tsx
├── hooks/              # カスタムフック
│   └── useAuth.ts
├── lib/                # ユーティリティ
│   ├── api/           # API クライアント
│   ├── config/        # 環境設定
│   ├── types/         # TypeScript型定義
│   └── utils/         # ユーティリティ関数
└── public/            # 静的ファイル
```

## API統合

バックエンドAPIとの統合は `lib/api/client.ts` で管理されています。

エンドポイント設定は `lib/config/env.ts` で一元管理されており、環境変数で切り替え可能です。

## 開発

### コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番モード起動
npm run start

# Lint実行
npm run lint
```

### 環境設定

- **開発環境**: `http://localhost:8000` のローカルAPI
- **本番環境**: `https://momomoving-be.onrender.com` の本番API

## デプロイ

このプロジェクトは Vercel Platform で簡単にデプロイできます。

環境変数を Vercel の設定で追加してください：

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_VERSION`
