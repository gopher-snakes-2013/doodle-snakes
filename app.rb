$LOAD_PATH.unshift(File.expand_path('.'))

require 'securerandom'
require 'sinatra'
require 'sinatra/activerecord'
require 'bcrypt'

require './models/user'
require './models/doodle'


begin
  require 'dotenv'
  Dotenv.load
  rescue LoadError
end

set :database, ENV['DATABASE_URL']

get '/' do
  erb :index
end



get '/doodle/:doodle_key' do
  @doodle = Doodle.find_by_doodle_key(params[:doodle_key])
  erb :doodle_img_detail
end


post '/save' do
  new_key = SecureRandom.urlsafe_base64(12)
  @doodle = Doodle.create!({doodle_key: new_key, doodle_data: params[:doodle_data], user_id: 1})
  redirect "/doodle/#{new_key}"
end

post '/login' do
  @user = User.find_by username: params[:username]
  if @user.try(:password_hash) == params[:password]
    redirect "/user/#{@user.username}"

  end
end

get '/user/:username' do
  @user = User.find_by username: params[:username]
  erb :index
end

get '/register' do
  erb :form_register
end

post '/register_user' do
  @user = User.create!({username:params[:username] , email:params[:email], password: params[:password]});
  redirect "/user/#{@user.username}"
end

post '/logout' do
  redirect '/'
end

