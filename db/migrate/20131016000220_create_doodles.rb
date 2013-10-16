class CreateDoodles < ActiveRecord::Migration
  def up
    create_table :doodles do |t|
      t.text :doodle_data
      t.belongs_to :user


      t.timestamps
    end
  end

  def down
    drop_table :doodles
  end
end
