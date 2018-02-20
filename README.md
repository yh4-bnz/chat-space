# DB設計

## messages テーブル
|Column|Type|Options|
|:-----|:---|:------|
|body|text|null: false|
|image|string||
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### アソシエーション
- belongs_to :user
- belongs_to :group

## users テーブル
|Column|Type|Options|
|:-----|:---|:------|
|name|string|null: false, unique: true|
※nameカラムには、グループからメンバーを追加する際に、検索しやすいようindexを貼る

### アソシエーション
- has_many :messages
- has_many :group_users, through: :group_users

## groups テーブル
|Column|Type|Options|
|:-----|:---|:------|
|name|string|null: false|

## group_users table
- has_many :messages
- has_many :group_users, through: :group_users

## group_users テーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
※user_idカラム、group_idカラムには、両者を参照しやすくするために、indexを貼る

### Association
- belongs_to :group
- belongs_to :user
