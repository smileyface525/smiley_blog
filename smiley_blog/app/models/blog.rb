class Blog < ActiveRecord::Base

  has_and_belongs_to_many :tags, after_remove: :delete_empty_tag
  validates :title, :content, presence: true
  before_create :titleize_title!
  before_destroy :delete_empty_tags

  def self.recent
    order(updated_at: :desc).limit(7)
  end

  def self.with(tag_name)
    includes(:tags).where(tags: {name: tag_name})
  end

  def titleize_title!
    self.title = title.titleize
  end

  def clear_and_clean_tags
    delete_empty_tags
    self.tags.clear
  end

  def update_tags_with(new_tags)
    tags.each do |tag|
      new_tags.include?(tag) ? new_tags.delete(tag) : self.tags.delete(tag)
    end
    new_tags.each { |new_tag| self.tags << new_tag }
  end

  def delete_empty_tag(tag)
    tag.destroy if tag.blogs.empty?
  end

  def delete_empty_tags
    tags.each do |tag|
      tag.destroy if tag.blogs.count == 1
    end
  end

end
