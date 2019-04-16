class ChangeDataUserIdToPost < ActiveRecord::Migration[5.2]
  def change
    change_column :posts, :user_id, 'integer USING CAST(column_name AS integer)'
  end
end
