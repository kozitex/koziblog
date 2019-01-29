# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :posts


## postsテーブル

|Column|Type|Options|
|------|----|-------|
|content|text|null: false|
|user_id|string|null:false, foreign_key: true|

### Association
- belong_to :user
