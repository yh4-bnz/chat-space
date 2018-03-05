# DB設計

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### アソシエーション
- belongs_to :user
- belongs_to :group

## users テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### アソシエーション
- has_many :messages
- has_many :groups, through: :members

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### アソシエーション
- has_many :messages
- has_many :users, through: :members

## members テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### アソシエーション
- belongs_to :group
- belongs_to :user
