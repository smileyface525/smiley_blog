class BlogsController < ApplicationController

  def index
    if params[:tag_id]
      @blogs = Blog.includes(:tags).where(tags: { id: params[:tag_id] })
    else
      @blogs = Blog.all
    end
      render json: @blogs
  end

  def show
    @blog = Blog.find(params[:id])
    render json: @blog
  end

end