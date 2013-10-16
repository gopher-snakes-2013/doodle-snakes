require 'spec_helper'

describe Doodle do
  it { should validate_presence_of(:doodle_data)}
  it { should validate_presence_of(:user)}

end

describe User do
  it { should validate_presence_of(:username)}
  it { should validate_presence_of(:password_hash)}
  it { should validate_presence_of(:password_hash)}
  
  it { should validate_presence_of(:email)}
  it { should validate_uniqueness_of(:email)}

end
