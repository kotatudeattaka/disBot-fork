# discord.js-starter

> [!NOTE]
> For instructions on how to use it, please check "Usage" below.  
> 使い方は、下の「Usage / 使い方」をご確認ください

Template for those who want to use discord.js  
discord.jsを使いたい人のためのテンプレート

## Environment / 環境

[![Node.js v18.x\~](https://img.shields.io/badge/-node.js%20v18.x~-black.svg?logo=node.js&style=for-the-badge)](https://github.com/nodejs/node)
[![](https://img.shields.io/badge/-esmodule-black.svg?logo=javascript&style=for-the-badge)](https://nodejs.org/api/esm.html)

### Dependencies / 依存関係

[![discord.js v14.x\~](https://img.shields.io/badge/-discord.js%20v14.x~-black.svg?logo=discord&style=for-the-badge)](https://www.npmjs.com/package/discord.js)

## Files / ファイル

|File Name / ファイル名|Description / 説明|
|---|---|
|`.env`|environmental variables 環境変数|
|`package.json`|package metadata パッケージメタデータ|
|`LICENSE`|License (copyright information) ライセンス(著作権情報)|
|`.vscode/settings.json`|Visual Studio Code Settings / 設定|

## Script Commands / スクリプトコマンド

|Command / コマンド|Description / 説明|
|---|---|
|`npm run start`|launch the bot ボットを起動します|

## environmental variables / 環境変数 (.env)

|variables name / 変数名|Description / 説明|
|---|---|
|`DISCORD_TOKEN`|bot token|
|`BOT_ADMINS`|bot administrators (separated by commas) / ボット管理者(カンマ(,)で複数指定)|
|`EMBED_COLOR_SUCCESS`|Coloring embedded messages in case of successes / 成功の場合の埋め込みメッセージのカラーリング|
|`EMBED_COLOR_ERROR`|Coloring embedded messages in case of errors / エラーの場合の埋め込みメッセージのカラーリング|
|`DEBUG_CHANNEL_ID`|Channel notification destination when an error occurs / エラーが発生した際のチャンネル通知先|

## Usage / 使い方

### Setup / セットアップ

- run `npm install`
- edit `DISCORD_TOKEN` and `BOT_ADMINS` in file: `.env`

### Lunch / 起動

- run `npm run start`

## Example / 例

### Slashcommand / スラッシュコマンド

|Command / コマンド|Description / 説明|
|---|---|
|`/ping`|return "pong"|
|`/sudo eval`|run script|