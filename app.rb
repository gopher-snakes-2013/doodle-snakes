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

enable :sessions

set :database, ENV['DATABASE_URL']

get '/' do
  @user = current_user
  erb :index
end

def current_user
  @current_user ||= logged_in? && User.find( session[:user_id] )
end

def logged_in?
  session[:user_id]
end

def enforce_login
  redirect_to '/' if !logged_in?
end

get '/doodle/:doodle_key' do
  @doodle = Doodle.find_by_doodle_key(params[:doodle_key])
  erb :doodle_img_detail
end


post '/save' do
  new_key = SecureRandom.urlsafe_base64(12)
  current_user_id = session[:user_id] || 1 # user for guest doodles
  @doodle = Doodle.create!({doodle_key: new_key, doodle_data: params[:doodle_data], user_id: current_user_id})
  redirect "/doodle/#{new_key}"
end

post '/login' do
  if @user = User.authenticate(params[:username], params[:password])
    session[:user_id] = @user.id
    redirect "/user/#{@user.username}"
  else
    redirect "/"
  end
end

get '/user/:username' do
  @user = User.find_by username: params[:username]
  erb :index
end

get '/users/new' do
  erb :form_register
end

post '/users/create' do
  @user = User.create!({username:params[:username] , email:params[:email], password: params[:password]});
  session[:user_id] = @user.id
  redirect "/user/#{@user.username}"
end

post '/logout' do
  session.clear
  redirect '/'
end

