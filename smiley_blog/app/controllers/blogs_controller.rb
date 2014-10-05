class BlogsController < ApplicationController

  def index
    case params[:tag]
    when "All"
      render json: Blog.all
    when "Recent"
      render json: Blog.recent
    else
      render json: tag_exists? ? Blog.with(params[:tag]) : Blog.all
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
    new_tag_names = []
    new_blog = Blog.create(blog_params)
    if params[:newTag]
      new_tags.each do |tag|
        new_blog.tags << tag
        new_tag_names << tag.name
      end
    end
    tags.each { |tag| new_blog.tags << tag } if params[:tag]
    render json: {blog: new_blog, newTags: new_tag_names}
  end

  def destroy
    blog = Blog.destroy(params[:id])
    render json: blog
  end

  private

  def blog_params
    params.require(:blog).permit([:title, :content])
  end

  def tags
    tag_params.values.map { |name| Tag.find_by_name(name) }
  end

  def new_tags
    new_tag_params.values.map { |name| Tag.create(name: name) }
  end

  def tag_params
    permited_names = Tag.all.map(&:name).map(&:to_sym)
    params.require(:tag).permit(permited_names)
  end

  def new_tag_params
    permitted_names = (0...params[:newTag].length).map do |i|
      "tag#{i}".to_sym
    end
    params.require(:newTag).permit(permitted_names)
  end

  def tag_exists?
    Tag.all.map(&:name).include? params[:tag]
  end

end