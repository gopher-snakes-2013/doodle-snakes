class AddDoodleKeyToDoodles < ActiveRecord::Migration
  def up
    add_column :doodles, :doodle_key, :string
  end

  def down
    remove_column :doodles, :doodle_key
  end
end
