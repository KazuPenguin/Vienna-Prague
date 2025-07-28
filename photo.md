# 中央ヨーロッパ旅行ガイド - 必要な写真リスト

## 写真格納フォルダ構成
```
images/
├── vienna/           # ウィーン関連写真
│   ├── attractions/  # 観光スポット
│   ├── cafes/       # カフェ・レストラン
│   ├── museums/     # 美術館・博物館
│   └── music/       # 音楽関連施設
├── prague/          # プラハ関連写真
│   ├── attractions/ # 観光スポット
│   ├── cafes/       # カフェ・レストラン
│   ├── restaurants/ # レストラン
│   └── views/       # パノラマビュー
├── general/         # 共通写真
│   ├── preparation/ # 旅行準備関連
│   └── transport/   # 交通手段
└── hero/            # ヒーロー画像
```

## 必要な写真一覧

### ヒーローセクション
1. **hero-main.jpg** - ウィーン・プラハの美しい風景（メイン画像）
   - 推奨サイズ: 1920x1080px
   - ウィーンの宮殿とプラハの街並みを組み合わせた画像

### ウィーン関連写真

#### 観光スポット (vienna/attractions/)
2. **schonbrunn-palace.jpg** - シェーンブルン宮殿外観
3. **schonbrunn-gardens.jpg** - シェーンブルン宮殿庭園
4. **hofburg-palace.jpg** - ホーフブルク王宮
5. **belvedere-palace.jpg** - ベルヴェデーレ宮殿
6. **stephansdom-cathedral.jpg** - シュテファン大聖堂外観
7. **stephansdom-interior.jpg** - シュテファン大聖堂内部

#### 美術館・博物館 (vienna/museums/)
8. **kunsthistorisches-museum.jpg** - ウィーン美術史美術館
9. **albertina-museum.jpg** - アルベルティーナ美術館

#### 音楽関連施設 (vienna/music/)
10. **vienna-state-opera.jpg** - ウィーン国立歌劇場
11. **vienna-philharmonic.jpg** - ウィーン楽友協会（黄金ホール）
12. **mozart-house.jpg** - モーツァルトハウス・ウィーン

#### カフェ (vienna/cafes/)
13. **cafe-sacher.jpg** - カフェ・ザッハー外観
14. **cafe-sacher-interior.jpg** - カフェ・ザッハー内装
15. **sachertorte.jpg** - オリジナルザッハトルテ
16. **demel-cafe.jpg** - デメル外観
17. **demel-display.jpg** - デメルのお菓子ディスプレイ
18. **gerstner-cafe.jpg** - ゲルストナー

### プラハ関連写真

#### 観光スポット (prague/attractions/)
19. **prague-castle.jpg** - プラハ城全景
20. **st-vitus-cathedral.jpg** - 聖ヴィート大聖堂
21. **charles-bridge.jpg** - カレル橋
22. **charles-bridge-sunset.jpg** - 夕暮れのカレル橋
23. **old-town-square.jpg** - 旧市街広場
24. **astronomical-clock.jpg** - 天文時計
25. **tyn-church.jpg** - ティーン教会

#### パノラマビュー (prague/views/)
26. **petrin-hill-view.jpg** - ペトシーンの丘からの眺望
27. **letna-park-view.jpg** - レトナ公園からの眺望
28. **kampa-island-view.jpg** - カンパ島からの眺望

#### レストラン (prague/restaurants/)
29. **restaurace-mincovna.jpg** - Restaurace Mincovna
30. **u-medvidku.jpg** - U Medvidku ビアホール
31. **czech-beer.jpg** - チェコビール各種

#### カフェ (prague/cafes/)
32. **cafe-louvre.jpg** - カフェ・ルーヴル
33. **cafe-imperial.jpg** - カフェ・インペリアル
34. **cafe-slavia.jpg** - カフェ・スラヴィア
35. **grand-cafe-orient.jpg** - グランド・カフェ・オリエント

#### 特別体験 (prague/experiences/)
36. **beer-spa.jpg** - ビアスパ体験
37. **vltava-cruise.jpg** - ヴルタヴァ川クルーズ
38. **segway-tour.jpg** - セグウェイツアー

### 旅行準備関連 (general/preparation/)
39. **etias-document.jpg** - ETIAS申請画面
40. **esim-setup.jpg** - eSIM設定画面
41. **weather-september.jpg** - 9月の気候イメージ
42. **autumn-clothing.jpg** - 秋の服装例
43. **travel-documents.jpg** - 旅行書類一式

### 交通手段 (general/transport/)
44. **vienna-metro.jpg** - ウィーン地下鉄
45. **prague-tram.jpg** - プラハトラム
46. **rail-journey.jpg** - ウィーン-プラハ間鉄道

### 食文化
47. **wiener-schnitzel.jpg** - ウィーナーシュニッツェル
48. **tafelspitz.jpg** - ターフェルシュピッツ
49. **czech-goulash.jpg** - チェコグラーシュ
50. **knedliky.jpg** - クネドリーキ（ダンプリング）
51. **medovnik.jpg** - メドヴニーク（ハニーケーキ）

## 画像仕様要件

### 推奨サイズ
- **ヒーロー画像**: 1920x1080px (16:9)
- **カード画像**: 400x300px (4:3)
- **詳細画像**: 800x600px (4:3)

### 品質要件
- **フォーマット**: JPG (高品質) または WebP
- **解像度**: 72-96 DPI (Web用)
- **圧縮**: 品質80-90%
- **ファイルサイズ**: 200KB以下（カード用）、500KB以下（詳細用）

### 命名規則
- 英数字のみ使用
- ハイフン区切り
- 拡張子は小文字
- 例: `schonbrunn-palace.jpg`

## 実装時の注意事項

1. **代替テキスト**: 各画像に適切なalt属性を設定
2. **レスポンシブ対応**: 各デバイスサイズに対応
3. **遅延読み込み**: lazy loading実装推奨
4. **フォールバック**: 画像読み込み失敗時の代替表示

## 著作権・使用許可
- 全ての画像について使用許可を確認
- クレジット表記が必要な場合は明記
- 商用利用可能な画像のみ使用

---

**合計必要写真数**: 51枚

このリストに従って写真を準備し、指定されたフォルダ構成で格納してください。