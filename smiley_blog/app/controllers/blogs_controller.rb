class BlogsController < ApplicationController

  def index
    @blogs = params[:tag_id] ? Blog.includes(:tags).where(tags: { id: params[:tag_id] }) : Blog.all
    render json: @blogs
  end

  def show
    @blog = Blog.find(params[:id])
    render json: @blog
  end

  def new
    redirect_to blogs_path unless logged_in?
  end

end