require 'spec_helper'

describe BlogsController do

  let!(:blog) { FactoryGirl.create :blog }

  describe "#index" do

    it "returns @blogs variable that corresponds to all blogs" do
      get :index
      expect( assigns :blogs ).to eq Blog.all
    end

    it "returns a json object corresponds to all blogs" do
      array_of_blogs = []
      array_of_blogs << blog
      get :index
      expect(response.body).to eq array_of_blogs.to_json
    end

    context "if params[:tag_id] is provided" do
      it "returns only the blogs that are associated with the particular tag" do
        blog_with_tags = FactoryGirl.create :blog_with_tags
        get :index, tag_id: blog_with_tags.tags.first.id
        expect( assigns(:blogs) ).to_not include blog
      end
    end

  end

  describe "#show" do

    it "returns @blog variable that corresponds to a specfic blog" do
      get :show, id: blog.id
      expect( assigns :blog ).to eq blog
    end

    it "returns a json object corresponds to a specific blog" do
      get :show, id: blog.id
      expect(response.body).to eq blog.to_json
    end

  end

  describe "#new" do

    context "if sesssion[:user_id] is not established," do
      it "redirects the user to /blogs" do
        get :new
        expect(response).to redirect_to blogs_path
      end
    end

  end

  describe "#create" do
    let(:attributes) { FactoryGirl.attributes_for(:blog) }

    it "creates a blog" do
      expect{post :create, blog: attributes}.to change{Blog.count}.by(1)
    end

    it "returns all blogs as json" do
      post :create, blog: attributes
      expect(response.body).to eq(Blog.all.to_json)
    end

  end

  describe "#destroy" do
    it "deletes a blog" do
      expect{ delete :destroy, id: blog.id }.to change{Blog.count}.by(-1)
    end
  end

end