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
  scenario 'they click on sign in after filling in username/pw' do
      visit '/'
      fill_in "username", with: "bob"
      fill_in "password", with: "lovescake"
      click_on "register"
      expect(page).to have_content "welcome"
  end
end

