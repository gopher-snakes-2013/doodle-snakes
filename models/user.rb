class User < ActiveRecord::Base
  has_many :doodles

  validates :username, presence: true
  validates :password_hash, presence: true
  validates :email, presence: true, uniqueness: true
end
