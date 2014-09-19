require 'spec_helper'

feature 'Admin session' do
  context "on new page" do
    it "can let an admin user login" do
      admin_user = FactoryGirl.create(:user)
      visit new_admin_session_path
      fill_in 'Email', with: admin_user.email
      fill_in 'Password', with: admin_user.password
      click_button 'login'

      expect(page).to have_content('logout')
    end
  end
end
