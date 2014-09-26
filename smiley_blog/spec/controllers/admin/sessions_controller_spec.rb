require 'spec_helper'

describe Admin::SessionsController do

  describe "#create" do

    context "if the user's email and password match" do
      let!(:user) { FactoryGirl.create(:user) }
      let!(:attributes) { { user: FactoryGirl.attributes_for(:user) } }

      it "starts session[:user_id]" do
        post :create, attributes
        expect(session[:user_id]).to eq user.id
      end

      it "returns user data as json" do
        post :create, attributes
        expect(response.body).to eq(user.to_json)
      end
    end

    context "if the user's email and password do not match" do

      it "rerenders the login form"
    end
  end

  describe "#destroy" do

    it "clears any ongoing sessions" do
      user = FactoryGirl.create(:user)
      delete :destroy, id: user.id
      expect(session).to be_empty
    end

  end

end