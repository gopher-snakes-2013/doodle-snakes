require './app'
require 'sinatra/activerecord/rake'
require_relative './db/faker_data_maker'

begin
  require "rspec/core/rake_task"
  desc "Run all examples"
  RSpec::Core::RakeTask.new(:spec) do |t|
    t.rspec_opts = %w[--color]
    t.pattern = 'spec/*_spec.rb'
  end

  task :default => :spec
rescue LoadError
end


desc 'Start IRB with application environment loaded'
task 'console' do
  exec 'irb -r ./app.rb'
end

desc 'Seed all database tables with faker data'
task 'faker' do
  exec Generator.fake_data(25)
end

desc 'Seed database with faker USERS'
task 'faker_users' do
  exec Generator.fake_users(25)
end

desc 'Seed database with faker DOODLES (they will all be the same but with different foreign keys)'
task 'faker_doodles' do
  exec Generator.fake_doodles(25)
end

desc 'Drop and re-create database. Then re-seed it with faker data'
task 'db:boom' do
  %x( rake db:drop )
  %x( rake db:create )
  %x( rake db:migrate )
  %x( rake faker)
end

desc "create the database"
task "db:create" do
  %x( createdb doodledb )
end

desc "drop the database"
task "db:drop" do
  %x( dropdb doodledb )
end

desc "drop and re-create the database"
task "db:reset" do
  %x( rake db:drop )
  %x( rake db:create )
end

