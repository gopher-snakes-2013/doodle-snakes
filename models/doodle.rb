class Doodle < ActiveRecord::Base
  belongs_to :user
  validates :doodle_data, presence: true
  validates :user, presence: true

end
