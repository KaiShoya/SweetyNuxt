# sweety
宮崎市内のカップル向けホテルの最安値を検索できるサービスです。

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Environment Setup
下記の環境変数を設定する必要があります。
API_URL, DATABASE_PORTは必須ではありません。
ローカルで開発する場合、プロジェクトルートに.envファイルを作成することで自動で読み込まれます。

```
API_URL=http://localhost:3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASS=''
DATABASE_NAME=sweetydb
DATABASE_PORT=3306
```


## Unubo Setup
Unuboで動かすための設定です。

### Deployment settings
Commandsに下記を追加します。
yarn build実行時には[Secrets]で設定した変数は読み込まれないため、cross-envで指定しています。

```
yarn
node_modules/.bin/cross-env API_URL=https://sweety.unubo.app yarn build
node_modules/.bin/cross-env NODE_ENV=production HOST=0.0.0.0 node server/index.js
```

### Secrets
[Environment Setup]の環境変数を追加します。
