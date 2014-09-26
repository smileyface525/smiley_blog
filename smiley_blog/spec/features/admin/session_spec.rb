require 'spec_helper'

feature 'Admin session' do
  context "on new page" do
    xit "can let an admin user login" do
      admin_user = FactoryGirl.create(:user)
      visit root_path
      fill_in 'email:', with: admin_user.email
      fill_in 'password:', with: admin_user.password
      click_button 'login'

      expect(page).to have_content('logout')
    end
  end
end
