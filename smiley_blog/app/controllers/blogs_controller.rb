class BlogsController < ApplicationController
  ALL_TAG = 'All'
  RECENT_TAG = 'Recent'

  def index
    case params[:tag]
    when ALL_TAG
      blogs =  Blog.all.order(updated_at: :desc)
    when RECENT_TAG
      blogs =  Blog.recent
    else
      blogs =  Tag.exists?(name: params[:tag].titleize) ? Blog.with(params[:tag]) : Blog.all
    end
    render json: blogs
  end

  def show
    begin
      blog = Blog.find(params[:id])
      render json: blog
    rescue
      render json: {error: "Coundn't find record"}, status: :not_found
    end
  end

  def new
    redirect_to blogs_path unless logged_in?
  end

  def create
    new_blog = Blog.create(blog_params)
    (tags + new_tags).each { |tag| new_blog.tags << tag }
    render json: new_blog
  end

  def update
    blog = fetch_blog_and_update! params[:id]
    blog.update_tags_with tags
    new_tags.each { |tag| blog.tags << tag }
    render json: Blog.all.order(updated_at: :desc)
  end

  def destroy
    blog = Blog.destroy(params[:id])
    render json: blog
  end

  private

  def fetch_blog_and_update!(id)
    if Blog.exists? id
      blog = Blog.find id
      blog.update_attributes blog_params
      blog
    else
      render json: {error: "Coundn't find record"}, status: :not_found
    end
  end

  def blog_params
    params.require(:blog).permit([:title], [:content])
  end

  def tags
    if params[:tag]
      tag_params.values.map { |name| Tag.find_by(name: name)}
    else
      []
    end
  end

  def new_tags
    if params[:newTag]
      new_tag_params.values.map { |name| Tag.find_or_create_by(name: name.titleize) }
    else
      []
    end
  end

  def new_tag_params
    permited_names = Tag.all.map(&:name).map(&:to_sym)
    params.require(:tag).permit(permited_names)
  end

  def new_tag_params
    permitted_names = (0...params[:newTag].length).map do |i|
      "tag#{i}".to_sym
    end
    params.require(:newTag).permit(permitted_names)
  end

end