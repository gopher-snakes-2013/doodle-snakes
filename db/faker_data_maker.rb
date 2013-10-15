require 'faker'
require_relative '../models/secret_url'
require_relative '../models/post'
# require_relative '../models/user'

module Generator
  # Fill the database with Users and associated posts and secret links (hash_urls)	
  def self.fake_data(num)
  	num.times do 
  		Post.create!({title:Faker::Commerce.product_name, description:Faker::Company.catch_phrase, price:Faker::Number.number(4)})
  	end
  end
  
  # Just create fake users
  def self.fake_users(num)
  	num.times do 

  	end
  end

  # Just create fake posts and associated secret links (hash_urls)
  def self.fake_posts(num)
  	num.times do 
		item = Post.create!({title:Faker::Commerce.product_name, description:Faker::Company.catch_phrase, price:Faker::Number.regexify(/\d{4}/)})
		item.set_secret_url
  	end
  end

  #Drops the submitted database table.  No argument will clear all tables
  def self.drop_fake_data(table_name)

  end
 
end