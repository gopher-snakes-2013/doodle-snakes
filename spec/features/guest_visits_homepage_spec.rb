require 'spec_helper'

feature 'guest visits homepage' do
        scenario "they see username and password fields" do
                visit '/'
                expect(page).to have_content "username:"
                expect(page).to have_content "password:"                
                expect(page).to have_content "Create a new Account"                
        end
end


feature 'guest signs in' do
  background do
    User.create!(:email => 'bob@gmail.com', :username =>'bob', :password_hash => 'lovescake')
  end

  scenario 'they see a page with account information' do
      visit '/'
      fill_in "username", with: "bob"
      fill_in "password", with: "lovescake"
      click_on "register"
      expect(page).to have_content "welcome #{:username}"
  end
end


feature 'guest creates account' do
  scenario 'they fill in info' do
    visit '/register'
      fill_in "username", with: "bob"
      fill_in "password", with: "lovescake"
      fill_in "email", with: "bob@gmail.com"

      click_on "register"
      expect(page).to have_content "Welcome 'bob'"
  end

  scenario 'they click on one of the canvases theyve made before' do 
  end

end

