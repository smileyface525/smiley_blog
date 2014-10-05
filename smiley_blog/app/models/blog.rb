class Blog < ActiveRecord::Base

  has_and_belongs_to_many :tags
  validates :title, :content, presence: true
  before_destroy :delete_empty_tags

  def self.recent
    order(:updated_at).limit(7)
  end

  def self.with(tag_name)
    includes(:tags).where(tags: {name: tag_name})
  end

  def delete_empty_tags
    tags.each do |tag|
      tag.destroy if tag.blogs.count == 1
    end
  end

end
