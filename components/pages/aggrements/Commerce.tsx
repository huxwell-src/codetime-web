/* eslint-disable react/jsx-curly-brace-presence */
import Markdown from 'markdown-to-jsx'
import { Article, useTrueTheme } from 'roku-ui'

export function Commerce () {
  const theme = useTrueTheme()
  return (
    <Article className={theme === 'dark' ? 'prose-invert' : ''}>
      <Markdown>
        { `## 特定商取引法（通信販売）に基づく表示
当サイトで取り扱う商品・サービスのうち、当社が販売者の商品・サービス（当社が提供するサービスに限る）について、「特定商取引に関する法律」第11条に基づき、次のとおり明示します。

### 販売業者・サービス提供業者

CodeTime

### 運営責任者

Jianqi Pan

### 所在地

〒114-0023 東京都北区滝野川7-21-5ＤｅＬＣＣＳ板橋Ｓｏｕｔｈ

### 問い合わせ先

Code Time お客様窓口

#### 電話番号

090-3961-1421
受付時間：10:00～17:00（土・日・祝日と当社の年末年始・夏季休暇を除く）

### 提供商品

CodeTime

### 販売価格

商品・サービスのウェブページ上に掲載します。

### 商品代金・サービス料金以外に購入者が負担すべき金銭
- ダウンロードやお申込みにかかる通信費
- 消費税

### 商品代金・サービス料金の支払方法と支払時期
- 支払い方法

当サイトのウェブページ上での注文手続き中に利用可能なものを画面に表示する方法、またはその他の方法により案内します。

- 支払い時期

各支払方法によって定まる支払時期までに支払うものとします。

### 商品のお届け時期・サービスの提供時期

当サイト上に表示する等の方法により時期（期日、期間、要日程調整、目安等の場合も含む）を案内します。

### 商品の返品

購入完了後のキャンセル、返品、返金および交換はお受けできません。

### 商品の不備・不具合等（契約内容不適合責任）に関する特約

当社から購入された商品・サービスの不備・不具合等について、サービス特有の条件（規約・約款の類を含む）において特に定める場合を除き、当社は対応をお受けできません。なお、サービスに付帯して提供したサービスに問題があった場合には、適宜対応します。

### 動作環境

商品・サービス毎に必要に応じて動作環境を表示します。

2023年2月20日 制定` }
      </Markdown>
    </Article>
  )
}
