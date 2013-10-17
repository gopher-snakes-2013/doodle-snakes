$LOAD_PATH.unshift(File.expand_path('.'))

require 'SecureRandom'
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












# post '/doodle_upload' do
#   doodle_url = SecureRandom.urlsafe_base64(12)
#   @doodle = Doodle.create!({doodle_data: params[:doodle_data], user_id: 27, doodle_key: doodle_url})
#   redirect to("/doodle/#{doodle_url}")
# end

# get '/doodle/:doodle_key' do
#   @doodle = Doodle.find_by_doodle_key(params[:doodle_key])
#   erb :doodle_detail
# end

# get '/welcome' do
#   erb :welcome
# end

# get '/register' do
#   erb :form_register
# end

# post '/login' do

#   redirect '/welcome'
# end

# post '/register_user' do
#   @user = User.create!({username:params[:username] , email:params[:email] , pass:params[:pass]});
#   redirect '/welcome'
# end


