class BlogsController < ApplicationController

  def index
    case params[:tag]
    when tag_exists?
      render json: Blog.with(params[:tag])
    when "Recent"
      render json: Blog.recent
    else "All"
      render json: Blog.all
    end
  end

  def show
    @blog = Blog.find(params[:id])
    render json: @blog
  end

  def new
    redirect_to blogs_path unless logged_in?
  end

  def create
    Blog.create(blog_params)
    blogs = Blog.all
    render json: blogs
  end

  def destroy
    Blog.destroy(params[:id])
    render json: Blog.all
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :content)
  end

  def tag_exists?
    Tag.all.map(&:name).include? params[:tag]
  end

end