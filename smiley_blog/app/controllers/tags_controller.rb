class TagsController < ApplicationController

  def index
    tags = Tag.with params[:blog_id] if params[:blog_id]
    tags ||= Tag.all
    render json: tags
  end

end