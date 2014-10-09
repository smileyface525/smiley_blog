class Tag < ActiveRecord::Base

  has_and_belongs_to_many :blogs
  validates :name, presence: true
  before_create :titleize_name!

  def self.with(blog_id)
    includes(:blogs).where(blogs: {id: blog_id})
  end

  def titleize_name!
    self.name = name.titleize
  end

end
